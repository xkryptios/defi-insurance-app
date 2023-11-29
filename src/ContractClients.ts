/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers, parseEther } from 'ethers';
import eth1000 from './artifacts/contracts/EthInsurance.sol/EthInsurance1000.json' assert { type: 'json' };
import eth2000 from './artifacts/contracts/EthInsurance.sol/EthInsurance2000.json' assert { type: 'json' };
import eth3000 from './artifacts/contracts/EthInsurance.sol/EthInsurance3000.json' assert { type: 'json' };
import weatherInsurance from './artifacts/contracts/WeatherInsuranceContract.sol/WeatherInsurance.json';
import testInsurance from './artifacts/contracts/TestInsurance.sol/TestInsurance.json';
import { EthPolicyContract } from './classes/EthPolicyContract';
import { WeatherPolicyContract } from './classes/WeatherPolicyContract';
import { TestPolicyContract } from './classes/TestPolicyContract';

export type PolicyData = {
  //purchased policy registered
  policyName: string;
  startDate: string;
  endDate: string;
  premium: string;
  coverAmount: string;
  status: 'ACTIVE' | 'CLAIMED' | 'EXPIRED';
  contract: any;
};

export const epochToDate = (epoch: number) => {
  const secs = new Date(epoch * 1000);
  return secs.toLocaleDateString('en-GB');
};

export const getStatus = (claim: boolean, endDate: number) => {
  if (claim) return 'CLAIMED';
  const curDate = new Date();
  const secs = new Date(endDate * 1000);
  if (curDate > secs) return 'EXPIRED';
  return 'ACTIVE';
};

export type Policy = {
  category: string;
  policyName: string;
  logoPath: string;
  address: string;
  duration: number;
  contract: EthPolicyContract | WeatherPolicyContract | TestPolicyContract;
  //
};

export const getAllUserPolicy = async (address: string) => {
  let dataList: PolicyData[] = [];
  dataList = dataList.concat(
    await policyList[0].contract.getUserPolicies(address)
  );
  dataList = dataList.concat(
    await policyList[1].contract.getUserPolicies(address)
  );
  const result = await policyList[2].contract.getUserPolicies(address);
  // console.log(result);
  dataList = dataList.concat(result);
  dataList = dataList.concat(
    await policyList[3].contract.getUserPolicies(address)
  );
  dataList = dataList.concat(
    await policyList[4].contract.getUserPolicies(address)
  );
  dataList = [
    ...dataList.filter(({ status }) => status == 'ACTIVE'),
    ...dataList.filter(({ status }) => status !== 'ACTIVE'),
  ];

  return dataList;
};

export const policyList = [
  {
    id: 0,
    category: 'Eth',
    policyName: 'Ethereum Insurance 1000',
    logoPath: '/ethereum-eth-logo.png',
    description: [
      'How does the protection work and how much will I get?',
      'If the price of ETH drops below USD 1000, you are eligible for a payout in ETH after 24 hours.',
      'After the price drop event you have 7 days to claim the payout. A claim can be issued by clicking the Claim action on the Records section of the application.',
    ],
    address: '0x77f055E6CAF9b7b0BB0aa6384f95ecb324C6D48C',
    duration: 90,
    contract: new EthPolicyContract(
      '0x77f055E6CAF9b7b0BB0aa6384f95ecb324C6D48C',
      eth1000,
      'Ethereum Insurance 1000'
    ),
  },
  {
    id: 1,
    category: 'Eth',
    policyName: 'Ethereum Insurance 2000',
    logoPath: '/ethereum-eth-logo.png',

    description: [
      'How does the protection work and how much will I get?',
      'If the price of ETH drops below USD 2000, you are eligible for a payout in ETH after 24 hours.',
      'After the price drop event you have 7 days to claim the payout. A claim can be issued by clicking the Claim action on the Records section of the application.',
    ],
    address: '0x4Ec135534E39767164eb961A76a6023327974a86',
    duration: 90,
    contract: new EthPolicyContract(
      '0x4Ec135534E39767164eb961A76a6023327974a86',
      eth2000,
      'Ethereum Insurance 2000'
    ),
  },
  {
    id: 2,
    category: 'Eth',
    policyName: 'Ethereum Insurance 3000',
    logoPath: '/ethereum-eth-logo.png',

    description: [
      'How does the protection work and how much will I get?',
      'If the price of ETH drops below USD 3000, you are eligible for a payout in ETH after 24 hours.',
      'After the price drop event you have 7 days to claim the payout. A claim can be issued by clicking the Claim action on the Records section of the application.',
    ],
    address: '0x67d1487F594F4Bd618A80314D37FF4A637b5CfFb',
    duration: 90,
    contract: new EthPolicyContract(
      '0x67d1487F594F4Bd618A80314D37FF4A637b5CfFb',
      eth3000,
      'Ethereum Insurance 3000'
    ),
  },
  {
    id: 3,

    category: 'Weather',
    policyName: 'Weather Insurance',
    logoPath: '/weather-logo.png',

    description: [
      '*Only for farmers*',
      'How does the protection work and how much will I get?',
      'If total precipitation is 0 for 2 consecutive weeks, you are eligible for a payout in ETH after 24hrs.',
      'After the drought drop event you have 7 days to claim the payout. A claim can be issued by clicking the Claim action on the Records section of the application.',
    ],
    address: '0xa9ee2289899996308c048388A6fB060597D3EbE0',
    duration: 90,
    contract: new WeatherPolicyContract(
      '0xa9ee2289899996308c048388A6fB060597D3EbE0',
      weatherInsurance,
      'Weather Insurance'
    ),
  },
  {
    id: 4,
    category: 'Test',
    policyName: 'Test Insurance',
    logoPath: '/test-logo.webp',
    description: [
      'How does the protection work and how much will I get?',
      'There is no checks for claiming of this policy. The cover amount for this polcy is equivalent to its premium.',
      'Note: You can only hold 1 of each policy at a time.',
    ],
    address: '0xaba019984b30f2F06aF6928210603BB634d10050',
    duration: 90,
    contract: new TestPolicyContract(
      '0xaba019984b30f2F06aF6928210603BB634d10050',
      testInsurance,
      'Test Insurance'
    ),
  },
];
