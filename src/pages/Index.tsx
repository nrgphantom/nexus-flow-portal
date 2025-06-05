import { useState } from "react";
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
    gradient: "from-red-500 to-red-700",
    description: "Advanced Security Protocol"
  }, {
    id: "alpha",
    name: "Alpha Mind",
    url: "https://thealphamind.vercel.app",
    icon: Brain,
    gradient: "from-blue-500 to-blue-700",
    description: "AI-Powered Analytics"
  }, {
    id: "euler",
    name: "Euler Flow",
    url: "https://eulerflow.vercel.app",
    icon: Zap,
    gradient: "from-green-500 to-green-700",
    description: "Streamlined Operations"
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

  // Loading screen
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
          <div className="relative mb-8">
            <div className="w-24 h-24 border-2 border-gray-800 rounded-full relative">
              <div className="absolute inset-0 border-2 border-transparent border-t-white rounded-full animate-spin"></div>
              <div className={`absolute inset-4 bg-gradient-to-br ${loadingTool.gradient} rounded-full flex items-center justify-center`}>
                <loadingTool.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <h2 className="text-lg font-medium text-white/80">
            Loading {loadingTool.name}
          </h2>
        </div>
      </div>
    );
  }

  // Tool view
  if (activeTool) {
    return (
      <div className="fixed inset-0 bg-black z-50 overflow-hidden">
        <div className="h-12 bg-black/50 backdrop-blur-lg border-b border-white/5 flex items-center px-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={closeTool} 
            className="text-white/70 hover:text-white mr-4"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
            
          <div className="flex items-center space-x-3">
            <div className={`w-6 h-6 bg-gradient-to-br ${activeTool.gradient} rounded-md flex items-center justify-center`}>
              <activeTool.icon className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-sm font-medium text-white">
              {activeTool.name}
            </h2>
          </div>
        </div>

        <div className="h-[calc(100vh-3rem)]">
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
      <header className="border-b border-white/5 bg-black/50 backdrop-blur-lg sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/73348684-6f74-4be7-818b-acd505dd5375.png" 
              alt="ChainKnight"
              className="w-8 h-8"
            />
            <h1 className="text-lg font-medium">ChainKnight</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-medium mb-4">Welcome to ChainKnight</h2>
            <p className="text-white/60">Select a tool to begin your journey</p>
          </div>

          {/* Tools Grid */}
          <div className="grid gap-4 md:grid-cols-3">
            {tools.map(tool => (
              <button
                key={tool.id}
                onClick={() => !loadingToolId && openTool(tool.id)}
                className="group relative bg-white/5 backdrop-blur-sm rounded-lg p-6 text-left transition-all hover:bg-white/10 border border-white/10 hover:border-white/20"
              >
                <div className={`w-12 h-12 mb-4 bg-gradient-to-br ${tool.gradient} rounded-lg flex items-center justify-center`}>
                  {loadingToolId === tool.id ? (
                    <Loader className="w-6 h-6 text-white animate-spin" />
                  ) : (
                    <tool.icon className="w-6 h-6 text-white" />
                  )}
                </div>
                <h3 className="text-lg font-medium mb-2">{tool.name}</h3>
                <p className="text-sm text-white/60">{tool.description}</p>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-white/40">
          ChainKnight © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default Index;