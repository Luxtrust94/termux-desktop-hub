
import React, { useState } from 'react';
import SetupWizard from '@/components/SetupWizard';
import Dashboard from '@/components/Dashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Terminal } from 'lucide-react';
import TerminalOutput from '@/components/TerminalOutput';
import ConfigPanel from '@/components/ConfigPanel';

const Index = () => {
  const [isFirstRun, setIsFirstRun] = useState(true);
  const [setupCompleted, setSetupCompleted] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "Welcome to Termux Desktop Hub",
    "Ready to set up your environment..."
  ]);

  const addLog = (log: string) => {
    setTerminalLogs(prev => [...prev, log]);
  };

  const completeSetup = () => {
    setIsFirstRun(false);
    setSetupCompleted(true);
    addLog("Setup completed successfully!");
    addLog("Termux environment is ready.");
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      <header className="border-b border-green-700/40 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-6 h-6" />
          <h1 className="text-xl font-bold">Termux Desktop Hub</h1>
        </div>
        <div className="flex gap-2">
          <span className="px-2 py-1 text-xs bg-green-900/30 rounded-md border border-green-700/40">
            v1.0.0
          </span>
        </div>
      </header>

      <main className="container mx-auto p-4 mt-4">
        {isFirstRun ? (
          <SetupWizard onComplete={completeSetup} addLog={addLog} />
        ) : (
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4 bg-black border border-green-700/40">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-green-900/30">
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="terminal" className="data-[state=active]:bg-green-900/30">
                Terminal
              </TabsTrigger>
              <TabsTrigger value="config" className="data-[state=active]:bg-green-900/30">
                Configuration
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="border border-green-700/40 rounded-lg p-4 bg-black">
              <Dashboard setupCompleted={setupCompleted} addLog={addLog} />
            </TabsContent>
            
            <TabsContent value="terminal" className="border border-green-700/40 rounded-lg p-4 bg-black h-[70vh]">
              <ScrollArea className="h-full">
                <TerminalOutput logs={terminalLogs} />
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="config" className="border border-green-700/40 rounded-lg p-4 bg-black">
              <ConfigPanel addLog={addLog} />
            </TabsContent>
          </Tabs>
        )}
      </main>
      
      <footer className="border-t border-green-700/40 p-2 text-xs text-center text-green-600">
        Termux Desktop Hub | XFCE4 Integration | © {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Index;
