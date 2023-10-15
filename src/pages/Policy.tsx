/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from 'react-router-dom';
// import { ethers } from 'ethers';
import { useState } from 'react';
import { policyList } from '../ContractClients';
import Nav from '../components/Nav';
import { formatEther } from 'ethers';
import { getErrorMessage } from '../utils';
import { setErrorMessage } from '../hooks/useMetaMask';

export default function Policy() {
  const { policyId } = useParams();
  const [details, setDetails] = useState({
    duration: 0,
    coverAmount: 0,
  });
  const [premium, setPremium] = useState('');
  const [errorInput, setErrorInputs] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState<boolean | null>(null);
  const policy = policyList.find((policy) => policy.address === policyId);
  if (policy === undefined) {
    throw new Error();
  }

  const validInput = () => {
    if (details.duration || details.coverAmount) {
      setErrorInputs(true);
      return true;
    }
    return false;
  };

  return (
    <div className="bg-blue-200 h-screen">
      <Nav></Nav>
      <div className="max-w-screen-lg mx-auto">
        <h1 className=" text-6xl py-10">Buy Policy</h1>
        <h2 className=" text-2xl">{policy && policy.policyName}</h2>
        <section className="flex flex-col">
          <div className="flex h-80">
            <div className=" border-blue-500 border-2 rounded-lg bg-blue-300 w-1/2">
              contract details hre!!{/* contract details */}
            </div>
            <div className="border-blue-500 border-2 rounded-lg bg-blue-300 w-1/2">
              <form>
                <div>
                  <label>{'duration(number of days)'}</label>
                  <input
                    required
                    type="number"
                    onChange={(e) => {
                      setDetails((prev) => ({
                        ...prev,
                        duration: Number(e.target.value),
                      }));
                    }}
                  />
                </div>
                <div>
                  <label>{'Cover Amount'}</label>
                  <input
                    required
                    type="number"
                    onChange={(e) => {
                      setDetails((prev) => ({
                        ...prev,
                        coverAmount: Number(e.target.value),
                      }));
                    }}
                  />
                </div>
                <div className="flex justify-around">
                  <button
                    type="button"
                    className="bg-blue-400 rounded-lg "
                    onClick={async () => {
                      if (validInput()) {
                        const rawPremium =
                          await policy.contract.calculatePremium(
                            details.duration,
                            details.coverAmount
                          );
                        setPremium(formatEther(rawPremium));
                      }
                    }}
                  >
                    Quote
                  </button>
                  <input
                    type="text"
                    disabled
                    className="rounded-lg "
                    value={premium}
                  />
                </div>
              </form>
            </div>
          </div>
          <button
            className="my-10 bg-blue-500 disabled:bg-slate-400"
            onClick={async () => {
              try {
                await policy.contract.purchasePolicy(
                  details.duration,
                  details.coverAmount
                );
              } catch (err: any) {
                // console.log(err);
                // const e = err.toString();
                console.log(getErrorMessage(err.message));
              }
            }}
            disabled={premium == ''}
          >
            Purchase Policy
          </button>
        </section>
      </div>
    </div>
  );
}
