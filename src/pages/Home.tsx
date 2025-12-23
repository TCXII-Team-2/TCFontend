import { MessageSquare, Zap, Shield, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const handleSignIn = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      {/* Navigation */}
      <nav className="flex flex-row justify-between items-center px-8 py-6 bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
            <MessageSquare className="text-white" size={24} />
          </div>
          <span className="font-bold text-xl text-slate-800">SupportAI</span>
        </div>
        <div className="flex flex-row gap-6 items-center">
          <button className="font-semibold text-slate-600 cursor-pointer hover:text-slate-900 transition-colors duration-200">
            Contact
          </button>
          <button className="font-semibold text-blue-600 cursor-pointer hover:text-blue-700 transition-colors duration-200">
            About Us
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center px-8 py-20 min-h-[calc(100vh-88px)]">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold animate-bounce">
            <Zap size={16} />
            <span>Revolutionizing Customer Experience</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-extrabold text-6xl md:text-7xl text-slate-900 leading-tight">
            Where{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 animate-pulse">
              AI
            </span>{" "}
            Meets
            <br />
            Customer Support
          </h1>

          {/* Subheading */}
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Transform your customer service with intelligent automation. Deliver
            instant, personalized support 24/7 with cutting-edge AI technology.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center flex-wrap pt-4">
            <button
              onClick={handleSignIn}
              className="group bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold cursor-pointer hover:shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              Sign In
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button
              onClick={handleSignUp}
              className="group text-blue-600 px-8 py-4 rounded-xl font-bold bg-white cursor-pointer hover:bg-slate-50 hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-blue-200"
            >
              Sign Up Free
            </button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 max-w-4xl mx-auto">
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-slate-200">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Zap className="text-blue-600" size={24} />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">
                Lightning Fast
              </h3>
              <p className="text-slate-600 text-sm">
                Instant responses powered by advanced AI algorithms
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-slate-200">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <MessageSquare className="text-blue-600" size={24} />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">
                Smart Conversations
              </h3>
              <p className="text-slate-600 text-sm">
                Natural language understanding for human-like interactions
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-slate-200">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Shield className="text-blue-600" size={24} />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">
                Enterprise Security
              </h3>
              <p className="text-slate-600 text-sm">
                Bank-level encryption to keep your data protected
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Elements for Visual Interest */}
      <div className="fixed top-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div
        className="fixed bottom-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
    </div>
  );
}
