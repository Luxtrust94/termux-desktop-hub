
import React, { useEffect, useRef } from 'react';

type TerminalOutputProps = {
  logs: string[];
};

const TerminalOutput: React.FC<TerminalOutputProps> = ({ logs }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="font-mono text-sm text-green-400 bg-black p-2">
      <div className="space-y-1">
        {logs.map((log, index) => (
          <div key={index} className={index % 2 === 0 ? "bg-green-900/5" : ""}>
            <span className="text-green-600 mr-2">$</span>
            {log}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default TerminalOutput;
