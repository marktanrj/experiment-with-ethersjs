import axios from 'axios';

async function main() {
  const x = await axios.get('https://api.etherscan.io/api', {
    params: {
      module: 'contract',
      action: 'getabi',
      apikey: process.env.ETHERSCAN_KEY,
      address: '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc'
    }
  });
  console.log(x.data.result);
}

main().catch(console.log);
