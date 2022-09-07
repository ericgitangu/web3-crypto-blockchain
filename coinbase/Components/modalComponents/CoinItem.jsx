import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSDK } from '@thirdweb-dev/react'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '../../lib/sanity'
import { FaCheck } from 'react-icons/fa'

const CoinItem = ({
    token,
    sender,
    setAction,
    selectedToken,
    setSelectedToken
  }) => {
    const [balance, setBalance] = useState('Fetching...')
    const [imageUrl, setImageUrl] = useState(null)
    const [builder] = useState(imageUrlBuilder(client))
    const sdk = useSDK()

    useEffect(() => {
        const getBalance = async () => {
            const contracts = await sdk.getContractList(sender)
            contracts.map(contract => {
                const tkn = sdk.getToken(contract.address)
                tkn.balanceOf(contract.address).then(balance => {
                    if(balance.symbol === token.symbol) {
                        setBalance(balance.displayValue)
                    }
                }).catch(err => {
                    console.warn(err)
                })
            })
        }
    
        const getImgUrl = async () => {
          const imgUrl = builder.image(token.logo.asset._ref).url()
          setImageUrl(imgUrl)
        }
    
        getImgUrl()
        getBalance()
      }, [])
  return (
    <Wrapper
      style={{
        backgroundColor: selectedToken?.name === token.name && '#141519',
      }}
      onClick={() => {
        setSelectedToken(token)
        setAction('send')
      }}
    >
      <Main>
        <Icon>
          <img src={imageUrl} alt='' />
        </Icon>
        <NameDetails>
          <Name>{token.name}</Name>
          <Symbol>{token.symbol}</Symbol>
        </NameDetails>
      </Main>
      <Balance>
        {balance} {token.symbol}
      </Balance>
      <IsSelected>
        {Boolean(selectedToken?.contractAddress === token.contractAddress) && (
          <FaCheck />
        )}
      </IsSelected>
    </Wrapper>
  )
}

export default CoinItem

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0.5rem;
  border-radius: 0.5rem;
  margin-bottom: 0.3rem;
  &:hover {
    background-color: #0e0f14;
  }
`

const Main = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`

const Icon = styled.div`
  margin-right: 1rem;
  height: 1.8rem;
  width: 1.8rem;
  border-radius: 50%;
  overflow: hidden;
  display: grid;
  place-items: center;
  & > img {
    /* margin: -0.5rem 1rem; */
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`

const NameDetails = styled.div``

const Name = styled.div`
  font-size: 1.1rem;
  margin-bottom: 0.2rem;
`

const Symbol = styled.div`
  color: #888f9b;
  font-size: 0.8rem;
`

const Balance = styled.div``

const IsSelected = styled.div`
  margin-left: 0.5rem;
  color: #3773f5;
`