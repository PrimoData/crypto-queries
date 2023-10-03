// components/LiveStream.tsx
import React, { useEffect } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { PlusCircle } from 'lucide-react';
import Spinner from '@/components/Spinner';
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
      {!selectedStream ? null : messages.length === 0 ? (
        <Spinner />
      ) : (
        messages.map((message, index) => (
          <Collapsible
            key={index}
            className="bg-white shadow overflow-hidden sm:rounded-lg my-2"
          >
            <CollapsibleTrigger className="px-4 py-2 sm:px-6">
              <h3 className="text-sm font-medium text-gray-900 flex justify-between items-center">
                <span className="mr-2">Key: {JSON.stringify(message.key)}</span>
                <PlusCircle size={18} />
              </h3>
            </CollapsibleTrigger>
            <CollapsibleContent className="border-t border-gray-200 px-4 sm:px-6">
              <div className="text-sm font-medium text-gray-500">Header:</div>
              <pre className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                {JSON.stringify(message.value, null, 2)}
              </pre>
            </CollapsibleContent>
          </Collapsible>
        ))
      )}
    </div>
  );
};

export default LiveStream;
