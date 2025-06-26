export type UserState = {
  id: string | null;
  isLoggedIn: boolean;
  token: string | null;
  role: string | null;
  setToken: (token: string | null) => void;
  setRole: (role: string | null) => void;
  setId: (id: string | null) => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
  reset: () => void;
};
