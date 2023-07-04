import { ethers } from './provider/provider';

async function main() {
  const provider = new ethers.providers.JsonRpcProvider('http://localhost:8450');
  const blockNumber = await provider.getBlockNumber();
  console.log({ blockNumber })

  const bal = await provider.getBalance('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');
  const amt = ethers.utils.formatEther(bal)
  console.log(amt);
}

main().catch(console.log);
