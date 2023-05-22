import { atomWithStorage } from 'jotai/utils';

const isDark = window && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
export const themeAtom = atomWithStorage<boolean>('darkMode', isDark);
