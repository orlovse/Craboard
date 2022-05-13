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
  isDarkTheme: boolean;
};

export const useUserStore = defineStore({
  id: "user",
  state: () =>
    ({
      user: null,
      isDarkTheme: true,
    } as UserStateType),
  getters: {
    isAuthenticated: (state) => !!state.user,
    isDarkTheme: (state) => state.user?.isDarkTheme || state.isDarkTheme,
    isAdmin: (state) => state.user?.role === UserRole.admin,
  },
  actions: {
    switchTheme() {
      this.isDarkTheme = !this.isDarkTheme;
    },
  },
});
