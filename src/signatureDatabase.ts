import { alchemy, ethers } from './provider/provider';
import { UniswapV2ERC20Abi, UniswapV2PairAbi, UniswapV3PoolAbi, WETHAbi } from './abi';

const db: Record<string, any> = {};

function processContractAbiAndStoreSignatures(abi: Array<any>) {
  const functionAbis = abi.filter(e => e.type === 'event');
  functionAbis.forEach(e => {
    const text = e.name + '(' + e.inputs.map((i: { type: any; }) => i.type).join(',') + ')';
    const signature = ethers.utils.id(text);
    db[signature] = e;
  })
}

async function main() {
  const provider = await alchemy.config.getProvider();
  
  const balTxHashWithUniswapV2 = '0x1c81c192373e30e277f4826ba45ebf0b45363ba5d4ce26d3545be3eac38d991e'
  const balTxHashWithUniswapV3 = '0x0a547794108bb97490f374d331055989d917d5e28ac20fcd14b7d6dcb5ef893e';
  // last log no contract
  const balTxHashWithSushi = '0x733352010ec473dd53e61997debba330488ea7c363cd817cf17da97701fbb400';

  // 1) process contract ABIs and store individual functions signatures + ABI in db
  processContractAbiAndStoreSignatures(UniswapV2PairAbi);
  processContractAbiAndStoreSignatures(UniswapV2ERC20Abi);
  processContractAbiAndStoreSignatures(UniswapV3PoolAbi);
  processContractAbiAndStoreSignatures(WETHAbi);

  // 2) get signatures from raw logs - topic at index 0 is the signature
  const txReceipt = await provider.getTransactionReceipt(balTxHashWithUniswapV2);
  const logs = txReceipt.logs;
  const signatures = [...new Set(logs.map(log => log.topics[0]))];

  // 3) build custom ABI from db that match signatures from transaction
  const customAbi: Array<any> = [];
  signatures.forEach(sig => {
    if (db[sig]) customAbi.push(db[sig]);
  })

  // 4) parse logs with custom ABI
  logs.forEach((log) => {
    try {
      const transferInterface = new ethers.utils.Interface(customAbi);
      const parsedLog = transferInterface.parseLog(log);
      console.log(parsedLog.name)
    } catch (err) {
      console.log('error parsing, or no ABI');
    }
  })
}

main().catch(console.log);
