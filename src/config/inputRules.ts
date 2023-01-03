export type InputData = Partial<{
  min: number;
  max: number;
}>;

const INPUT_RULES = {
  name: {
    min: 3,
    max: 15,
  },

  email: {
    min: 10,
    max: 70,
  },

  password: {
    min: 8,
    max: 70,
  },
};

export default INPUT_RULES;
