export const getLocalStorage = (key, defaultVal, parsing) => {
  if (parsing) {
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : defaultVal;
  } else {
    return localStorage.getItem(key) ? localStorage.getItem(key) : defaultVal;
  }
};

export const setLocalStorage = (key, value, stringfy) => {
  if (stringfy) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, value);
  }
};
