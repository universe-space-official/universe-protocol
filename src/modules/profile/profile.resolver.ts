// import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { NftService } from '../nft/nft.service';

import { NftListResponse } from '../nft/nft.model'; // change to model inside NFT module
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

      const NFT721: string[] = [];
      const NFT1155: string[] = [];

      for (let i = 0; i < nftResponse.length; i++) {
        const newNFT721 = nftResponse[i].data.accounts.ERC721tokens;
        const newNFT1155 = nftResponse[i].data.accounts.ERC1155balances;
        NFT721.push(newNFT721);
        NFT1155.push(newNFT1155);
      }

      const NFTs = { NFT721: NFT721, NFT1155: NFT1155 };

      return {
        code: 200,
        data: NFTs,
        message: "Retrieved data correctly"
      }

    } catch (err) {
      return {
        code: 500,
        data: null,
        message: err
      }
    }

  }
}
