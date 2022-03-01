import * as esbuild from 'esbuild-wasm'
import { memo, useCallback, useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  bundledCodeErrorsState,
  bundledCodeState,
  bundledCodeWarningsState,
  codeState,
  isEsbuildInitState,
} from '../../store/bundler'
import { fetchPlugin } from './plugins/fetch-plugin'
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin'

export const Bundler = memo(() => {
  const [isEsbuildInit, setIsEsbuildInit] = useRecoilState(isEsbuildInitState)
  const code = useRecoilValue(codeState)
  const setBundledCode = useSetRecoilState(bundledCodeState)
  const setBundledErrosCode = useSetRecoilState(bundledCodeErrorsState)
  const setBundledWarningsCode = useSetRecoilState(bundledCodeWarningsState)

  const initializeEsbuild = useCallback(async () => {
    await esbuild.initialize({
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.14.23/esbuild.wasm',
      worker: true,
    })
    setIsEsbuildInit(true)
  }, [setIsEsbuildInit])

  useEffect(() => {
    initializeEsbuild()
  }, [initializeEsbuild])

  const buildCode = useCallback(async () => {
    if (!isEsbuildInit) return

    const result = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(code)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'Window',
      },
    })

    console.log(result)

    setBundledCode(result.outputFiles[0].text)
    setBundledErrosCode(result.errors)
    setBundledWarningsCode(result.warnings)
  }, [
    code,
    isEsbuildInit,
    setBundledCode,
    setBundledErrosCode,
    setBundledWarningsCode,
  ])

  useEffect(() => {
    buildCode()
  }, [buildCode])

  return null
})
