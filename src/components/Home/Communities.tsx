
export function Communities(){
  return(
    <div className="relative pt-16 overflow-hidden bg-gray-background">
      <div className="bg-center bg-[url('/images/icland3.svg')] bg-no-repeat w-full flex flex-col justify-center items-center">
        <h1 className="text-5xl text-white mb-16 font-bold">Onboarded Communities</h1>
        <div className="bg-gray-100 rounded-2xl mb-20 px-44 py-10 grid gap-y-12">
          <img
            src='/images/dogfinity.png'
            alt='Dog Finity'
            width={223}
            height={223}
          />
          <img
            src='/images/trophies.png'
            alt='Trophies'
            width={233}
            height={233}
          />
        </div>
      </div>
    </div>
  )
}