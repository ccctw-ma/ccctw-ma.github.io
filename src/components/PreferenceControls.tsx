"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";
type Lang = "en" | "zh";

const THEME_KEY = "ccctw-theme";
const LANG_KEY = "ccctw-lang";

function applyPreferences(theme: Theme, lang: Lang) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.dataset.lang = lang;
}

export default function PreferenceControls() {
  const [theme, setTheme] = useState<Theme>("light");
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(THEME_KEY) as Theme | null;
    const storedLang = window.localStorage.getItem(LANG_KEY) as Lang | null;
    const preferredTheme: Theme = storedTheme ?? "light";
    const preferredLang: Lang = storedLang ?? "en";

    setTheme(preferredTheme);
    setLang(preferredLang);
    applyPreferences(preferredTheme, preferredLang);
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    window.localStorage.setItem(THEME_KEY, nextTheme);
    applyPreferences(nextTheme, lang);
  }

  function toggleLang() {
    const nextLang = lang === "en" ? "zh" : "en";
    setLang(nextLang);
    window.localStorage.setItem(LANG_KEY, nextLang);
    applyPreferences(theme, nextLang);
  }

  return (
    <div className="flex items-center gap-2 text-xs font-black">
      <button
        type="button"
        onClick={toggleLang}
        className="accent-pill rounded-full border px-3 py-2"
        aria-label="Toggle language"
      >
        {lang === "en" ? "中" : "EN"}
      </button>
      <button
        type="button"
        onClick={toggleTheme}
        className="accent-pill rounded-full border px-3 py-2"
        aria-label="Toggle color theme"
      >
        {theme === "dark" ? "Light" : "Dark"}
      </button>
    </div>
  );
}
