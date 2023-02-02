type ColorThemeOption = "dark" | "light" | "";

interface DarkModeContextType {
  colorTheme: ColorThemeOption;
  toggleColorTheme: () => void;
}

interface BioSection {
  title: string;
  content: string;
  icon: JSX.Element;
}

interface SelectOption {
  value: string;
  name: string;
}
