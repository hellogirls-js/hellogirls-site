import { useColorScheme, useLocalStorage } from "@mantine/hooks";
import { createContext } from "react";

const DarkModeContext = createContext<DarkModeContextType>();

/**
 *
 * @param children The layout child
 * @returns
 */
function DarkModeProvider({ children }: { children: any }) {
  const colorScheme = useColorScheme();

  const [colorTheme, setColorTheme] = useLocalStorage<ColorThemeOption>({
    key: "color-theme",
    defaultValue: colorScheme,
  });

  const toggleColorTheme = () => {
    const newColorTheme = colorTheme === "light" ? "dark" : "light";
    setColorTheme(newColorTheme);
  };

  return (
    <DarkModeContext.Provider value={{ colorTheme, toggleColorTheme }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export { DarkModeContext, DarkModeProvider };
