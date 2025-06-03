import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sword, Brain, Zap, ExternalLink, X, Plus } from "lucide-react";

const Index = () => {
  const [openTabs, setOpenTabs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("");

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

  const openTool = (toolId: string) => {
    if (!openTabs.includes(toolId)) {
      setOpenTabs([...openTabs, toolId]);
    }
    setActiveTab(toolId);
  };

  const closeTool = (toolId: string) => {
    const newTabs = openTabs.filter(tab => tab !== toolId);
    setOpenTabs(newTabs);
    if (activeTab === toolId) {
      setActiveTab(newTabs.length > 0 ? newTabs[newTabs.length - 1] : "");
    }
  };

  const activeTool = tools.find(tool => tool.id === activeTab);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center shadow-lg">
                <Sword className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  ChainKnight
                </h1>
                <p className="text-sm text-gray-400">Enterprise Protocol Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-400">
                {tools.length} Tools Available
              </div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      {openTabs.length > 0 && (
        <div className="border-b border-gray-800 bg-gray-900/50">
          <div className="container mx-auto px-6">
            <div className="flex items-center space-x-1 overflow-x-auto">
              {openTabs.map((tabId) => {
                const tool = tools.find(t => t.id === tabId);
                if (!tool) return null;
                const Icon = tool.icon;
                
                return (
                  <div
                    key={tabId}
                    className={`
                      flex items-center space-x-2 px-4 py-3 border-b-2 cursor-pointer transition-all duration-200 min-w-0 flex-shrink-0
                      ${activeTab === tabId 
                        ? 'border-purple-500 bg-purple-500/10 text-white' 
                        : 'border-transparent hover:border-gray-600 text-gray-400 hover:text-white'
                      }
                    `}
                    onClick={() => setActiveTab(tabId)}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate text-sm font-medium">{tool.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        closeTool(tabId);
                      }}
                      className="ml-2 p-1 rounded-full hover:bg-gray-700 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {openTabs.length === 0 ? (
          <>
            {/* Welcome Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Enterprise Protocol Suite
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Access and manage your blockchain protocols, analytics, and optimization tools from a unified dashboard
              </p>
            </div>

            {/* Tool Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Card 
                    key={tool.id}
                    className="bg-gray-900 border-gray-800 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer group"
                    onClick={() => openTool(tool.id)}
                  >
                    <div className="p-8">
                      {/* Category Badge */}
                      <div className="mb-4">
                        <span className="px-3 py-1 text-xs font-semibold bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">
                          {tool.category}
                        </span>
                      </div>

                      {/* Icon and Title */}
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl flex items-center justify-center shadow-lg group-hover:from-purple-500 group-hover:to-purple-700 transition-all duration-300">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                            {tool.name}
                          </h3>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-400 mb-6 leading-relaxed">
                        {tool.description}
                      </p>

                      {/* Action Button */}
                      <div className="flex items-center justify-between">
                        <Button
                          className="bg-purple-600 hover:bg-purple-700 text-white border-0 font-semibold px-6 py-2 transition-all duration-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            openTool(tool.id);
                          }}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Open Tool
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(tool.url, '_blank');
                          }}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </>
        ) : (
          /* Active Tool Display */
          activeTool && (
            <div className="h-[calc(100vh-200px)]">
              <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden h-full">
                <div className="p-4 border-b border-gray-800 bg-gray-900/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <activeTool.icon className="w-5 h-5 text-purple-400" />
                      <h2 className="text-lg font-semibold text-white">
                        {activeTool.name}
                      </h2>
                      <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded border border-purple-500/30">
                        {activeTool.category}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white"
                      onClick={() => window.open(activeTool.url, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open External
                    </Button>
                  </div>
                </div>

                <div className="relative w-full h-[calc(100%-80px)]">
                  <iframe
                    src={activeTool.url}
                    className="w-full h-full border-0"
                    title={activeTool.name}
                    sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
                  />
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {/* Footer */}
      {openTabs.length === 0 && (
        <div className="border-t border-gray-800 bg-gray-900/30 mt-12">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400">
                <p className="font-semibold">ChainKnight Enterprise</p>
                <p className="text-sm">Unified Protocol Management Dashboard</p>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <span>Wayne Protocol</span>
                <span className="w-1 h-1 bg-purple-500 rounded-full"></span>
                <span>Alpha Mind</span>
                <span className="w-1 h-1 bg-purple-500 rounded-full"></span>
                <span>Euler Flow</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
