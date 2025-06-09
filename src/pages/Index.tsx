import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sword, Brain, Zap, ArrowLeft, Loader } from "lucide-react";

const Index = () => {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingToolId, setLoadingToolId] = useState<string | null>(null);
  const [isToolLoaded, setIsToolLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const tools = [{
    id: "wayne",
    name: "Wayne Protocol",
    url: "https://wayneprotocol.vercel.app",
    icon: Sword,
    gradient: "from-red-500 via-red-600 to-red-700",
    description: "Advanced Security Protocol",
    color: "rgb(239, 68, 68)"
  }, {
    id: "alpha",
    name: "Alpha Mind",
    url: "https://thealphamind.vercel.app",
    icon: Brain,
    gradient: "from-blue-500 via-blue-600 to-blue-700",
    description: "AI-Powered Analytics",
    color: "rgb(59, 130, 246)"
  }, {
    id: "euler",
    name: "Euler Flow",
    url: "https://eulerflow.vercel.app",
    icon: Zap,
    gradient: "from-green-500 via-green-600 to-green-700",
    description: "Streamlined Operations",
    color: "rgb(34, 197, 94)"
  }];

  useEffect(() => {
    if (isLoading) {
      setLoadingProgress(0);
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 10;
        });
      }, 150);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const openTool = (toolId: string) => {
    setLoadingToolId(toolId);
    setIsLoading(true);
    setIsToolLoaded(false);
  };

  const closeTool = () => {
    setActiveToolId(null);
    setIsLoading(false);
    setIsToolLoaded(false);
    setLoadingToolId(null);
  };

  const handleIframeLoad = () => {
    setIsToolLoaded(true);
    setLoadingProgress(100);
    setTimeout(() => {
      setIsLoading(false);
      setActiveToolId(loadingToolId);
      setLoadingToolId(null);
    }, 300);
  };

  const activeTool = tools.find(tool => tool.id === activeToolId);
  const loadingTool = tools.find(tool => tool.id === loadingToolId);

  // Loading screen
  if (isLoading && loadingTool) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
        {!isToolLoaded && (
          <iframe 
            src={loadingTool.url} 
            className="hidden" 
            onLoad={handleIframeLoad} 
            title={`Loading ${loadingTool.name}`} 
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation" 
          />
        )}

        <div className="relative w-full max-w-sm mx-auto px-4">
          {/* Subtle Background Glow */}
          <div 
            className="absolute inset-0 opacity-20 blur-3xl rounded-full"
            style={{
              background: `radial-gradient(circle at center, ${loadingTool.color}, transparent 60%)`,
            }}
          />

          {/* Main Loading Container */}
          <div className="relative text-center">
            {/* Progress Circle */}
            <div className="w-32 h-32 mx-auto mb-8 relative">
              {/* Background Circle */}
              <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
              
              {/* Progress Circle */}
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  fill="none"
                  stroke={loadingTool.color}
                  strokeWidth="4"
                  strokeDasharray={`${loadingProgress * 3.77} 377`}
                  strokeLinecap="round"
                  className="transition-all duration-300 ease-out"
                />
              </svg>

              {/* Icon Container */}
              <div className={`absolute inset-4 bg-gradient-to-br ${loadingTool.gradient} rounded-full flex items-center justify-center shadow-2xl`}>
                <loadingTool.icon className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Loading Text */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-white">
                {loadingTool.name}
              </h2>
              <div className="text-white/60 text-sm">
                Loading... {Math.round(loadingProgress)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tool view
  if (activeTool) {
    return (
      <div className="fixed inset-0 bg-black z-50 overflow-hidden">
        <div className="h-16 bg-black/50 backdrop-blur-xl border-b border-white/10 flex items-center px-6 transition-all duration-300">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={closeTool} 
            className="text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="hidden sm:inline">Back</span>
          </Button>
            
          <div className="flex items-center space-x-4 ml-4">
            <div className={`w-8 h-8 bg-gradient-to-br ${activeTool.gradient} rounded-lg flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110`}>
              <activeTool.icon className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-white">
              {activeTool.name}
            </h2>
          </div>
        </div>

        <div className="h-[calc(100vh-4rem)]">
          <iframe 
            src={activeTool.url} 
            className="w-full h-full border-0" 
            title={activeTool.name} 
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation" 
          />
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-10">
        <div className="container mx-auto px-4 h-20 flex items-center">
          <div className="flex items-center space-x-4 mx-auto">
            <img 
              src="/lovable-uploads/73348684-6f74-4be7-818b-acd505dd5375.png" 
              alt="ChainKnight"
              className="w-10 h-10 animate-float"
            />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              ChainKnight
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              Welcome to ChainKnight
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Your gateway to advanced blockchain tools and protocols
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid gap-6 md:grid-cols-3 fade-in">
            {tools.map(tool => (
              <button
                key={tool.id}
                onClick={() => !loadingToolId && openTool(tool.id)}
                className="group relative overflow-hidden bg-white/5 backdrop-blur rounded-xl transition-all duration-300 hover:bg-white/10 border border-white/10 hover:border-white/20 p-1"
              >
                {/* Gradient Background Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at center, ${tool.color}, transparent 70%)`
                  }}
                />

                <div className="relative p-6 h-full">
                  <div className={`w-16 h-16 mb-6 bg-gradient-to-br ${tool.gradient} rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg`}>
                    {loadingToolId === tool.id ? (
                      <Loader className="w-8 h-8 text-white animate-spin" />
                    ) : (
                      <tool.icon className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-3 transition-colors duration-300 group-hover:text-white">
                    {tool.name}
                  </h3>
                  <p className="text-white/60 group-hover:text-white/70 transition-colors duration-300">
                    {tool.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/40 hover:text-white/60 transition-colors duration-300">
            ChainKnight © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
