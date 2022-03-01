import { useSetRecoilState } from 'recoil'
import { codeState } from '../../store/bundler'

export const Editor = () => {
  const setCode = useSetRecoilState(codeState)

  return <textarea onChange={e => setCode(e.target.value)} />
}
