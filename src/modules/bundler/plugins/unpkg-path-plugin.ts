import * as esbuild from 'esbuild-wasm'

export const unpkgPathPlugin = () => ({
  name: 'unpkg-path-plugin',
  setup(build: esbuild.PluginBuild) {
    // handle root entry file of 'index.js'
    build.onResolve(
      { filter: /(^index\.js$)/ },
      (args: esbuild.OnResolveArgs) => ({ path: args.path, namespace: 'a' })
    )

    // handle relative paths in a module
    build.onResolve({ filter: /^\.+\// }, (args: esbuild.OnResolveArgs) => ({
      namespace: 'a',
      path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/')
        .href,
    }))

    // handle main file of a module
    build.onResolve({ filter: /.*/ }, async (args: esbuild.OnResolveArgs) => ({
      namespace: 'a',
      path: `https://unpkg.com/${args.path}`,
    }))
  },
})
