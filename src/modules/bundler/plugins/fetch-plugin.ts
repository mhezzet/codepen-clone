import axios from 'axios'
import * as esbuild from 'esbuild-wasm'
import localforage from 'localforage'

const fileCache = localforage.createInstance({
  name: 'importsCache',
})

export const fetchPlugin = (code: string) => ({
  name: 'fetch-plugin',
  setup(build: esbuild.PluginBuild) {
    build.onLoad({ filter: /(^index\.js$)/ }, () => ({
      loader: 'jsx',
      contents: code,
    }))

    build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
      const cachedFile = await fileCache.getItem<esbuild.OnLoadResult>(
        args.path
      )

      if (cachedFile) return cachedFile
    })

    build.onLoad({ filter: /.css$/ }, async (args: esbuild.OnLoadArgs) => {
      const { data, request } = await axios.get(args.path)

      const escapedCss = data
        .replace(/\n/g, '')
        .replace(/"/g, '\\"')
        .replace(/'/g, "\\'")

      const contents = `
        const style = document.createElement('style')
        style.innerText = '${escapedCss}'
        document.head.appendChild(style)
      `

      const resolve: esbuild.OnLoadResult = {
        loader: 'jsx',
        contents,
        resolveDir: new URL('./', request.responseURL).pathname,
      }

      fileCache.setItem(args.path, resolve)

      return resolve
    })

    build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
      const { data, request } = await axios.get(args.path)

      const resolve: esbuild.OnLoadResult = {
        loader: 'jsx',
        contents: data,
        resolveDir: new URL('./', request.responseURL).pathname,
      }

      fileCache.setItem(args.path, resolve)

      return resolve
    })
  },
})
