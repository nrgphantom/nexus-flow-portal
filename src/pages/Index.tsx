
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sword, Brain, Zap, ArrowLeft, Loader } from "lucide-react";

const Index = () => {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingToolId, setLoadingToolId] = useState<string | null>(null);
  const [isToolLoaded, setIsToolLoaded] = useState(false);

  const tools = [
    {
      id: "wayne",
      name: "Wayne Protocol",
      url: "https://wayneprotocol.vercel.app",
      icon: Sword,
      gradient: "from-red-600 via-red-700 to-red-900"
    },
    {
      id: "alpha",
      name: "Alpha Mind",
      url: "https://thealphamind.vercel.app",
      icon: Brain,
      gradient: "from-blue-600 via-blue-700 to-blue-900"
    },
    {
      id: "euler",
      name: "Euler Flow",
      url: "https://eulerflow.vercel.app",
      icon: Zap,
      gradient: "from-green-600 via-green-700 to-green-900"
    }
  ];

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
              <div className="absolute inset-4 border-4 border-transparent border-t-gray-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
              
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

  // Main dashboard - Triangle Trifecta Design
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-500 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-blue-500 rounded-full animate-pulse opacity-40 animation-delay-1000"></div>
        <div className="absolute bottom-1/4 left-2/3 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse opacity-50 animation-delay-2000"></div>
      </div>

      {/* Header */}
      <div className="border-b border-gray-800 bg-black relative z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-wider">
              TRIFECTA
            </h1>
            <p className="text-gray-400 text-lg md:text-xl">
              Three Powers. One Platform.
            </p>
          </div>
        </div>
      </div>

      {/* Main content - Triangle Formation */}
      <div className="container mx-auto px-6 py-8 md:py-16 flex items-center justify-center min-h-[calc(100vh-200px)] relative z-10">
        <div className="relative w-full max-w-4xl">
          {/* Triangle Layout Container */}
          <div className="relative w-full aspect-square max-w-[600px] mx-auto">
            
            {/* Top Tool - Wayne Protocol */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 md:w-56">
              <Card 
                className="bg-gray-900/90 border border-gray-700 hover:border-red-500/50 transition-all duration-500 transform hover:scale-110 cursor-pointer group relative overflow-hidden backdrop-blur-sm hover:shadow-2xl hover:shadow-red-500/20"
                onClick={() => !loadingToolId && openTool("wayne")}
              >
                <div className="p-6 md:p-8 h-full flex flex-col items-center justify-center text-center">
                  {/* Glowing border effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-red-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-4 md:mb-6">
                      <div className="w-16 h-16 md:w-20 md:h-20 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          {loadingToolId === "wayne" ? (
                            <Loader className="w-8 h-8 md:w-10 md:h-10 text-white animate-spin" />
                          ) : (
                            <Sword className="w-8 h-8 md:w-10 md:h-10 text-white" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Tool Name */}
                    <h3 className="text-lg md:text-xl font-bold text-white mb-4 group-hover:text-red-300 transition-colors">
                      Wayne Protocol
                    </h3>

                    {/* Action Button */}
                    <Button
                      className="w-full h-10 md:h-12 rounded-lg font-bold relative overflow-hidden text-sm md:text-base"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!loadingToolId) openTool("wayne");
                      }}
                      disabled={!!loadingToolId}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-700 to-red-900"></div>
                      <span className="relative z-10 text-white">
                        {loadingToolId === "wayne" ? 'LOADING...' : 'LAUNCH'}
                      </span>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Bottom Left Tool - Alpha Mind */}
            <div className="absolute bottom-0 left-0 w-48 md:w-56">
              <Card 
                className="bg-gray-900/90 border border-gray-700 hover:border-blue-500/50 transition-all duration-500 transform hover:scale-110 cursor-pointer group relative overflow-hidden backdrop-blur-sm hover:shadow-2xl hover:shadow-blue-500/20"
                onClick={() => !loadingToolId && openTool("alpha")}
              >
                <div className="p-6 md:p-8 h-full flex flex-col items-center justify-center text-center">
                  {/* Glowing border effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-4 md:mb-6">
                      <div className="w-16 h-16 md:w-20 md:h-20 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          {loadingToolId === "alpha" ? (
                            <Loader className="w-8 h-8 md:w-10 md:h-10 text-white animate-spin" />
                          ) : (
                            <Brain className="w-8 h-8 md:w-10 md:h-10 text-white" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Tool Name */}
                    <h3 className="text-lg md:text-xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                      Alpha Mind
                    </h3>

                    {/* Action Button */}
                    <Button
                      className="w-full h-10 md:h-12 rounded-lg font-bold relative overflow-hidden text-sm md:text-base"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!loadingToolId) openTool("alpha");
                      }}
                      disabled={!!loadingToolId}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900"></div>
                      <span className="relative z-10 text-white">
                        {loadingToolId === "alpha" ? 'LOADING...' : 'LAUNCH'}
                      </span>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Bottom Right Tool - Euler Flow */}
            <div className="absolute bottom-0 right-0 w-48 md:w-56">
              <Card 
                className="bg-gray-900/90 border border-gray-700 hover:border-green-500/50 transition-all duration-500 transform hover:scale-110 cursor-pointer group relative overflow-hidden backdrop-blur-sm hover:shadow-2xl hover:shadow-green-500/20"
                onClick={() => !loadingToolId && openTool("euler")}
              >
                <div className="p-6 md:p-8 h-full flex flex-col items-center justify-center text-center">
                  {/* Glowing border effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-green-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-4 md:mb-6">
                      <div className="w-16 h-16 md:w-20 md:h-20 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-700 to-green-900 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          {loadingToolId === "euler" ? (
                            <Loader className="w-8 h-8 md:w-10 md:h-10 text-white animate-spin" />
                          ) : (
                            <Zap className="w-8 h-8 md:w-10 md:h-10 text-white" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Tool Name */}
                    <h3 className="text-lg md:text-xl font-bold text-white mb-4 group-hover:text-green-300 transition-colors">
                      Euler Flow
                    </h3>

                    {/* Action Button */}
                    <Button
                      className="w-full h-10 md:h-12 rounded-lg font-bold relative overflow-hidden text-sm md:text-base"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!loadingToolId) openTool("euler");
                      }}
                      disabled={!!loadingToolId}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-green-700 to-green-900"></div>
                      <span className="relative z-10 text-white">
                        {loadingToolId === "euler" ? 'LOADING...' : 'LAUNCH'}
                      </span>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Center connection lines */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-4 h-4">
                {/* Pulsing center dot */}
                <div className="absolute inset-0 bg-white rounded-full animate-pulse opacity-60"></div>
                <div className="absolute inset-1 bg-purple-500 rounded-full animate-ping"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
