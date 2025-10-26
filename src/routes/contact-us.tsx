import { CustomBreadCrumb } from "@/components/custom-bread-crumb";
import { Headings } from "@/components/headings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactUsPage = () => {
  return (
    <div className="w-full flex-col space-y-4 p-4 md:p-8">
      <CustomBreadCrumb breadCrumbPage="Contact Us" breadCrumpItems={[]}/>
      <Headings title="Contact Interview.ai" isSubHeading />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="p-6 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-3">Get in Touch</CardTitle>
          </CardHeader>
          <CardContent className="text-lg text-muted-foreground space-y-4">
            <p>Have questions, feedback, or need support? We're here to help! Feel free to reach out to us using the contact information below.</p>
            <p>We aim to respond to all inquiries within 24-48 hours.</p>
          </CardContent>
        </Card>

        <Card className="p-6 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-3">Our Details</CardTitle>
          </CardHeader>
          <CardContent className="text-lg text-muted-foreground space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="min-w-6 min-h-6 text-primary" />
              <span>Email: <a href="mailto:nanda@gmail.com" className="text-blue-600 hover:underline">nanda@gmail.com</a></span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="min-w-6 min-h-6 text-primary" />
              <span>Phone: <a href="tel:+919999999999" className="text-blue-600 hover:underline">+91 9999999999</a></span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="min-w-6 min-h-6 text-primary" />
              <span>Address: HSR Layout, Bengaluru, Karnataka - 560102</span>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* You can add a contact form here later */}
    </div>
  );
};

export default ContactUsPage;
