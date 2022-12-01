import { Injectable, NotImplementedException } from '@nestjs/common';
import { Orbis } from '@orbisclub/orbis-sdk';
import { DID } from 'dids';
import { Ed25519Provider } from 'key-did-provider-ed25519';
import { getResolver } from 'key-did-resolver';

export class OrbisService {
  async getPost(post_id: string): Promise<any> {
    const orbis = new Orbis();
    let { data, error } = await orbis.getPost(post_id);

    return data;
  }

  async getReaction(post_id: string, did: string): Promise<any> {
    const orbis = new Orbis();
    let { data, error } = await orbis.getReaction(post_id, did);

    return data;
  }

  async getGroup(group_id: string): Promise<any> {
    const orbis = new Orbis();
    let { data, error } = await orbis.getGroup(group_id);

    return data;
  }

  async getGroupMembers(group_id: string): Promise<any> {
    const orbis = new Orbis();
    let { data, error } = await orbis.getGroupMembers(group_id);

    return data;
  }

  async getIsGroupMember(group_id: string): Promise<any> {
    const orbis = new Orbis();
    let { data, error } = await orbis.getIsGroupMember(group_id);

    return data;
  }

  async getChannel(channel_id: string): Promise<any> {
    const orbis = new Orbis();
    let { data, error } = await orbis.getChannel(channel_id);

    return data;
  }

  async getDids(address: string): Promise<any> {
    const orbis = new Orbis();
    let { data, error } = await orbis.getDids(address);

    return data;
  }

  async getProfile(did: string): Promise<any> {
    const orbis = new Orbis();
    let { data, error } = await orbis.getProfile(did);

    return data;
  }

  async getProfilesByUsername(username: string): Promise<any> {
    const orbis = new Orbis();
    let { data, error } = await orbis.getProfilesByUsername(username);

    return data;
  }

  async getProfileGroups(did: string): Promise<any> {
    const orbis = new Orbis();
    let { data, error } = await orbis.getProfileGroups(did);

    return data;
  }

  async getIsFollowing(
    did_following: string,
    did_followed: string,
  ): Promise<any> {
    const orbis = new Orbis();
    let { data, error } = await orbis.getIsFollowing(
      did_following,
      did_followed,
    );

    return data;
  }

  async getProfileFollowing(did: string): Promise<any> {
    const orbis = new Orbis();
    let { data, error } = await orbis.getProfileFollowing(did);

    return data;
  }

  async getProfileFollowers(did: string): Promise<any> {
    const orbis = new Orbis();
    let { data, error } = await orbis.getProfileFollowers(did);

    return data;
  }

  async getConversations(options: JSON): Promise<any> {
    const orbis = new Orbis();
    let { data, error } = await orbis.getConversations(options);

    return data;
  }

  async getConversation(conversation_id: string): Promise<any> {
    const orbis = new Orbis();
    let { data, error } = await orbis.getConversation(conversation_id);

    return data;
  }

  async getMessages(conversation_id: string): Promise<any> {
    const orbis = new Orbis();
    let { data, error } = await orbis.getMessages(conversation_id);

    return data;
  }

  // `seed` must be a 32-byte long Uint8Array
  async authenticateDID(seed: Uint8Array) {
    const provider = new Ed25519Provider(seed);
    const did = new DID({ provider, resolver: getResolver() });
    await did.authenticate();
    return did;
  }
}
