
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sword, Brain, Zap, ArrowLeft, Shield, Lock, Loader } from "lucide-react";

const Index = () => {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessKey, setAccessKey] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingToolId, setLoadingToolId] = useState<string | null>(null);

  const validAccessKeys = ["admin@gudman123", "0xGudman123"];

  const tools = [
    {
      id: "wayne",
      name: "Wayne Protocol",
      url: "https://wayneprotocol.vercel.app",
      icon: Sword,
      description: "Advanced protocol management system for enterprise blockchain operations",
      category: "Protocol Management"
    },
    {
      id: "alpha",
      name: "Alpha Mind",
      url: "https://thealphamind.vercel.app",
      icon: Brain,
      description: "AI-powered intelligent analysis platform for data-driven insights",
      category: "Analytics"
    },
    {
      id: "euler",
      name: "Euler Flow",
      url: "https://eulerflow.vercel.app",
      icon: Zap,
      description: "Mathematical flow optimization for complex computational workflows",
      category: "Optimization"
    }
  ];

  // Check for saved access key on component mount
  useEffect(() => {
    const savedAccessKey = localStorage.getItem("chainknight-access-key");
    if (savedAccessKey && validAccessKeys.includes(savedAccessKey)) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAccessKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validAccessKeys.includes(accessKey)) {
      setIsAuthenticated(true);
      setAuthError("");
      // Save access key to localStorage
      localStorage.setItem("chainknight-access-key", accessKey);
    } else {
      setAuthError("Invalid access key. Please try again.");
      setAccessKey("");
    }
  };

  const openTool = (toolId: string) => {
    setLoadingToolId(toolId);
    setIsLoading(true);
    
    // Simulate loading time for better UX
    setTimeout(() => {
      setActiveToolId(toolId);
      setIsLoading(false);
      setLoadingToolId(null);
    }, 1500);
  };

  const closeTool = () => {
    setActiveToolId(null);
  };

  const activeTool = tools.find(tool => tool.id === activeToolId);
  const loadingTool = tools.find(tool => tool.id === loadingToolId);

  // Authentication screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl flex items-center justify-center shadow-2xl mx-auto mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              ChainKnight Access
            </h1>
            <p className="text-gray-400">
              Enter your access key to continue
            </p>
          </div>

          <form onSubmit={handleAccessKeySubmit} className="space-y-6">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="password"
                placeholder="Enter access key"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                className="pl-12 bg-gray-900 border-gray-700 text-white placeholder-gray-500 h-12 rounded-xl focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>
            
            {authError && (
              <div className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                {authError}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white h-12 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Access Dashboard
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // Loading screen when opening a tool
  if (isLoading && loadingTool) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="text-center">
          {/* Animated loader */}
          <div className="relative mb-8">
            <div className="w-32 h-32 border-4 border-purple-600/20 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-32 h-32 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
            <div className="absolute inset-4 w-24 h-24 border-4 border-transparent border-t-purple-400 rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
            <div className="absolute inset-8 w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center">
              <loadingTool.icon className="w-8 h-8 text-white animate-pulse" />
            </div>
          </div>

          {/* Loading text with typing animation */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white animate-pulse">
              Initializing {loadingTool.name}
            </h2>
            <div className="flex items-center justify-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
            <p className="text-gray-400 animate-pulse">
              Loading enterprise protocols...
            </p>
          </div>

          {/* Progress bar effect */}
          <div className="mt-8 w-64 mx-auto">
            <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If a tool is active, show fullscreen overlay
  if (activeTool) {
    return (
      <div className="fixed inset-0 bg-black z-50 overflow-hidden">
        {/* Tool Header */}
        <div className="h-14 md:h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={closeTool}
              className="text-gray-400 hover:text-white p-2"
            >
              <ArrowLeft className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Back</span>
            </Button>
            <div className="w-px h-6 bg-gray-700 hidden md:block"></div>
            <div className="flex items-center space-x-2 md:space-x-3">
              <activeTool.icon className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
              <h2 className="text-sm md:text-lg font-semibold text-white truncate">
                {activeTool.name}
              </h2>
              <span className="hidden md:inline px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded border border-purple-500/30">
                {activeTool.category}
              </span>
            </div>
          </div>
        </div>

        {/* Fullscreen iframe */}
        <div className="h-[calc(100vh-3.5rem)] md:h-[calc(100vh-4rem)] overflow-hidden">
          <iframe
            src={activeTool.url}
            className="w-full h-full border-0 opacity-0 animate-fade-in"
            style={{ animation: 'fadeIn 0.5s ease-out 0.2s forwards' }}
            title={activeTool.name}
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
          />
        </div>
      </div>
    );
  }

  // Default dashboard view
  return (
    <div className="min-h-screen bg-black text-white custom-scrollbar">
      {/* Header */}
      <div className="border-b border-gray-800 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center shadow-lg">
                <Sword className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg md:text-2xl font-bold text-white">
                  ChainKnight
                </h1>
                <p className="text-xs md:text-sm text-gray-400 hidden sm:block">Enterprise Protocol Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="text-xs md:text-sm text-gray-400">
                {tools.length} Tools
              </div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4">
            Enterprise Protocol Suite
          </h2>
          <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Access and manage your blockchain protocols, analytics, and optimization tools from a unified dashboard
          </p>
        </div>

        {/* Tool Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {tools.map((tool) => {
            const Icon = tool.icon;
            const isCurrentlyLoading = loadingToolId === tool.id;
            
            return (
              <Card 
                key={tool.id}
                className={`bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-purple-500/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer group relative overflow-hidden ${isCurrentlyLoading ? 'opacity-75 pointer-events-none' : ''}`}
                onClick={() => !isCurrentlyLoading && openTool(tool.id)}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="p-6 md:p-8 relative z-10">
                  {/* Category Badge */}
                  <div className="mb-4">
                    <span className="px-3 py-1 text-xs font-semibold bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30 group-hover:bg-purple-500/30 transition-colors duration-300">
                      {tool.category}
                    </span>
                  </div>

                  {/* Icon and Title */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl flex items-center justify-center shadow-lg group-hover:from-purple-500 group-hover:to-purple-700 transition-all duration-300 group-hover:scale-110">
                      {isCurrentlyLoading ? (
                        <Loader className="w-6 h-6 md:w-8 md:h-8 text-white animate-spin" />
                      ) : (
                        <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                        {tool.name}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 mb-6 leading-relaxed text-sm md:text-base group-hover:text-gray-300 transition-colors duration-300">
                    {tool.description}
                  </p>

                  {/* Action Button */}
                  <div className="flex justify-center">
                    <Button
                      className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white border-0 font-bold px-6 py-3 transition-all duration-300 rounded-xl shadow-lg group-hover:shadow-xl transform group-hover:scale-105 disabled:opacity-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isCurrentlyLoading) {
                          openTool(tool.id);
                        }
                      }}
                      disabled={isCurrentlyLoading}
                    >
                      {isCurrentlyLoading ? 'LOADING...' : 'OPEN'}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 bg-gray-900/30 mt-8 md:mt-12">
        <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-center md:text-left">
              <p className="font-semibold text-sm md:text-base">ChainKnight Enterprise</p>
              <p className="text-xs md:text-sm">Unified Protocol Management Dashboard</p>
            </div>
            <div className="flex items-center space-x-4 md:space-x-6 text-xs md:text-sm text-gray-500">
              <span>Wayne Protocol</span>
              <span className="w-1 h-1 bg-purple-500 rounded-full"></span>
              <span>Alpha Mind</span>
              <span className="w-1 h-1 bg-purple-500 rounded-full"></span>
              <span>Euler Flow</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
