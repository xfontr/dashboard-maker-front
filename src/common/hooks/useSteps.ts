import { useEffect, useState } from "react";

const useSteps = (initialStep: [boolean, number] = [false, 0]) => {
  const [step, setStep] = useState<number>(0);

  const next = () => setStep((currentStep) => currentStep + 1);

  const previous = () => setStep((currentStep) => currentStep - 1);

  const restart = () => setStep(0);

  useEffect(() => {
    if (!initialStep[0]) return;
    setStep(initialStep[1]);
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
