import { useMetaMask } from './hooks/useMetamask';
import Nav from './components/Nav';
// import Card from './components/Card';
import { formatChainAsNum } from './utils';

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

  return (
    <div className=" mt-20">
      <Nav></Nav>
      <div>hello</div>
      {wallet.accounts.length > 0 && (
        <>
          <div>Wallet Accounts: {wallet.accounts[0]}</div>
          <div>Wallet Balance: {wallet.balance}</div>
          <div>Hex ChainId: {wallet.chainId}</div>
          <div>Numeric ChainId: {formatChainAsNum(wallet.chainId)}</div>
        </>
      )}
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
