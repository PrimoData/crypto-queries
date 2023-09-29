import React, { useState } from 'react';
import axios from 'axios';
import CodeEditor from '../components/CodeEditor';
import Tables from '../components/Tables';
import QueryResults from '../components/QueryResults';
import MintNFT from '../components/MintNFT';
import SQLNFTs from '../components/SQLNFT';

const IndexPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ data: any } | null>(null);

  const runQuery = async () => {
    const response = await axios.post('/api/runQuery', { query });
    setResults(response.data);
  };

  const handleSelect = (newQuery: string) => {
    setQuery(newQuery);
  };

  return (
    <div className="flex h-screen border-r">
      <div className="w-1/4 p-4">
        
        <h2 className="text-lg font-bold mb-4">Tables</h2>
        <Tables onSelect={(event) => handleSelect(event.currentTarget.textContent || '')} />
        
        <h2 className="text-lg font-bold mb-4 mt-4">SQL NFTs</h2>
        <SQLNFTs />

      </div>
      <div className="w-3/4 p-4 overflow-auto">

        <h1 className="text-2xl font-bold mb-4">KVYE x SQL Editor</h1>
        <CodeEditor value={query} onChange={setQuery} />
        
        <button onClick={runQuery} className="px-4 py-2 bg-blue-500 text-white rounded">
          Run Query
        </button>
        
        <MintNFT query={query} />
        
        <QueryResults results={results} />
      
      </div>
    </div>
  );
};

export default IndexPage;