type ColorThemeOption = "dark" | "light" | "";

interface DarkModeContextType {
  colorTheme: ColorThemeOption;
  toggleColorTheme: () => void;
}

interface BioSection {
  title: string;
  content: string;
  icon: (props: any) => JSX.Element;
}

interface SelectOption {
  value: string;
  name: string;
}
