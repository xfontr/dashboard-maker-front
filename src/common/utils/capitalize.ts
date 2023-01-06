const capitalize = (phrase: string): string =>
  `${phrase.charAt(0).toUpperCase()}${phrase.slice(1)}`;

export default capitalize;
