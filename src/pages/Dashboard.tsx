
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UploadForm from "@/components/UploadForm";
import GuideDisplay from "@/components/GuideDisplay";

const Dashboard = () => {
  const [generatedGuide, setGeneratedGuide] = useState<string | null>(null);

  const handleGuideGenerated = (markdownContent: string) => {
    setGeneratedGuide(markdownContent);
    
    // Scroll to the guide display
    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById("guideDisplay")?.offsetTop || 0,
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8 md:py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto mb-12">
            <h1 className="heading-lg mb-4 text-center">Create Your Interview Guide</h1>
            <p className="text-center text-muted-foreground">
              Upload your resume and provide job details to generate a
              personalized interview guide.
            </p>
          </div>

          {!generatedGuide ? (
            <UploadForm onGuideGenerated={handleGuideGenerated} />
          ) : (
            <div id="guideDisplay" className="w-full">
              <GuideDisplay markdownContent={generatedGuide} />
              <div className="mt-8 text-center">
                <button
                  onClick={() => setGeneratedGuide(null)}
                  className="text-primary underline"
                >
                  Create another guide
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
