import ConnectButton from './ConnectButton';
import { Link } from 'react-router-dom';
export default function Nav() {
  return (
    <div className="bg-blue-800 w-full z-20">
      {/* shadow-lg border-b border-gray-200 */}
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to={'/'} className="flex items-center">
          {/* <img
            src="/main-logo.svg"
            className="h-8 mr-3 bg-white rounded-sm"
            alt="Flowbite Logo"
          ></img> */}
          <span className="text-white self-center text-2xl font-semibold whitespace-nowrap">
            Insurex
          </span>
        </Link>
        <div className="flex md:order-2">
          <ConnectButton></ConnectButton>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          {/* bg-gray-50 md:bg-white */}
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to={'/'}
                className="block py-2 pl-3 pr-4 text-white rounded hover:text-slate-300"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to={'/records'}
                className="block py-2 pl-3 pr-4 text-white rounded hover:text-slate-300"
              >
                Records
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
