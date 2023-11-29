import { useMemo, useState } from 'react';
import { policyList } from '../ContractClients';
import Card from './Card';
export default function ListPolicy() {
  const [query, setQuery] = useState('');

  //derived parameter
  const filteredPolicies = useMemo(() => {
    return policyList.filter((p) => {
      return p.policyName.toLowerCase().includes(query.toLowerCase());
    });
  }, [query]);

  return (
    <section className="w-full">
      <div className="max-w-screen-xl mx-auto">
        {/* !!rmb to remove bg colour!*/}
        <h1 className=" text-6xl py-10">Buy Policy</h1>
        <p className="py-5">
          Choose the type of policy you want and get a quote.
        </p>

        <div className="py-5">
          {/* <label className="sr-only">Search</label> */}
          {/* pl-2 p-2.5 */}
          <div className="w-1/2 flex justify bg-white rounded-lg focus:border-blue-500 focus:ring-blue-500 ">
            <input
              type="text"
              id="simple-search"
              className=" text-gray-900 text-sm rounded-lg border-transparent w-full "
              placeholder="Search policies"
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            ></input>
            <span
              className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
              id="basic-addon2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {filteredPolicies.map((policy) => {
            return <Card key={policy.policyName} policy={policy}></Card>;
          })}
        </div>
      </div>
    </section>
  );
}
