import { alchemy, ethers } from "./provider/provider";
import ERC20Abi from './abi/ERC20Abi.json';

const DfiAddress = '0x8fc8f8269ebca376d046ce292dc7eac40c8d358a';

// see supported events for ERC20 https://ethereum.org/en/developers/docs/standards/tokens/erc-20/
// see DFI events at https://etherscan.io/address/0x8fc8f8269ebca376d046ce292dc7eac40c8d358a
async function main() {
  const provider = await alchemy.config.getProvider();

  const latestBlockNumber = await provider.getBlockNumber();
  const fromBlockNumber = latestBlockNumber - 10000;
  console.log({ fromBlockNumber, latestBlockNumber })

  const contract = new ethers.Contract(DfiAddress, ERC20Abi, provider);
  const events = await contract.queryFilter(contract.filters.Transfer(), fromBlockNumber, latestBlockNumber);
  console.log({ events })
  const approval = await contract.queryFilter(contract.filters.Approval(), fromBlockNumber, latestBlockNumber);
  console.log({ approval })

  // find out address who initiated transfer
  // @ts-ignore
  const from = events[0].args.from; 
  console.log(from)
}

main().catch(console.log);