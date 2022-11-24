// import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { fromString } from 'uint8arrays';

import { NftService } from '../nft/nft.service.js';
import { OrbisService } from '../orbis/orbis.service.js';

import { NftContractsResponse, NftListResponse } from '../nft/nft.model.js'; // change to model inside NFT module
import { OrbisResponse, DIDClass } from '../orbis/orbis.model.js';
import { Profile } from './profile.model.js';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(
    private nftService: NftService,
    private orbisService: OrbisService,
  ) {}

  @Query(() => NftListResponse, { name: 'getProfileNfts' })
  async getProfileNfts(@Args('address') address: string) {
    try {
      const nftResponse = await this.nftService.getNftsInAddress(address);
      let NFT721: any[] = [];
      const NFT1155: any[] = [];

      // It's implemented this way to make other networks work too
      // also assigning directly because chainId is assigned in getNftsInAddress fn
      NFT721 = nftResponse[0].ERC721;
      console.log(NFT721);
      const newNFT1155 = nftResponse[0].ERC1155balances;
      newNFT1155.map(nft => {
        NFT1155.push({ ...nft, chainId: 1 });
      });

      return {
        code: 200,
        NFT721: NFT721,
        NFT1155: NFT1155,
        message: 'Retrieved data correctly',
      };
    } catch (err) {
      return {
        code: 500,
        message: err,
      };
    }
  }

  @Query(() => NftContractsResponse, { name: 'getContractNfts' })
  async getContractNfts(
    @Args('address') address: string,
    @Args('tokenIds') tokenIds: string,
  ) {
    try {
      const nftResponse = (await this.nftService.getNftsInContract({
        address,
        tokenIds,
        chainId: 1,
        mainnet: true,
      })) as { data: any; chainId: number };

      return {
        code: 200,
        NFT721: nftResponse.data || [],
        message: 'Retrieved data correctly',
      };
    } catch (err) {
      return {
        code: 500,
        message: err,
      };
    }
  }

  @Query(() => OrbisResponse, { name: 'getProfiles' })
  async getProfiles(@Args('address') address: string) {
    try {
      const dids = await this.orbisService.getDids(address);

      return {
        code: 200,
        data: dids,
        message: 'Retrieved data correctly',
      };
    } catch (err) {
      return {
        code: 500,
        message: err,
      };
    }
  }

  @Mutation(() => DIDClass, { name: 'createProfile' })
  async createProfile(@Args('signature') signature: string): Promise<DIDClass> {
    const seed = new Uint8Array(fromString(signature, 'base16'));
    const did = await this.orbisService.authenticateDID(
      seed.filter((number, index) => {
        if (index < 32) {
          return number;
        }
      }),
    );
    return {
      did: did.id,
    };
  }
}
