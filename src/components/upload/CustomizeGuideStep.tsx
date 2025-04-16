
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight } from "lucide-react";

interface CustomizeGuideStepProps {
  tone: string;
  interviewFormat: "virtual" | "phone" | "in-person";
  onToneChange: (value: string) => void;
  onInterviewFormatChange: (value: string) => void;
  onPrevStep: () => void;
  onNextStep: () => void;
}

export const CustomizeGuideStep = ({
  tone,
  interviewFormat,
  onToneChange,
  onInterviewFormatChange,
  onPrevStep,
  onNextStep,
}: CustomizeGuideStepProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-2">Customize Your Guide</h2>
      <p className="text-muted-foreground mb-4">
        Everyone has their own style. Choose the voice that fits you best—we'll write your prep guide to match.
      </p>
      
      <div className="space-y-4">
        <h3 className="font-medium">Guide Tone</h3>
        <RadioGroup
          value={tone}
          onValueChange={onToneChange}
          className="space-y-4"
        >
          <div className="flex items-center space-x-2 p-3 border rounded-md hover:bg-muted/50 cursor-pointer">
            <RadioGroupItem value="friendly" id="friendly" />
            <Label htmlFor="friendly" className="cursor-pointer w-full">
              <div className="font-medium">Friendly + Casual</div>
              <p className="text-sm text-muted-foreground">Conversational and approachable</p>
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-3 border rounded-md hover:bg-muted/50 cursor-pointer">
            <RadioGroupItem value="professional" id="professional" />
            <Label htmlFor="professional" className="cursor-pointer w-full">
              <div className="font-medium">Professional + Polished</div>
              <p className="text-sm text-muted-foreground">Formal and business-oriented</p>
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-3 border rounded-md hover:bg-muted/50 cursor-pointer">
            <RadioGroupItem value="confident" id="confident" />
            <Label htmlFor="confident" className="cursor-pointer w-full">
              <div className="font-medium">Confident + Direct</div>
              <p className="text-sm text-muted-foreground">Bold and straight to the point</p>
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-3 border rounded-md hover:bg-muted/50 cursor-pointer">
            <RadioGroupItem value="quick" id="quick" />
            <Label htmlFor="quick" className="cursor-pointer w-full">
              <div className="font-medium">Quick Start — No Tone, Just Prep</div>
              <p className="text-sm text-muted-foreground">Get straight to the content</p>
            </Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="space-y-4 mt-6">
        <h3 className="font-medium">Interview Format</h3>
        <RadioGroup
          value={interviewFormat}
          onValueChange={onInterviewFormatChange}
          className="space-y-4"
        >
          <div className="flex items-center space-x-2 p-3 border rounded-md hover:bg-muted/50 cursor-pointer">
            <RadioGroupItem value="virtual" id="virtual" />
            <Label htmlFor="virtual" className="cursor-pointer w-full">
              <div className="font-medium">Virtual Interview</div>
              <p className="text-sm text-muted-foreground">Video call or online meeting</p>
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-3 border rounded-md hover:bg-muted/50 cursor-pointer">
            <RadioGroupItem value="phone" id="phone" />
            <Label htmlFor="phone" className="cursor-pointer w-full">
              <div className="font-medium">Phone Interview</div>
              <p className="text-sm text-muted-foreground">Voice-only conversation</p>
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-3 border rounded-md hover:bg-muted/50 cursor-pointer">
            <RadioGroupItem value="in-person" id="in-person" />
            <Label htmlFor="in-person" className="cursor-pointer w-full">
              <div className="font-medium">In-Person Interview</div>
              <p className="text-sm text-muted-foreground">Face-to-face at their location</p>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={onPrevStep}>
          Back
        </Button>
        <Button onClick={onNextStep}>
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
