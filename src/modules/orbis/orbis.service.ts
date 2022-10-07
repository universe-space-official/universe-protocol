
import { Orbis } from "@orbisclub/orbis-sdk";

const orbis = new Orbis();

export class OrbisService {

    constructor() { }


    async getPost(post_id: string): Promise<any> {
        let { data, error } = await orbis.getPost(post_id);

        return { data, error };
    }

    async getReaction(post_id: string, did: string): Promise<any> {
        let { data, error } = await orbis.getReaction(post_id, did);

        return { data, error };
    }

    async getGroup(group_id: string): Promise<any> {
        let { data, error } = await orbis.getGroup(group_id);

        return { data, error };
    }

    async getGroupMembers(group_id: string): Promise<any> {
        let { data, error } = await orbis.getGroupMembers(group_id);

        return { data, error };
    }

    async getIsGroupMember(group_id: string): Promise<any> {
        let { data, error } = await orbis.getIsGroupMember(group_id);

        return { data, error };
    }


    async getChannel(channel_id: string): Promise<any> {
        let { data, error } = await orbis.getChannel(channel_id);

        return { data, error };
    }


    async getDids(address: string): Promise<any> {
        let { data, error } = await orbis.getDids(address);

        return { data, error };
    }

    async getProfile(did: string): Promise<any> {
        let { data, error } = await orbis.getProfile(did);

        return { data, error };
    }

    async getProfilesByUsername(username: string): Promise<any> {
        let { data, error } = await orbis.getProfilesByUsername(username);

        return { data, error };
    }

    async getProfileGroups(did: string): Promise<any> {
        let { data, error } = await orbis.getProfileGroups(did);

        return { data, error };
    }

    async getIsFollowing(did_following: string, did_followed: string): Promise<any> {
        let { data, error } = await orbis.getIsFollowing(did_following, did_followed);

        return { data, error };
    }

    async getProfileFollowing(did: string): Promise<any> {
        let { data, error } = await orbis.getProfileFollowing(did);

        return { data, error };
    }

    async getProfileFollowers(did: string): Promise<any> {
        let { data, error } = await orbis.getProfileFollowers(did);

        return { data, error };
    }

    async getConversations(options: JSON): Promise<any> {
        let { data, error } = await orbis.getConversations(options);

        return { data, error };
    }

    async getConversation(conversation_id: string): Promise<any> {
        let { data, error } = await orbis.getConversation(conversation_id);

        return { data, error };
    }

    async getMessages(conversation_id: string): Promise<any> {
        let { data, error } = await orbis.getMessages(conversation_id);

        return { data, error };
    }

    async decryptMessage(content: JSON): Promise<any> {
        let { data, error } = await orbis.decryptMessage(content);

        return { data, error };
    }

    async decryptPost(content: JSON): Promise<any> {
        let { data, error } = await orbis.decryptPost(content);

        return { data, error };
    }


}
