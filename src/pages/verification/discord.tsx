import { useEffect, useState } from "react";
import Link from "next/link";
import axios from 'axios'
import { Footer } from "../../components/Footer";
import { HeaderConnect } from "../../components/HeaderConnected";
import { useActor } from "../../context/actor";
import { User } from "../../types/user";
import { useGlobalContext, useSetAgent } from "../../hooks";
import { HOST } from "../../lib/canisters";
import { getDiscordTokens } from "../../lib/getDiscordTokens";
import { useRouter } from "next/router";

const WHITELIST = [].filter(Boolean);

const PLUG_ARGS = {
  whitelist: WHITELIST,
  host: HOST,
};

export default function Connect() {
  const router = useRouter()
  const { query } = router
  const setAgent = useSetAgent()
  const { state: { isAuthed, principal } } = useGlobalContext()
  const { createUser } = useActor()
  const [user, setUser] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(!!user)

  const handleReconnect = async () => {
    if (typeof window === "undefined") return;

    const connected = await window.ic.plug.isConnected();

    if (!connected) {
      await window.ic.plug.requestConnect(PLUG_ARGS);
    }
    if (!window.ic.plug.agent) {
      await window.ic.plug.createAgent(PLUG_ARGS);
    }

    setAgent({
      agent: window.ic.plug.agent,
      isAuthed: true,
    });
  }

  const registerUser = async () => {
    const userData: User = {
      id: principal.toString(),
      isActive: true,
      discordId: Number(user.id),
    }

    // const resp = await createUser(userData)
    if (true) {
      axios.post(`${process.env.NEXT_PUBLIC_DISCORD_API}user`, user, {
        headers: {
          "Content-Type": "application/json"
        }
      })
    }
  }

  useEffect(() => {
    handleReconnect()
  }, [])

  useEffect(() => {
    const { code } = query
    if (!code) return
    setIsLoading(true);

    (async () => {
      const response = await getDiscordTokens(code as string)
      const {
        access_token: accessToken,
        token_type: tokenType
      } = response.data
      const userData = await axios.get('https://discord.com/api/users/@me', {
        headers: {
          Authorization: `${tokenType} ${accessToken}`,
        },
      });
      setUser(userData.data)
    })()

  }, [query])

  useEffect(() => {
    if (!user || !principal || !isAuthed) return

    registerUser()

  }, [createUser, isAuthed, principal, user])

  return (
    <div className="relative overflow-hidden bg-gray-background flex flex-col justify-between h-screen">
      <HeaderConnect />
      {isLoading ? (
        user ? (
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-blue-200 text-5xl text-center">Account has been linked <br />with Discord! 🎉</h2>
            <p className="text-white text-center text-lg my-5">
              Linked Account:&nbsp;
              <span className="text-pink-200">{`${user.username}#${user.discriminator}`} <br /></span>
            </p>
            <p className="text-white text-center text-lg mb-20">
              You can now go back to the project&apos;s Discord server that sent you <br /> here and follow any additional instructions.
            </p>
            <Link href='/verification/'>
              <button className="bg-gray-200 rounded-[28px] py-2 px-10 hover:bg-pink-300">
                <span className="text-gray-500 font-bold">
                  CHANGE DISCORD ACCOUNT
                </span>
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center justify-center ">
            <div className="w-40 h-40 border-t-4 border-b-4 border-blue-200 rounded-full animate-spin"></div>
          </div>
        )
      ) : (
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-blue-200 text-5xl font-bold">Link Your Discord</h2>
          <a
            href={process.env.NEXT_PUBLIC_DISCORD_VERIFICATION_AUTH_URL}
            className="bg-purple-100 rounded-[28px] py-4 px-6 mt-10 hover:bg-purple-200 flex items-center">
            <img
              src='/images/discord.svg'
              alt='discord'
              width={45}
              height={45}
            />
            <span className="font-bold text-white ml-5 text-lg">
              LINK DISCORD
            </span>
          </a>
        </div>
      )}
      <Footer />
    </div>
  )
}