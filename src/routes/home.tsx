import { Container } from "@/components/container";
import { Headings } from "@/components/headings";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@clerk/clerk-react";
import { Sparkles, UserCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { userId } = useAuth();
  const getStartedPath = userId ? "/generate" : "/guest-interview";

  return (
    <div className="flex-col w-full pb-24">
      <Container>
        <div className="my-8 text-center">
          <h2 className="text-3xl md:text-6xl">
            <span className=" text-outline font-extrabold md:text-8xl">
              AI Superpower
            </span>
            <span className="text-gray-500 font-extrabold">
              - A better way to
            </span>
            <br />
            improve your interview chances and skills
          </h2>
          <p className="mt-4 text-muted-foreground text-sm">
            Boost your interview skills and increase your success rate with
            AI-driven insights. Discover a smarter way to prepare, practice, and
            stand out.
          </p>
          
          {!userId ? (
            <div className="mt-8 flex flex-col items-center gap-4 w-full max-w-lg mx-auto">
              {/* Guest Interview Card */}
              <Card className="w-full border-2 hover:border-primary transition-colors duration-200 shadow-lg">
                <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold text-primary">Try as Guest</h3>
                    <p className="text-base text-muted-foreground mt-1">
                      No sign-up needed. Experience one free question.
                    </p>
                  </div>
                  <Link to="/guest-interview">
                    <Button size="lg" variant="brand" className="group text-lg px-8 py-4">
                      Start Free <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Sign In Card */}
              <Card className="w-full border hover:border-accent transition-colors duration-200">
                <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold">Full Experience</h3>
                    <p className="text-base text-muted-foreground mt-1">
                      Sign in for unlimited interviews & progress tracking.
                    </p>
                  </div>
                  <Link to="/signin">
                    <Button size="lg" variant="brand" className="group text-lg px-8 py-4">
                      <UserCircle className="mr-2 h-5 w-5" /> Sign In
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Link to={getStartedPath} className="inline-block mt-8">
              <Button size="lg" variant="brand" className="text-lg font-semibold px-8 py-6 group">
                Take an Interview <Sparkles className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              </Button>
            </Link>
          )}
        </div>

        {/* image section */}
        <div className="w-full flex items-center justify-center mt-12">
          <img
            src="/assets/img/hero.jpg"
            alt="hero"
            className="w-full max-w-4xl rounded-lg shadow-2xl"
          />
        </div>

        {/* features section */}
        <div className="mt-24 w-full">
          <Headings
            title="How it Works?"
            description="Give mock interview in just 3 simple easy step"
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Choose Category</h3>
                <p className="text-muted-foreground">
                  Select your interview type and role to get tailored questions
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Practice Interview</h3>
                <p className="text-muted-foreground">
                  Answer AI-generated questions with voice or text input
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Feedback</h3>
                <p className="text-muted-foreground">
                  Receive instant AI feedback and improve your answers
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
