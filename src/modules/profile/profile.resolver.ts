// import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { NftService } from '../nft/nft.service';
//import { OrbisService } from '../orbis/orbis.service';

import { NftListResponse } from '../nft/nft.model'; // change to model inside NFT module
import { Orbis } from '../orbis/orbis.model';
import { Profile } from './profile.model';



@Resolver(() => Profile)
export class ProfileResolver {
  constructor(
    private nftService: NftService
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
  /*
  @Query(() => NftListResponse, { name: 'getProfile' })
  async getProfile(@Args('address') address: string) {

    try {

      const dids = await this.orbisService.getDids(address);
      let profile, followers, following;
      if(dids){
        profile = await this.orbisService.getProfile(dids[0]);
        followers = await this.orbisService.getProfileFollowers(dids[0]);
        following = await this.orbisService.getProfileFollowing(dids[0]);

      }
      return {
        code: 200,
        profile: profile,
        message: "Retrieved data correctly"
      }

    } catch (err) {
      return {
        code: 500,
        message: err
      }
    }

  }
  */
}
