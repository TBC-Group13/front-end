import { atom } from 'jotai';

export const userAtom = atom(null);
export const errorAtom = atom<string | null>(null);