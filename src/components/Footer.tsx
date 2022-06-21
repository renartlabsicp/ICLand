export function Footer(){
  const currentYear = new Date().getFullYear()
  return(
    <div className="relative bg-gray-background py-10">
      <div className="flex flex-col items-center justify-center">
        <a href="https://twitter.com/dogfinity">
        <img
          src='/images/social-twitter.svg'
          alt='twitter'
          width={40}
          height={40}
        />
        </a>
        <div className="flex items-center justify-center">
          <p className="text-white py-2 mx-3">
            Copyright © {currentYear} Renaissance Art Labs
          </p>
          <a href="https://www.renaissanceartlabs.io/">
          <img
            src='/images/Logo 1.png'
            alt='Renaissance Art Labs Logo'
            width={25}
            height={25}
          />
          </a>
        </div>
      </div>
    </div>
  )
}