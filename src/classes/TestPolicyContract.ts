/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers, formatEther, parseEther } from 'ethers';
import { PolicyData, epochToDate, getStatus } from '../ContractClients';
export class TestPolicyContract {
  public policyName: string;
  private provider: ethers.BrowserProvider;
  private contract: ethers.Contract;
  private abi: any;
  public address: string;

  public constructor(address: string, data: any, name: string) {
    this.policyName = name;
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
      parseEther(coverAmount.toString()),
      duration,
      { value: premium }
    );
    console.log('purchase processed');
    await tx;
    console.log('test');
  }
  public async claim() {
    console.log('here');
    const signer = await this.provider.getSigner();
    const connectedContract = new ethers.Contract(
      this.address,
      this.abi,
      signer
    );
    await connectedContract.claim();
    console.log('claim processed');
  }
  public async getUserPolicies(userAddress: string) {
    const num = await this.getNumPolicies(userAddress);
    const policyDataList: PolicyData[] = [];
    for (let i = 0; i < Number(num); i++) {
      const data = await this.getPolicy(userAddress, i);
      policyDataList.push(data);
    }
    return policyDataList;
  }
  private async getNumPolicies(userAddress: string) {
    return await this.contract.numPolicies(userAddress);
  }
  private async getPolicy(userAddress: string, id: number) {
    const res = await this.contract.policies(userAddress, id);
    const data: PolicyData = {
      policyName: this.policyName,
      premium: formatEther(res[0]),
      coverAmount: formatEther(res[1]),
      startDate: epochToDate(Number(res[2])),
      endDate: epochToDate(Number(res[3])),
      status: getStatus(Boolean(res[4]), Number(res[3])),
      contract: this,
    };
    return data;
  }
}
