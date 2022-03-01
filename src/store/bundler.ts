import * as esbuild from 'esbuild-wasm'
import { atom } from 'recoil'

export const isEsbuildInitState = atom({
  key: 'isEsbuildInit',
  default: false,
})

export const codeState = atom({
  key: 'code',
  default: '',
})

export const bundledCodeState = atom({
  key: 'bundledCodeCode',
  default: '',
})

export const bundledCodeErrorsState = atom<esbuild.Message[]>({
  key: 'bundledCodeErrors',
  default: [],
})

export const bundledCodeWarningsState = atom<esbuild.Message[]>({
  key: 'bundledCodeWarnings',
  default: [],
})
