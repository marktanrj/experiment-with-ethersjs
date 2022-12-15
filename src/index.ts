import { ethers, alchemy } from './provider/provider';

async function main() {
  const provider = await alchemy.config.getProvider();

  // get blockchain
  const blockNumber = await provider.getBlockNumber();
  console.log({ blockNumber })

  // get balance
  const randomUserAddress = '0x561b56c957799Af32f0449115CFB85Fc6013B15C'
  const bal = await provider.getBalance(randomUserAddress);
  const amt = ethers.utils.formatEther(bal)
  console.log(amt);

  // alchemy specific function, not in ethers
  // get metadata
  const metadata = await alchemy.core.getTokenMetadata('0xabe580e7ee158da464b51ee1a83ac0289622e6be');
  console.log(metadata);
}

main().catch(console.log);
