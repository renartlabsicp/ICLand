import axios from "axios"

export const getDiscordTokens = async (code: string, integration?: boolean) => {
  const body = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_DISCORD_CLIENT_SECRET,
    grant_type: "authorization_code",
    redirect_uri: integration ? process.env.NEXT_PUBLIC_DISCORD_REDIRECT_INTEGRATION_URI : process.env.NEXT_PUBLIC_DISCORD_REDIRECT_VERIFICATION_URI,
    code: code
  }).toString()

  const response = await axios.post("https://discord.com/api/oauth2/token", body, {
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    },
  })

  return response
}