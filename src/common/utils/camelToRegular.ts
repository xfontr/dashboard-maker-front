const camelToRegular = (camelCaseWord: string): string =>
  camelCaseWord
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (camelCaseWithSpaces) => camelCaseWithSpaces.toUpperCase());

export default camelToRegular;
