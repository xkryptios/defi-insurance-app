/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useMetaMask } from '../hooks/useMetaMask.tsx';
import { PolicyData, getAllUserPolicy } from '../ContractClients';
import { getErrorMessage } from '../utils';

export default function Table() {
  const { wallet } = useMetaMask();
  const [isLoading, setIsLoading] = useState(false);
  const [policyData, setPolicyData] = useState<PolicyData[]>([]);

  useEffect(() => {
    const loadPolicies = async () => {
      if (wallet.accounts.length === 0) return;
      setIsLoading(true);
      const policyData = await getAllUserPolicy(wallet.accounts[0]);
      setPolicyData(policyData);
      setIsLoading(false);
    };
    loadPolicies();
  }, [wallet.accounts]);

  if (isLoading) return <div className="text-center">Loading...</div>;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Policy name
            </th>
            <th scope="col" className="px-6 py-3">
              start date
            </th>
            <th scope="col" className="px-6 py-3">
              End date
            </th>
            <th scope="col" className="px-6 py-3">
              Premium Paid
            </th>
            <th scope="col" className="px-6 py-3">
              Cover Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {policyData.map((p, idx) => {
            return <TableRow key={idx} policyData={p} />;
          })}
        </tbody>
      </table>
      <div></div>
    </div>
  );
}

type tRowProp = {
  policyData: PolicyData;
};
function TableRow({ policyData }: tRowProp) {
  const { setErrorMessage, setSuccessMessage } = useMetaMask();
  const onclickHandler = async () => {
    try {
      await policyData.contract.claim();
      setSuccessMessage('You have successfully made a claim!');
      policyData.status = 'CLAIMED';
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (err: any) {
      const errMsg = getErrorMessage(err.message);
      setErrorMessage(errMsg);
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };
  return (
    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {policyData.policyName}
      </th>
      <td className="px-6 py-10">{policyData.startDate}</td>
      <td className="px-6 py-4">{policyData.endDate}</td>
      <td className="px-6 py-4">{policyData.premium}</td>
      <td className="px-6 py-4">{policyData.coverAmount}</td>
      <td className="px-6 py-4">{policyData.status}</td>
      <td className="px-6 py-4">
        <button
          type="button"
          onClick={onclickHandler}
          disabled={policyData.status != 'ACTIVE'}
          className="font-medium text-white bg-blue-600 p-2 rounded-lg disabled:bg-slate-500 disabled:text-black hover:bg-blue-800"
        >
          Claim
        </button>
      </td>
    </tr>
  );
}
