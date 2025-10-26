/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAuth } from "@clerk/clerk-react";
import {
  Loader,
  Mic,
  RefreshCw,
  Save,
  Video,
  VideoOff,
  WebcamIcon,
  CheckCircle,
  Square,
} from "lucide-react";
import { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import { useParams } from "react-router-dom";
import WebCam from "react-webcam";
import { TooltipButton } from "./tooltip-button";
import { toast } from "sonner";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { Button } from "./ui/button";

interface RecordAnswerProps {
  question: { question: string; answer: string };
  isWebCam: boolean;
  setIsWebCam: (value: boolean) => void;
  initialAnswer?: string;
  onAnswerUpdate?: (answer: string) => void;
  onAnswerSave?: () => void;
  isSaved?: boolean;
}

export const RecordAnswer = ({
  question,
  isWebCam,
  setIsWebCam,
  initialAnswer = "",
  onAnswerUpdate,
  onAnswerSave,
  isSaved = false,
}: RecordAnswerProps) => {
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const [userAnswer, setUserAnswer] = useState(initialAnswer);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (results.length > 0) {
      const lastResult = results[results.length - 1];
      if (typeof lastResult !== 'string') {
        setUserAnswer(lastResult.transcript);
      }
    }
  }, [results, setUserAnswer]);

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  const [localSaved, setLocalSaved] = useState(isSaved);

  const { userId } = useAuth();
  const { interviewId } = useParams();

  // Update parent component when answer changes
  useEffect(() => {
    if (onAnswerUpdate && userAnswer !== initialAnswer) {
      onAnswerUpdate(userAnswer);
    }
  }, [userAnswer]);

  // Load initial answer when switching questions
  useEffect(() => {
    setUserAnswer(initialAnswer);
    setLocalSaved(isSaved);
  }, [question.question, isSaved]);

  const recordNewAnswer = () => {
    setUserAnswer("");
    stopSpeechToText();
    startSpeechToText();
    setLocalSaved(false);
  };

  const handleSaveAnswer = async () => {
    if (!userAnswer || userAnswer.length < 1) {
      toast.error("Error", {
        description: "Please type or record your answer before saving.",
      });
      return;
    }

    setLoading(true);
    const currentQuestion = question.question;
    
    try {
      const userAnswerQuery = query(
        collection(db, "userAnswers"),
        where("userId", "==", userId),
        where("question", "==", currentQuestion)
      );
      const querySnap = await getDocs(userAnswerQuery);
      
      if (!querySnap.empty) {
        toast.info("Already Saved", {
          description: "This answer was already saved",
        });
        setLocalSaved(true);
        if (onAnswerSave) {
          onAnswerSave();
        }
        return;
      }
      
      const answerPayload = {
        mockIdRef: interviewId,
        question: question.question,
        correct_ans: question.answer,
        user_ans: userAnswer,
        userId,
        createdAt: serverTimestamp(),
      };
      
      await addDoc(collection(db, "userAnswers"), answerPayload);
      toast.success("Saved", { description: "Your answer has been saved" });
      setLocalSaved(true);
      
      if (onAnswerSave) {
        onAnswerSave();
      }
    } catch (error) {
      console.error("handleSaveAnswer: Error during save operation:", error);
      toast.error("Error", {
        description: "Failed to save. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mt-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="w-full p-4 border rounded-md bg-background h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">Your Answer:</h2>
              {localSaved && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Saved</span>
                </div>
              )}
            </div>
            <textarea
              value={userAnswer}
              onChange={(e) => {
                setUserAnswer(e.target.value);
                setLocalSaved(false); // Mark as unsaved when editing
              }}
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

        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="w-full h-64 flex flex-col items-center justify-center border p-4 bg-secondary rounded-md">
            {isWebCam ? (
              <WebCam
                onUserMedia={() => setIsWebCam(true)}
                onUserMediaError={() => setIsWebCam(false)}
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
              content={isWebCam ? "Turn Off Webcam" : "Turn On Webcam"}
              icon={isWebCam ? <VideoOff /> : <Video />}
              onClick={() => setIsWebCam(!isWebCam)}
            />
            <TooltipButton
              content={
                isRecording ? "Stop Recording" : "Start Recording Answer"
              }
              icon={
                isRecording ? (
                  <Square size={20} className="mr-2" />
                ) : (
                  <Mic size={20} className="mr-2" />
                )
              }
              onClick={isRecording ? stopSpeechToText : startSpeechToText}
            />
            <TooltipButton
              content="Clear & Record Again"
              icon={<RefreshCw />}
              onClick={recordNewAnswer}
              disabled={isRecording}
            />
          </div>
        </div>
      </div>

      {/* Save Button - Centered */}
      <div className="w-full flex justify-center mt-8">
        <Button
          onClick={handleSaveAnswer}
          variant={localSaved ? "outline" : "brand"}
          size="lg"
          className="text-lg font-semibold px-10 py-5"
          disabled={loading || !userAnswer || localSaved}
        >
          {loading ? (
            <>
              <Loader className="animate-spin mr-2" /> Saving...
            </>
          ) : localSaved ? (
            <>
              <CheckCircle className="mr-2" /> Answer Saved
            </>
          ) : (
            <>
              <Save className="mr-2" /> Save Result
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
