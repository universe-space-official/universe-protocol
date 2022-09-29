import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

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

    const graphs = [APIURL_XDAI, APIURL_ETH, APIURL_POLYGON, APIURL_BSC, APIURL_BOBA, APIURL_AVALANCHE, APIURL_RINKEBY, APIURL_GOERLI, APIURL_MUMBAI];

    let nftList = [];

    for (let i = 0; i < graphs.length; i++) {
      let client = new ApolloClient({
        uri: graphs[i],
        cache: new InMemoryCache()
      });

      let tokensQuery = `
          query {
            accounts(where: {id: "${address.toLowerCase()}"}) {
              id
              ERC721tokens {
                id,
                uri
              }
              ERC1155balances{
                id
                value
                token {
                  id
                  uri
                }
              }
            }
          }
      `;
      // No Support for ERC1155 boba yet
      if (graphs[i] === "APIURL_BOBA") {
        tokensQuery = `
            query {
              accounts(where: {id: "${address.toLowerCase()}"}) {
                id
                ERC721tokens {
                  id,
                  uri
                }
              }
            }
        `;
      }

      let response = await client.query({
        query: gql(tokensQuery)
      });
      nftList.push(response);
    }

    return nftList;
  }

}
