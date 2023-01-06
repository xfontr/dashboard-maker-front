const { env } = process;

const ENVIRONMENT = {
  apiUrl: env.REACT_API_URL ?? "",
};

export default ENVIRONMENT;
