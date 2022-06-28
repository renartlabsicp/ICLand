import { ChangeEvent, useState } from "react"
import fetch from 'cross-fetch'
import { HttpAgent } from '@dfinity/agent'
import { getNFTActor, getNFTInfo } from '@psychedelic/dab-js'
import axios from "axios"
import { useGlobalContext } from "../../hooks"
import { allowedNFTStandards } from "../../lib/constants"
import { makeServerActor } from "../../lib/makeServerActor"
import type { Guild } from "../../types/guild"
import LoadingLabel from "../Buttons/LoadingLabel"
import PinkButton from "../Buttons/PinkButton"
import Steps, { Step, StepStatus } from "../Steps"
import InputField from "../Inputs/InputField"
import Select, { ISelect } from "../Inputs/Select"
import LoadingSpinner, { LoadingStatus } from "../Loading/LoadingSpinner"

interface IIntegrateForms {
  guilds: any[]
}

export default function IntegrateForms({ guilds }: IIntegrateForms) {
  const { state: { principal } } = useGlobalContext()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>(LoadingStatus.UNKNOWN)
  const [NFTCanisterError, setNFTCanisterError] = useState<boolean>(false)
  const [selectedGuild, setGuild] = useState(guilds[0])
  const [guildData, setGuildData] = useState<Guild>()
  const [selectedStandard, setStandard] = useState(allowedNFTStandards[0])
  const [progress, setProgress] = useState(0)
  const [steps, setSteps] = useState<Step[]>([
    { name: 'Step 1', onClick: () => handleStepProgress(0), status: StepStatus.CURRENT },
    { name: 'Step 2', onClick: () => handleStepProgress(1), status: StepStatus.BLOCKED },
    { name: 'Step 3', onClick: () => handleStepProgress(2), status: StepStatus.BLOCKED }
  ])

  const handleGuildData = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === "nftCanisterId") {
      try {
        await getNFTInfo({
          nftCanisterId: value,
          agent: new HttpAgent({
            fetch,
            host: 'https://ic0.app'
          }),
        })
        setNFTCanisterError(false)
      } catch (err) {
        setNFTCanisterError(true)
      }
    }

    setGuildData(previousData => ({
      ...previousData,
      [name]: value
    }))
  }

  const handleStepProgress = (stepIndex) => {

    setSteps(previousState => {
      const nextState = previousState
      nextState.forEach((_v, index) => {
        if (index < stepIndex) {
          nextState[index].status = StepStatus.COMPLETE
        } else if (index === stepIndex) {
          nextState[index].status = StepStatus.CURRENT
        } else {
          if (nextState[index].status !== StepStatus.BLOCKED) {
            nextState[index].status = StepStatus.COMPLETE
          } else {
            nextState[index].status = StepStatus.BLOCKED
          }
        }
      })
      return nextState
    })
    setProgress(stepIndex)
  }

  const verifyNFT = async () => {
    setIsLoading(true)
    const nftActor = getNFTActor({
      canisterId: process.env.NEXT_PUBLIC_NFT_CANISTER_ID,
      agent: new HttpAgent({
        fetch,
        host: 'https://ic0.app'
      }),
      standard: 'EXT'
    })
    const userNFTs = await nftActor.getUserTokens(principal)

    if (userNFTs.length) {
      handleStepProgress(1)
    }
    setIsLoading(false)
  }

  const checkGuilds = async () => {
    setIsLoading(true)
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_DISCORD_API}checkGuild`,
      {
        id: selectedGuild.id
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      })

    const { status } = response.data
    if (status) {
      handleStepProgress(2)
    }
    setIsLoading(false)
  }

  const submitGuild = async () => {
    setProgress(3)
    setIsLoading(true)
    setLoadingStatus(LoadingStatus.WAITING)
    const serverActor = makeServerActor()
    const body = {
      ...guildData,
      id: selectedGuild.id,
      isActive: true,
      owner: principal.toText(),
      nftStandard: selectedStandard.id
    }

    try {
      await serverActor.createGuild(selectedGuild.id, body)
      setLoadingStatus(LoadingStatus.SUCCESS)
    } catch (err) {
      setLoadingStatus(LoadingStatus.ERROR)
    }
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col mx-auto h-[580px] w-full max-w-xl bg-gray-400 overflow-hidden shadow rounded-lg">
      <div className="text-xl font-semibold text-gray-500 px-4 py-5 sm:px-6">
        {progress === 0 ? (
          "NFT verification"
        ) : progress === 1 ? (
          "Discord bot verification"
        ) : progress === 2 ? (
          "Organization information"
        ) : ("")}
      </div>
      <div className="h-full text-gray-500 px-4 py-5 sm:p-6">
        <div className="h-full mx-auto max-w-md flex flex-col gap-4 items-center">
          {progress === 0 ? (
            <FirstStep disableVerify={!principal} isVerifying={isLoading} verifyNFT={() => verifyNFT()} />
          ) : progress === 1 ? (
            <SecondStep
              checkGuilds={() => checkGuilds()}
              elements={guilds}
              isVerifying={isLoading}
              selectedElement={selectedGuild}
              setElement={setGuild}
            />
          ) : progress === 2 ? (
            <ThirdStep
              disableSubmit={(guildData ? (Object.keys(guildData).length !== 3) : (true)) || NFTCanisterError}
              elements={allowedNFTStandards}
              handleGuildData={handleGuildData}
              NFTCanisterError={NFTCanisterError}
              isSubmitting={isLoading}
              selectedElement={selectedStandard}
              setElement={setStandard}
              submitGuild={() => submitGuild()}
            />
          ) : (
            <>
              <LoadingSpinner status={loadingStatus} />
              <span className="text-xl text-center">{loadingStatus === LoadingStatus.SUCCESS ? (
                "Congratulations, the bot is active in your server now!"
              ) : loadingStatus === LoadingStatus.ERROR ? (
                "Something went wrong. Please try again in some minutes!"
              ) : (
                "Submitting your information, please wait!"
              )}
              </span>
            </>
          )}
        </div>
      </div>
      {progress < 3 &&
        <div className="mt-auto px-4 py-4 sm:px-6">
          <Steps steps={steps} />
        </div>
      }
    </div>

  )
}

interface IFirstStep {
  disableVerify: boolean;
  isVerifying: boolean;
  verifyNFT: () => void;
}

function FirstStep({ disableVerify, isVerifying, verifyNFT }: IFirstStep) {
  return (
    <>
      <div>You must have at least one DogFinity NFT on you wallet to be able to active the ICLand Bot on your server!</div>
      <img
        src='/images/dogfinity.png'
        alt='Dog Finity'
        width={223}
        height={223}
      />
      <div>If you don&apos;t have any DogFinity NFT, purchase one here.</div>
      <div className="mt-auto flex flex-col gap-1 items-center">
        {disableVerify && <span className="text-sm text-gray-500 opacity-50">Waiting reestablish connection with wallet ...</span>}
        <PinkButton disabled={disableVerify} onClick={verifyNFT}>
          <LoadingLabel isLoading={isVerifying} label="verify" />
        </PinkButton>
      </div>
    </>
  )
}

interface ISecondStep extends ISelect {
  checkGuilds: () => void;
  isVerifying: boolean;
}

function SecondStep({ checkGuilds, elements, isVerifying, selectedElement, setElement }: ISecondStep) {
  return (
    <>
      <div className="w-full flex flex-col gap-4 grow-1 items-center">
        <span className="max-w-md">To verify you server, please follow the instructions bellow:</span>
        <div className="max-w-sm w-full  text-sm">
          <ol className="list-decimal">
            <li>Select one of the Discord servers.</li>
            <li>Click on the <b className="text-pink-100 opacity-50">ADD BOT</b>. A new tab will open, select the same server and authorize the bot.</li>
            <li>Click on the <b className="text-pink-100 opacity-50">VERIFY</b> after the bot was successfully added to your server</li>
          </ol>
          PS: The select will only show servers that you own!
        </div>
        <div className="w-full max-w-sm flex flex-col gap-2 items-center">
          <Select elements={elements} label="Server" selectedElement={selectedElement} setElement={setElement} />
          <span className="max-w-xs text-xs text-center">To pass the verification step, the bot must be added to the server selected</span>
        </div>
      </div>
      <div className="mt-auto flex flex-col items-center gap-4">
        <a
          className="w-40 bg-pink-200 rounded-[28px] py-2 px-3 text-center hover:bg-pink-300"
          href="https://discord.com/api/oauth2/authorize?client_id=982115420318367814&permissions=8&scope=bot%20applications.commands"
          target="_blank"
          rel="noreferrer"
        >
          <span className="text-white font-semibold uppercase">add bot</span>
        </a>
        <PinkButton onClick={checkGuilds}>
          <LoadingLabel isLoading={isVerifying} label="verify" />
        </PinkButton>
      </div>
    </>
  )
}

interface IThirdStep extends ISelect {
  disableSubmit: boolean;
  handleGuildData: (e: ChangeEvent<HTMLInputElement>) => void;
  NFTCanisterError: boolean;
  isSubmitting: boolean;
  submitGuild: () => void;
}

function ThirdStep({ disableSubmit, elements, handleGuildData, NFTCanisterError, isSubmitting, selectedElement, setElement, submitGuild }: IThirdStep) {
  return (
    <>
      <div>Fullfil the forms bellow and submit to active the bot!</div>
      <InputField
        label="Name"
        name="name"
        onChange={handleGuildData}
        placeholder="Organization name"
        type="text" />
      <InputField
        description="In the feature, you&apos;ll be able to add more than one canister!"
        error={NFTCanisterError}
        label="Canister ID"
        name="nftCanisterId"
        onChange={handleGuildData}
        placeholder="Collection canister id"
        type="text" />
      <Select elements={elements}
        label="NFT Standard" selectedElement={selectedElement} setElement={setElement} />
      <InputField
        label="Website"
        name="website"
        onChange={handleGuildData}
        placeholder="Organization website URL"
        type="text" />
      <div className="mt-auto">
        <PinkButton disabled={disableSubmit} onClick={submitGuild}>
          <LoadingLabel isLoading={isSubmitting} label="submit" />
        </PinkButton>
      </div>
    </>
  )
}