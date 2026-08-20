import type {
  AuthProviderApi,
  AuthUser,
  Credentials,
  RegisterInput,
} from "./types";

const API_URL = "http://127.0.0.1:8000";

type LoginResponse = {
  message: string;
  access_token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
};

type ApiUser = {
  id: number;
  name: string;
  email: string;
};

function toAuthUser(user: ApiUser): AuthUser {
  return {
    id: String(user.id),
    fullName: user.name,
    email: user.email,
    avatarUrl: null,
  };
}

async function parseResponse<T>(response: Response): Promise<T> {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Something went wrong.");
  }

  return data;
}

export const fastApiAuth: AuthProviderApi = {
  async register(input: RegisterInput) {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: input.fullName,
        email: input.email,
        password: input.password,
      }),
    });

    const user = await parseResponse<ApiUser>(response);

    return toAuthUser(user);
  },

  async login(input: Credentials) {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: input.email,
        password: input.password,
      }),
    });

    const data = await parseResponse<LoginResponse>(response);

    localStorage.setItem("splitsmart.token", data.access_token);

    return toAuthUser(data.user);
  },

  async logout() {
    localStorage.removeItem("splitsmart.token");
  },

  async getCurrentUser() {
    const token = localStorage.getItem("splitsmart.token");

    if (!token) {
      return null;
    }

    const response = await fetch(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      localStorage.removeItem("splitsmart.token");
      return null;
    }

    const user = await response.json();

    return toAuthUser(user);
  },

  async updateProfile(patch) {
    throw new Error("Profile update is not implemented yet.");
  },
};