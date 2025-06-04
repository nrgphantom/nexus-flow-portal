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
      category: "Protocol Management",
      gradient: "from-purple-600 via-purple-700 to-indigo-800"
    },
    {
      id: "alpha",
      name: "Alpha Mind",
      url: "https://thealphamind.vercel.app",
      icon: Brain,
      description: "AI-powered intelligent analysis platform for data-driven insights",
      category: "Analytics",
      gradient: "from-cyan-600 via-blue-700 to-purple-800"
    },
    {
      id: "euler",
      name: "Euler Flow",
      url: "https://eulerflow.vercel.app",
      icon: Zap,
      description: "Mathematical flow optimization for complex computational workflows",
      category: "Optimization",
      gradient: "from-emerald-600 via-teal-700 to-cyan-800"
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
      localStorage.setItem("chainknight-access-key", accessKey);
    } else {
      setAuthError("Invalid access key. Please try again.");
      setAccessKey("");
    }
  };

  const openTool = (toolId: string) => {
    setLoadingToolId(toolId);
    setIsLoading(true);
    
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

  // Authentication screen with chrome effects
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Chrome glass morphism background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20 backdrop-blur-sm"></div>
        
        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-8">
            {/* Chrome effect logo */}
            <div className="w-24 h-24 mx-auto mb-6 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-800 to-indigo-900 rounded-3xl shadow-2xl transform group-hover:scale-110 transition-all duration-500"></div>
              <div className="absolute inset-1 bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-2xl"></div>
              <div className="absolute inset-2 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center shadow-inner">
                <Shield className="w-12 h-12 text-white drop-shadow-lg" />
              </div>
              {/* Chrome reflection */}
              <div className="absolute inset-2 bg-gradient-to-tr from-white/30 via-white/10 to-transparent rounded-xl pointer-events-none"></div>
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent drop-shadow-lg">
              ChainKnight Access
            </h1>
            <p className="text-gray-300 text-lg font-medium">
              Enter your access key to continue
            </p>
          </div>

          {/* Chrome glass form */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handleAccessKeySubmit} className="space-y-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                  <Input
                    type="password"
                    placeholder="Enter access key"
                    value={accessKey}
                    onChange={(e) => setAccessKey(e.target.value)}
                    className="pl-12 bg-black/40 border-gray-600 text-white placeholder-gray-400 h-14 rounded-xl focus:border-purple-500 focus:ring-purple-500 backdrop-blur-sm"
                    required
                  />
                </div>
              </div>
              
              {authError && (
                <div className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/30 rounded-xl p-4 backdrop-blur-sm animate-shake">
                  {authError}
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-14 rounded-xl font-bold text-lg relative overflow-hidden group transition-all duration-300 shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-700 to-cyan-600 transition-all duration-300 group-hover:scale-110"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative z-10">Access Dashboard</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Enhanced loading screen with motion graphics
  if (isLoading && loadingTool) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center relative overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-cyan-900/30"></div>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute border border-purple-500/20 rounded-full animate-ping"
              style={{
                width: `${50 + i * 20}px`,
                height: `${50 + i * 20}px`,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                animationDelay: `${i * 0.2}s`,
                animationDuration: '3s'
              }}
            />
          ))}
        </div>

        <div className="text-center relative z-10">
          {/* Chrome loading spinner */}
          <div className="relative mb-12 group">
            <div className="w-40 h-40 border-8 border-purple-600/20 rounded-full relative">
              <div className="absolute inset-0 border-8 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
              <div className="absolute inset-4 border-8 border-transparent border-t-cyan-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
              <div className="absolute inset-8 border-8 border-transparent border-t-purple-300 rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
              
              {/* Center chrome icon */}
              <div className="absolute inset-12 bg-gradient-to-br from-purple-600 via-purple-800 to-cyan-600 rounded-full flex items-center justify-center shadow-2xl">
                <div className="absolute inset-1 bg-black rounded-full"></div>
                <loadingTool.icon className="w-12 h-12 text-white animate-pulse relative z-10" />
                {/* Chrome reflection */}
                <div className="absolute inset-1 bg-gradient-to-tr from-white/30 via-white/10 to-transparent rounded-full pointer-events-none"></div>
              </div>
            </div>
          </div>

          {/* Enhanced loading text */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white animate-pulse bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Initializing {loadingTool.name}
            </h2>
            
            {/* Animated dots */}
            <div className="flex items-center justify-center space-x-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-purple-500 rounded-full animate-bounce shadow-lg"
                  style={{ animationDelay: `${i * 0.1}s` }}
                ></div>
              ))}
            </div>
            
            <p className="text-gray-300 animate-pulse text-lg">
              Loading enterprise protocols...
            </p>
          </div>

          {/* Chrome progress bar */}
          <div className="mt-12 w-80 mx-auto">
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden relative">
              <div className="h-full bg-gradient-to-r from-purple-600 via-purple-400 to-cyan-400 rounded-full animate-pulse shadow-lg"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform -translate-x-full animate-shimmer"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Enhanced fullscreen tool view
  if (activeTool) {
    return (
      <div className="fixed inset-0 bg-black z-50 overflow-hidden">
        {/* Chrome header with glass morphism */}
        <div className="h-16 bg-black/90 backdrop-blur-xl border-b border-gray-700/50 flex items-center justify-between px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-cyan-900/20"></div>
          
          <div className="flex items-center space-x-4 relative z-10">
            <Button
              variant="ghost"
              size="sm"
              onClick={closeTool}
              className="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-xl transition-all duration-300 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="hidden md:inline ml-2">Back</span>
            </Button>
            
            <div className="w-px h-8 bg-gray-600 hidden md:block"></div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg">
                <activeTool.icon className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-bold text-white">
                {activeTool.name}
              </h2>
              <span className="px-3 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30 backdrop-blur-sm">
                {activeTool.category}
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced iframe container */}
        <div className="h-[calc(100vh-4rem)] overflow-hidden relative">
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

  // Enhanced dashboard with chrome effects and motion graphics
  return (
    <div className="min-h-screen bg-black text-white custom-scrollbar relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-cyan-900/10"></div>
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-purple-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Chrome header */}
      <div className="border-b border-gray-800/50 bg-black/95 backdrop-blur-xl sticky top-0 z-50 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-cyan-900/20"></div>
        <div className="container mx-auto px-6 py-4 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Chrome logo */}
              <div className="w-12 h-12 relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-800 to-cyan-600 rounded-2xl shadow-xl transform group-hover:scale-110 transition-all duration-500"></div>
                <div className="absolute inset-1 bg-black rounded-xl"></div>
                <div className="absolute inset-1.5 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-lg flex items-center justify-center">
                  <Sword className="w-6 h-6 text-white" />
                </div>
                {/* Chrome reflection */}
                <div className="absolute inset-1.5 bg-gradient-to-tr from-white/30 via-white/10 to-transparent rounded-lg pointer-events-none"></div>
              </div>
              
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                  ChainKnight
                </h1>
                <p className="text-sm text-gray-400">Enterprise Protocol Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-400 flex items-center space-x-2">
                <span>{tools.length} Tools</span>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse shadow-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Welcome section with chrome effects */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            Enterprise Protocol Suite
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Access and manage your blockchain protocols, analytics, and optimization tools from a unified chrome dashboard
          </p>
        </div>

        {/* Enhanced tool cards with chrome effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => {
            const Icon = tool.icon;
            const isCurrentlyLoading = loadingToolId === tool.id;
            
            return (
              <Card 
                key={tool.id}
                className="bg-black/40 backdrop-blur-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-700 transform hover:scale-105 hover:shadow-2xl cursor-pointer group relative overflow-hidden"
                onClick={() => !isCurrentlyLoading && openTool(tool.id)}
              >
                {/* Chrome background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-10 transition-all duration-700`}></div>
                
                {/* Animated border */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600 via-cyan-600 to-purple-600 opacity-0 group-hover:opacity-30 blur-sm transition-all duration-700 animate-pulse"></div>
                
                <div className="p-8 relative z-10">
                  {/* Category badge with chrome effect */}
                  <div className="mb-6">
                    <span className="px-4 py-2 text-xs font-bold bg-black/60 backdrop-blur-sm text-purple-300 rounded-full border border-purple-500/30 group-hover:bg-purple-500/20 transition-all duration-300 shadow-lg">
                      {tool.category}
                    </span>
                  </div>

                  {/* Chrome icon */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-20 h-20 relative group/icon">
                      <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} rounded-3xl shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}></div>
                      <div className="absolute inset-1 bg-black rounded-2xl"></div>
                      <div className={`absolute inset-2 bg-gradient-to-br ${tool.gradient} rounded-xl flex items-center justify-center shadow-inner`}>
                        {isCurrentlyLoading ? (
                          <Loader className="w-8 h-8 text-white animate-spin" />
                        ) : (
                          <Icon className="w-8 h-8 text-white drop-shadow-lg" />
                        )}
                      </div>
                      {/* Chrome reflection */}
                      <div className="absolute inset-2 bg-gradient-to-tr from-white/30 via-white/10 to-transparent rounded-xl pointer-events-none"></div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-200 group-hover:to-cyan-200 group-hover:bg-clip-text transition-all duration-300">
                        {tool.name}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 mb-8 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {tool.description}
                  </p>

                  {/* Chrome action button */}
                  <div className="flex justify-center">
                    <Button
                      className="w-full h-12 rounded-xl font-bold relative overflow-hidden group/btn transition-all duration-300 shadow-xl"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isCurrentlyLoading) {
                          openTool(tool.id);
                        }
                      }}
                      disabled={isCurrentlyLoading}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${tool.gradient} transition-all duration-300 group-hover/btn:scale-110`}></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                      <span className="relative z-10">
                        {isCurrentlyLoading ? 'LOADING...' : 'OPEN'}
                      </span>
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Enhanced footer with chrome effects */}
      <div className="border-t border-gray-800/50 bg-black/60 backdrop-blur-xl mt-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-cyan-900/10"></div>
        <div className="container mx-auto px-6 py-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-center md:text-left">
              <p className="font-bold text-lg bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">ChainKnight Enterprise</p>
              <p className="text-sm">Unified Protocol Management Dashboard</p>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <span className="hover:text-purple-400 transition-colors cursor-pointer">Wayne Protocol</span>
              <div className="w-1 h-1 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="hover:text-cyan-400 transition-colors cursor-pointer">Alpha Mind</span>
              <div className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse"></div>
              <span className="hover:text-emerald-400 transition-colors cursor-pointer">Euler Flow</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
