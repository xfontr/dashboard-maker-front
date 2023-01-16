/**
 * Simple helper to handle the state setter function. It takes the current
 * values and adds (and replaces if matching) the passed ones as params
 */

const joinValues =
  <T>(values: Record<string, string>) =>
  (currentState?: T) => ({
    ...currentState,
    ...(values as unknown as T),
  });

export default joinValues;
