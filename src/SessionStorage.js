const SessionStorage = {
  setItem: (key, value) => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("SessionStorage setItem error:", e);
    }
  },
  getItem: (key) => {
    const value = sessionStorage.getItem(key);
    if (!value) return null;
    try {
      return JSON.parse(value);
    } catch (e) {
      console.error("SessionStorage getItem error:", e);
      return null;
    }
  },
  removeItem: (key) => {
    sessionStorage.removeItem(key);
  }
};

export default SessionStorage;