import { policyList } from '../ContractClients';
import Card from './Card';
export default function ListPolicy() {
  return (
    <section className=" w-full bg-blue-200">
      <div className="max-w-screen-lg mx-auto">
        <h1 className=" text-6xl py-10">Buy Policy</h1>
        <p className="py-5">
          Choose the type of policy you want and get a quote.
        </p>
        <form className="py-5">
          {/* <label className="sr-only">Search</label> */}
          <div className="relative w-1/2 flex justify">
            <input
              type="text"
              id="simple-search"
              className=" text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-2 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search policies"
              required
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
                  fill-rule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </div>
        </form>
        <div className="grid grid-cols-3">
          {policyList.map((policy) => {
            return <Card key={policy.policyName} policy={policy}></Card>;
          })}
        </div>
      </div>
    </section>
  );
}
