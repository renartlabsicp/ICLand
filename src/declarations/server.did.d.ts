import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Guild {
  'id' : GuildId,
  'owner' : string,
  'name' : string,
  'nftStandard' : string,
  'isActive' : boolean,
  'website' : string,
  'nftCanisterId' : string,
}
export type GuildId = string;
export type GuildId__1 = string;
export interface User {
  'id' : UserId,
  'discordId' : string,
  'isActive' : boolean,
}
export type UserId = string;
export type UserId__1 = string;
export interface _SERVICE {
  'createGuild' : ActorMethod<[GuildId__1, Guild], undefined>,
  'createUser' : ActorMethod<[UserId__1, User], undefined>,
  'getAllGuilds' : ActorMethod<[], Array<Guild>>,
  'getAllUsers' : ActorMethod<[], Array<User>>,
  'getGuild' : ActorMethod<[GuildId__1], Guild>,
  'getUser' : ActorMethod<[UserId__1], User>,
  'healthcheck' : ActorMethod<[], boolean>,
  'updateGuild' : ActorMethod<[Guild], undefined>,
  'updateUser' : ActorMethod<[User], undefined>,
}
