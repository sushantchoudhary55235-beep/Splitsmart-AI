export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string | null;
};

export type Credentials = { email: string; password: string };
export type RegisterInput = Credentials & { fullName: string };

/**
 * Contract for the auth backend. The demo implementation stores users in
 * localStorage; swap it later for a FastAPI REST client without touching UI code.
 */
export interface AuthProviderApi {
  register(input: RegisterInput): Promise<AuthUser>;
  login(input: Credentials): Promise<AuthUser>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<AuthUser | null>;
  updateProfile(patch: Partial<Omit<AuthUser, "id">>): Promise<AuthUser>;
}

export function initialsOf(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase() ?? "")
      .join("") || "?"
  );
}

export function firstNameOf(name: string) {
  return name.trim().split(/\s+/)[0] ?? "";
}
