
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Terminal, 
  MonitorCheck, 
  Play, 
  RefreshCw, 
  Download, 
  HardDriveDownload, 
  Settings 
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

type DashboardProps = {
  setupCompleted: boolean;
  addLog: (log: string) => void;
};

const Dashboard: React.FC<DashboardProps> = ({ setupCompleted, addLog }) => {
  const launchDesktop = () => {
    addLog("Launching XFCE4 Desktop environment...");
    addLog("Starting Termux-X11...");
    addLog("Desktop environment launched successfully");
  };

  const updatePackages = () => {
    addLog("Updating packages...");
    addLog("apt update && apt upgrade");
    // Simulate update process
    setTimeout(() => {
      addLog("Packages updated successfully");
    }, 2000);
  };

  const backupSystem = () => {
    addLog("Creating system backup...");
    // Simulate backup process
    setTimeout(() => {
      addLog("Backup created successfully at /sdcard/termux_backup.tar.gz");
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">System Dashboard</h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => addLog("Refreshing system status...")}
          className="bg-transparent border-green-700 text-green-400 hover:bg-green-900/30 hover:text-green-300"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-black border-green-700/40">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center">
              <Terminal className="h-4 w-4 mr-2" />
              Termux Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-green-600">Status:</span>
                <span className="font-medium text-green-400">Active</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-green-600">Packages:</span>
                <span className="font-medium text-green-400">12 installed</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-green-600">Storage:</span>
                <span className="font-medium text-green-400">1.2GB used</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border-green-700/40">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center">
              <HardDriveDownload className="h-4 w-4 mr-2" />
              Debian System
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-green-600">Status:</span>
                <span className="font-medium text-green-400">{setupCompleted ? "Installed" : "Not Installed"}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-green-600">Version:</span>
                <span className="font-medium text-green-400">Debian 11</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-green-600">Size:</span>
                <span className="font-medium text-green-400">3.7GB</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border-green-700/40">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center">
              <MonitorCheck className="h-4 w-4 mr-2" />
              XFCE4 Desktop
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-green-600">Status:</span>
                <span className="font-medium text-green-400">{setupCompleted ? "Ready" : "Not Configured"}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-green-600">X11:</span>
                <span className="font-medium text-green-400">{setupCompleted ? "Connected" : "Not Connected"}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-green-600">Last Used:</span>
                <span className="font-medium text-green-400">{setupCompleted ? "Never" : "N/A"}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator className="bg-green-700/20" />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Quick Actions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="bg-green-900/20 border-green-700 text-green-400 hover:bg-green-900/30 hover:text-green-300 justify-start"
            disabled={!setupCompleted}
            onClick={launchDesktop}
          >
            <Play className="h-4 w-4 mr-2" />
            Launch XFCE4 Desktop
          </Button>
          
          <Button 
            variant="outline" 
            className="bg-transparent border-green-700 text-green-400 hover:bg-green-900/30 hover:text-green-300 justify-start"
            disabled={!setupCompleted}
            onClick={updatePackages}
          >
            <Download className="h-4 w-4 mr-2" />
            Update Packages
          </Button>
          
          <Button 
            variant="outline" 
            className="bg-transparent border-green-700 text-green-400 hover:bg-green-900/30 hover:text-green-300 justify-start"
            disabled={!setupCompleted}
            onClick={backupSystem}
          >
            <HardDriveDownload className="h-4 w-4 mr-2" />
            Backup System
          </Button>
          
          <Button 
            variant="outline" 
            className="bg-transparent border-green-700 text-green-400 hover:bg-green-900/30 hover:text-green-300 justify-start"
            disabled={!setupCompleted}
          >
            <Settings className="h-4 w-4 mr-2" />
            System Settings
          </Button>
        </div>
      </div>

      {!setupCompleted && (
        <Card className="bg-green-900/10 border-green-700/40">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <h3 className="font-medium">Setup Not Completed</h3>
              <p className="text-xs text-green-600">
                Please complete the setup wizard to enable all features
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
