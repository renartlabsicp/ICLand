import Link from "../../../node_modules/next/link"
import { useGlobalContext } from "../../hooks";
import { Principal } from "@dfinity/principal";
import { User } from "../../types/user";

const payments = [
  {
    id: 1,
    title: 'SECRET NFT',
    imageSrc: '/images/nft.png',
    description: 'All tools will be enabled for  as long as you hold one or more these secret NFTs',
  },
]

function shortPrincipal(principal: string | Principal) {
  const parts = (
    typeof principal === "string" ? principal : principal.toText()
  ).split("-");
  return `${parts[0]}...${parts.slice(-1)[0]}`;
};

interface IForms {
  discriminator: string;
  username: string;
}

export function Forms({ discriminator, username }) {
  const {
    state: { principal },
  } = useGlobalContext();

  const walletAdress = principal?.toText();
  return (
    <>

      <div className="mt-6 gap-y-10 gap-x-12 mb-8 px-12">
        {payments.map((payments) => (
          <div key={payments.id} className=" justify-center text-center relative border border-gray-100 p-2">
            <div className="flex justify-center w-full overflow-hidden group-hover:opacity-75">
              <img src={payments.imageSrc} />
            </div>
            <div className="m-4 flex justify-center">
              <div>
                <h3 className="font-bold text-md text-white">
                  HODL OUR {payments.title}
                </h3>
                <p className="font-white text-md text-white my-2">{payments.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="text-white text-center text-lg ">
          Principal ID required to HODL our NFT:&nbsp;
          <span className="text-pink-200">{walletAdress} <br /></span>
        </p>
        <p className="text-white text-center text-lg ">
          Discord required to invite the ICLand bot:&nbsp;
          <span className="text-pink-200">{`${username}#${discriminator}`} <br /></span>
        </p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="text-white text-center text-lg mb-20 my-10">
          After acquiring our NFTs you can go back to your project&apos;s Discord server, invite ICLand&apos;s bot <br /> and finish the integration.
        </p>
      </div>
      <Link href='/verification/'>
        <button className="bg-gray-200 rounded-[28px] py-2 px-10 hover:bg-pink-300">
          <span className="text-gray-500 font-bold">
            CHANGE DISCORD ACCOUNT
          </span>
        </button>
      </Link>
    </>
  )
}