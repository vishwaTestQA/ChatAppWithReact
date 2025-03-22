import { create } from "zustand";
//storing the theme in local storage so that we can get the theme in every page 

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "light",         //initial value
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme)
    set({theme})
  }
}))