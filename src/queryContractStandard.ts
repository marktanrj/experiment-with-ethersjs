import { alchemy, ethers } from "./provider/provider";

// Not all tokens support ERC165 interface, so this check would not work for ERC20 tokens
import ERC721Abi from './abi/ERC721Abi.json';
import ERC1155Abi from './abi/ERC1155.json';

const BAYCaddress = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D'; //ERC721
const sandboxAssetsAddress = '0xa342f5D851E866E18ff98F351f2c6637f4478dB5'; //ERC1155

const ERC721InterfaceId = '0x80ac58cd';
const ERC1155InterfaceId = '0xd9b67a26';

async function main() {
  const provider = await alchemy.config.getProvider();
  {
    const contract1 = new ethers.Contract(BAYCaddress, ERC721Abi, provider);
    const isERC721 = await contract1.supportsInterface(ERC721InterfaceId)
    const isERC1155 = await contract1.supportsInterface(ERC1155InterfaceId)
    console.log("BAYC", { isERC721, isERC1155 });
  }
  {
    const contract2 = new ethers.Contract(sandboxAssetsAddress, ERC1155Abi, provider);
    const isERC721 = await contract2.supportsInterface(ERC721InterfaceId)
    const isERC1155 = await contract2.supportsInterface(ERC1155InterfaceId)
    console.log("SANDBOX", { isERC721, isERC1155 });
  }
}

main().catch(console.log);