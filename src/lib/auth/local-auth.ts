import type { AuthProviderApi, AuthUser, Credentials, RegisterInput } from "./types";

const USERS_KEY = "splitsmart.users";
const SESSION_KEY = "splitsmart.session";

type StoredUser = AuthUser & { password: string };

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function publicUser({ password: _password, ...user }: StoredUser): AuthUser {
  return user;
}

/** Demo-stage auth backed by localStorage. Replace with a FastAPI client later. */
export const localAuth: AuthProviderApi = {
  async register({ fullName, email, password }: RegisterInput) {
    const users = read<StoredUser[]>(USERS_KEY, []);
    const normalized = email.trim().toLowerCase();
    if (users.some((u) => u.email === normalized)) {
      throw new Error("An account with this email already exists.");
    }
    const user: StoredUser = {
      id: crypto.randomUUID(),
      fullName: fullName.trim(),
      email: normalized,
      avatarUrl: null,
      password,
    };
    write(USERS_KEY, [...users, user]);
    write(SESSION_KEY, user.id);
    return publicUser(user);
  },

  async login({ email, password }: Credentials) {
    const users = read<StoredUser[]>(USERS_KEY, []);
    const normalized = email.trim().toLowerCase();
    const found = users.find((u) => u.email === normalized && u.password === password);
    if (!found) throw new Error("Invalid email or password.");
    write(SESSION_KEY, found.id);
    return publicUser(found);
  },

  async logout() {
    if (typeof window !== "undefined") window.localStorage.removeItem(SESSION_KEY);
  },

  async getCurrentUser() {
    const id = read<string | null>(SESSION_KEY, null);
    if (!id) return null;
    const users = read<StoredUser[]>(USERS_KEY, []);
    const found = users.find((u) => u.id === id);
    return found ? publicUser(found) : null;
  },

  async updateProfile(patch) {
    const id = read<string | null>(SESSION_KEY, null);
    const users = read<StoredUser[]>(USERS_KEY, []);
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) throw new Error("Not signed in.");
    const next = { ...users[index], ...patch } as StoredUser;
    users[index] = next;
    write(USERS_KEY, users);
    return publicUser(next);
  },
};
