
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Package, HardDrive, Monitor, Download, CheckCircle, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';

type SetupWizardProps = {
  onComplete: () => void;
  addLog: (log: string) => void;
};

const SetupWizard: React.FC<SetupWizardProps> = ({ onComplete, addLog }) => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isInstalling, setIsInstalling] = useState(false);
  const [driveUrl, setDriveUrl] = useState('https://drive.google.com/file/d/16JawcVOM9CvufcyZsYyT6-nls-MHTAlH/view');
  
  const packages = [
    { id: 'git', label: 'git', required: true, selected: true },
    { id: 'nano', label: 'nano', required: true, selected: true },
    { id: 'wget', label: 'wget', required: true, selected: true },
    { id: 'gnupg', label: 'gnupg', required: true, selected: true },
    { id: 'pulseaudio', label: 'pulseaudio', required: true, selected: true },
    { id: 'termux-licenses', label: 'termux-licenses', required: true, selected: true },
    { id: 'termux-tools', label: 'termux-tools', required: true, selected: true },
    { id: 'termux-am-socket', label: 'termux-am-socket', required: true, selected: true },
    { id: 'resolv-conf', label: 'resolv-conf', required: true, selected: true },
    { id: 'pkg-config', label: 'pkg-config', required: true, selected: true },
    { id: 'ncurses-utils', label: 'ncurses-utils', required: true, selected: true },
    { id: 'debianutils', label: 'debianutils', required: true, selected: true },
    { id: 'proot-distro', label: 'proot-distro', required: true, selected: true }
  ];

  const [selectedPackages, setSelectedPackages] = useState(
    packages.reduce((acc, pkg) => ({ ...acc, [pkg.id]: pkg.selected }), {})
  );

  const nextStep = () => {
    const newStep = step + 1;
    setStep(newStep);
    setProgress((newStep - 1) * 25);
    addLog(`Moving to setup step ${newStep}`);
  };

  const prevStep = () => {
    const newStep = step - 1;
    setStep(newStep);
    setProgress((newStep - 1) * 25);
    addLog(`Going back to setup step ${newStep}`);
  };

  const togglePackage = (packageId: string) => {
    setSelectedPackages(prev => ({
      ...prev,
      [packageId]: !prev[packageId]
    }));
  };

  const simulateInstallation = () => {
    setIsInstalling(true);
    addLog("Starting package installation...");
    
    let currentProgress = progress;
    const interval = setInterval(() => {
      if (currentProgress < 100) {
        currentProgress += 5;
        setProgress(currentProgress);
        
        // Add some realistic-looking logs
        if (currentProgress === 30) {
          addLog("Downloading packages...");
        } else if (currentProgress === 50) {
          addLog("Installing packages...");
        } else if (currentProgress === 70) {
          addLog("Setting up proot-distro...");
        } else if (currentProgress === 85) {
          addLog("Preparing to download Debian backup from Google Drive...");
        } else if (currentProgress === 95) {
          addLog("Configuring XFCE4 environment...");
        }
      } else {
        clearInterval(interval);
        setIsInstalling(false);
        addLog("Installation completed successfully!");
        onComplete();
      }
    }, 300);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-black border-green-700/40">
      <CardHeader>
        <CardTitle className="text-xl">Termux Setup Wizard</CardTitle>
        <CardDescription className="text-green-600">
          Let's set up your Termux environment with XFCE4 desktop
        </CardDescription>
        <Progress value={progress} className="h-2 bg-green-900/30" />
      </CardHeader>
      
      <CardContent>
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Welcome to Termux Desktop Hub</h3>
            <p className="text-green-600">
              This wizard will help you set up Termux with necessary packages and 
              restore a Debian backup with XFCE4 desktop environment.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="flex flex-col items-center p-4 border border-green-700/40 rounded-lg">
                <Package className="h-8 w-8 mb-2" />
                <h3 className="font-medium">Install Packages</h3>
                <p className="text-xs text-green-600 text-center">
                  Essential Termux packages will be installed
                </p>
              </div>
              
              <div className="flex flex-col items-center p-4 border border-green-700/40 rounded-lg">
                <HardDrive className="h-8 w-8 mb-2" />
                <h3 className="font-medium">Restore Debian</h3>
                <p className="text-xs text-green-600 text-center">
                  Restore Debian backup from Google Drive
                </p>
              </div>
              
              <div className="flex flex-col items-center p-4 border border-green-700/40 rounded-lg">
                <Monitor className="h-8 w-8 mb-2" />
                <h3 className="font-medium">Setup XFCE4</h3>
                <p className="text-xs text-green-600 text-center">
                  Configure XFCE4 desktop with X11
                </p>
              </div>
              
              <div className="flex flex-col items-center p-4 border border-green-700/40 rounded-lg">
                <CheckCircle className="h-8 w-8 mb-2" />
                <h3 className="font-medium">Ready to Use</h3>
                <p className="text-xs text-green-600 text-center">
                  Your desktop environment will be ready
                </p>
              </div>
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Select Packages to Install</h3>
            <p className="text-green-600">
              The following packages will be installed in Termux. Required packages cannot be deselected.
            </p>
            
            <ScrollArea className="h-64 border border-green-700/40 rounded-lg p-4">
              <div className="space-y-2">
                {packages.map(pkg => (
                  <div key={pkg.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={pkg.id}
                      checked={selectedPackages[pkg.id]}
                      disabled={pkg.required}
                      onCheckedChange={() => togglePackage(pkg.id)}
                      className="border-green-700 data-[state=checked]:bg-green-700"
                    />
                    <label
                      htmlFor={pkg.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {pkg.label} {pkg.required && <span className="text-xs text-green-600">(required)</span>}
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="pt-2">
              <p className="text-xs text-green-600">
                <AlertCircle className="h-4 w-4 inline mr-1" />
                These packages are essential for the Termux desktop environment.
              </p>
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Google Drive Debian Backup</h3>
            <p className="text-green-600">
              Enter the Google Drive link to your debian_backup.tar.gz file.
              We will download and restore it using proot-distro.
            </p>
            
            <div className="space-y-2">
              <label htmlFor="drive-url" className="text-sm">Google Drive URL</label>
              <Input
                id="drive-url"
                value={driveUrl}
                onChange={(e) => setDriveUrl(e.target.value)}
                className="bg-black border-green-700/40 text-green-400"
                placeholder="https://drive.google.com/file/d/..."
              />
              <p className="text-xs text-green-600">
                Default URL is already entered. You can change it if needed.
              </p>
            </div>
            
            <div className="border border-green-700/40 rounded-lg p-4 mt-4">
              <h4 className="text-sm font-medium">What will happen:</h4>
              <ul className="text-xs text-green-600 list-disc list-inside mt-2 space-y-1">
                <li>Download the Debian backup from Google Drive</li>
                <li>Use proot-distro to restore the backup</li>
                <li>Configure necessary settings for XFCE4</li>
                <li>Create scripts to easily launch the desktop environment</li>
              </ul>
            </div>
          </div>
        )}
        
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Ready to Install</h3>
            <p className="text-green-600">
              Everything is ready for installation. Click the Install button to begin.
            </p>
            
            <div className="border border-green-700/40 rounded-lg p-4">
              <h4 className="text-sm font-medium">Installation Summary:</h4>
              <ul className="text-xs text-green-600 list-disc list-inside mt-2 space-y-1">
                <li>Install {Object.values(selectedPackages).filter(Boolean).length} Termux packages</li>
                <li>Download and restore Debian backup from Google Drive</li>
                <li>Configure XFCE4 desktop environment with X11</li>
                <li>Create startup scripts for easy access</li>
              </ul>
            </div>
            
            {isInstalling && (
              <div className="mt-4 space-y-2">
                <p className="text-sm">Installation in progress...</p>
                <Progress value={progress} className="h-2 bg-green-900/30" />
                <p className="text-xs text-green-600">Please do not close the application.</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between border-t border-green-700/40 pt-4">
        {step > 1 && !isInstalling ? (
          <Button 
            variant="outline" 
            onClick={prevStep}
            className="bg-transparent border-green-700 text-green-400 hover:bg-green-900/30 hover:text-green-300"
          >
            Back
          </Button>
        ) : (
          <div></div>
        )}
        
        {step < 4 ? (
          <Button 
            onClick={nextStep}
            className="bg-green-700 text-black hover:bg-green-600"
          >
            Next
          </Button>
        ) : (
          <Button 
            onClick={simulateInstallation}
            disabled={isInstalling}
            className="bg-green-700 text-black hover:bg-green-600"
          >
            {isInstalling ? (
              <>
                <Download className="mr-2 h-4 w-4 animate-pulse" /> Installing...
              </>
            ) : (
              "Install"
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default SetupWizard;
