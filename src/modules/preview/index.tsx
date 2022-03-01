import { useEffect, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import { bundledCodeState } from '../../store/bundler'

export const Preview = () => {
  const bundledCode = useRecoilValue(bundledCodeState)
  const previewRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    // if (previewRef.current?.srcdoc) previewRef.current.srcdoc = html
    previewRef.current?.contentWindow?.postMessage(bundledCode, '*')
  }, [bundledCode])

  return (
    <iframe
      ref={previewRef}
      sandbox='allow-scripts'
      srcDoc={html}
      title='preview'
    />
  )
}

const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  </head>
  <body>
    <div id="root"></div>
    <script>
      window.addEventListener('message',(event)=>{
        try{
          eval(event.data)
        }catch(error){
          const root = document.querySelector("#root").innerHTML = '<div style="color: red;"><h4>Runtime Error</h4><p>'+ error +'</p></div>'
          console.error(error)
        }
        
      },false)
    </script>
  </body>
  </html>
`
