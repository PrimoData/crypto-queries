import React, { useState } from 'react';
import axios from 'axios';
import CodeEditor from '../components/CodeEditor';
import Tables from '../components/Tables';
import QueryResults from '../components/QueryResults';
import MintNFT from '../components/MintNFT';
import NFTGallery from '../components/NFTGallery';
import Spinner from '../components/Spinner'; // Import your Spinner component

const IndexPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ data: any } | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Add this line

  const runQuery = async () => {
    setIsLoading(true); // Set isLoading to true when the query starts
    const response = await axios.post('/api/runQuery', { query });
    setResults(response.data);
    setIsLoading(false); // Set isLoading to false when the query finishes
  };

  const handleSelect = (newQuery: string) => {
    setQuery(newQuery);
  };

  return (
    <div className="flex h-screen border-r -mt-24 pt-24">
      <div className="w-1/2 p-6 bg-gray-100 shadow-lg overflow-auto">
        <div
          style={{ display: 'flex', flexDirection: 'column' }}
          className="overflow-auto mb-2"
        >
          <h1 className="text-2xl font-bold mb-2 text-gray-800">
            Tables{' '}
            <em className="text-sm font-light">
              Note: Sampled data from KYVE mainnet pools.
            </em>
          </h1>
          <Tables
            onSelect={(event) =>
              handleSelect(event.currentTarget.textContent || '')
            }
          />
        </div>
        <div
          style={{ display: 'flex', flexDirection: 'column' }}
          className="overflow-auto"
        >
          <h1 className="text-2xl font-bold my-2 text-gray-800">
            SQL Query NFTs
          </h1>
          <div className="overflow-y-auto">
            <NFTGallery
              onSelect={(event) =>
                handleSelect(event.currentTarget.textContent || '')
              }
              queryType="SQL"
            />
          </div>
        </div>
      </div>
      <div className="w-1/2 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">SQL Query</h1>
        <CodeEditor value={query} onChange={setQuery} />
        <button
          onClick={runQuery}
          className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Run Query
        </button>
        <MintNFT query={query} queryType="SQL" />
        {isLoading ? <Spinner /> : <QueryResults results={results} />}{' '}
        {/* Conditionally render Spinner or QueryResults based on isLoading */}
      </div>
      <div className="fixed right-0 bottom-0 m-4 p-2 bg-gray-100 text-black rounded border border-green-500">
        Powered by
        <a
          href="https://www.kyve.network/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="data:image/png;base64,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"
            className="h-4 ml-2 inline-block"
          />
        </a>
      </div>
    </div>
  );
};

export default IndexPage;
