import { Communities } from "../components/Home/Communities";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Hero } from "../components/Home/Hero";
import LoginButton from "../components/Buttons/Login";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <img alt="" src="/images/waves.svg" className="hidden xl:block absolute top-[460px] z-50" />
      <Communities />
      <Footer />
    </div>
  )
}