import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { TooltipButton } from "./tooltip-button";
import { Volume2, VolumeX, CheckCircle } from "lucide-react";
import { RecordAnswer } from "./record-answer";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface QuestionSectionProps {
  questions: { question: string; answer: string }[];
  interviewId?: string;
}

interface AnswerData {
  answer: string;
  saved: boolean;
}

export const QuestionSection = ({ questions, interviewId }: QuestionSectionProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWebCam, setIsWebCam] = useState(false);
  const [currentSpeech, setCurrentSpeech] = useState<SpeechSynthesisUtterance | null>(null);
  const [activeTab, setActiveTab] = useState(questions[0]?.question);
  const navigate = useNavigate();
  
  // Track answers for all questions
  const [answersData, setAnswersData] = useState<Record<string, AnswerData>>(() => {
    const initial: Record<string, AnswerData> = {};
    questions.forEach(q => {
      initial[q.question] = { answer: "", saved: false };
    });
    return initial;
  });

  const handlePlayQuestion = (qst: string) => {
    if (isPlaying && currentSpeech) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentSpeech(null);
    } else {
      if ("speechSynthesis" in window) {
        const speech = new SpeechSynthesisUtterance(qst);
        window.speechSynthesis.speak(speech);
        setIsPlaying(true);
        setCurrentSpeech(speech);
        speech.onend = () => {
          setIsPlaying(false);
          setCurrentSpeech(null);
        };
      }
    }
  };

  const handleAnswerUpdate = (question: string, answer: string) => {
    setAnswersData(prev => ({
      ...prev,
      [question]: {
        answer,
        saved: false
      }
    }));
  };

  const handleAnswerSave = (question: string) => {
    setAnswersData(prev => ({
      ...prev,
      [question]: {
        ...prev[question],
        saved: true
      }
    }));
  };

  const allQuestionsAnswered = () => {
    return questions.every(q => answersData[q.question]?.saved);
  };

  const handleSubmitAll = () => {
    if (allQuestionsAnswered()) {
      toast.success("All answers submitted successfully!");
      // Navigate to feedback page with interview ID
      if (interviewId) {
        navigate(`/generate/interview/${interviewId}/feedback`);
      } else {
        navigate("/generate");
      }
    } else {
      toast.error("Please answer and save all questions before submitting");
    }
  };

  return (
    <div className="w-full">
      <div className="w-full min-h-96 border rounded-md p-4">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full space-y-12"
          orientation="vertical"
        >
          <TabsList className="bg-transparent w-full flex flex-wrap items-center justify-start gap-4">
            {questions?.map((tab, i) => (
              <TabsTrigger
                className={cn(
                  "data-[state=active]:bg-emerald-200 data-[state=active]:shadow-md text-xs px-2 relative"
                )}
                key={tab.question}
                value={tab.question}
              >
                {`Question #${i + 1}`}
                {answersData[tab.question]?.saved && (
                  <CheckCircle className="w-3 h-3 text-green-600 absolute -top-1 -right-1" />
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {questions?.map((tab, i) => (
            <TabsContent key={i} value={tab.question}>
              <div className="flex items-start justify-between mb-4">
                <p className="text-base text-left tracking-wide text-neutral-500 flex-1 pr-4">
                  {tab.question}
                </p>
                <TooltipButton
                  content={isPlaying ? "Stop" : "Play Question"}
                  icon={
                    isPlaying ? (
                      <VolumeX className="min-w-5 min-h-5 text-muted-foreground" />
                    ) : (
                      <Volume2 className="min-w-5 min-h-5 text-muted-foreground" />
                    )
                  }
                  onClick={() => handlePlayQuestion(tab.question)}
                />
              </div>

              <RecordAnswer
                question={tab}
                isWebCam={isWebCam}
                setIsWebCam={setIsWebCam}
                initialAnswer={answersData[tab.question]?.answer}
                onAnswerUpdate={(answer) => 
                  handleAnswerUpdate(tab.question, answer)
                }
                onAnswerSave={() => handleAnswerSave(tab.question)}
                isSaved={answersData[tab.question]?.saved}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Submit All Button - Outside the tabs container for proper alignment */}
      <div className="mt-8 flex justify-center">
        <Button
          onClick={handleSubmitAll}
          variant="brand"
          size="lg"
          className="text-lg font-semibold px-10 py-5"
          disabled={!allQuestionsAnswered()}
        >
          Submit All Answers ({questions.filter(q => answersData[q.question]?.saved).length}/{questions.length})
        </Button>
      </div>
    </div>
  );
};
