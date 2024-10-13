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
  disabled?: boolean;
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

interface FollowerSurveyData {
  twitter?: string;
  fave_chara: string;
  fave_unit: string;
  assumed_chara: string;
  assumed_unit: string;
}

interface CountedVotes {
  chara_id: number;
  count: number;
}

type FollowerSurveyDataType =
  | "fave_chara"
  | "fave_unit"
  | "assumed_chara"
  | "assumed_unit";

interface SorterFilterOptions {
  teachers: boolean;
  anzu: boolean;
  gatekeeper: boolean;
  newface: boolean;
  nice: true;
  seiya: false;
  madamoiselle: false;
  kaname: false;
}

type RecursiveArray<T> = Array<RecursiveArray | T>;

interface EnCharacterData {
  character_id: number;
  last_name: string;
  first_name: string;

  /** Reading guide for last name, eg. furigana */
  last_nameRuby?: string;

  /** Reading guide for first name, eg. furigana */
  first_nameRuby?: string;

  /** Character voice actor */
  character_voice: string;

  hobby: string;
  specialty: string;
  school?: string;
  class?: string;
  quote: string;
  tagline: string;
  introduction: string;
}

interface JPCharacterData extends EnCharacterData {
  unit: number[];
  image_color?: HexColorWithTag;

  /** Height in cms */
  height: number;

  /** Weight in kgs */
  weight: number;

  /** Birthday in YYYY-MM-DD format */
  birthday: string;
  age?: number;
  blood_type: "A" | "B" | "O" | "AB";
  circle?: string[];
  sort_id: number;
}
