import detectEthereumProvider from '@metamask/detect-provider';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { formatBalance } from './utils';
// import { ethers } from 'ethers';

import { useState, useEffect } from 'react';
import Nav from './components/Nav';
import Card from './components/Card';

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}
const tempPolicy = {
  policyId: 'idjfopwqmc9r0mcru402cnio',
  policyName: 'temp name',
  capacity: 100000000,
  duration: 10,
};
export type PolicyDetails = {
  policyId: string;
  policyName: string;
  capacity: number;
  duration: number;
};

type Wallet = {
  accounts: string[];
  balance: string;
  chainId: string;
};

export default function App() {
  {/* prettier-ignore */}
  const disconnectedWallet: Wallet = { accounts: [], balance: '', chainId: '' };
  const [wallet, setWallet] = useState<Wallet>(disconnectedWallet);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [hasProvider, setHasProvider] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const getProvider = async () => {
    // Checks if provider exist, if yes, retrieve accounts
    const provider = await detectEthereumProvider({ silent: true });
    setHasProvider(Boolean(provider));

    if (hasProvider) {
      const accounts = await window.ethereum!.request({
        method: 'eth_accounts',
      });
      refreshAccounts(accounts);
      window.ethereum?.on('accountsChanged', refreshAccounts);
      window.ethereum?.on('chainChanged', refreshChain);
    }
  };
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const refreshAccounts = (accounts: any) => {
    if (accounts.length > 0) {
      updateWallet(accounts);
    } else {
      setWallet(disconnectedWallet);
    }
  };

  const refreshChain = (chainId: any) => {
    setWallet((wallet) => ({ ...wallet, chainId }));
  };

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const updateWallet = async (accounts: any) => {
    // assume accounts ALWAYS exist
    // retrive balance and chainID given list of accounts
    const rawBalance = await window.ethereum!.request({
      method: 'eth_getBalance',
      params: [accounts[0], 'latest'],
    });
    //type assertion for balance and chainId
    const balance = formatBalance(rawBalance as string);
    const chainId = (await window.ethereum!.request({
      method: 'eth_chainId',
    })) as string;
    setWallet({ accounts, balance, chainId });
  };

  const handleConnect = async () => {
    if (hasProvider) {
      setIsConnecting(true);
      window
        .ethereum!.request({ method: 'eth_accounts' })
        .then((accounts) => {
          setError(false);
          updateWallet(accounts);
        })
        .catch((err: Error) => {
          setError(true);
          setErrorMessage(err.message);
          console.log(error, errorMessage);
        });
      setIsConnecting(false);
    } else {
      alert('Metamask not found');
    }
  };

  useEffect(() => {
    getProvider();
    return () => {
      window.ethereum?.removeListener('accountsChanged', refreshAccounts);
      window.ethereum?.removeListener('chainChanged', refreshChain);
    };
  });

  const disableConnect = Boolean(wallet) && isConnecting;
  return (
    <div>
      <Nav></Nav>
      <button
        className=" bg-slate-400 p-5 rounded-lg"
        disabled={disableConnect}
        onClick={handleConnect}
      >
        Connect
      </button>
      <h1 className="text-s">hell!o</h1>
      {wallet.accounts.length != 0 && (
        <div>
          <div>{`Connected chain: ${wallet.chainId}`}</div>
          <div>{`Connected account: ${wallet.accounts[0]}`}</div>
          <div>{`Balance!!: ${wallet.balance}`}</div>
        </div>
      )}
      <br></br>
      <section className=" bg-green-100 grid grid-cols-1 sm:grid-cols-3 place-items-center">
        <Card policyDetails={tempPolicy} />
        <Card policyDetails={tempPolicy} />
        <Card policyDetails={tempPolicy} />
        <Card policyDetails={tempPolicy} />
        <Card policyDetails={tempPolicy} />
      </section>
    </div>
  );
}
