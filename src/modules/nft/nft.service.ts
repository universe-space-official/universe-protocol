import { request, gql } from 'graphql-request';

// const APIURL_XDAI =
//   'https://api.thegraph.com/subgraphs/name/leon-do/xdai-erc721-erc1155';
// const APIURL_BSC =
// 'https://api.thegraph.com/subgraphs/name/leon-do/bsc-erc721-erc1155';
const APIURL_ETH =
  'https://api.thegraph.com/subgraphs/name/ryry79261/mainnet-erc721-erc1155';
const APIURL_POLYGON =
  'https://api.thegraph.com/subgraphs/name/ryry79261/polygon-erc721-erc1155';

const APIURL_BOBA =
  'https://api.thegraph.com/subgraphs/name/quantumlyy/eip721-subgraph-boba';
const APIURL_AVALANCHE =
  'https://api.thegraph.com/subgraphs/name/leon-do/avalanche-erc721-erc1155';

const APIURL_RINKEBY =
  'https://api.thegraph.com/subgraphs/name/leon-do/rinkeby-erc721-erc1155';
const APIURL_GOERLI =
  'https://api.thegraph.com/subgraphs/name/ryry79261/goerli-erc721-erc1155';
const APIURL_MUMBAI =
  'https://api.thegraph.com/subgraphs/name/leon-do/mumbai-erc721-erc1155';

// @TODO: Refactor:
// Move logic to other file
// Make obj that contains URI and chainId
const NFT_API = {
  mainnet: [APIURL_ETH, APIURL_POLYGON],
  testnet: [
    APIURL_BOBA,
    APIURL_AVALANCHE,
    APIURL_RINKEBY,
    APIURL_GOERLI,
    APIURL_MUMBAI,
  ],
};

export class NftService {
  constructor() {}

  async getMetadataInNft(nft, chainId = 1) {
    let metadata = null;
    const nftUri = nft?.uri?.startsWith('ipfs://')
      ? nft.uri?.replace('ipfs://', 'https://ipfs.io/ipfs/')
      : nft?.uri?.startsWith('http://') || nft?.uri?.startsWith('https://')
      ? nft.uri
      : null;
    if (nftUri) {
      try {
        const metadataFetch = await fetch(nftUri);
        // This way we standarize the JSON instead of just receiving it
        metadata = JSON.stringify(await metadataFetch.json());
      } catch (error) {
        console.log({ error });
        metadata = null;
      }
    }
    return { ...nft, chainId, metadata };
  }

  async getNftsInAddress(address: string, mainnet = true) {
    const graphs = NFT_API[mainnet ? 'mainnet' : 'testnet'];
    // @TODO: Testnet is not supported...
    if (!mainnet) {
      return [];
    }
    const nftList = [];
    for (let i = 0; i < graphs.length; i++) {
      let tokensQuery = gql`
        {
          accounts(
            where: { id: "${address.toLowerCase()}" }
          ) {
            id
            ERC721tokens {
              id
              uri
              contract {
                id
              }
              identifier
            }
            ERC1155balances {
              id
              value
              token {
                id
                uri
                contract {
                  id
                }
                identifier
              }
            }
          }
        }
      `;
      // No Support for ERC1155 boba yet
      if (graphs[i] === APIURL_BOBA) {
        // TODO: implement query
      }
      let requestResponse = await request(graphs[i], tokensQuery);
      const responseData = requestResponse?.accounts?.[0];
      if (!responseData?.ERC721tokens) {
        continue;
      }
      const erc721TokensPromises = [];
      for (const nft of responseData.ERC721tokens) {
        // const metadataInNft = await this.getMetadataInNft(nft, 1);
        // erc721Tokens.push(metadataInNft);
        erc721TokensPromises.push(this.getMetadataInNft(nft, 1));
      }
      const erc721Tokens = await Promise.all(erc721TokensPromises);
      nftList.push({ ...responseData, ERC721: erc721Tokens });
    }
    return nftList;
  }

  async getNftsInContract({
    address,
    tokenIds,
    mainnet = true,
    chainId = 1,
  }: {
    address: string;
    tokenIds: string;
    mainnet?: boolean;
    chainId?: number;
  }) {
    const graphs = NFT_API[mainnet ? 'mainnet' : 'testnet'];
    // @TODO: Testnet is not supported...
    if (!mainnet) {
      return [];
    }
    let tokensQuery = gql`
      {
        erc721Tokens(
          where: {
            contract: "${address.toLowerCase()}"
            identifier_in: [${tokenIds}]
          }
        ) {
          id
          uri
          contract {
            id
          }
          identifier
        }
      }
    `;
    let requestResponse = await request(graphs[0], tokensQuery);
    const responseData = requestResponse?.accounts?.[0];
    if (!responseData?.ERC721tokens) {
      return {};
    }
    const erc721Tokens = await responseData.ERC721tokens.map(async nft => {
      return await this.getMetadataInNft(nft, 1);
    });
    return { ...responseData, ERC721: erc721Tokens };
  }
}
