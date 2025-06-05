
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

  // Main dashboard - Powerful Trifecta Design
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-black">
        <div className="container mx-auto px-6 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2">
              TRIFECTA
            </h1>
            <p className="text-gray-400 text-lg">
              Three Powers. One Platform.
            </p>
          </div>
        </div>
      </div>

      {/* Main content - Centered Trifecta Grid */}
      <div className="container mx-auto px-6 py-16 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            const isCurrentlyLoading = loadingToolId === tool.id;
            
            return (
              <Card 
                key={tool.id}
                className="bg-gray-900 border border-gray-700 hover:border-gray-500 transition-all duration-500 transform hover:scale-105 cursor-pointer group relative overflow-hidden aspect-square"
                onClick={() => !isCurrentlyLoading && openTool(tool.id)}
              >
                <div className="p-8 h-full flex flex-col items-center justify-center text-center">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-24 h-24 relative">
                      <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        {isCurrentlyLoading ? (
                          <Loader className="w-12 h-12 text-white animate-spin" />
                        ) : (
                          <Icon className="w-12 h-12 text-white" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Tool Name */}
                  <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-gray-300 transition-colors">
                    {tool.name}
                  </h3>

                  {/* Action Button */}
                  <Button
                    className="w-full h-12 rounded-lg font-bold relative overflow-hidden"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isCurrentlyLoading) {
                        openTool(tool.id);
                      }
                    }}
                    disabled={isCurrentlyLoading}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${tool.gradient}`}></div>
                    <span className="relative z-10 text-white">
                      {isCurrentlyLoading ? 'LOADING...' : 'LAUNCH'}
                    </span>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Index;
