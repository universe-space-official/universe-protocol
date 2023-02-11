// import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { fromString } from 'uint8arrays';

import { NftService } from '../nft/nft.service.js';
import { OrbisService } from '../orbis/orbis.service.js';
import { Keccak } from 'sha3';
import * as jwt from 'jsonwebtoken';
import { decryptWithPrivateKey } from 'eth-crypto';


import {
  ContractInformationResponse,
  NftContractsResponse,
  NftListResponse,
} from '../nft/nft.model.js';
import { OrbisResponse, DIDClass } from '../orbis/orbis.model.js';
import { Profile } from './profile.model.js';

const hash = new Keccak(256);


@Resolver(() => Profile)
export class ProfileResolver {
  constructor(
    private nftService: NftService,
    private orbisService: OrbisService,
  ) { }

  @Query(() => NftListResponse, { name: 'getProfileNfts' })
  async getProfileNfts(@Args('address') address: string) {
    try {
      // For now it only retrieves ERC721 nfts
      const nftObjResponse = await this.nftService.getNftsInAddress({
        address,
      });

      return {
        code: 200,
        NFT721: nftObjResponse.erc721,
        NFT1155: nftObjResponse.erc1155,
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
    @Args('chainId') chainId: number,
    @Args('skip', { nullable: true }) skip?: number,
    @Args('offset', { nullable: true }) offset?: number,
    @Args('tokenIds', { nullable: true }) tokenIds?: string,
  ) {
    try {
      // Only focused in NFT721
      // @TODO: Future, accept ERC1155 tokens
      const nftResponse = await this.nftService.getNftsInContract({
        address,
        tokenIds,
        chainId,
        skip,
        offset,
      });

      console.log({ nftResponse });
      return {
        code: 200,
        NFT721: nftResponse || [],
        message: 'Retrieved data correctly',
      };
    } catch (err) {
      return {
        code: 500,
        message: err,
      };
    }
  }

  @Query(() => ContractInformationResponse, { name: 'getContractInformation' })
  async getContractInformation(
    @Args('contractAddress') contractAddress: string,
  ) {
    try {
      const contract = await this.nftService.getContractInformation(
        contractAddress,
      );

      return {
        code: 200,
        contract,
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
  // Use a signed JWT instead of signature; Create generate JWT method
  async createProfile(@Args('signedJWT') signedJWT: string, address: string): Promise<DIDClass> {
    // Receive the signedJWT and verify

    // @dev we are expecting this on the client side :
    // user to sign his JWT encrypting data to our universe private key (We will make a random eth wallet for universe protocol)
    // universe-protocol will be able to verify and decrypt the CID containing on the JWT payload
    //////////////////////////////////////////////////////////// 
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    // import { encryptWithPublicKey } from 'eth-crypto';

    // Ethereum public key
    // const univPublicKey = '0x...';

    // // Data to be encrypted
    // const data = JSON.stringify({ secret: 'My secret data' });

    // // Encrypt data using public key
    // const encryptedData = encryptWithPublicKey(publicKey, data);

    // // Add encrypted data to JWT payload
    // const payload = {
    //   sub: '1234567890',
    //   iat: 1577485230,
    //   encryptedData: encryptedData
    // };

    // // Sign and encode JWT
    // const signedJWT = jwt.sign(payload, privateKey, { algorithm: 'ES256' });

    // Send JWT to universe-protocol
    // ...

    try {
      const decoded = jwt.verify(signedJWT, address, { algorithms: ['ES256'] });
      const universeprivatekey = '';// we will need to use a .env file or something
      const decryptedData = decryptWithPrivateKey(universeprivatekey, decoded.encryptedData);
      console.log('Token is valid!');
      hash.update(decryptedData);
      hash.digest('hex');
      const seed = new Uint8Array(fromString(hash.digest('hex'), 'base16'));
      const res = await this.orbisService.authenticateDID(seed)
      //await this.orbisService.updateProfile(seed);
      return {
        did: res.did,
      };
    } catch (err) {
      console.log('Token is invalid!');
    }

  }
}
