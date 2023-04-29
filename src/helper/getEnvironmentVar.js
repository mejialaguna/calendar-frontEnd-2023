export const getEnvironmentVar = () => {
  const envVariable = import.meta.env;

  return {
    envVariable,
  };
};
