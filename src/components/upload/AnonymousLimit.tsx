
import { AlertTriangle } from "lucide-react";

const AnonymousLimit = () => {
  return (
    <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md flex items-start">
      <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
      <div>
        <p className="font-medium text-yellow-800">Account required</p>
        <p className="text-sm text-yellow-700">
          You've used your free guide. Please{" "}
          <a href="/auth" className="text-primary hover:underline">
            create an account
          </a>{" "}
          to generate more interview guides.
        </p>
      </div>
    </div>
  );
};

export default AnonymousLimit;
