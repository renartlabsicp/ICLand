# ICLand Dapp

## Cloning and running the application

The Dapp is using `Next.js` with `Typescript` for the frontend and a `Motoko` canister for backend.

Clone the project with:

```bash
git clone https://github.com/RenArtLabs/icland.git
```

Install all the dependencies:

```node
yarn
```

If you see an error, it's probably due to some packages that need a `git personal access token` to registry and download it. To fix that you'll need to export the GIT_TOKEN with:

```bash
EXPORT GIT_TOKEN="your-token-here"
```

After installing the packages, you need to config the environment variables. To do so, copy the `.env.template` file and fill the variables as instructed below:

- `NEXT_PUBLIC_DISCORD_CLIENT_ID`: it's the client id of your discord bot application;
- `NEXT_PUBLIC_DISCORD_CLIENT_SECRET`: it's the client secret of your discord bot application;
- `NEXT_PUBLIC_DISCORD_REDIRECT_VERIFICATION_URI`: it's the redirect URI where discord will redirect to after the user authorize the OAuth2 for the verification process;
- `NEXT_PUBLIC_DISCORD_VERIFICATION_AUTH_URL`:  it's the URI created on the discord bot application dashboard where the user will authorize the dapp to get his account info for the verification process (you must enable the identity permission);
- `NEXT_PUBLIC_DISCORD_INTEGRATION_VERIFICATION_URI`: it's the redirect URI where discord will redirect to after the user authorize the OAuth2 for the integration process;
- `NEXT_PUBLIC_DISCORD_INTEGRATION_AUTH_URL`:  it's the URI created on the discord bot application dashboard where the user will authorize the dapp to get his account info for the verification process  (you must enable the identity, guilds, and guilds.members.read permission);
- `NEXT_PUBLIC_DISCORD_API`: it's the discord bot api url;
- `NEXT_PUBLIC_SERVER_CANISTER_ID`: it's the `Motoko` server canister id;
- `NEXT_PUBLIC_NFT_CANISTER_ID`: it's the canister id for the collection used to integrate the bot with the user discord server;

Finally, to run the frontend locally, just use:

```bash
yarn start
```

And to run the backend, you need the [DFINITY SDK](https://internetcomputer.org/docs/current/developer-docs/build/install-upgrade-remove/).

Before the build and deploy process, you need start one ICP Replica. To do that, use

```bash
dfx start --background
```

To create the canister, use:

```bash
dfx canister create <name-of-canister>
```

To build the canister, use:

```bash
dfx build
```

Finally, to run the backend use:

```bash
dfx deploy
```

