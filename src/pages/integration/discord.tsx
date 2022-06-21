import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { Footer } from "../../components/Footer";
import { Forms } from "../../components/Buy/Forms";
import { HeaderConnect } from "../../components/HeaderConnected";
import { getDiscordTokens } from "../../lib/getDiscordTokens";

export default function Connect() {
  const router = useRouter()
  const { query } = router
  const [user, setUser] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(!!user)

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
      const userData = await axios.get('https://discord.com/api/users/@me', {
        headers: {
          Authorization: `${tokenType} ${accessToken}`,
        },
      });
      setUser(userData.data)
    })()

  }, [query])

  return (
    <div className="relative bg-gray-background flex flex-col justify-between min-h-screen">
      <HeaderConnect />
      {isLoading ? (
        user ? (
          <div className="px-56">
            <div className="grid border border-gray-100 px-8 py-10 items-center justify-center">
              <h2 className="text-blue-200 text-center text-5xl font-bold mb-12">Account has been linked!🎉 </h2>
              <h3 className="text-blue-200 text-center text-3xl font-bold mb-5">To enable our Discord tools: </h3>
              <div className="flex justify-between border-[3px] border-purple-100 px-24 py-8 rounded-[10px] max-w-5xl mb-6">
                <div>
                  <h2 className="text-blue-200 text-3xl">Holder Verification</h2>
                  <p className="text-white text-lg">Enable holder roles and gated <br /> channels for your holders </p>
                </div>
                <div>
                  <h2 className="text-pink-200 text-3xl">Sales &amp; Listings Bot</h2>
                  <p className="text-white text-lg">Bring opportunities to your project&apos;s <br /> Discord</p>
                </div>
              </div>
              <h3 className="text-blue-200 text-center text-3xl font-bold mb-1">You need to HODL: </h3>
              <Forms discriminator={user?.discriminator} username={user?.username} />
            </div>
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