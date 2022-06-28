export enum StepStatus {
  BLOCKED = 'blocked',
  COMPLETE = 'complete',
  CURRENT = 'current',
  UPCOMING = 'upcoming'
}

export interface Step {
  name: string;
  onClick: () => void
  status: StepStatus;
}

interface ISteps {
  steps: Step[]
}

export default function Steps({ steps }: ISteps) {
  return (
    <nav className="flex items-center justify-center" aria-label="Progress">
      <p className="text-gray-500 text-sm font-medium">
        Step {steps.findIndex((step) => step.status === 'current') + 1} of {steps.length}
      </p>
      <ol role="list" className="ml-8 flex items-center space-x-5">
        {steps.map((step) => (
          <li key={step.name}>
            {step.status === StepStatus.COMPLETE ? (
              <span className="cursor-pointer block w-2.5 h-2.5 bg-pink-200 rounded-full hover:bg-pink-300" onClick={step.onClick}>
                <span className="sr-only">{step.name}</span>
              </span>
            ) : step.status === StepStatus.CURRENT ? (
              <span className="cursor-pointer relative flex items-center justify-center" aria-current="step" onClick={step.onClick}>
                <span className="absolute w-5 h-5 p-px flex" aria-hidden="true">
                  <span className="w-full h-full rounded-full bg-pink-100" />
                </span>
                <span className="relative block w-2.5 h-2.5 bg-pink-200 rounded-full" aria-hidden="true" />
                <span className="sr-only">{step.name}</span>
              </span>
            ) : step.status === StepStatus.BLOCKED ? (
              <span className="block w-2.5 h-2.5 bg-gray-200 rounded-full hover:bg-gray-400 pointer-events-none">
                <span className="sr-only">{step.name}</span>
              </span>
            ) : (
              <span className="cursor-pointer block w-2.5 h-2.5 bg-gray-200 rounded-full hover:bg-gray-400" onClick={step.onClick}>
                <span className="sr-only">{step.name}</span>
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}