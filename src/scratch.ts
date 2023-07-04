import { ethers, alchemy, ethersProvider } from './provider/provider';
import ERC20Abi from './abi/ERC20.json';
import {utils} from "ethers";
import axios from 'axios';

async function main() {
  const provider = await alchemy.config.getProvider();

  // const provider = new ethers.providers.JsonRpcProvider('http://localhost:8450');

  // // // get blockchain
  // const blockNumber = await provider.getBlockNumber();
  // console.log({ blockNumber })

  // // get balance
  // const randomUserAddress = '0x561b56c957799Af32f0449115CFB85Fc6013B15C'
  // const bal = await provider.getBalance('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');
  // const amt = ethers.utils.formatEther(bal)
  // console.log(amt);

  const inter = new ethers.utils.Interface(ERC20Abi);
  const tx = await provider.getTransaction('0xe3ad90368b7cada9ae05741260a4bfea2b27516208225917d150f4cfcd5b649f');
  const decodedInput = inter.parseTransaction({ data: tx.data, value: tx.value});

  console.log(decodedInput)

  // // alchemy specific function, not in ethers
  // // get metadata
  // const metadata = await alchemy.core.getTokenMetadata('0xabe580e7ee158da464b51ee1a83ac0289622e6be');
  // console.log(metadata);


  // const apiKey = 'ZDQ7NJXFT6CQU2JU29QVUE5STE9XPMGZ2Y';
  // const provider1 = new ethers.providers.EtherscanProvider(11155111, apiKey);

  // const tx = '0x111cae31686c9acbbbf917c6b9a3d3207386ecf15df0788d1ccc0c56b385c4c9'

  // const transaction = await provider1.getTransaction(tx);
  // const receipt = await provider1.getTransactionReceipt(tx);

  // const { hash, blockNumber, from, to, value, gasPrice, gasLimit, maxFeePerGas, maxPriorityFeePerGas, data } =
  //     transaction;
  // const { gasUsed, cumulativeGasUsed, effectiveGasPrice } = receipt;

  // const erc20Interface = new ethers.utils.Interface(ERC20Abi);

  // console.log({ transaction, receipt})

  // console.log(receipt.logs)

  // const tokenTransfers = receipt.logs
  //   .map(log => {
  //     try {
  //       return erc20Interface.parseLog(log);
  //     } catch (e) {
  //       // Log is not a transfer event, ignore it
  //       return null;
  //     }
  //   })
  //   .filter(log => log !== null && log.name === 'Transfer');

  // console.log(tokenTransfers)

  // const response = await axios.get('https://api-sepolia.etherscan.io/api', {
  //   params: {
  //     module: 'account',
  //     action: 'tokentx',
  //     contractaddress: '0x536BcBE548cef2cE493932fEFCeC059Dda4d5579',
  //     address: receipt.to,
  //     page: '1',
  //     offset: '100',
  //     startblock: receipt.blockNumber,
  //     endblock: receipt.blockNumber,
  //     sort: 'asc',
  //     apikey: apiKey
  //   }
  // })

  // console.log(response.data)

  // console.log({
  //   to,
  //   from,
  //   hash,
  //   amount: ethers.BigNumber.from(value).toString(),
  //   gasPrice: ethers.BigNumber.from(gasPrice).toString(),
  //   gasLimit: ethers.BigNumber.from(gasLimit).toString(),
  //   gasUsed: ethers.BigNumber.from(gasUsed).toString(),
  //   symbol: 'ETH',
  //   decimals: 18,
  //   cumulativeGasUsed: ethers.BigNumber.from(cumulativeGasUsed).toString(),
  //   effectiveGasPrice: ethers.BigNumber.from(effectiveGasPrice).toString(),
  //   maxPriorityFeePerGas: ethers.BigNumber.from(maxPriorityFeePerGas).toString(),
  //   maxFeePerGas: ethers.BigNumber.from(maxFeePerGas).toString(),
  // });

  // const contractInterface = new ethers.utils.Interface(ERC20Abi);
  // const decodedInput = contractInterface.parseTransaction({ data, value });
  // console.log(decodedInput);

  // const k = 1
  // const j = 2;

  // console.log(k ?? j)
}

main().catch(console.log);


function findCommonKeys(obj1: any, obj2: any) {
  const keysObj1 = Object.keys(obj1);
  const keysObj2 = Object.keys(obj2);

  // Filter the keys of the first object to keep only those that are also present in the second object
  const commonKeys = keysObj1.filter(key => keysObj2.includes(key));

  return commonKeys;
}