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

interface PostMeta {
  id: number;
  title: string;
  author: string;
  urlName: string;
  url: string;
  description: string;
  dateCreated?: number;
  dateUpdated?: number;
}

interface TotalResult {
  id: number;
  md: number;
  ld: number;
  firstName?: string | null;
  lastName?: string | null;
}

interface Result {
  id: any;
  name: string;
  reason: string;
}
