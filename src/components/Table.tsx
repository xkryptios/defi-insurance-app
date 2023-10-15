import { wallet } from '../hooks/useMetamask';
const entries = [1, 2, 3, 4];

export default function Table() {
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
          {entries.map(() => {
            return <TableRow />;
          })}
        </tbody>
      </table>
    </div>
  );
}

function TableRow() {
  return (
    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        Apple MacBook Pro 17"!!
      </th>
      <td className="px-6 py-10">Silver</td>
      <td className="px-6 py-4">Laptop</td>
      <td className="px-6 py-4">Laptop</td>
      <td className="px-6 py-4">$2999</td>
      <td className="px-6 py-4">$2999</td>
      <td className="px-6 py-4">
        <button
          type="button"
          className="font-medium text-white bg-blue-600 p-2 rounded-lg disabled:bg-slate-500 disabled:text-black hover:bg-blue-800"
        >
          Claim
        </button>
      </td>
    </tr>
  );
}
