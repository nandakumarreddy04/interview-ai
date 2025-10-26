import { CustomBreadCrumb } from "@/components/custom-bread-crumb";
import { Headings } from "@/components/headings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutUsPage = () => {
  return (
    <div className="w-full flex-col space-y-4 p-4 md:p-8">
      <CustomBreadCrumb breadCrumbPage="About Us" breadCrumpItems={[]}/>
      <Headings title="About Interview.ai" isSubHeading />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="p-6 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-3">Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="text-lg text-muted-foreground space-y-4">
            <p>Interview.ai is an innovative platform designed to help you ace your job interviews using the power of Artificial Intelligence. Our mission is to provide realistic mock interview experiences, personalized feedback, and strategic insights to boost your confidence and performance.</p>
            <p>We leverage cutting-edge AI (Google Gemini) to generate tailored questions, analyze your responses, and offer comprehensive feedback on your communication, technical accuracy, and overall presentation.</p>
          </CardContent>
        </Card>

        <Card className="p-6 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-3">Meet the Developer</CardTitle>
          </CardHeader>
          <CardContent className="text-lg text-muted-foreground space-y-4">
            <p>Hello! I'm Nanda Reddy, a Software Developer passionate about leveraging technology to solve real-world problems. Interview.ai is a testament to this passion.</p>
            <p>My goal with Interview.ai is to create an accessible and effective tool that helps individuals refine their interview skills, understand their strengths, and confidently approach their career goals. I believe in continuous learning and the power of AI to transform traditional interview preparation methods.</p>
          </CardContent>
        </Card>
      </div>

      <Card className="p-6 shadow-md mt-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold mb-3">Why Choose Interview.ai?</CardTitle>
        </CardHeader>
        <CardContent className="text-lg text-muted-foreground space-y-4">
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li>**Personalized AI Feedback:** Get insights tailored to your unique answers.</li>
            <li>**Realistic Mock Interviews:** Practice with questions relevant to your desired role and tech stack.</li>
            <li>**Boost Confidence:** Prepare effectively and reduce interview anxiety.</li>
            <li>**Always Evolving:** We continuously integrate the latest AI advancements to keep you ahead.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutUsPage;
