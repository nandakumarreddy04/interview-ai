import { CustomBreadCrumb } from "@/components/custom-bread-crumb";
import { Headings } from "@/components/headings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ServicesPage = () => {
  return (
    <div className="w-full flex-col space-y-4 p-4 md:p-8">
      <CustomBreadCrumb breadCrumbPage="Services" breadCrumpItems={[]}/>
      <Headings title="Our Services" isSubHeading />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-3">AI-Powered Mock Interviews</CardTitle>
          </CardHeader>
          <CardContent className="text-lg text-muted-foreground space-y-4">
            <p>Experience realistic interview simulations powered by advanced AI. Our platform generates tailored questions for various roles and tech stacks, helping you practice under pressure and refine your communication skills.</p>
            <p>Receive instant, comprehensive feedback on your answers, covering technical accuracy, clarity, and overall effectiveness. Prepare smartly and boost your confidence for your next big opportunity.</p>
          </CardContent>
        </Card>

        <Card className="p-6 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-3">Personalized Feedback & Analytics</CardTitle>
          </CardHeader>
          <CardContent className="text-lg text-muted-foreground space-y-4">
            <p>Our intelligent AI analyzes your spoken and typed responses, providing detailed insights into your strengths and areas for improvement. Track your progress over time with personalized analytics.</p>
            <p>Understand how to articulate your thoughts better, improve your technical explanations, and align your answers with interviewer expectations. Turn every practice session into a learning opportunity.</p>
          </CardContent>
        </Card>
      </div>

      <Card className="p-6 shadow-md mt-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold mb-3">Coding Resources & Practice</CardTitle>
        </CardHeader>
        <CardContent className="text-lg text-muted-foreground space-y-4">
          <p>Beyond mock interviews, we provide curated links to essential coding resources to sharpen your problem-solving skills and expand your technical knowledge:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
            <li><a href="https://www.geeksforgeeks.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GeeksforGeeks (GFG)</a> - A comprehensive portal for computer science fundamentals, algorithms, and data structures.</li>
            <li><a href="https://leetcode.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LeetCode</a> - Practice a vast collection of coding problems to master algorithmic thinking.</li>
            <li><a href="https://takeuforward.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Striver's SDE Sheet</a> - A highly recommended resource for SDE interview preparation, covering crucial DSA topics.</li>
            {/* Add more coding-related articles and links here */}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServicesPage;
