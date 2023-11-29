import { Link } from 'react-router-dom';
import { Policy } from '../ContractClients';

interface Props {
  policy: Policy;
}

export default function Card({ policy }: Props) {
  return (
    <Link
      to={`policy/${policy.address}`}
      className="max-w-md p-6 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      {/* header for each policy in main page */}
      <div className="flex items-center w-full mb-4 ">
        <img src={policy.logoPath} className="w-10 rounded-lg" />
        <h5 className="text-2xl  font-bold tracking-tight text-gray-900 dark:text-white">
          {policy.policyName}
        </h5>
      </div>
      {/* Chain information */}
      <div className="flex justify-between w-full font-normal text-gray-700 dark:text-gray-400">
        <div>Chain:</div>
        <div>Ethereum</div>
      </div>
      {/* duration information */}
      <div className="flex justify-between w-full font-normal text-gray-700 dark:text-gray-400">
        <div>Max Coverage Duration:</div>
        <div>{policy.duration} Days</div>
      </div>
      {/* capacity information */}
      <div className="flex justify-between w-full font-normal text-gray-700 dark:text-gray-400">
        <div>Capacity:</div>
        <div> ~1000 Eth</div>
      </div>
      <div className="w-1/2 text-center border-blue-500 border-2 rounded-full mt-5">
        GET QUOTE
      </div>
    </Link>
  );
}
