import Link from "next/link";

export function Hero(){
  return(
    <>
    <div className="relative px-32 py-10 relative overflow-hidden bg-gray-background">
      <div>
        <h1 className="text-5xl text-blue-200 mb-4 font-bold">
          Join&nbsp;
          <span className="text-pink-200">
            ICP&nbsp;
          </span>
            communities
        </h1>
        <p className="text-white text-xl font-light">
          ICLand verifies web3 identities and delivers key data <br /> to communities
        </p>
      </div>

      <div className="flex justify-between">
        <div className="mx-32">
          <Link href='/verification/'>
            <button className="bg-pink-200 rounded-[28px] py-4 px-20 mt-10 hover:bg-pink-300">
              <span className="text-gray-500 font-bold">
                VERIFY
              </span>
            </button>
          </Link>
        </div>
        <div className="bg-purple-100 rounded-2xl p-8 grid gap-6 pb-36">
          <h1 className="text-white font-bold text-3xl max-w-md">
            Powering communities with our Discord tools
          </h1>
          <div>
            <Link href='/integration/'>
              <button className="bg-gray-200 rounded-[28px] py-3 px-10 hover:bg-gray-300">
                <span className="text-gray-500 font-bold">
                  INTEGRATE
                </span>
              </button>
            </Link>
          </div>
          <div>
            <h2 className="text-blue-100 font-bold text-3xl mb-1">
              Holder Verification
            </h2>
            <p className="text-white text-base">
              Enable exclusive roles and gated social <br /> spaces for token holders
            </p>
          </div>
          <div>
            <h2 className="text-pink-100 font-bold text-3xl mb-1">
              Sales &amp; Listings Bot
            </h2>
            <p className="text-white text-base">
              Bring opportunities to your project&apos;s Discord
            </p>
          </div>
        </div>

      </div>

    
    </div>

</>
  )
}