
import { Orbis } from "@orbisclub/orbis-sdk";

const orbis = new Orbis();

export class OrbisService {

    async connect(provider, lit) {
        await orbis.connect(provider, lit);
    }

    async isConnected() {
        return await orbis.isConnected();
    }

    async logout() {
        return await orbis.logout();
    }

    async createPost(body: string) {
        return await orbis.createPost(body);
    }

    async react(post_id: number, type: string) {
        return await orbis.react(post_id, type);
    }

    async updateProfile(content: JSON) {
        return await orbis.updateProfile(content);
    }

    async setFollow(did: string, active: boolean) {
        return await orbis.setFollow(did, active);
    }

    async createGroup(content: JSON) {
        return await orbis.createGroup(content);
    }

    async updateGroup(stream_id: number, content: JSON) {
        return await orbis.updateGroup(stream_id, content);
    }

    async createChannel(group_id: number, content: JSON) {
        return await orbis.createChannel(group_id, content);
    }

    async updateChannel(channel_id: number, content: JSON) {
        return await orbis.updateChannel(channel_id, content);
    }

    async createConversation(content: JSON) {
        return await orbis.createConversation(content);
    }

    async sendMessage(content: JSON) {
        return await orbis.sendMessage(content);
    }

    async getPosts(content: JSON, page: number) {
        let { data, error } = await orbis.getPosts(content, page);

        return { data, error };
    }

    async getPost(post_id: string) {
        let { data, error } = await orbis.getPost(post_id);

        return { data, error };
    }

    async getReaction(post_id: string, did: string) {
        let { data, error } = await orbis.getReaction(post_id, did);

        return { data, error };
    }

    async getGroup(group_id: string) {
        let { data, error } = await orbis.getGroup(group_id);

        return { data, error };
    }

    async getGroupMembers(group_id: string) {
        let { data, error } = await orbis.getGroupMembers(group_id);

        return { data, error };
    }

    async getIsGroupMember(group_id: string) {
        let { data, error } = await orbis.getIsGroupMember(group_id);

        return { data, error };
    }


    async getChannel(channel_id: string) {
        let { data, error } = await orbis.getChannel(channel_id);

        return { data, error };
    }


    async getDids(address: string) {
        let { data, error } = await orbis.getDids(address);

        return { data, error };
    }

    async getProfile(did: string) {
        let { data, error } = await orbis.getProfile(did);

        return { data, error };
    }

    async getProfilesByUsername(username: string) {
        let { data, error } = await orbis.getProfilesByUsername(username);

        return { data, error };
    }

    async getProfileGroups(did: string) {
        let { data, error } = await orbis.getProfileGroups(did);

        return { data, error };
    }

    async getIsFollowing(did_following: string, did_followed: string) {
        let { data, error } = await orbis.getIsFollowing(did_following, did_followed);

        return { data, error };
    }

    async getProfileFollowing(did: string) {
        let { data, error } = await orbis.getProfileFollowing(did);

        return { data, error };
    }

    async getProfileFollowers(did: string) {
        let { data, error } = await orbis.getProfileFollowers(did);

        return { data, error };
    }

    async getConversations(options: JSON) {
        let { data, error } = await orbis.getConversations(options);

        return { data, error };
    }

    async getConversation(conversation_id: string) {
        let { data, error } = await orbis.getConversation(conversation_id);

        return { data, error };
    }

    async getMessages(conversation_id: string) {
        let { data, error } = await orbis.getMessages(conversation_id);

        return { data, error };
    }

    async decryptMessage(content: JSON) {
        let { data, error } = await orbis.decryptMessage(content);

        return { data, error };
    }

    async decryptPost(content: JSON) {
        let { data, error } = await orbis.decryptPost(content);

        return { data, error };
    }


}