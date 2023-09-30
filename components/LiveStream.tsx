// pages/leaderboard.tsx
import React, { useState, useEffect } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
const StreamrClient = require('streamr-client');

const LiveStream = () => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const streamr = new StreamrClient({
      auth: {
        privateKey: StreamrClient.generateEthereumAccount().privateKey,
      },
    });

    const subscription = streamr.subscribe(
      '0x7277c78c02a4192ef8c48f5f4c529278d0e447fc/kyve/kyve-1/0',
      (message: string) => {
        // Handle the incoming data here
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    );

    return () => {
      // Cleanup subscription when component unmounts
      streamr.unsubscribe();
    };
  }, []);

  return (
    <div>
      {messages.map((message, index) => (
        <Collapsible key={index}>
          <CollapsibleTrigger>{JSON.stringify(message.key)}</CollapsibleTrigger>
          <CollapsibleContent>
            "Height: "{JSON.stringify(message.value.header.height)}
            ", Time: "{JSON.stringify(message.value.header.time)}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
};

export default LiveStream;
