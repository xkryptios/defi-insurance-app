/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers, parseEther } from 'ethers';

export class EthPolicyContract {
  private provider: ethers.BrowserProvider;
  private contract: ethers.Contract;
  private abi: any;
  public address: string;

  public constructor(address: string, data: any) {
    this.provider = new ethers.BrowserProvider(window.ethereum);
    this.address = address;
    this.abi = data['abi'];
    this.contract = new ethers.Contract(address, data['abi'], this.provider);
  }
  public async calculatePremium(coverAmount: number, duration: number) {
    const value = parseEther(coverAmount.toString());

    return await this.contract.calculatePremium(value, duration);
  }
  public async getCapacity() {
    return await this.contract.capacity();
  }
  public async purchasePolicy(coverAmount: number, duration: number) {
    const premium = await this.calculatePremium(coverAmount, duration);

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
  public async getUserPolicies() {
    const result = await this.getNumPolicies();
    console.log(result);
  }
  public async getNumPolicies() {
    return await this.contract.getNumPolicies;
  }
}
