
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sword, Brain, Zap, ArrowLeft, Loader } from "lucide-react";

const Index = () => {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingToolId, setLoadingToolId] = useState<string | null>(null);
  const [isToolLoaded, setIsToolLoaded] = useState(false);

  const tools = [{
    id: "wayne",
    name: "Wayne Protocol",
    url: "https://wayneprotocol.vercel.app",
    icon: Sword,
    gradient: "from-red-600 via-red-700 to-red-900"
  }, {
    id: "alpha",
    name: "Alpha Mind",
    url: "https://thealphamind.vercel.app",
    icon: Brain,
    gradient: "from-blue-600 via-blue-700 to-blue-900"
  }, {
    id: "euler",
    name: "Euler Flow",
    url: "https://eulerflow.vercel.app",
    icon: Zap,
    gradient: "from-green-600 via-green-700 to-green-900"
  }];

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
    setTimeout(() => {
      setIsLoading(false);
      setActiveToolId(loadingToolId);
      setLoadingToolId(null);
    }, 500);
  };

  const activeTool = tools.find(tool => tool.id === activeToolId);
  const loadingTool = tools.find(tool => tool.id === loadingToolId);

  // Centered loading screen
  if (isLoading && loadingTool) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        {/* Hidden iframe for preloading */}
        {!isToolLoaded && (
          <iframe 
            src={loadingTool.url} 
            className="hidden" 
            onLoad={handleIframeLoad} 
            title={`Loading ${loadingTool.name}`} 
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation" 
          />
        )}

        <div className="text-center">
          {/* Centered loading spinner */}
          <div className="relative mb-8">
            <div className="w-32 h-32 border-4 border-gray-800 rounded-full relative">
              <div className="absolute inset-0 border-4 border-transparent border-t-white rounded-full animate-spin"></div>
              <div 
                className="absolute inset-4 border-4 border-transparent border-t-gray-400 rounded-full animate-spin" 
                style={{
                  animationDirection: 'reverse',
                  animationDuration: '1.5s'
                }}
              ></div>
              
              {/* Center icon */}
              <div className={`absolute inset-8 bg-gradient-to-br ${loadingTool.gradient} rounded-full flex items-center justify-center`}>
                <loadingTool.icon className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-4">
            Loading {loadingTool.name}
          </h2>
        </div>
      </div>
    );
  }

  // Fullscreen tool view
  if (activeTool) {
    return (
      <div className="fixed inset-0 bg-black z-50 overflow-hidden">
        {/* Header */}
        <div className="h-16 bg-black border-b border-gray-800 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={closeTool} 
              className="text-gray-400 hover:text-white p-2 hover:bg-gray-800 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden md:inline ml-2">Back</span>
            </Button>
            
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 bg-gradient-to-br ${activeTool.gradient} rounded-lg flex items-center justify-center`}>
                <activeTool.icon className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-bold text-white">
                {activeTool.name}
              </h2>
            </div>
          </div>
        </div>

        {/* Iframe container */}
        <div className="h-[calc(100vh-4rem)] overflow-hidden">
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

  // Main dashboard - Triangle Formation with typography background
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Cool Typography Background Effect */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute top-10 left-10 text-9xl font-bold text-gray-900/10 transform -rotate-12 animate-pulse">
          CHAIN
        </div>
        <div className="absolute top-1/4 right-20 text-7xl font-bold text-gray-800/10 transform rotate-12">
          KNIGHT
        </div>
        <div className="absolute bottom-1/4 left-1/4 text-6xl font-bold text-gray-900/10 transform -rotate-6 animate-float">
          PROTOCOL
        </div>
        <div className="absolute bottom-20 right-1/4 text-8xl font-bold text-gray-800/10 transform rotate-6">
          FLOW
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl font-bold text-purple-900/20 animate-pulse">
          TRINITY
        </div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-1/3 left-1/5 w-32 h-32 border border-purple-900/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute bottom-1/3 right-1/5 w-24 h-24 border border-red-900/20 transform rotate-45 animate-pulse"></div>
        <div className="absolute top-2/3 left-2/3 w-16 h-16 bg-gradient-to-r from-blue-900/20 to-green-900/20 rounded-lg animate-float"></div>
      </div>

      {/* Header with Logo */}
      <div className="border-b border-gray-800 bg-black relative z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="text-center flex flex-col items-center">
            <img 
              src="/lovable-uploads/73348684-6f74-4be7-818b-acd505dd5375.png" 
              alt="ChainKnight Logo" 
              className="w-16 h-16 mb-4"
            />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-wider">ChainKnight</h1>
            <p className="text-gray-400 text-lg md:text-xl">
              Three Powers. One Platform.
            </p>
          </div>
        </div>
      </div>

      {/* Main Triangle Layout */}
      <div className="container mx-auto px-6 py-8 md:py-16 flex items-center justify-center min-h-[calc(100vh-200px)] relative z-10">
        <div className="relative w-full max-w-lg">
          {/* Triangle Formation Container - Tighter spacing */}
          <div className="relative w-full aspect-square max-w-[400px] mx-auto">
            
            {/* Top Tool - Wayne Protocol */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
              <div 
                className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-red-600 via-red-700 to-red-900 flex items-center justify-center cursor-pointer transform hover:scale-110 transition-all duration-300 border-4 border-gray-800 hover:border-red-500/50 shadow-2xl hover:shadow-red-500/30"
                onClick={() => !loadingToolId && openTool("wayne")}
              >
                {loadingToolId === "wayne" ? (
                  <Loader className="w-10 h-10 md:w-14 md:h-14 text-white animate-spin" />
                ) : (
                  <Sword className="w-10 h-10 md:w-14 md:h-14 text-white" />
                )}
              </div>
              <div className="text-center mt-4">
                <h3 className="text-sm md:text-lg font-bold text-white">Wayne Protocol</h3>
              </div>
            </div>

            {/* Bottom Left Tool - Alpha Mind */}
            <div className="absolute bottom-0 left-8">
              <div 
                className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 flex items-center justify-center cursor-pointer transform hover:scale-110 transition-all duration-300 border-4 border-gray-800 hover:border-blue-500/50 shadow-2xl hover:shadow-blue-500/30"
                onClick={() => !loadingToolId && openTool("alpha")}
              >
                {loadingToolId === "alpha" ? (
                  <Loader className="w-10 h-10 md:w-14 md:h-14 text-white animate-spin" />
                ) : (
                  <Brain className="w-10 h-10 md:w-14 md:h-14 text-white" />
                )}
              </div>
              <div className="text-center mt-4">
                <h3 className="text-sm md:text-lg font-bold text-white">Alpha Mind</h3>
              </div>
            </div>

            {/* Bottom Right Tool - Euler Flow */}
            <div className="absolute bottom-0 right-8">
              <div 
                className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-green-600 via-green-700 to-green-900 flex items-center justify-center cursor-pointer transform hover:scale-110 transition-all duration-300 border-4 border-gray-800 hover:border-green-500/50 shadow-2xl hover:shadow-green-500/30"
                onClick={() => !loadingToolId && openTool("euler")}
              >
                {loadingToolId === "euler" ? (
                  <Loader className="w-10 h-10 md:w-14 md:h-14 text-white animate-spin" />
                ) : (
                  <Zap className="w-10 h-10 md:w-14 md:h-14 text-white" />
                )}
              </div>
              <div className="text-center mt-4">
                <h3 className="text-sm md:text-lg font-bold text-white">Euler Flow</h3>
              </div>
            </div>

            {/* Center pulsing dot */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse opacity-80"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
