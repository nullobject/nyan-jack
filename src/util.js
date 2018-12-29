import { fold, keys, update } from 'fkit'

export const mapObject = (f, o) => fold((result, k) => update(k, f, result), o, keys(o))
