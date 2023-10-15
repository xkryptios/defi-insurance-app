import { useMetaMask } from './hooks/useMetamask';
import Nav from './components/Nav';
// import Card from './components/Card';
import { formatChainAsNum } from './utils';
import { useState } from 'react';
import { coverList } from './ContractClients';
// const tempPolicy = {
//   policyId: 'idjfopwqmc9r0mcru402cnio',
//   policyName: 'temp name',
//   capacity: 100000000,
//   duration: 10,
// };
export type PolicyDetails = {
  policyId: string;
  policyName: string;
  capacity: number;
  duration: number;
};

export default function App() {
  const { wallet } = useMetaMask();

  const contract1 = coverList[0];

  return (
    <div className=" mt-20">
      <Nav></Nav>
      {wallet.accounts.length > 0 && (
        <div>
          <div>Wallet Accounts: {wallet.accounts[0]}</div>
          <div>Wallet Balance: {wallet.balance}</div>
          <div>Hex ChainId: {wallet.chainId}</div>
          <div>Numeric ChainId: {formatChainAsNum(wallet.chainId)}</div>
        </div>
      )}
      <button
        onClick={() => {
          contract1.handler
            .getClientPolicy(wallet.accounts[0])
            .then((price) => {
              console.log(price);
            });
        }}
      >
        get eth price
      </button>
    </div>
  );
}

{
  /* <section className=" bg-green-100 grid grid-cols-1 sm:grid-cols-3 place-items-center">
<Card policyDetails={tempPolicy} />
<Card policyDetails={tempPolicy} />
<Card policyDetails={tempPolicy} />
<Card policyDetails={tempPolicy} />
<Card policyDetails={tempPolicy} />
</section> */
}
