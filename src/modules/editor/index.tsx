import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import MonacoEditor, { OnMount } from '@monaco-editor/react'
import MonacoJSXHighlighter from 'monaco-jsx-highlighter'
import prettier from 'prettier'
import balelParser from 'prettier/parser-babel'
import { useCallback, useRef } from 'react'
import { useSetRecoilState } from 'recoil'
import { initialCode } from '../../constants'
import { codeState } from '../../store/bundler'
import { active4d } from './themes/active4d'

export const Editor = () => {
  const setCode = useSetRecoilState(codeState)
  const editorRef = useRef<any>()

  const onFormatClick = useCallback(() => {
    const unformatedCode = editorRef.current.getModel().getValue()

    const formatedCode = prettier.format(unformatedCode, {
      parser: 'babel',
      plugins: [balelParser],
      singleQuote: true,
    })

    editorRef.current.setValue(formatedCode)
  }, [])

  const onEditorMount: OnMount = useCallback(async (editor, monaco) => {
    editorRef.current = editor

    monaco.editor.defineTheme('active4d', active4d)

    monaco.editor.setTheme('active4d')

    const monacoJSXHighlighter = new MonacoJSXHighlighter(
      monaco,
      parse,
      traverse,
      editor
    )

    monacoJSXHighlighter.highlightOnDidChangeModelContent()
  }, [])

  return (
    <div className='editor'>
      <button
        className='button button-format is-primary is-small'
        onClick={onFormatClick}
      >
        format
      </button>
      <MonacoEditor
        onMount={onEditorMount}
        defaultValue={initialCode}
        defaultLanguage='javascript'
        onChange={value => setCode(value ?? '')}
        options={{
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          minimap: { enabled: false },
        }}
      />
    </div>
  )
}
