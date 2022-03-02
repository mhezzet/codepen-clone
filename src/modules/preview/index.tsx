import { useEffect, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import { initialHTML } from '../../constants'
import { bundledCodeState } from '../../store/bundler'

export const Preview = () => {
  const bundledCode = useRecoilValue(bundledCodeState)
  const previewRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (previewRef.current?.srcdoc) previewRef.current.srcdoc = initialHTML
    setTimeout(() => {
      previewRef.current?.contentWindow?.postMessage(bundledCode, '*')
    }, 50)
  }, [bundledCode])

  return (
    <iframe
      className='preview'
      ref={previewRef}
      sandbox='allow-scripts'
      srcDoc={initialHTML}
      title='preview'
    />
  )
}
