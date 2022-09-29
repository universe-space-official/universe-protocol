import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Context, Mutation } from '@nestjs/graphql';
import { User } from '@sentry/types';
import { isEthereumAddress } from 'class-validator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { OptionalAuthGuard } from '../auth/guards/optional-auth.guard';
import { NftService } from '../nft/nft.service';
import { UserService } from '../user/services/user.service';
import { BitmonWhitelist, BitmonWhitelistUpdate } from './dto/BitmonWhitelist';
import { ProfileInfoBySlug } from './dto/ProfileInfoBySlug';
import { NftListResponse } from './dto/responses.dto';
import { Profile } from './entities/profile.entity';
import { ProfileService } from './services/profile.service';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(
    private profileService: ProfileService,
    private userService: UserService,
    private nftService: NftService
  ) { }


  @Query(() => NftListResponse, { name: 'getProfileNfts' })
  async getProfileNfts(@Args('address') address: string) {

    try {
      const nftResponse = await this.nftService.getNftsInAddress(address);

      const NFT721 = [];
      const NFT1155 = [];

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
