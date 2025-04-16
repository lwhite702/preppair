
interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressIndicator = ({ currentStep, totalSteps }: ProgressIndicatorProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex space-x-1">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i + 1}
              className={`h-2 w-10 rounded-full ${
                i + 1 === currentStep
                  ? "bg-primary"
                  : i + 1 < currentStep
                  ? "bg-primary/60"
                  : "bg-muted"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</span>
      </div>
    </div>
  );
};
