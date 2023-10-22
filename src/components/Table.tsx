import { useState } from 'react';
import { useMetaMask } from '../hooks/useMetaMask.tsx';

import { PolicyData, policyList } from '../ContractClients';
const entries = [1, 2, 3, 4];

export default function Table() {
  const { wallet } = useMetaMask();
  const [policyData, setPolicyData] = useState<PolicyData[]>([]);

  const getPolicyData = async () => {
    if (wallet.accounts.length == 0) return;
    const testContract = policyList[0].contract;
    const result = await testContract.policies(wallet.accounts[0], 0);
    result.policyName = policyList[0].policyName;
    setPolicyData((prev) => prev.concat([result]));
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <button type="button" className="p-5 bg-white" onClick={getPolicyData}>
        test
      </button>
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
    </div>
  );
}

type tRowProp = {
  policyData: PolicyData;
};
function TableRow({ policyData }: tRowProp) {
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
          disabled={policyData.startDate != 'ACTIVE'}
          className="font-medium text-white bg-blue-600 p-2 rounded-lg disabled:bg-slate-500 disabled:text-black hover:bg-blue-800"
        >
          Claim
        </button>
      </td>
    </tr>
  );
}
