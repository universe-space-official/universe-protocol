
import { Injectable, NotImplementedException } from "@nestjs/common";
import { Orbis } from "@orbisclub/orbis-sdk";

import { InjectEthersProvider, BaseProvider, EthersSigner, Wallet } from 'nestjs-ethers';

const orbis = new Orbis();

@Injectable()
export class OrbisService {

    constructor(
        @InjectEthersProvider()
        private readonly ethersSigner: EthersSigner,
    ) { }


    async getPost(post_id: string): Promise<any> {
        let { data, error } = await orbis.getPost(post_id);

        return (data);
    }

    async getReaction(post_id: string, did: string): Promise<any> {
        let { data, error } = await orbis.getReaction(post_id, did);

        return (data);
    }

    async getGroup(group_id: string): Promise<any> {
        let { data, error } = await orbis.getGroup(group_id);

        return (data);
    }

    async getGroupMembers(group_id: string): Promise<any> {
        let { data, error } = await orbis.getGroupMembers(group_id);

        return (data);
    }

    async getIsGroupMember(group_id: string): Promise<any> {
        let { data, error } = await orbis.getIsGroupMember(group_id);

        return (data);
    }


    async getChannel(channel_id: string): Promise<any> {
        let { data, error } = await orbis.getChannel(channel_id);

        return (data);
    }


    async getDids(address: string): Promise<any> {
        let { data, error } = await orbis.getDids(address);

        return (data);
    }

    async getProfile(did: string): Promise<any> {
        let { data, error } = await orbis.getProfile(did);

        return (data);
    }

    async getProfilesByUsername(username: string): Promise<any> {
        let { data, error } = await orbis.getProfilesByUsername(username);

        return (data);
    }

    async getProfileGroups(did: string): Promise<any> {
        let { data, error } = await orbis.getProfileGroups(did);

        return (data);
    }

    async getIsFollowing(did_following: string, did_followed: string): Promise<any> {
        let { data, error } = await orbis.getIsFollowing(did_following, did_followed);

        return (data);
    }

    async getProfileFollowing(did: string): Promise<any> {
        let { data, error } = await orbis.getProfileFollowing(did);

        return (data);
    }

    async getProfileFollowers(did: string): Promise<any> {
        let { data, error } = await orbis.getProfileFollowers(did);

        return (data);
    }

    async getConversations(options: JSON): Promise<any> {
        let { data, error } = await orbis.getConversations(options);

        return (data);
    }

    async getConversation(conversation_id: string): Promise<any> {
        let { data, error } = await orbis.getConversation(conversation_id);

        return (data);
    }

    async getMessages(conversation_id: string): Promise<any> {
        let { data, error } = await orbis.getMessages(conversation_id);

        return (data);
    }

    async createProfileOrConnect() {

        const wallet: Wallet = this.ethersSigner.createRandomWallet();

        const provider = "" // HOW do we have wrap a provider object for  orbis ?

        let { data } = await orbis.connect(provider)


        return data;



    }



}
