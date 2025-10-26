import { CustomBreadCrumb } from "@/components/custom-bread-crumb";
import { Headings } from "@/components/headings";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { chatSession } from "@/scripts";
import useSpeechToText, { ResultType } from "react-hook-speech-to-text";
import { Mic, CircleStop, RefreshCw, Loader, Video, VideoOff, WebcamIcon } from "lucide-react";
import { TooltipButton } from "@/components/tooltip-button";
import WebCam from "react-webcam";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const GUEST_STORAGE_KEY = "interview_ai_guest_session";
const INTERVIEW_CATEGORIES = [
  "Software Development Engineer (SDE)", 
  "Frontend Developer", 
  "Backend Developer", 
  "DevOps Engineer",
  "Cloud Engineer",
  "Data Scientist",
  "Product Manager",
  "UI/UX Designer",
  "Human Resources (HR)",
  "Marketing",
  "Sales",
  "Non-Technical Roles"
];

const GuestInterviewPage = () => {
  const [question, setQuestion] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<any | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isWebCamEnabled, setIsWebCamEnabled] = useState(false);

  const { 
    interimResult, 
    isRecording, 
    results, 
    startSpeechToText, 
    stopSpeechToText 
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    const savedSession = sessionStorage.getItem(GUEST_STORAGE_KEY);
    if (savedSession) {
      const { savedQuestion, savedAnswer, savedFeedback, savedCategory } = JSON.parse(savedSession);
      setQuestion(savedQuestion);
      setUserAnswer(savedAnswer);
      setFeedback(savedFeedback);
      setSelectedCategory(savedCategory);
    }
  }, []);

  useEffect(() => {
    if (question || userAnswer || feedback || selectedCategory) {
      sessionStorage.setItem(
        GUEST_STORAGE_KEY,
        JSON.stringify({
          savedQuestion: question,
          savedAnswer: userAnswer,
          savedFeedback: feedback,
          savedCategory: selectedCategory,
        })
      );
    }
  }, [question, userAnswer, feedback, selectedCategory]);

  useEffect(() => {
    const combineTranscripts = results
      .filter((result): result is ResultType => typeof result !== "string")
      .map((result) => result.transcript)
      .join(" ");

    setUserAnswer(combineTranscripts);
  }, [results]);

  const generateGuestQuestion = async () => {
    if (!selectedCategory) {
      toast.error("Error", { description: "Please select an interview category first." });
      return;
    }
    setLoading(true);
    setQuestion(null); // Clear previous question
    setUserAnswer(""); // Clear previous answer
    setFeedback(null); // Clear previous feedback
    stopSpeechToText(); // Ensure recording is stopped
    // sessionStorage.removeItem(GUEST_STORAGE_KEY); // Keep session for category selection
    try {
      const prompt = `
        As an experienced prompt engineer, generate a single technical interview question. Focus on a common entry-level web development topic (e.g., JavaScript closures, React component lifecycle, CSS Box Model, REST API basics) for a ${selectedCategory} role. Provide only the question text, no answer or additional formatting.
      `;
      const aiResult = await chatSession.sendMessage(prompt);
      setQuestion(aiResult.response.text());
      setFeedback(null); // Reset feedback for new question
      setUserAnswer(""); // Reset answer
    } catch (error) {
      console.error("Error generating guest question:", error);
      toast.error("Error", {
        description: "Failed to generate interview question. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Placeholder for recording answer and getting feedback (will be detailed later)
  const handleRecordAnswer = () => {
    if (isRecording) {
      stopSpeechToText();
      if (userAnswer.length < 10) { // Reduced min length for guest mode
        toast.error("Error", {
          description: "Your answer should be at least 10 characters long.",
        });
        return;
      }
    } else {
      startSpeechToText();
    }
  };

  const handleResetGuestInterview = () => {
    setQuestion(null);
    setUserAnswer("");
    setFeedback(null);
    stopSpeechToText();
    sessionStorage.removeItem(GUEST_STORAGE_KEY);
    toast.info("Reset", { description: "Guest interview session has been reset." });
  };

  const handleSubmitAnswer = async () => {
    if (!userAnswer || !question) {
      toast.error("Error", { description: "Please record an answer first." });
      return;
    }
    setLoading(true);
    try {
      // Simulate AI feedback generation
      const feedbackPrompt = `
        User Answer: "${userAnswer}"
        Question: "${question}"
        Provide concise feedback (2-3 sentences) on the user's answer to the question. Focus on clarity, accuracy, and completeness.
      `;
      const aiFeedback = await chatSession.sendMessage(feedbackPrompt);
      setFeedback({ text: aiFeedback.response.text() });
      toast.success("Feedback Generated", { description: "AI feedback is ready." });
    } catch (error) {
      console.error("Error generating feedback:", error);
      toast.error("Error", { description: "Failed to generate feedback." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex-col space-y-4 p-4 md:p-8">
      <CustomBreadCrumb breadCrumbPage="Guest Interview" breadCrumpItems={[]} />
      <Headings title="Take a Quick Interview (Guest Mode)" isSubHeading />

      {!question ? (
        // STATE 1: Category Selection (remains the same)
        <Card className="p-6 shadow-md mt-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-3">Choose an Interview Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {INTERVIEW_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`py-3 px-4 rounded-md text-lg font-semibold transition-colors 
                    ${selectedCategory === category ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}
                  `}
                  disabled={loading}
                >
                  {category}
                </button>
              ))}
            </div>

            {selectedCategory && (
              <div className="mt-8 flex justify-center">
                <Button
                  onClick={generateGuestQuestion}
                  disabled={loading}
                  variant="brand"
                  size="lg"
                  className="text-xl font-bold px-12 py-6"
                >
                  {loading ? (
                    <span className="flex items-center space-x-2">
                      <Loader className="animate-spin mr-2" size={20} />
                      <span>Generating Question...</span>
                    </span>
                  ) : (
                    <span>Generate Question</span>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        // STATE 2: Interview In Progress (New 2-column layout)
        <div className="w-full mt-4 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Question and Answer */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Interview Question ({selectedCategory})</CardTitle>
                </CardHeader>
                <CardContent className="text-lg text-muted-foreground">
                  {question}
                </CardContent>
              </Card>

              <div className="w-full p-4 border rounded-md bg-background h-full flex flex-col">
                <h2 className="text-xl font-semibold text-foreground mb-4">Your Answer:</h2>
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Click 'Start Recording' to speak, or type your answer here..."
                  className="w-full flex-grow p-3 bg-input text-foreground border rounded-md focus:ring-2 focus:ring-ring focus:outline-none"
                  rows={10}
                  disabled={isRecording}
                />
                {interimResult && (
                  <p className="text-sm text-muted-foreground mt-2">
                    <strong>Recording:</strong> {interimResult}
                  </p>
                )}
              </div>
            </div>

            {/* Right Column: Webcam and Controls */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <div className="w-full h-64 flex flex-col items-center justify-center border p-4 bg-secondary rounded-md">
                {isWebCamEnabled ? (
                  <WebCam
                    onUserMedia={() => setIsWebCamEnabled(true)}
                    onUserMediaError={() => setIsWebCamEnabled(false)}
                    mirrored={true}
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <WebcamIcon className="min-w-16 min-h-16" />
                    <p className="text-sm text-center">Webcam is off</p>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-center gap-4">
                <TooltipButton
                  content={isWebCamEnabled ? "Turn Off Webcam" : "Turn On Webcam"}
                  icon={isWebCamEnabled ? <VideoOff /> : <Video />}
                  onClick={() => setIsWebCamEnabled(!isWebCamEnabled)}
                />
                <TooltipButton
                  content={isRecording ? "Stop Recording" : "Start Recording"}
                  icon={isRecording ? <CircleStop /> : <Mic />}
                  onClick={handleRecordAnswer}
                  disabled={isRecording && userAnswer.length === 0}
                />
                <TooltipButton
                  content="Record Again"
                  icon={<RefreshCw />}
                  onClick={handleResetGuestInterview}
                  disabled={isRecording}
                />
              </div>
            </div>
          </div>

          {/* AI Feedback and Get Feedback Button (Full Width Below Columns) */}
          {feedback && (
            <div className="w-full mt-8 p-6 border rounded-md bg-background flex flex-col items-center gap-6">
              <div className="p-4 border rounded-lg shadow-md bg-card w-full">
                <h3 className="text-2xl font-bold text-primary mb-4">AI Feedback:</h3>
                <p className="text-base mt-2">{feedback.text}</p>
              </div>
            </div>
          )}

          <div className="w-full flex justify-center mt-8">
            <Button
              onClick={handleSubmitAnswer}
              disabled={loading || !userAnswer}
              variant="brand"
              size="lg"
              className="text-lg font-semibold px-10 py-5"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin mr-2" /> Getting Feedback...
                </>
              ) : (
                <>Submit for Feedback</>
              )}
            </Button>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleResetGuestInterview}
              className="text-red-500 hover:underline text-sm"
            >
              Start a New Guest Interview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestInterviewPage;
