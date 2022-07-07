import { HttpAgent, Identity, SignIdentity } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import PlugConnect from "@psychedelic/plug-connect";
import { StoicIdentity } from "ic-stoic-identity";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'

import { HOST, IDENTITY_PROVIDER } from "../../lib/canisters";
import { ONE_WEEK_NS } from "../../lib/constants";
import Modal from "../Modal";
import { useGlobalContext, useLoginModal, useSetAgent } from "../../hooks";

declare global {
  interface Window {
    ic: {
      plug: {
        agent: any;
        isConnected: () => Promise<boolean>;
        requestConnect: (args?: {
          whitelist: string[];
          host?: string;
        }) => Promise<undefined>;
        createAgent: (args?: {
          whitelist: string[];
          host?: string;
        }) => Promise<undefined>;
        requestBalance: () => Promise<
          Array<{
            amount: number;
            canisterId: string | null;
            image: string;
            name: string;
            symbol: string;
            value: number | null;
          }>
        >;
        requestTransfer: (arg: {
          to: string;
          amount: number;
          opts?: {
            fee?: number;
            memo?: number;
            from_subaccount?: number;
            created_at_time?: {
              timestamp_nanos: number;
            };
          };
        }) => Promise<{ height: number }>;
      };
    };
  }
}


const WHITELIST = [].filter(Boolean);

const PLUG_ARGS = {
  whitelist: WHITELIST,
  host: HOST,
};

export default function LoginButton() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useLoginModal();
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const {
    state: { isAuthed },
  } = useGlobalContext();
  const setAgent = useSetAgent();
  const [authClient, setAuthClient] = useState<AuthClient>(null);

  const handleAuthenticated = async (authClient: AuthClient) => {
    const identity: Identity = authClient.getIdentity();
    setAgent({
      agent: new HttpAgent({
        identity,
        host: HOST,
      }),
      isAuthed: true,
    });
    closeModal();
  };

  const [showIILogin, setShowIILogin] = useState(false);
  const handleIILogin = async () => {
    authClient.login({
      identityProvider: IDENTITY_PROVIDER,
      maxTimeToLive: ONE_WEEK_NS,
      onSuccess: () => handleAuthenticated(authClient),
    });
  };

  const handleIILogout = async () => {
    await authClient.logout();
    setAgent({ agent: null });
  };

  const handlePlugLogin = async () => {
    if (typeof window === "undefined") return;

    const connected = await window.ic.plug.isConnected();


    if (!connected) {
      await window.ic.plug.requestConnect(PLUG_ARGS);
    }
    if (!window.ic.plug.agent) {
      await window.ic.plug.createAgent(PLUG_ARGS);
    }
    if (window.ic.plug.agent) {
      console.log('Ok')
      const balancex = await window.ic.plug.requestBalance();
      console.log(balancex);
    }
    setAgent({
      agent: window.ic.plug.agent,
      isAuthed: true,
    });
    closeModal();
    router.push('/integration/discord')
  };
  const [showStoicLogin, setShowStoicLogin] = useState(false);

  // disabled for now
  const handleStoicLogin = async () => {
    // StoicIdentity.load().then(async (identity: SignIdentity) => {
    //   identity = await StoicIdentity.connect();
    //   setAgent({
    //     agent: new HttpAgent({
    //       identity,
    //       host: HOST,
    //     }),
    //     isAuthed: true,
    //   });
    //   closeModal();
    // });
  };

  const handleLogout = async () => {
    if (typeof window === "undefined") return;

    if (await window?.ic?.plug?.isConnected()) {
      window.ic.plug.agent = null;
      setAgent({ agent: null });
    } else {
      handleIILogout();
    }
  };

  // Auth on refresh
  useEffect(() => {
    (async () => {
      const authClient = await AuthClient.create();
      setAuthClient(authClient);

      if (await window?.ic?.plug?.isConnected()) {
        handlePlugLogin();
      } else {
        if (await authClient.isAuthenticated()) {
          handleAuthenticated(authClient);
        }
      }
    })();
  }, []);

  return (
    <>
      <button 
        className="bg-pink-200 rounded-[28px] py-4 px-20 hover:bg-pink-300"
        onClick={() => setIsOpen(true)}
      >
        <span className="text-gray-500 font-bold">
        {isAuthed ? "DISCONNECT" : "CONNECT"}
        </span>
      </button>
      <Modal
        isOpen={isOpen}
        openModal={openModal}
        closeModal={closeModal}
        title="CONNECT"
        className="max-w-xs w-full"
      >
        <div className="flex flex-col items-stretch gap-4 py-4">
          {showIILogin && (
            <div className="text-sm">
              Internet Identity is not recommended due to difficulty in holding
              balances across different apps.
              <div className="flex mt-4 gap-2 leading-none">
                <button
                  className="flex-1 px-3 py-2 rounded-lg bg-gray-200 border-gray-300 border-2 hover:ring-2 hover:ring-opacity-50 hover:ring-indigo-500 hover:border-indigo-500"
                  onClick={() => setShowIILogin(false)}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 flex justify-center items-center px-3 py-2 rounded-lg bg-white border-gray-300 border-2 hover:ring-2 hover:ring-opacity-50 hover:ring-indigo-500 hover:border-indigo-500"
                  onClick={handleIILogin}
                >
                  <img src="/images/dfinity.png" className="w-4 mr-2" /> Login
                </button>
              </div>
            </div>
          )}

          {showStoicLogin && (
            <div className="text-sm">
              Stoic requires third-party cookies to connect.
              <div className="flex mt-4 gap-2 leading-none">
                <button
                  className="flex-1 px-3 py-2 rounded-lg bg-gray-200 border-gray-300 border-2 hover:ring-2 hover:ring-opacity-50 hover:ring-indigo-500 hover:border-indigo-500"
                  onClick={() => setShowStoicLogin(false)}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 flex justify-center items-center px-3 py-2 rounded-lg bg-white border-gray-300 border-2 hover:ring-2 hover:ring-opacity-50 hover:ring-indigo-500 hover:border-indigo-500"
                  onClick={handleStoicLogin}
                >
                  <img src="/images/stoic.png" className="w-4 mr-2" /> Login
                </button>
              </div>
            </div>
          )}

          {!showIILogin && !showStoicLogin && (
            <>
              <PlugConnect
                whitelist={WHITELIST}
                host={HOST}
                onConnectCallback={handlePlugLogin}
              />

              <button
                className="flex items-center px-3 py-2 rounded-lg bg-white border-gray-300 border-2 hover:ring-2 hover:ring-opacity-50 hover:ring-indigo-500 hover:border-indigo-500"
                onClick={() => setShowStoicLogin(!showStoicLogin)}
              >
                <img src="/images/stoic.png" className="w-4 mr-2" /> Stoic
              </button>

              <button
                className="flex items-center px-3 py-2 rounded-lg bg-white border-gray-300 border-2 hover:ring-2 hover:ring-opacity-50 hover:ring-indigo-500 hover:border-indigo-500"
                onClick={() => setShowIILogin(!showIILogin)}
              >
                <img src="/images/dfinity.png" className="w-4 mr-2" /> Internet
                Identity
              </button>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}
