/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from 'react-router-dom';
// import { ethers } from 'ethers';
import { useState } from 'react';
import { policyList } from '../ContractClients';
import Nav from '../components/Nav';
import { formatEther } from 'ethers';
import { getErrorMessage } from '../utils';
import { useMetaMask } from '../hooks/useMetaMask.tsx';

export default function Policy() {
  const { policyId } = useParams();
  const [details, setDetails] = useState({
    duration: 0,
    coverAmount: 0,
  });
  const [premium, setPremium] = useState('');
  const [errorInput, setErrorInputs] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState<boolean | null>(null);
  const { setErrorMessage } = useMetaMask();
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
    <div className="bg-blue-100 h-screen">
      <Nav></Nav>
      <div className=" max-w-screen-xl mx-auto">
        <h1 className=" text-6xl py-10 px-5">Buy Policy</h1>
        <h2 className=" text-2xl p-5">{policy && policy.policyName}</h2>
        <section className="flex flex-col text-gray-800">
          <div className="flex gap-5 h-80">
            <div className="rounded-lg border-slate-400 border-2 w-2/3">
              <div className="text-center text-black font-bold p-5">
                Terms and Conditions
              </div>
              {policy.description!.map((s, idx) => {
                return (
                  <div key={idx} className="text-normal p-2">
                    {s}
                  </div>
                );
              })}
            </div>
            {/* quotation box */}
            <div className="border-gray-400 border-2 rounded-lg w-1/2 ">
              <div>
                {/* duration field */}
                <div className="flex justify-between items-center m-5 ">
                  <label>{'Duration (Max 90 Days)'}</label>
                  <input
                    type="number"
                    className="remove-arrow rounded-lg"
                    onChange={(e) => {
                      setDetails((prev) => ({
                        ...prev,
                        duration: Number(e.target.value),
                      }));
                    }}
                  />
                </div>
                {/* cover amount field */}
                <div className="flex justify-between m-5 items-center">
                  <label>Cover Amount</label>
                  <input
                    required
                    type="number"
                    className="remove-arrow rounded-lg"
                    onChange={(e) => {
                      setDetails((prev) => ({
                        ...prev,
                        coverAmount: Number(e.target.value),
                      }));
                    }}
                  />
                </div>
                <div className="text-center">
                  * Enter the cover amount and duration of cover*
                </div>
                {/* get quotation field */}
                <div className="flex justify-between m-5 pt-5">
                  <button
                    type="button"
                    className="bg-blue-500 rounded-lg w-1/3 text-white"
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
                    Quote Premium
                  </button>
                  <input
                    type="text"
                    disabled
                    className="rounded-lg "
                    value={premium}
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            className="my-10 bg-blue-500 disabled:bg-slate-400 p-3 rounded-lg"
            onClick={async () => {
              try {
                await policy.contract.purchasePolicy(
                  details.duration,
                  details.coverAmount
                );
              } catch (err: any) {
                const errMsg = getErrorMessage(err.message);
                setErrorMessage(errMsg);
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
