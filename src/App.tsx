import Nav from './components/Nav';
// import Card from './components/Card';
import ListPolicy from './components/ListPolicy';
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
  // const { wallet } = useMetaMask();

  // const contract1 = coverList[0];

  return (
    <div className=" mt-20">
      <Nav></Nav>
      <ListPolicy></ListPolicy>
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
