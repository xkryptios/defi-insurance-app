import { PolicyDetails } from '../App';
import { Link } from 'react-router-dom';

interface Props {
  policyDetails: PolicyDetails;
}

export default function Card({ policyDetails }: Props) {
  return (
    <Link
      to={`policy/${policyDetails.policyId}`}
      className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {policyDetails.policyName}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {policyDetails.capacity}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {policyDetails.duration}
      </p>
    </Link>
  );
}
