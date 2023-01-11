import { useEffect, useState } from "react";

const useSteps = (initialStep: number = 0) => {
  const [step, setStep] = useState<number>(0);

  const next = () => setStep((currentStep) => currentStep + 1);

  const previous = () =>
    setStep((currentStep) => (currentStep - 1 < 0 ? 0 : currentStep - 1));

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
