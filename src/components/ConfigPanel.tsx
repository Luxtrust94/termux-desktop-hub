
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Save, RefreshCw, Play } from 'lucide-react';

type ConfigPanelProps = {
  addLog: (log: string) => void;
};

const ConfigPanel: React.FC<ConfigPanelProps> = ({ addLog }) => {
  const [startupScript, setStartupScript] = useState(`#!/data/data/com.termux/files/usr/bin/bash
# Script to launch XFCE4 desktop environment

# Start Pulseaudio if not running
if ! pgrep -x "pulseaudio" > /dev/null; then
  pulseaudio --start --exit-idle-time=-1
  echo "Pulseaudio started"
fi

# Launch Termux-X11
am start --user 0 -n com.termux.x11/com.termux.x11.MainActivity
sleep 2

# Enter proot Debian distro and start XFCE4
proot-distro login debian -- bash -c "export DISPLAY=:0 && export PULSE_SERVER=127.0.0.1 && startxfce4"
`);

  const [installScript, setInstallScript] = useState(`#!/data/data/com.termux/files/usr/bin/bash
# Script to install necessary packages for Termux and Debian XFCE4

# Update repositories
apt update && apt upgrade -y

# Install required packages
apt install -y git nano wget gnupg pulseaudio termux-licenses termux-tools \\
  termux-am-socket resolv-conf pkg-config ncurses-utils debianutils \\
  proot-distro

# Create directory for backup
mkdir -p ~/debian_backup

# Download the Debian backup from Google Drive
wget --load-cookies /tmp/cookies.txt "https://docs.google.com/uc?export=download&confirm=$(wget --quiet --save-cookies /tmp/cookies.txt --keep-session-cookies --no-check-certificate 'https://docs.google.com/uc?export=download&id=16JawcVOM9CvufcyZsYyT6-nls-MHTAlH' -O- | sed -rn 's/.*confirm=([0-9A-Za-z_]+).*/\\1\\n/p')&id=16JawcVOM9CvufcyZsYyT6-nls-MHTAlH" -O ~/debian_backup/debian_backup.tar.gz

# Extract and install Debian using proot-distro
proot-distro restore debian ~/debian_backup/debian_backup.tar.gz

echo "Installation completed successfully!"
`);

  const [x11Config, setX11Config] = useState({
    displayResolution: '1280x720',
    useHardwareAcceleration: true,
    displayDpi: '120',
    enableSound: true
  });

  const saveScript = (type: string) => {
    addLog(`Saving ${type} script...`);
    setTimeout(() => {
      addLog(`${type} script saved successfully!`);
    }, 500);
  };

  const runScript = (type: string) => {
    addLog(`Running ${type} script...`);
    addLog("This would execute the script in the actual Termux environment");
    addLog("Script execution simulated for demo purposes");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">System Configuration</h2>
      
      <Tabs defaultValue="startup" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4 bg-black border border-green-700/40">
          <TabsTrigger value="startup" className="data-[state=active]:bg-green-900/30">
            Startup Script
          </TabsTrigger>
          <TabsTrigger value="install" className="data-[state=active]:bg-green-900/30">
            Install Script
          </TabsTrigger>
          <TabsTrigger value="x11" className="data-[state=active]:bg-green-900/30">
            X11 Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="startup" className="border border-green-700/40 rounded-lg p-4 bg-black">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">XFCE4 Startup Script</h3>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => saveScript('startup')}
                  className="bg-transparent border-green-700 text-green-400 hover:bg-green-900/30 hover:text-green-300"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => runScript('startup')}
                  className="bg-green-700/20 border-green-700 text-green-400 hover:bg-green-900/30 hover:text-green-300"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Run
                </Button>
              </div>
            </div>
            
            <ScrollArea className="h-64 w-full">
              <Textarea
                value={startupScript}
                onChange={(e) => setStartupScript(e.target.value)}
                className="min-h-[250px] font-mono text-xs bg-black border-green-700/40 text-green-400"
              />
            </ScrollArea>
            
            <p className="text-xs text-green-600">
              This script launches the XFCE4 desktop environment using Termux-X11.
              Edit as needed but be careful not to break the functionality.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="install" className="border border-green-700/40 rounded-lg p-4 bg-black">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Installation Script</h3>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => saveScript('installation')}
                  className="bg-transparent border-green-700 text-green-400 hover:bg-green-900/30 hover:text-green-300"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => runScript('installation')}
                  className="bg-green-700/20 border-green-700 text-green-400 hover:bg-green-900/30 hover:text-green-300"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Run
                </Button>
              </div>
            </div>
            
            <ScrollArea className="h-64 w-full">
              <Textarea
                value={installScript}
                onChange={(e) => setInstallScript(e.target.value)}
                className="min-h-[250px] font-mono text-xs bg-black border-green-700/40 text-green-400"
              />
            </ScrollArea>
            
            <p className="text-xs text-green-600">
              This script installs necessary packages and restores the Debian backup.
              Warning: Running this script will overwrite any existing Debian installation.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="x11" className="border border-green-700/40 rounded-lg p-4 bg-black">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">X11 Configuration</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  addLog("Saving X11 configuration...");
                  setTimeout(() => {
                    addLog("X11 configuration saved");
                  }, 500);
                }}
                className="bg-transparent border-green-700 text-green-400 hover:bg-green-900/30 hover:text-green-300"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Apply
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="displayResolution">Display Resolution</Label>
                <Input
                  id="displayResolution"
                  value={x11Config.displayResolution}
                  onChange={(e) => setX11Config({...x11Config, displayResolution: e.target.value})}
                  className="bg-black border-green-700/40 text-green-400"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="displayDpi">Display DPI</Label>
                <Input
                  id="displayDpi"
                  value={x11Config.displayDpi}
                  onChange={(e) => setX11Config({...x11Config, displayDpi: e.target.value})}
                  className="bg-black border-green-700/40 text-green-400"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="useHardwareAcceleration"
                  checked={x11Config.useHardwareAcceleration}
                  onChange={(e) => setX11Config({...x11Config, useHardwareAcceleration: e.target.checked})}
                  className="accent-green-700"
                />
                <Label htmlFor="useHardwareAcceleration" className="text-sm">Enable Hardware Acceleration</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="enableSound"
                  checked={x11Config.enableSound}
                  onChange={(e) => setX11Config({...x11Config, enableSound: e.target.checked})}
                  className="accent-green-700"
                />
                <Label htmlFor="enableSound" className="text-sm">Enable Pulseaudio Sound System</Label>
              </div>
            </div>
            
            <div className="pt-4 text-xs text-green-600">
              <p>
                These settings will be applied to the Termux-X11 application. 
                Changes require restarting the XFCE4 session.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConfigPanel;
