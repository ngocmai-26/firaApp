export const getHeaders = (token, ...headers) => {
    const configs = { "Content-Type": "Application/json" };
    if (token) {
      configs["Authorization"] = `Bearer ${token}`;
    }
    return { ...configs, ...headers };
  };
  