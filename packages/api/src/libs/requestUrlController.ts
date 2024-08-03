export const exampleUrl = {
  getExampleData: () => "/example",
} as const;

export const authUrl = {
  getLogin: (provider: "google" | "kakao") => `/auth/v3/oauth2/authorization/${provider}`,
  getLogout: () => `/auth/v3/logout`,
};
