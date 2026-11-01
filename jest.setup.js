jest.mock('@react-native-async-storage/async-storage', () => {
  const store = new Map();
  return {
    __esModule: true,
    default: {
      getItem: async key => store.get(key) ?? null,
      setItem: async (key, value) => void store.set(key, value),
      removeItem: async key => void store.delete(key),
      getMany: async keys => Object.fromEntries(keys.map(k => [k, store.get(k) ?? null])),
    },
  };
});
