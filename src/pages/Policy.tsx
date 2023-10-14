import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import * as fs from 'fs';
import contracts from '../data/contracts.json';
import { useEffect, useState } from 'react';

const getABI = async () => {
  const data = await fs.promises.readFile(
    contracts.EthereumInsurance.ABI_FILE_PATH,
    'utf8'
  );
  const abi = JSON.parse(data)['abi'];
  return abi;
};

export default function Policy() {
  const { policyId } = useParams();
  const [ethPrice, setEthPrice] = useState('');

  useEffect(() => {
    const getEthPrice = async () => {
      const abi = await getABI();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(policyId!, abi, provider);
      const ethPrice = await contract.getEthPrice();
      console.log(ethPrice);
      setEthPrice(ethPrice);
    };
    getEthPrice();
  });

  return (
    <div>
      hello
      <div>{ethPrice}</div>
    </div>
  );
}
