import { create } from "zustand";

export const useCustomThemeStore = create((set) => ({
  customTheme: localStorage.getItem('custom-theme') || "{bgColor:'#01011e', textColor:'whitesmoke'}",
  setCustomTheme: (themeObj) => {
    localStorage.setItem('custom-theme', themeObj)
    set({customTheme: themeObj})
  }
}))