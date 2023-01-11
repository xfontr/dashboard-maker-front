import { useEffect, useState } from "react";

const useSteps = (initialStep: number = 0) => {
  const [step, setStep] = useState<number>(0);

  /** Increases the current step by one */
  const next = (): void => setStep((currentStep) => currentStep + 1);

  /** Decreases the current step by one. If 0 or less, it will keep it as 0 */
  const previous = (): void =>
    setStep((currentStep) => (currentStep - 1 < 0 ? 0 : currentStep - 1));

  /**
   * Restarts the step count, establishing it at the initial step, or 0 as
   * default
   */
  const restart = () => setStep(initialStep);

  useEffect(() => {
    if (!initialStep) return;
    setStep(initialStep);
  }, [initialStep]);

  return {
    next,
    previous,
    restart,
    step,
    setStep,
  };
};

export default useSteps;
