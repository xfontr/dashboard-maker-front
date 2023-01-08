import "./Steps.scss";

type StepsProps = {
  currentStep: number;
  totalSteps: number;
};

const Steps = ({ currentStep, totalSteps }: StepsProps): JSX.Element => (
  <div className="steps">
    {new Array(totalSteps).fill("").map((_, index) => (
      <span
        key={`step-${index}`}
        className={`steps__step${
          index === currentStep ? " steps__step--current" : ""
        }`}
      >
        {index + 1}
      </span>
    ))}
  </div>
);

export default Steps;
