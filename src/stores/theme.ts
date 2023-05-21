import { atomWithStorage } from 'jotai/utils';

export const themeAtom = atomWithStorage<boolean>('darkMode', false);
