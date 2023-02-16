import { alchemy, ethers } from './provider/provider';
import { UniswapV2ERC20Abi, UniswapV2PairAbi, UniswapV3PoolAbi, WETHAbi } from './abi';

// similar to https://openchain.xyz/signatures

// db to map signatures to their respective event ABI
const db: Record<string, any> = {};

function processContractAbiAndStoreSignatures(contractAbi: Array<any>) {
  const functionAbis = contractAbi.filter(e => e.type === 'event');
  functionAbis.forEach(e => {
    // eg. Approval(address,address,uint256)
    const text = e.name + '(' + e.inputs.map((i: { type: any; }) => i.type).join(',') + ')';
    const signature = ethers.utils.id(text);
    if (!db[signature]) {
      db[signature] = e;
    }
  })
}

async function main() {
  const provider = await alchemy.config.getProvider();
  
  // sample transactions
  const balTxHashWithUniswapV2 = '0x1c81c192373e30e277f4826ba45ebf0b45363ba5d4ce26d3545be3eac38d991e'
  const balTxHashWithUniswapV3 = '0x0a547794108bb97490f374d331055989d917d5e28ac20fcd14b7d6dcb5ef893e';
  const balTxHashWithSushi = '0x733352010ec473dd53e61997debba330488ea7c363cd817cf17da97701fbb400'; // last log no contract abi

  // 1) process contract ABIs and store individual event signatures + ABI in db
  processContractAbiAndStoreSignatures(UniswapV2PairAbi);
  processContractAbiAndStoreSignatures(UniswapV2ERC20Abi);
  processContractAbiAndStoreSignatures(UniswapV3PoolAbi);
  processContractAbiAndStoreSignatures(WETHAbi);

  // 2) get raw logs
  const txReceipt = await provider.getTransactionReceipt(balTxHashWithSushi);
  const logs = txReceipt.logs;

  // 3) parse logs with custom ABI
  logs.forEach((log) => {
    try {
      const eventAbi = db[log.topics[0]];
      const iface = new ethers.utils.Interface([eventAbi]);
      const parsedLog = iface.parseLog(log);
      console.log(parsedLog.name)
    } catch (err) {
      console.log('error parsing, or no ABI');
    }
  })
}

main().catch(console.log);
