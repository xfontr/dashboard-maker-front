const concatIfTrue = (
  defaultValue: string,
  valueIfTrue: string,
  condition: boolean
): string => {
  const addedValue = condition ? ` ${valueIfTrue}` : "";

  return `${defaultValue}${addedValue}`;
};

export default concatIfTrue;
