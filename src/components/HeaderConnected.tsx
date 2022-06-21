import Link from "next/link";
import { Principal } from "@dfinity/principal";

import { useGlobalContext } from "../hooks";

function shortPrincipal(principal: string | Principal) {
  const parts = (
    typeof principal === "string" ? principal : principal.toText()
  ).split("-");
  return `${parts[0]}...${parts.slice(-1)[0]}`;
};

export function HeaderConnect() {
  const {
    state: { principal },
  } = useGlobalContext();

  return (
    <div className="flex justify-between align-middle px-32 py-10 relative overflow-hidden bg-gray-background">
      <Link href='/'>
        <div className="flex align-middle justify-center items-center hover:cursor-pointer">
          <img 
            src='/images/Logo.png'
            alt='Logo'
            width={50}
            height={50}
          />
          <div className="flex text-3xl font-bold">
            <span className="text-blue-200">IC</span>
            <span className="text-pink-200">LAND</span>
          </div>
        </div>
      </Link>
      <div className="flex items-center">
        { principal && <p className="text-blue-200 mr-5"> {shortPrincipal(principal)} </p>}
        <Link href='/'>
          <button className="bg-gray-200 rounded-[28px] py-2 px-10 hover:bg-pink-300">
            <span className="text-gray-500 font-bold">
              DISCONNECT
            </span>
          </button>
        </Link>
      </div>
    </div>
  )
}