interface SurveyData {
  name?: string | null;
  twitter: string | null;
  fave_unit: number | null;
  fave_chara: number | null;
  assumed_unit: number | null;
  assumed_chara: number | null;
  comment?: string | null;
}

interface State {
  formData: SurveyData;
  formIndex: 1 | 2 | 3 | 4;
  submitForm: boolean;
  submitError: boolean;
  submitLoading: boolean;
  introFormError?: FormError | null;
  faveFormError?: FormError | null;
  predictedFormError?: FormError | null;
  commentFormError?: FormError | null;
}

type Action =
  | {
      type: "updateData";
      payload: {
        formData?: SurveyDataData;
        formIndex?: 1 | 2 | 3 | 4;
      };
    }
  | { type: "nextSection" }
  | { type: "prevSection" }
  | { type: "submitData" }
  | { type: "submitLoading" }
  | { type: "submitError" };

type FormError = {
  noUsername?: boolean;
  isBot?: boolean;
  noFaveChara?: boolean;
  noFaveUnit?: boolean;
  noPredictedChara?: boolean;
  noPredictedUnit?: boolean;
};
