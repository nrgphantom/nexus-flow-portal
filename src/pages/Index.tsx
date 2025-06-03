
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sword, Brain, Zap } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("wayne");

  const tabs = [
    {
      id: "wayne",
      name: "Wayne Protocol",
      url: "https://wayneprotocol.vercel.app",
      icon: Sword,
      description: "Advanced protocol management"
    },
    {
      id: "alpha",
      name: "Alpha Mind",
      url: "https://thealpahmind.vercel.app",
      icon: Brain,
      description: "Intelligent analysis platform"
    },
    {
      id: "euler",
      name: "Euler Flow",
      url: "https://eulerflow.vercel.app",
      icon: Zap,
      description: "Mathematical flow optimization"
    }
  ];

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sword className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ChainKnight
              </h1>
            </div>
            <div className="text-sm text-gray-400">
              Unified Protocol Dashboard
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Card 
                key={tab.id}
                className={`
                  cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl
                  ${activeTab === tab.id 
                    ? 'bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-blue-500/50 shadow-lg shadow-blue-500/20' 
                    : 'bg-gray-900/50 border-gray-700 hover:border-gray-600'
                  }
                  backdrop-blur-sm
                `}
                onClick={() => setActiveTab(tab.id)}
              >
                <div className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`
                      w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300
                      ${activeTab === tab.id 
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
                        : 'bg-gray-800'
                      }
                    `}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className={`
                        font-semibold text-lg transition-colors duration-300
                        ${activeTab === tab.id ? 'text-blue-400' : 'text-white'}
                      `}>
                        {tab.name}
                      </h3>
                      <p className="text-gray-400 text-sm">{tab.description}</p>
                    </div>
                  </div>
                  {activeTab === tab.id && (
                    <div className="mt-4 flex justify-end">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Active Tab Content */}
        <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {activeTabData && (
                  <>
                    <activeTabData.icon className="w-5 h-5 text-blue-400" />
                    <h2 className="text-xl font-semibold text-white">
                      {activeTabData.name}
                    </h2>
                  </>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white transition-colors duration-200"
                onClick={() => window.open(activeTabData?.url, '_blank')}
              >
                Open in New Tab
              </Button>
            </div>

            {/* Embedded iframe */}
            <div className="relative w-full h-[calc(100vh-280px)] min-h-[600px] rounded-lg overflow-hidden border border-gray-700">
              <iframe
                src={activeTabData?.url}
                className="w-full h-full"
                frameBorder="0"
                title={activeTabData?.name}
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
              />
              
              {/* Loading overlay */}
              <div className="absolute inset-0 bg-gray-900 flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse delay-150"></div>
                  <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-300"></div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 bg-gray-900/30 backdrop-blur-sm mt-8">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              ChainKnight - Unified Protocol Dashboard
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <span>Wayne Protocol</span>
              <span>•</span>
              <span>Alpha Mind</span>
              <span>•</span>
              <span>Euler Flow</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
