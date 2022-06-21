# ICLand

ICLand powers NFT communities by connecting web3 identities to social spaces &amp; delivering key token data to communities. First tools: Discord token holder verification; sales &amp; listings bot.

## What it does

ICLand powers ICP tokenized communities by connecting web3 identities to social spaces & delivering key token data to communities.

The first tools offered are:
Discord token holder verification
Sales & listings Discord bot

Projects will be able to acquire access to the tools either by holding ICLand’s NFTs or by paying a monthly subscription in $ICP.

**Discord Token Holder Verification**
The tool provides holder roles across all Discord servers for token holders of NFT collections or similar ICP tokenized communities integrated with ICLand. Token holders only need to connect their Discord accounts and wallets or Internet Identity to ICLand’s interface a single time. The tool will also offer further customization for holder-specific roles.

**Sales & listings Discord bot**
The ICLand Discord bot creates and updates channels with new NFT token listings and sales.

**Integration Process**
To be made available during beta, any project will be able to integrate ICLand by acquiring the required NFTs by ICLand and connecting their wallets and Discord handles to ICLand. Once done, they will be able to add the ICLand bot to their Discord server and finish the integration.

## Inspiration

Tokenized communities in the IC ecosystem are destined to bloom with the growth of NFTs and fungible tokens. This creates the need for gated-social spaces and for communities to stay updated with the market activity of their tokens.

Discord remains the preferred platform for social spaces of tokenized communities across all blockchains. In more mature markets such as Ethereum and Solana, most projects use third-party solutions to verify the holder status of members. This allows gated channels and other social spaces exclusive to token holders, polling holders for matters that can range from governance to trivial topics, or simply segmenting members. In most cases, projects rely on third-party solutions (e.g. collab.land) which are often more convenient and cheaper than developing a verification system in-house.
At the same time, communities often desire to stay updated with the market activity of their tokens. A Discord bot that populates channels with NFT sales and listings is a convenient way to provide opportunities (new attractive listings) and market updates (sales, record sales, listings) to holders.
Thus, ICLand aims to power the IC’s tokenized communities given the lack of services providing such essential functionatiltes.

## How we built it

**- Server**

- Written in Typescript
- Hosts Discord Bot that handle users authentication, assigns special roles to holders, and collect and share market activity data of their collections’ tokens through channels
- API to integrate the functionalities between the dapp and the Discord bot

**- Backend Canister**

- Written in Motoko
- Has an actor that handles 2 HashMap databases, one for the guild and one for the users. Both databases have methods to create, update, find, and findAll records.
- In the future, these canisters will verify if NFT project admins own the required NFTs to integrate ICLand to their servers

**- Frontend Canister** - Written in Nextjs with Typescript - UI that allow:

- users to connect their wallets and Discord accounts to ICLand
- project leaders to connect their wallets and Discord accounts to ICLand.

## Challenges we ran into

- The challenge was to design a scalable solution without using web2 database systems while providing a seamless IaaS solution that will support most ICP projects.

## Accomplishments that we're proud of

- Delivering the main tool ready to use by the end of the hackaton
- Not relying on web2 database systems
- Building our first solution using Nextjs for the frontend canister and connecting it to an Oauth2 authentication

## What we learned

- How to develop a Discord bot using Discord.js
- How to setup oauth2 with Discord

## What's next for ICLand

Future steps entail:
Enabling the payment verification (via NFT ownership)
Launch the product in beta for projects to test
Explore developing further tools that could take the shape of:
Token-gated raffles
Twitter bot providing activity data;
Staking tools enabling holders to stake fungible and non-fungible tokens;
Governance/polling platforms;

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
