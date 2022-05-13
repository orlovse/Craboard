import { defineStore } from "pinia";

enum UserRole {
  admin = "admin",
}

type UserType = {
  id: string;
  avatar: string;
  name: string;
  role: UserRole;
  email: string;
  isDarkTheme: boolean;
};

type UserStateType = {
  user: UserType | null;
  isLocalDarkTheme: boolean;
};

export const useUserStore = defineStore({
  id: "user",
  state: () =>
    ({
      user: null,
      isLocalDarkTheme: true,
    } as UserStateType),
  getters: {
    isAuthenticated: (state) => !!state.user,
    isDarkTheme: (state) => state.user?.isDarkTheme || state.isLocalDarkTheme,
    isAdmin: (state) => state.user?.role === UserRole.admin,
  },
  actions: {
    switchThemeAction() {
      this.isLocalDarkTheme = !this.isLocalDarkTheme;
    },
  },
});
