import { HTMLAttributes } from "react";
import concatIfTrue from "../../../../common/utils/concatIfTrue";
import setProps from "../../../../common/utils/setProps";
import "./Steps.scss";

interface StepsProps extends HTMLAttributes<HTMLDivElement> {
  currentStep: number;
  totalSteps: number;
}

const Steps = ({
  currentStep,
  totalSteps,
  ...rest
}: StepsProps): JSX.Element => (
  <div {...setProps(rest, "className", "steps")}>
    {Array(totalSteps)
      .fill("")
      .map((_, index) => (
        <span
          key={`step-${index}`}
          className={concatIfTrue(
            "steps__step",
            "steps__step--current",
            index === currentStep
          )}
        >
          {index + 1}
        </span>
      ))}
  </div>
);

export default Steps;
