import Link from "next/link";

export function Header() {
  return (
    <div className="flex justify-between align-middle px-32 py-10 relative overflow-hidden bg-gray-background">
      <Link href='/'>
        <div className="flex align-middle justify-center items-center hover:cursor-pointer">
          <img 
            src='/images/logo.svg'
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
      <Link href='/verification/'>
        <button className="bg-pink-200 rounded-[28px] px-10 hover:bg-pink-300">
          <span className="text-gray-500 text-sm font-bold">
            VERIFY
          </span>
        </button>
      </Link>
    </div>
  )
}