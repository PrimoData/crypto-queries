// pages/ai.tsx
import React, { useState, useEffect } from 'react';
import LiveStream from '../components/LiveStream';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MintNFT from '../components/MintNFT';
import NFTGallery from '../components/NFTGallery';
import axios from 'axios';
import { Message } from '../components/LiveStream';

const AI = () => {
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState('');
  const [messages, setMessages] = useState<Message[]>([]); // Define messages state here
  const [selectedStream, setSelectedStream] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/chat', { inputText, messages }); // Pass messages here
      setResponse(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelect = (newQuery: string) => {
    setInputText(newQuery);
  };

  const handleStreamSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedStream(selectedValue);
  };

  useEffect(() => {
    // This will trigger a re-render of the LiveStream component whenever selectedStream changes
  }, [selectedStream]);

  return (
    <div className="flex h-screen border-r">
      <div className="w-1/2 p-4">
        <div
          style={{ display: 'flex', flexDirection: 'column', height: '50%' }}
          className="overflow-auto"
        >
          <h2 className="text-lg font-bold mb-4">Streams</h2>

          <div
            style={{ display: 'flex', flexDirection: 'column', height: '50%' }}
          >
            <select onChange={handleStreamSelect}>
              <option value="">Select a stream</option>
              <option value="0x7277c78c02a4192ef8c48f5f4c529278d0e447fc/kyve/kyve-1/0">
                Cosmos Hub
              </option>
              <option value="0x7277c78c02a4192ef8c48f5f4c529278d0e447fc/kyve/kyve-1/1">
                Osmosis
              </option>
              <option value="0x7277c78c02a4192ef8c48f5f4c529278d0e447fc/kyve/kyve-1/2">
                Archway
              </option>
              <option value="0x7277c78c02a4192ef8c48f5f4c529278d0e447fc/kyve/kyve-1/3">
                Axelar
              </option>
            </select>
            <LiveStream
              messages={messages}
              setMessages={setMessages}
              selectedStream={selectedStream}
            />
          </div>
        </div>

        <div
          style={{ display: 'flex', flexDirection: 'column', height: '50%' }}
        >
          <h2 className="text-lg font-bold mb-4 mt-4">AI NFTs</h2>
          <NFTGallery
            onSelect={(event) =>
              handleSelect(event.currentTarget.textContent || '')
            }
            queryType="AI"
          />
        </div>
      </div>
      <div className="w-1/2 p-4">
        <h1 className="text-2xl font-bold mb-4">AI Queries</h1>

        <div className="flex w-full items-center space-x-2">
          <Input
            type="text"
            placeholder="Prompt..."
            value={inputText}
            onChange={handleInputChange}
          />
          <Button type="submit" onClick={handleSubmit}>
            Query
          </Button>
          <MintNFT query={inputText} queryType="AI" />
        </div>

        <h3 className="text-lg font-bold mb-4 mt-4">Response</h3>
        {response && <p>{response}</p>}
      </div>
    </div>
  );
};

export default AI;
