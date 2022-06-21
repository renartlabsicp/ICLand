import {
  createActor as createServerActor,
  serverCanisterId
} from '../declarations';
import { HOST } from './canisters';

export const makeActor = (canisterId: string | undefined, createActor: any) => {
  return createActor(canisterId, {
    agentOptions: {
      host: HOST
    },
  });
};

export const makeServerActor = () => {
  return makeActor(serverCanisterId, createServerActor);
};
