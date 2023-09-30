import React, { useState, useEffect } from 'react';
import LiveStream from '../components/LiveStream';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MintNFT from '../components/MintNFT';
import NFTGallery from '../components/NFTGallery';
import axios from 'axios';

const NL = () => {
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/chat', { inputText });
      setResponse(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelect = (newQuery: string) => {
    setInputText(newQuery);
  };

  return (
    <div className="flex h-screen border-r">
      <div className="w-1/2 p-4">
        <div
          style={{ display: 'flex', flexDirection: 'column', height: '50%' }}
          className="overflow-auto"
        >
          <h2 className="text-lg font-bold mb-4">Streams</h2>
          <LiveStream />
        </div>

        <div
          style={{ display: 'flex', flexDirection: 'column', height: '50%' }}
        >
          <h2 className="text-lg font-bold mb-4 mt-4">NL NFTs</h2>
          <NFTGallery
            onSelect={(event) =>
              handleSelect(event.currentTarget.textContent || '')
            }
            queryType="NL"
          />
        </div>
      </div>
      <div className="w-1/2 p-4">
        <h1 className="text-2xl font-bold mb-4">AI NL Queries</h1>

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
          <MintNFT query={inputText} queryType="NL" />
        </div>

        <h3 className="text-lg font-bold mb-4 mt-4">Response</h3>
        {response && <p>{response}</p>}
      </div>
    </div>
  );
};

export default NL;
