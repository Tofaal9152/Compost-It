import { MMKV } from 'react-native-mmkv';
import { createJSONStorage } from 'zustand/middleware';

export const mmkv = new MMKV();

export const zustandMMKVStorage = createJSONStorage(() => ({
  setItem: (name, value) => {
    mmkv.set(name, value);
  },
  getItem: (name) => {
    const value = mmkv.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    mmkv.delete(name);
  },
}));
