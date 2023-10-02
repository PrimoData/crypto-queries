// components/LiveStream.tsx
import React, { useState, useEffect } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
const StreamrClient = require('streamr-client');

type LiveStreamProps = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

// Define the type of your message
export type Message = {
  key: string;
  value: {
    header: {
      height: number;
      time: string;
    };
    data: {
      txs: string[];
    };
    last_commit: {
      signatures?: {
        block_id_flag: number;
        validator_address: string;
        timestamp: string;
        signature: string;
      }[];
    };
  };
};

const LiveStream: React.FC<LiveStreamProps & { selectedStream: string }> = ({
  messages,
  setMessages,
  selectedStream,
}) => {
  useEffect(() => {
    if (!selectedStream) {
      setMessages([]);
      return;
    }

    // Clear the previous messages
    setMessages([]);

    const streamr = new StreamrClient({
      auth: {
        privateKey: StreamrClient.generateEthereumAccount().privateKey,
      },
    });

    const subscription = streamr.subscribe(
      selectedStream,
      (message: Message) => {
        // Adjust the type of message here
        message.value.data.txs = message.value.data.txs.map((tx) => {
          if (tx.length > 18) {
            return tx.substring(0, 18) + '...';
          }
          return tx;
        });

        delete message.value.last_commit.signatures;
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    );

    return () => {
      streamr.unsubscribe();
    };
  }, [selectedStream, setMessages]); // Add selectedStream to the dependency array

  return (
    <div>
      {messages.map((message, index) => (
        <Collapsible key={index}>
          <CollapsibleTrigger>
            Key: {JSON.stringify(message.key)}
          </CollapsibleTrigger>
          <CollapsibleContent>
            Header:
            <pre>{JSON.stringify(message.value, null, 2)}</pre>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
};

export default LiveStream;
