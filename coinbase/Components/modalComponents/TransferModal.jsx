import React, { useState } from 'react'
import styled from 'styled-components'
import Transfer from './Transfer'
import CoinSelector from './CoinSelector'
import Receive from './Receive'

const TransferModal = ({ sanityTokens, walletAddress }) => {
  const [action, setAction] = useState('send')
  const [selectedToken, setSelectedToken] = useState(sanityTokens[0])
  const [loadingInProgress, setLoading] = useState(true);

  const selectedStyle = {
    color: '#3773f5',
  }

  const unselectedStyle = {
    border: '1px solid #282b2f',
  }

  const renderLogic = () => {
    if (action === 'send') {
      return (
        <Transfer
          setAction={setAction}
          sanityTokens={sanityTokens}
          selectedToken={selectedToken}
          walletAddress={walletAddress}
        />
      )
    } else if (action === 'receive') {
      return (
        <Receive
          setAction={setAction}
          selectedToken={selectedToken}
          walletAddress={walletAddress}
        />
      )
    } else if (action === 'select') {
      return (
        <CoinSelector
          setAction={setAction}
          selectedToken={selectedToken}
          setSelectedToken={setSelectedToken}
          sanityTokens={sanityTokens}
          walletAddress={walletAddress}
        />
      )
    } else if (action === 'transferring') {
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.5rem',
          }}
        >
          <ClipLoader color={'green'} loading={loadingInProgress} size={150} />
          Transferring
        </div>
      )
    } else if (action === 'transferred') {
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '2rem',
            fontWeight: '600',
            color: '#27ad75',
          }}
        >
          Transfer Successful...
        </div>
      )
    }
  }

  return (
    <Wrapper>
      <Selector>
        <Option
          style={action === 'send' ? selectedStyle : unselectedStyle}
          onClick={() => setAction('send')}
        >
          <p>Send</p>
        </Option>
        <Option
          style={action === 'receive' ? selectedStyle : unselectedStyle}
          onClick={() => setAction('receive')}
        >
          <p>Receive</p>
        </Option>
      </Selector>
      <ModalMain>{renderLogic()}</ModalMain>
    </Wrapper>
  )
}

export default TransferModal

const Wrapper = styled.div`
  height: 35rem;
  width: 27rem;
  color: white;
  border: 1px solid #282b2f;
  display: flex;
  flex-direction: column;
`
const Selector = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 5rem;
`

const Option = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
  font-size: 1.2rem;
  font-weight: 600;

  &:hover {
    cursor: pointer;
    background-color: #111214;
  }
`

const ModalMain = styled.div`
  padding: 1rem;
  flex: 1;
`