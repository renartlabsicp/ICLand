import Link from "next/link";
import LoginButton from "../../components/Buttons/Login";
import { Footer } from "../../components/Footer";

export default function Verify() {
  return (
    <div className="relative overflow-hidden bg-gray-background flex flex-col justify-between h-screen">
      <Link href='/'>
        <div className="flex justify-between align-middle px-32 py-10 hover:cursor-pointer">
          <div className="flex align-middle justify-center items-center">
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
        </div>
      </Link>
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-blue-200 text-5xl font-bold mb-10">Discord Verification</h2>
        <LoginButton />
      </div>
      <Footer />
    </div>
  )
}