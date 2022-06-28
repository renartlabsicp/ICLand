import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { Footer } from "../../components/Footer";
import { Forms } from "../../components/Buy/Forms";
import { HeaderConnect } from "../../components/HeaderConnected";
import { getDiscordTokens } from "../../lib/getDiscordTokens";
import IntegrateForms from "../../components/Buy/IntegrateForms";

export default function Connect() {
  const router = useRouter()
  const { query } = router
  const [guilds, setGuilds] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(!!guilds)

  useEffect(() => {
    const { code } = query
    if (!code) return
    setIsLoading(true);

    (async () => {
      const response = await getDiscordTokens(code as string, true)
      const {
        access_token: accessToken,
        token_type: tokenType
      } = response.data

      const userGuildData = await axios.get('https://discord.com/api/users/@me/guilds', {
        headers: {
          Authorization: `${tokenType} ${accessToken}`,
        },
      });

      const filteredGuilds = userGuildData.data.filter(g => g.owner)

      setGuilds(filteredGuilds)
    })()

  }, [query])


  return (
    <div className="relative bg-gray-background flex flex-col justify-between min-h-screen">
      <HeaderConnect />
      {isLoading ? (
        guilds ? (
          <IntegrateForms guilds={guilds} />
        ) : (
          <div className="flex items-center justify-center ">
            <div className="w-40 h-40 border-t-4 border-b-4 border-blue-200 rounded-full animate-spin"></div>
          </div>
        )
      ) : (
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-blue-200 text-5xl font-bold">Link Your Discord</h2>
          <a
            href={process.env.NEXT_PUBLIC_DISCORD_INTEGRATION_AUTH_URL}
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