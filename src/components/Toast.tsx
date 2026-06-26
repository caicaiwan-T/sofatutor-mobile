import { useApp } from '../store'

export default function Toast() {
  const { toastMsg, toastShow } = useApp()
  return <div className={'toast' + (toastShow ? ' show' : '')}>{toastMsg}</div>
}
