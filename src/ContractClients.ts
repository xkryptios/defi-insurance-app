/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers, parseEther } from 'ethers';
import eth1000 from './artifacts/contracts/EthInsurance.sol/EthInsurance1000.json' assert { type: 'json' };
import eth2000 from './artifacts/contracts/EthInsurance.sol/EthInsurance2000.json' assert { type: 'json' };
import eth3000 from './artifacts/contracts/EthInsurance.sol/EthInsurance3000.json' assert { type: 'json' };

export class Insurance {
  private provider: ethers.BrowserProvider;
  private contract: ethers.Contract;
  private address: string;
  private abi: any;

  public constructor(address: string, data: any) {
    this.provider = new ethers.BrowserProvider(window.ethereum);
    this.address = address;
    this.abi = data['abi'];
    this.contract = new ethers.Contract(address, data['abi'], this.provider);
  }
  public async calculatePremium(duration: number, coverAmount: number) {
    const value = parseEther(coverAmount.toString());

    return await this.contract.calculatePremium(duration, value);
  }
  public async getCapacity() {
    return await this.contract.capacity();
  }
  public async purchasePolicy(duration: number, coverAmount: number) {
    const premium = await this.calculatePremium(duration, coverAmount);

    const signer = await this.provider.getSigner();
    const connectedContract = new ethers.Contract(
      this.address,
      this.abi,
      signer
    );

    const tx = await connectedContract.purchaseInsurance(
      duration,
      parseEther(coverAmount.toString()),
      { value: premium }
    );
    console.log('purchase processed');
    await tx;
  }
  public async claim() {
    return await this.contract.claim();
  }
  public async getEthPrice() {
    return await this.contract.getEthPrice();
  }
  public async getClientPolicy(address: string) {
    return await this.contract.policies(address);
  }
}

export const coverList = [
  {
    category: 'Eth',
    policyName: 'Ethereum Insurance 1000',
    address: '0xAc1E13e507B77FCdc350FfEd17bbb1927a2ecE09',
    data: eth1000,
    handler: new Insurance(
      '0xAc1E13e507B77FCdc350FfEd17bbb1927a2ecE09',
      eth1000
    ),
  },
  {
    category: 'Eth',
    policyName: 'Ethereum Insurance 2000',
    address: '0x054b6331E3BCA51493af59535F7e0Ce7d46D1c4c',
    handler: new Insurance(
      '0x054b6331E3BCA51493af59535F7e0Ce7d46D1c4c',
      eth2000
    ),
  },
  {
    category: 'Eth',
    policyName: 'Ethereum Insurance 3000',
    address: '0xEc4536e106ea8dd538c803FEAB67c9C50924DC72',
    handler: new Insurance(
      '0xEc4536e106ea8dd538c803FEAB67c9C50924DC72',
      eth3000
    ),
  },
  {
    category: 'Weather',
    policyName: 'Weather Insurance',
    address: '0xAc1E13e507B77FCdc350FfEd17bbb1927a2ecE09',
    handler: new Insurance(
      '0xAc1E13e507B77FCdc350FfEd17bbb1927a2ecE09',
      eth1000
    ),
  },
];
