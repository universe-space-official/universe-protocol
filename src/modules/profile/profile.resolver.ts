// import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { NftService } from '../nft/nft.service.js';
import { OrbisService } from '../orbis/orbis.service.js';

import { NftListResponse } from '../nft/nft.model.js'; // change to model inside NFT module
import { OrbisResponse, ProfileOrbis } from '../orbis/orbis.model.js';
import { Profile, ProfileInput } from './profile.model.js';



@Resolver(of => Profile)
export class ProfileResolver {
  constructor(
    private nftService: NftService,
    private orbisService: OrbisService

  ) { }


  @Query(() => NftListResponse, { name: 'getProfileNfts' })
  async getProfileNfts(@Args('address') address: string) {

    try {
      const nftResponse = await this.nftService.getNftsInAddress(address);
      const NFT721: any[] = [];
      const NFT1155: any[] = [];

      for (let i = 0; i < nftResponse.length; i++) {
        console.log(nftResponse[i].accounts[0].ERC721tokens)
        const newNFT721 = nftResponse[i].accounts[0].ERC721tokens;
        newNFT721.map(nft => {
          NFT721.push(nft);
        })
        const newNFT1155 = nftResponse[i].accounts[0].ERC1155balances;
        newNFT1155.map(nft => {
          NFT1155.push(nft);
        })
      }
      return {
        code: 200,
        NFT721: NFT721,
        NFT1155: NFT1155,
        message: "Retrieved data correctly"
      }

    } catch (err) {
      return {
        code: 500,
        message: err
      }
    }

  }

  @Query(() => OrbisResponse, { name: 'getProfiles' })
  async getProfiles(@Args('address') address: string) {

    try {

      const dids = await this.orbisService.getDids(address);

      return {
        code: 200,
        data: dids,
        message: "Retrieved data correctly"
      }

    } catch (err) {
      return {
        code: 500,
        message: err
      }
    }

  }

  @Mutation(() => ProfileOrbis, { name: 'createProfile' })
  async createProfile(): Promise<ProfileOrbis> {
    return this.orbisService.createProfileOrConnect()
  }

}
