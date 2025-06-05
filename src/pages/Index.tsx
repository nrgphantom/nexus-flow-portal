import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sword, Brain, Zap, ArrowLeft, Shield, Lock, Loader, LockOpen } from "lucide-react";

const Index = () => {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessKey, setAccessKey] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingToolId, setLoadingToolId] = useState<string | null>(null);
  const [isToolLoaded, setIsToolLoaded] = useState(false);
  const [accessProtectionEnabled, setAccessProtectionEnabled] = useState(true);
  
  const validAccessKeys = ["admin@gudman123", "0xGudman123"];
  
  const tools = [{
    id: "wayne",
    name: "Wayne Protocol",
    url: "https://wayneprotocol.vercel.app",
    icon: Sword,
    category: "Protocol",
    gradient: "from-red-600 via-red-700 to-red-900"
  }, {
    id: "alpha",
    name: "Alpha Mind",
    url: "https://thealphamind.vercel.app",
    icon: Brain,
    category: "Analytics",
    gradient: "from-blue-600 via-blue-700 to-blue-900"
  }, {
    id: "euler",
    name: "Euler Flow",
    url: "https://eulerflow.vercel.app",
    icon: Zap,
    category: "Optimization",
    gradient: "from-purple-600 via-purple-700 to-purple-900"
  }];

  // Check for saved access key and protection setting on component mount
  useEffect(() => {
    const savedAccessKey = localStorage.getItem("chainknight-access-key");
    const savedProtectionSetting = localStorage.getItem("chainknight-protection-enabled");
    if (savedProtectionSetting !== null) {
      setAccessProtectionEnabled(savedProtectionSetting === "true");
    }
    if (savedAccessKey && validAccessKeys.includes(savedAccessKey)) {
      setIsAuthenticated(true);
    }
  }, []);
  const handleAccessKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validAccessKeys.includes(accessKey)) {
      setIsAuthenticated(true);
      setAuthError("");
      localStorage.setItem("chainknight-access-key", accessKey);
    } else {
      setAuthError("Invalid access key. Please try again.");
      setAccessKey("");
    }
  };
  const toggleAccessProtection = () => {
    const newState = !accessProtectionEnabled;
    setAccessProtectionEnabled(newState);
    localStorage.setItem("chainknight-protection-enabled", newState.toString());
    if (!newState) {
      setIsAuthenticated(true);
    } else {
      const savedAccessKey = localStorage.getItem("chainknight-access-key");
      if (!savedAccessKey || !validAccessKeys.includes(savedAccessKey)) {
        setIsAuthenticated(false);
      }
    }
  };
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

  // Authentication screen - pure black theme
  if (accessProtectionEnabled && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
        <Button 
          onClick={toggleAccessProtection} 
          className="absolute top-6 right-6 z-50 bg-gray-900/80 hover:bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-3" 
          size="sm"
        >
          <Lock className="w-5 h-5" />
        </Button>

        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-6 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl shadow-2xl transform group-hover:scale-110 transition-all duration-500"></div>
              <div className="absolute inset-1 bg-black rounded-2xl"></div>
              <div className="absolute inset-2 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center shadow-inner">
                <Shield className="w-12 h-12 text-white drop-shadow-lg" />
              </div>
              <div className="absolute inset-2 bg-gradient-to-tr from-white/20 via-white/5 to-transparent rounded-xl pointer-events-none"></div>
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">
              ChainKnight Access
            </h1>
            <p className="text-gray-400 text-lg font-medium">
              Enter your access key to continue
            </p>
          </div>

          <div className="backdrop-blur-xl bg-gray-900/20 border border-gray-800/50 rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handleAccessKeySubmit} className="space-y-6">
              <div className="relative group">
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 z-10" />
                  <Input 
                    type="password" 
                    placeholder="Enter access key" 
                    value={accessKey} 
                    onChange={e => setAccessKey(e.target.value)} 
                    className="pl-12 bg-black/60 border-gray-700 text-white placeholder-gray-500 h-14 rounded-xl focus:border-gray-600 focus:ring-gray-600 backdrop-blur-sm" 
                    required 
                  />
                </div>
              </div>
              
              {authError && (
                <div className="text-red-400 text-sm text-center bg-red-900/20 border border-red-800/50 rounded-xl p-4 backdrop-blur-sm">
                  {authError}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-14 rounded-xl font-bold text-lg bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 shadow-2xl transition-all duration-300"
              >
                Access Dashboard
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Centered loading screen - pure black theme
  if (isLoading && loadingTool) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
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
          <div className="relative mb-12">
            <div className="w-32 h-32 border-4 border-gray-800 rounded-full relative">
              <div className="absolute inset-0 border-4 border-transparent border-t-white rounded-full animate-spin"></div>
              <div className="absolute inset-2 border-4 border-transparent border-t-gray-400 rounded-full animate-spin" style={{
                animationDirection: 'reverse',
                animationDuration: '2s'
              }}></div>
              
              <div className="absolute inset-8 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-full flex items-center justify-center shadow-2xl">
                <div className="absolute inset-1 bg-black rounded-full"></div>
                <loadingTool.icon className="w-8 h-8 text-white relative z-10" />
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-4">
            Loading {loadingTool.name}
          </h2>
          
          <div className="flex items-center justify-center space-x-2 mb-4">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i} 
                className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" 
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
          
          <p className="text-gray-500">
            {isToolLoaded ? "Finalizing..." : "Initializing..."}
          </p>
        </div>
      </div>
    );
  }

  // Fullscreen tool view
  if (activeTool) {
    return (
      <div className="fixed inset-0 bg-black z-50 overflow-hidden">
        <div className="h-16 bg-black border-b border-gray-800 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={closeTool} 
              className="text-gray-400 hover:text-white p-2 hover:bg-gray-900 rounded-xl transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden md:inline ml-2">Back</span>
            </Button>
            
            <div className="w-px h-8 bg-gray-700 hidden md:block"></div>
            
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 bg-gradient-to-br ${activeTool.gradient} rounded-lg flex items-center justify-center shadow-lg`}>
                <activeTool.icon className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-bold text-white">
                {activeTool.name}
              </h2>
            </div>
          </div>
        </div>

        <div className="h-[calc(100vh-4rem)] overflow-hidden">
          <iframe 
            src={activeTool.url} 
            className="w-full h-full border-0 opacity-0" 
            style={{ animation: 'fadeIn 0.8s ease-out 0.3s forwards' }}
            title={activeTool.name} 
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation" 
          />
        </div>
      </div>
    );
  }

  // Main dashboard - Powerful Trifecta Design
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-900 bg-black sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 rounded-2xl shadow-xl"></div>
                <div className="absolute inset-1 bg-black rounded-xl"></div>
                <div className="absolute inset-1.5 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center">
                  <Sword className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white tracking-wider">
                  CHAINKNIGHT
                </h1>
                <p className="text-xs text-gray-500 uppercase tracking-widest">TRIFECTA PROTOCOL</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Trifecta Layout */}
      <div className="container mx-auto px-6 py-16">
        {/* Trifecta Title */}
        <div className="text-center mb-20">
          <h2 className="text-6xl font-black text-white mb-4 tracking-wider">
            THE TRIFECTA
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-red-600 via-blue-600 to-purple-600 mx-auto"></div>
        </div>

        {/* Trifecta Grid - Triangle Formation */}
        <div className="relative max-w-4xl mx-auto">
          {/* Top Tool */}
          <div className="flex justify-center mb-16">
            <Card 
              className="w-80 h-80 bg-gray-900 border-2 border-gray-800 hover:border-red-600 transition-all duration-500 transform hover:scale-105 cursor-pointer group"
              onClick={() => openTool(tools[0].id)}
            >
              <div className="h-full flex flex-col items-center justify-center p-8">
                <div className="w-24 h-24 relative mb-8">
                  <div className={`absolute inset-0 bg-gradient-to-br ${tools[0].gradient} rounded-3xl shadow-2xl group-hover:scale-110 transition-all duration-500`}></div>
                  <div className="absolute inset-2 bg-black rounded-2xl"></div>
                  <div className={`absolute inset-3 bg-gradient-to-br ${tools[0].gradient} rounded-xl flex items-center justify-center`}>
                    <tools[0].icon className="w-12 h-12 text-white" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2 text-center">
                  {tools[0].name}
                </h3>
                <span className="px-4 py-2 text-sm bg-red-900/30 text-red-300 rounded-full border border-red-800/50 uppercase tracking-wider">
                  {tools[0].category}
                </span>

                <Button 
                  className="w-full h-12 mt-8 rounded-xl font-bold bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 text-white border-0 shadow-xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    openTool(tools[0].id);
                  }}
                >
                  ENGAGE
                </Button>
              </div>
            </Card>
          </div>

          {/* Bottom Two Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-3xl mx-auto">
            {tools.slice(1).map((tool, index) => {
              const Icon = tool.icon;
              return (
                <Card 
                  key={tool.id}
                  className={`w-80 h-80 bg-gray-900 border-2 border-gray-800 transition-all duration-500 transform hover:scale-105 cursor-pointer group mx-auto ${
                    index === 0 ? 'hover:border-blue-600' : 'hover:border-purple-600'
                  }`}
                  onClick={() => openTool(tool.id)}
                >
                  <div className="h-full flex flex-col items-center justify-center p-8">
                    <div className="w-24 h-24 relative mb-8">
                      <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} rounded-3xl shadow-2xl group-hover:scale-110 transition-all duration-500`}></div>
                      <div className="absolute inset-2 bg-black rounded-2xl"></div>
                      <div className={`absolute inset-3 bg-gradient-to-br ${tool.gradient} rounded-xl flex items-center justify-center`}>
                        <Icon className="w-12 h-12 text-white" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2 text-center">
                      {tool.name}
                    </h3>
                    <span 
                      className={`px-4 py-2 text-sm rounded-full border uppercase tracking-wider ${
                        index === 0 
                          ? 'bg-blue-900/30 text-blue-300 border-blue-800/50'
                          : 'bg-purple-900/30 text-purple-300 border-purple-800/50'
                      }`}
                    >
                      {tool.category}
                    </span>

                    <Button 
                      className={`w-full h-12 mt-8 rounded-xl font-bold text-white border-0 shadow-xl ${
                        index === 0
                          ? 'bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800'
                          : 'bg-gradient-to-r from-purple-700 to-purple-900 hover:from-purple-600 hover:to-purple-800'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        openTool(tool.id);
                      }}
                    >
                      ENGAGE
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-900 bg-black mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-gray-600 text-sm uppercase tracking-widest">
              ChainKnight Enterprise Protocol Suite
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
