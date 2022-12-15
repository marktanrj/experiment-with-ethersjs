import { alchemy } from './provider/provider';

const DfiAddress = '0x8fc8f8269ebca376d046ce292dc7eac40c8d358a';

async function main() {
  const provider = await alchemy.config.getProvider();

  const blockNumber = await provider.getBlockNumber();
  const logs = await provider.getLogs({ address: DfiAddress, fromBlock: blockNumber - 10000, toBlock: blockNumber });
  console.log(logs)
}

main().catch(console.log);
