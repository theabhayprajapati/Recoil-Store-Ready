import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { SessionProvider } from "next-auth/react"
function App({
  // @ts-ignore
  Component,
  // @ts-ignore
  pageProps: { session, ...pageProps },
}) {
  return (
    <RecoilRoot>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </RecoilRoot>
  )
}

export default App
