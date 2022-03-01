import { Bundler } from './modules/bundler'
import { Editor } from './modules/editor'
import { Preview } from './modules/preview'

export const App = () => {
  return (
    <div>
      <Bundler />
      <Editor />
      <Preview />
    </div>
  )
}
