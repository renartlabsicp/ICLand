import React, { createContext, useContext } from 'react';
import { makeServerActor } from '../lib/makeServerActor';
import type { Guild } from '../types/guild';
import type { User } from '../types/user';


interface IActor {
  createGuild: (guild: Guild) => Promise<void>;
  // updateGuild: () => Promise<void>
  // getGuild: () => Promise<Guild | undefined>
  // getAllGuilds: () => Promise<[Guild] | void>;
  createUser: (user: User) => Promise<boolean>;
  getAllUsers: () => Promise<[User] | void>;
};

const initialContext: IActor = {
  createGuild: async () => undefined,
  // updateGuild: async () => undefined,
  // getGuild: async () => undefined,
  // getAllGuilds: async () => undefined,
  createUser: async () => undefined,
  getAllUsers: async () => undefined,
};

const ActorContext = createContext<IActor>(initialContext);

interface IActorProvider {
  children: React.ReactNode;
}

const ActorProvider = ({ children }: IActorProvider) => {
  const actor = makeServerActor()

  const createGuild = async (guild: Guild | undefined) => {
    if (!guild) return;
    const resp = await actor.createGuild(guild.id, {
      id: guild.id,
      isActive: true,
      name: guild.name,
      nftCanisterId: guild.nftCanisterId,
      website: guild.website,
    });
  };

  // const getAllGuilds = async () => {
  //   const data: [Guild] = await actor.getAllGuilds();
  //   return data;
  // };

  const createUser = async (user: User | undefined): Promise<boolean> => {
    if (!user) return;
    try {
      await actor.createUser(user.id, {
        id: user.id,
        isActive: true,
        discordId: user.discordId,
      });
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  };

  const getAllUsers = async () => {
    const data: [User] = await actor.getAllUsers();
    return data;
  };

  return (
    <ActorContext.Provider
      value={{ createGuild, createUser, getAllUsers }}
    >
      {children}
    </ActorContext.Provider>
  );
};

const useActor = () => {
  const context = useContext(ActorContext);

  return context;
};

export { ActorContext, ActorProvider, useActor };
