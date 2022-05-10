import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: null,
    isDarkTheme: true,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    switchTheme() {
      this.isDarkTheme = !this.isDarkTheme;
    },
  },
});
