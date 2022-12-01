import { request, gql } from 'graphql-request';
import fetch from 'node-fetch';

const APIURL_ETH =
  'https://api.thegraph.com/subgraphs/name/ryry79261/mainnet-erc721-erc1155';
const APIURL_POLYGON =
  'https://api.thegraph.com/subgraphs/name/ryry79261/polygon-erc721-erc1155';

const APIURL_GOERLI =
  'https://api.thegraph.com/subgraphs/name/ryry79261/goerli-erc721-erc1155';
const APIURL_MUMBAI =
  'https://api.thegraph.com/subgraphs/name/leon-do/mumbai-erc721-erc1155';

const nftretrievingSupportHttp = false;
const ethereumMainnetNetwork = {
  uri: APIURL_ETH,
  chainId: 1,
};

const ethereumTestnetNetwork = {
  uri: APIURL_GOERLI,
  chainId: 5,
};

const polygonMainnetNetwork = {
  uri: APIURL_POLYGON,
  chainId: 137,
};

const polygonTestnetNetwork = {
  uri: APIURL_MUMBAI,
  chainId: 80001,
};

const NFT_API = {
  mainnet: [ethereumMainnetNetwork, polygonMainnetNetwork],
  testnet: [ethereumTestnetNetwork, polygonTestnetNetwork],
};

export class NftService {
  constructor() {}

  getUriFromNft(nft) {
    const universeIpfsEndpoint = 'https://universeipfs.infura-ipfs.io/ipfs/';
    if (nft?.uri?.startsWith('ipfs://')) {
      return nft.uri.replace('ipfs://', universeIpfsEndpoint);
    }
    if (nft?.uri?.includes('mypinata.cloud/ipfs/')) {
      const uriPieces = nft.uri.split('mypinata.cloud/ipfs/');
      return universeIpfsEndpoint + uriPieces[1];
    }
    if (nftretrievingSupportHttp) {
      if (nft?.uri?.startsWith('http://') || nft?.uri?.startsWith('https://')) {
        return nft.uri;
      }

      // A simple guess so it can lead to ipfs endpoint
      if (nft?.uri) {
        const uriWithoutQueries = nft.uri.split('?')[0];
        const uriPieces = uriWithoutQueries.split('/');
        if (uriPieces.length > 2) {
          return `${universeIpfsEndpoint}${uriPieces[uriPieces.length - 2]}/${
            uriPieces[uriPieces.length - 1]
          }`;
        }
      }
    }

    return '';
  }

  async getMetadataInNft(nft, chainId) {
    let metadata = '{}';
    const nftUri = this.getUriFromNft(nft);
    if (nftUri) {
      try {
        const metadataFetch = await fetch(nftUri);
        // This way we standarize the JSON instead of just receiving it
        metadata = JSON.stringify(await metadataFetch.json());
      } catch (error) {
        console.log({ error });
        metadata = '{}';
      }
    }
    return { ...nft, chainId, metadata };
  }

  async getNftsInAddress({
    address,
    mainnet = true,
    skip = 0,
    offset = 100,
  }: {
    address: string;
    mainnet?: boolean;
    skip?: number;
    offset?: number;
  }) {
    const networkEndpoints = NFT_API[mainnet ? 'mainnet' : 'testnet'];

    const nftList = [];
    for (const networkEndpoint of networkEndpoints) {
      let tokensQuery = gql`
        {
          accounts(
            where: { id: "${address.toLowerCase()}" },
            skip: ${skip},
            first: ${offset}
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

      let requestResponse = await request(networkEndpoint.uri, tokensQuery);
      const responseData = requestResponse?.accounts?.[0];
      if (!responseData?.ERC721tokens) {
        continue;
      }
      const erc721TokensPromises = [];
      for (const nft of responseData.ERC721tokens) {
        erc721TokensPromises.push(
          this.getMetadataInNft(nft, networkEndpoint.chainId),
        );
      }
      const erc721Tokens = await Promise.all(erc721TokensPromises);
      nftList.push(...erc721Tokens);
    }
    return nftList;
  }

  async getNftsInContract({
    address,
    tokenIds,
    mainnet = true,
    chainId = 1,
    skip = 0,
    offset = 100,
  }: {
    address: string;
    tokenIds: string;
    mainnet?: boolean;
    chainId?: number;
    skip: number;
    offset: number;
  }) {
    const networkEndpoint = NFT_API[mainnet ? 'mainnet' : 'testnet'].find(
      endpoint => endpoint.chainId === chainId,
    );
    let tokensQuery = gql`
      {
        erc721Tokens(
          where: {
            contract: "${address.toLowerCase()}"
            identifier_in: [${tokenIds}]
          },
          skip: ${skip},
          first: ${offset}
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
    let requestResponse = await request(networkEndpoint.uri, tokensQuery);
    const responseData = requestResponse?.accounts?.[0];
    if (!responseData?.ERC721tokens) {
      return {};
    }
    const erc721Tokens = await responseData.ERC721tokens.map(async nft => {
      return await this.getMetadataInNft(nft, networkEndpoint.chainId);
    });
    return { ...responseData, ERC721: erc721Tokens };
  }
}
