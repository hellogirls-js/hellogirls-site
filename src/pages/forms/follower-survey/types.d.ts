interface State {
  formData: {
    name?: string | null;
    twitter: string | null;
    fave_unit: number | null;
    fave_chara: number | null;
    assumed_unit: number | null;
    assumed_chara: number | null;
    comment?: string | null;
  };
  formIndex: 1 | 2 | 3 | 4;
  submitForm: boolean;
  introFormError?: FormError | null;
  faveFormError?: FormError | null;
  predictedFormError?: FormError | null;
  commentFormError?: FormError | null;
}

type Action =
  | {
      type: "updateData";
      payload: {
        formData?: {
          name?: string;
          twitter?: string;
          fave_unit?: number;
          fave_chara?: number;
          assumed_unit?: number;
          assumed_chara?: number;
          comment?: string;
        };
        formIndex?: 1 | 2 | 3 | 4;
      };
    }
  | { type: "nextSection" }
  | { type: "prevSection" };

type FormError = {
  noUsername?: boolean;
  isBot?: boolean;
  noFaveChara?: boolean;
  noFaveUnit?: boolean;
  noPredictedChara?: boolean;
  noPredictedUnit?: boolean;
};
