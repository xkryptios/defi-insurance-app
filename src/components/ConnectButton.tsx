import { useMetaMask } from '../hooks/useMetamask.tsx';
import { formatAddress } from '../utils';

export default function ConnectButton() {
  const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask();

  const defaultClassName =
    'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800';

  return (
    <>
      {!hasProvider && (
        <a
          className={defaultClassName}
          href="https://metamask.io"
          target="_blank"
        >
          Install MetaMask
        </a>
      )}
      {window.ethereum?.isMetaMask && wallet.accounts.length < 1 && (
        <button
          className={defaultClassName}
          disabled={isConnecting}
          onClick={connectMetaMask}
        >
          Connect MetaMask
        </button>
      )}
      {hasProvider && wallet.accounts.length > 0 && (
        <a
          className={`text_link tooltip-bottom ${defaultClassName}`}
          href={`https://etherscan.io/address/${wallet}`}
          target="_blank"
          data-tooltip="Open in Block Explorer"
        >
          {formatAddress(wallet.accounts[0])}
        </a>
      )}
    </>
  );
}
