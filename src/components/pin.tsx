import { Interview } from "@/types";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { TooltipButton } from "./tooltip-button";
import { Eye, Newspaper, Sparkles, ArrowRight } from "lucide-react";

interface InterviewPinProps {
  interview: Interview;
  onMockPage?: boolean;
}

export const InterviewPin = ({
  interview,
  onMockPage = false,
}: InterviewPinProps) => {
  const navigate = useNavigate();

  const handleJoinInterview = () => {
    navigate(`/generate/interview/${interview?.id}`, {
      replace: true,
    });
  };

  const isLoading = false; // Placeholder for loading state

  return (
    <Card className="p-4 rounded-md shadow-none hover:shadow-md shadow-gray-100 cursor-pointer transition-all space-y-4">
      <CardTitle className="text-lg">{interview?.position}</CardTitle>
      <CardDescription>{interview?.description}</CardDescription>
      <div className="w-full flex items-center gap-2 flex-wrap">
        {interview?.techStack.split(",").map((word, index) => (
          <Badge
            key={index}
            variant={"outline"}
            className="text-xs text-muted-foreground hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-900"
          >
            {word}
          </Badge>
        ))}
      </div>

      <CardFooter
        className={cn(
          "w-full flex items-center p-0",
          onMockPage ? "justify-end" : "justify-between"
        )}
      >
        <p className="text-[12px] text-muted-foreground truncate whitespace-nowrap">
          {`${new Date(interview?.createdAt.toDate()).toLocaleDateString(
            "en-US",
            { dateStyle: "long" }
          )} - ${new Date(interview?.createdAt.toDate()).toLocaleTimeString(
            "en-US",
            { timeStyle: "short" }
          )}`}
        </p>

        {!onMockPage && (
          <div className="flex items-center justify-center">
            <TooltipButton
              content="View"
              buttonVariant={"ghost"}
              onClick={() => {
                navigate(`/generate/${interview?.id}`, { replace: true });
              }}
              disabled={false}
              buttonClassName="hover:text-sky-500"
              icon={<Eye />}
              loading={false}
            />

            <TooltipButton
              content="Feedback"
              buttonVariant={"ghost"}
              onClick={() => {
                navigate(`/generate/feedback/${interview?.id}`, {
                  replace: true,
                });
              }}
              disabled={false}
              buttonClassName="hover:text-yellow-500"
              icon={<Newspaper />}
              loading={false}
            />

            <TooltipButton
              content="Start Interview"
              buttonVariant={"default"}
              onClick={() => {
                navigate(`/generate/interview/${interview?.id}`, {
                  replace: true,
                });
              }}
              disabled={false}
              buttonClassName="text-white text-base font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center space-x-2"
              icon={<Sparkles className="min-w-5 min-h-5" />}
              loading={false}
            />
          </div>
        )}
      </CardFooter>

      <TooltipButton
        content="Join Interview"
        buttonVariant="default"
        onClick={handleJoinInterview}
        disabled={interview?.id === undefined || isLoading}
        buttonClassName="w-full"
        icon={<ArrowRight />}
        loading={isLoading}
      />
    </Card>
  );
};
