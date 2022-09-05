import '../styles/globals.css'
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react"
const desiredChainId = ChainId.Rinkeby

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={desiredChainId}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  )
}

export default MyApp
