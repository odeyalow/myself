import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useColorScheme } from "nativewind";

export type ThemeMode = "light" | "dark" | "system";

type ThemeModeContextValue = {
  themeMode: ThemeMode;
  resolvedScheme: "light" | "dark";
  setThemeMode: (mode: ThemeMode) => void;
};

const ThemeModeContext = createContext<ThemeModeContextValue | null>(null);

export const ThemeModeProvider = ({ children }: { children: ReactNode }) => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>("system");

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    setColorScheme(mode);
  };

  const resolvedScheme: "light" | "dark" = colorScheme === "dark" ? "dark" : "light";

  const value = useMemo(
    () => ({
      themeMode,
      resolvedScheme,
      setThemeMode,
    }),
    [themeMode, resolvedScheme],
  );

  return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>;
};

export const useThemeMode = () => {
  const context = useContext(ThemeModeContext);

  if (!context) {
    throw new Error("useThemeMode must be used within ThemeModeProvider");
  }

  return context;
};
