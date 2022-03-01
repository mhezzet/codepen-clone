import { useState } from 'react'
import { Bundler } from './bundler'

export const App = () => {
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')

  return (
    <div>
      <Bundler code={input} onBuild={setCode} />
      <textarea value={input} onChange={e => setInput(e.target.value)} />

      <pre>{code}</pre>
    </div>
  )
}
