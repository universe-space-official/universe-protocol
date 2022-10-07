import { request, gql } from 'graphql-request'


const APIURL_XDAI = "https://api.thegraph.com/subgraphs/name/leon-do/xdai-erc721-erc1155";
const APIURL_ETH = "https://api.thegraph.com/subgraphs/name/ryry79261/mainnet-erc721-erc1155";
const APIURL_POLYGON = "https://api.thegraph.com/subgraphs/name/ryry79261/polygon-erc721-erc1155";
const APIURL_BSC = "https://api.thegraph.com/subgraphs/name/leon-do/bsc-erc721-erc1155";
const APIURL_BOBA = "https://api.thegraph.com/subgraphs/name/quantumlyy/eip721-subgraph-boba";
const APIURL_AVALANCHE = "https://api.thegraph.com/subgraphs/name/leon-do/avalanche-erc721-erc1155";

const APIURL_RINKEBY = "https://api.thegraph.com/subgraphs/name/leon-do/rinkeby-erc721-erc1155";
const APIURL_GOERLI = "https://api.thegraph.com/subgraphs/name/ryry79261/goerli-erc721-erc1155";
const APIURL_MUMBAI = "https://api.thegraph.com/subgraphs/name/leon-do/mumbai-erc721-erc1155"


export class NftService {
  constructor() { }

  async getNftsInAddress(address: string): Promise<any> {

    const graphs = [APIURL_XDAI, APIURL_ETH, APIURL_POLYGON, APIURL_BSC]// APIURL_BOBA, APIURL_AVALANCHE, APIURL_RINKEBY, APIURL_GOERLI, APIURL_MUMBAI];
    const chainsIds = [100,1,137,56]
    let nftList: any[] = [];

    for (let i = 0; i < graphs.length; i++) {


      let tokensQuery = gql`
        {
            accounts(where: {id: "${address.toLowerCase()}"}) {
              id
              ERC721tokens {
                id,
                uri
                identifier
              }
              ERC1155balances{
                id
                value
                token {
                  id
                  uri
                  identifier
                }
              }
            }
          }
           `

      // No Support for ERC1155 boba yet
      if (graphs[i] === APIURL_BOBA) {
        tokensQuery = gql`
            {
              accounts(where: {id: "${address.toLowerCase()}") {
                id
                ERC721tokens {
                  id,
                  uri
                  identifier
                }
              }
            }
        `
      }
      let data = await request(graphs[i], tokensQuery);
      if(!data.accounts[0]){
        continue
      }
      data.accounts[0].ERC721tokens = data.accounts[0].ERC721tokens.map(nft => {
        nft.chainId = chainsIds[i];
        return(nft)
      });
      if(data.accounts[0].ERC1155balances){
        data.accounts[0].ERC1155balances = data.accounts[0].ERC1155balances.map(nft => {
          nft.chainId = chainsIds[i];
          return(nft)
        });
      }
      nftList.push(data)
    }
    return nftList;
  }

}
