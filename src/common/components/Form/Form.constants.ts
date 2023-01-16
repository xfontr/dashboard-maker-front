export const FORM_CLASSES = {
  /** Max width of 48% on desktop devices */
  half: "form__group--half",
  /** Max width of 31% on desktop devices */
  third: "form__group--third",
  /** Max width of 65% on desktop devices */
  seventh: "form__group--seventh",
  /** Sets an icon as background */
  icon: (iconName: string) => `form__input--background icon--${iconName}`,
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

  phone: {
    min: 9,
    max: 11,
  },

  postalCode: {
    min: 5,
    max: 11,
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
