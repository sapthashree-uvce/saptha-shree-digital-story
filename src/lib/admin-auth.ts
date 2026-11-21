import { supabase } from "@/integrations/supabase/client";

export type AdminUser = {
  id: string;
  email: string;
  role: "admin";
  mode: "supabase";
};

// The site owner's account becomes administrator automatically once its email
// is confirmed (granted in the database, never in the browser).
export const OWNER_ADMIN_EMAIL = "sapthashree448@gmail.com";

const ADMIN_STORAGE_KEY = "saptha_admin_auth_session";
const ADMIN_EVENT_KEY = "saptha_admin_auth_change";

function cacheAdmin(user: AdminUser | null) {
  if (typeof window === "undefined") return;
  if (user) localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(user));
  else localStorage.removeItem(ADMIN_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(ADMIN_EVENT_KEY, { detail: user }));
}

// Cached admin display info for the first paint. It grants no access by itself:
// every save is checked by the database, and verifyAdminSession() re-checks on load.
export function getAdminSession(): AdminUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { mode?: string } & AdminUser;
    // Old browser-only "local" logins could never save to the database
    if (parsed.mode !== "supabase") {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

async function isAdmin(userId: string): Promise<boolean> {
  const { data, error } = await supabase.rpc("has_role", {
    _user_id: userId,
    _role: "admin",
  });
  if (error) {
    console.error("Admin role check failed:", error);
    return false;
  }
  return data === true;
}

// Re-check the real signed-in session and the admin role in the database
export async function verifyAdminSession(): Promise<AdminUser | null> {
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user || !(await isAdmin(user.id))) {
    cacheAdmin(null);
    return null;
  }
  const admin: AdminUser = {
    id: user.id,
    email: user.email ?? "",
    role: "admin",
    mode: "supabase",
  };
  cacheAdmin(admin);
  return admin;
}

export async function loginAdmin(
  email: string,
  pass: string
): Promise<{ success: boolean; user?: AdminUser; error?: string; notice?: string }> {
  const trimmedEmail = email.trim();

  if (!trimmedEmail || !pass) {
    return { success: false, error: "Please enter both email and password." };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: trimmedEmail,
    password: pass,
  });

  if (!error && data.user) {
    if (!(await isAdmin(data.user.id))) {
      await supabase.auth.signOut();
      cacheAdmin(null);
      return {
        success: false,
        error: "This account does not have administrator access.",
      };
    }
    const admin: AdminUser = {
      id: data.user.id,
      email: data.user.email ?? trimmedEmail,
      role: "admin",
      mode: "supabase",
    };
    cacheAdmin(admin);
    return { success: true, user: admin };
  }

  const message = error?.message ?? "";
  if (/not confirmed/i.test(message)) {
    return {
      success: false,
      error:
        "Your email is not confirmed yet. Open the confirmation link we emailed you, then sign in again.",
    };
  }

  // First-time setup: the owner's account does not exist yet, so create it
  // with the password just entered. A confirmation email proves ownership.
  if (
    trimmedEmail.toLowerCase() === OWNER_ADMIN_EMAIL &&
    /invalid login credentials/i.test(message)
  ) {
    const redirectTo =
      typeof window !== "undefined" ? `${window.location.origin}/admin` : undefined;
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: trimmedEmail,
      password: pass,
      options: redirectTo ? { emailRedirectTo: redirectTo } : {},
    });

    if (signUpError) {
      return { success: false, error: signUpError.message };
    }

    // Existing account (wrong password): Supabase returns a user with no identities
    const isExisting = (signUpData.user?.identities?.length ?? 0) === 0;
    if (isExisting) {
      return {
        success: false,
        error: "Invalid email or password. Please check your credentials.",
      };
    }

    if (signUpData.session) {
      const admin = await verifyAdminSession();
      if (admin) return { success: true, user: admin };
    }

    return {
      success: false,
      notice: `Your admin account was created. We sent a confirmation link to ${trimmedEmail} — open it, then sign in with the same password.`,
    };
  }

  return {
    success: false,
    error: "Invalid email or password. Please check your credentials.",
  };
}

export async function logoutAdmin(): Promise<void> {
  try {
    await supabase.auth.signOut();
  } catch (err) {
    console.debug("Sign-out notice:", err);
  }
  cacheAdmin(null);
}

// Subscribe to admin sign-in/sign-out changes
export function subscribeAdminAuth(
  callback: (user: AdminUser | null) => void
): () => void {
  if (typeof window === "undefined") return () => {};

  const handleCustomEvent = (e: Event) => {
    callback((e as CustomEvent<AdminUser | null>).detail);
  };
  const handleStorageEvent = (e: StorageEvent) => {
    if (e.key === ADMIN_STORAGE_KEY) callback(getAdminSession());
  };

  window.addEventListener(ADMIN_EVENT_KEY, handleCustomEvent);
  window.addEventListener("storage", handleStorageEvent);

  const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
    if (event === "SIGNED_OUT") {
      cacheAdmin(null);
      return;
    }
    if (event === "SIGNED_IN" || event === "USER_UPDATED") {
      // Defer database calls out of the auth callback to avoid a client deadlock
      setTimeout(() => {
        void verifyAdminSession();
      }, 0);
    }
  });

  return () => {
    window.removeEventListener(ADMIN_EVENT_KEY, handleCustomEvent);
    window.removeEventListener("storage", handleStorageEvent);
    authListener.subscription.unsubscribe();
  };
}
