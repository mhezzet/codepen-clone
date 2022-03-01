import * as esbuild from 'esbuild-wasm'
import React, { memo, useCallback, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { isEsbuildInitState } from '../store/bundler'
import { fetchPlugin } from './plugins/fetch-plugin'
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin'

type Props = {
  code: string
  onBuild: Function
}

export const Bundler: React.FC<Props> = memo(({ code, onBuild }) => {
  const [isEsbuildInit, setIsEsbuildInit] = useRecoilState(isEsbuildInitState)

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
        'process.env.NODE_ENV': 'production',
        global: 'Window',
      },
    })

    console.log('result', result)

    onBuild(result.outputFiles[0].text)
  }, [code, isEsbuildInit, onBuild])

  useEffect(() => {
    buildCode()
  }, [buildCode])

  return null
})
