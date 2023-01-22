const callFunctionIfExists = <T>(
  callMe?: Function,
  ...args: unknown[]
): T | undefined => callMe && callMe(...args);

export default callFunctionIfExists;
