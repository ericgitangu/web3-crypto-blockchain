import React, { useState, useEffect} from 'react'
import styled from 'styled-components'
import Header from '../Components/Header'
import Main from '../Components/Main'
import Sidebar from '../Components/Sidebar'
import { ThirdwebSDK } from '@thirdweb-dev/sdk'

const Dashboard = ({address}) => {
  const [twTokens, setTwTokens] = useState([])
  const [sanityTokens, setSanityTokens] = useState([])

  const getCoins = async () => {
      try {
        const coins = await fetch(
          'https://kgkpeezt.api.sanity.io/v1/data/query/production?query=*%5B_type%20%3D%3D%20%22coins%22%5D%20%7B%0A%20%20name%2C%0A%20%20usdPrice%2C%0A%20%20contractAddress%2C%0A%20%20symbol%2C%0A%20%20logo%0A%7D',
        )
        return await coins.json()
      } catch (error) {
        console.error(error)
      }
    }
  useEffect(() => {
    getCoins().then(tokens => {
        setSanityTokens(tokens.result)
        const sdk = ThirdwebSDK.fromPrivateKey(
            `${process.env.NEXT_PUBLIC_METAMASK_KEY}`,
            'mumbai',
        )
        tokens.result.map(tokenItem => {
            const currentToken = sdk.getToken(tokenItem.contractAddress)
            setTwTokens(prevState => [...prevState, currentToken])
        })
    }).catch(err => {
        console.log(err)
    })
  }, [])

  return (
    <Wrapper>
        <Sidebar/>
        <MainContainer>
            <Header
                twTokens={twTokens}
                sanityTokens={sanityTokens}
                walletAddress={address}
            />
            <Main
                sanityTokens={sanityTokens}
                walletAddress={address}
            />
        </MainContainer>
    </Wrapper>
  )
}

export default Dashboard

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #0a0b0d;
  color: white;
`

const MainContainer = styled.div`
  flex: 1;
`