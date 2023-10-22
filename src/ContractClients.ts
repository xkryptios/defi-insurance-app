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
  address: string;
  duration: number;
  contract: TestPolicyContract;
  // EthPolicyContract | WeatherPolicyContract |
};

export const policyList = [
  // {
  //   id: 0,
  //   category: 'Eth',
  //   policyName: 'Ethereum Insurance 1000',
  //   description: [
  //     'How does the protection work and how much will I get?',
  //     'If the price of ETH drops below USD 1000, you are eligible for a payout in ETH after 24 hours.',
  //     'After the price drop event you have 7 days to claim the payout. A claim can be issued by clocking the Claim action on the Records section of the application.',
  //   ],
  //   address: '0x0312c83f4E44625a64CFDaAaD15f1E4470E87b6e',
  //   duration: 90,
  //   contract: new EthPolicyContract(
  //     '0x0312c83f4E44625a64CFDaAaD15f1E4470E87b6e',
  //     eth1000
  //   ),
  // },
  // {
  //   id: 1,
  //   category: 'Eth',
  //   policyName: 'Ethereum Insurance 2000',
  //   description: [
  //     'How does the protection work and how much will I get?',
  //     'If the price of ETH drops below USD 2000, you are eligible for a payout in ETH after 24 hours.',
  //     'After the price drop event you have 7 days to claim the payout. A claim can be issued by clocking the Claim action on the Records section of the application.',
  //   ],
  //   address: '0x054b6331E3BCA51493af59535F7e0Ce7d46D1c4c',
  //   duration: 90,
  //   contract: new EthPolicyContract(
  //     '0x054b6331E3BCA51493af59535F7e0Ce7d46D1c4c',
  //     eth2000
  //   ),
  // },
  // {
  //   id: 2,
  //   category: 'Eth',
  //   policyName: 'Ethereum Insurance 3000',
  //   description: [
  //     'How does the protection work and how much will I get?',
  //     'If the price of ETH drops below USD 3000, you are eligible for a payout in ETH after 24 hours.',
  //     'After the price drop event you have 7 days to claim the payout. A claim can be issued by clocking the Claim action on the Records section of the application.',
  //   ],
  //   address: '0xEc4536e106ea8dd538c803FEAB67c9C50924DC72',
  //   duration: 90,
  //   contract: new EthPolicyContract(
  //     '0xEc4536e106ea8dd538c803FEAB67c9C50924DC72',
  //     eth3000
  //   ),
  // },
  // {
  //   id: 3,

  //   category: 'Weather',
  //   policyName: 'Weather Insurance',
  //   description: [
  //     'How does the protection work and how much will I get?',
  //     'If total precipitation is 0 for 2 consecutive weeks, you are eligible for a payout in ETH after 24hrs.',
  //     'After the drought drop event you have 7 days to claim the payout. A claim can be issued by clocking the Claim action on the Records section of the application.',
  //   ],
  //   address: '0xf52767a8171441403B5be0A975d7D84300D66B87',
  //   duration: 90,
  //   contract: new WeatherPolicyContract(
  //     '0xf52767a8171441403B5be0A975d7D84300D66B87',
  //     weatherInsurance
  //   ),
  // },
  {
    id: 4,
    category: 'Test',
    policyName: 'Test Insurance',
    description: [
      'How does the protection work and how much will I get?',
      'There is no checks for claiming of this policy. The cover amount for this polcy is equivalent to its premium.',
      'Note: You can only hold 1 of each policy at a time.',
    ],
    address: '0x9E717daA7A0F1957594D5043957a4F620326D474',
    duration: 90,
    contract: new TestPolicyContract(
      '0x9E717daA7A0F1957594D5043957a4F620326D474',
      testInsurance
    ),
  },
];
