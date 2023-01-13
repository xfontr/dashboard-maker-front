export const FORM_CLASSES = {
  /** Max width of 48% on desktop devices */
  half: "form__group--half",
  /** Max width of 31% on desktop devices */
  third: "form__group--third",
  /** Max width of 65% on desktop devices */
  seventh: "form__group--seventh",
};

export const INPUT_RULES = {
  name: {
    min: 3,
    max: 30,
  },

  email: {
    min: 10,
    max: 120,
  },

  password: {
    min: 8,
    max: 120,
  },

  standardShort: {
    min: 3,
    max: 80,
  },

  standardLong: {
    min: 4,
    max: 300,
  },
};
