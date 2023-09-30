import React, { useState, useEffect } from 'react';
const StreamrClient = require('streamr-client');

const HistoricStream = () => {
  const [resend1Data, setResend1Data] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const streamr = new StreamrClient({
        auth: {
          privateKey: StreamrClient.generateEthereumAccount().privateKey,
        },
      });

      streamr.resend(
        "0x7277c78c02a4192ef8c48f5f4c529278d0e447fc/kyve/kyve-1/0",
        {
          last: 10,
          // timestamp: Date.now() - 1000 * 60 * 5, // 5 minutes ago
        },
        (msg) => {
          // Append the new value to the array
          setResend1Data((prevData) => [...prevData, msg.value.header.height]);
        }
      );
    };

    fetchData();
  }, []);

  return (
    <div>
      {resend1Data.length > 0 && (
        <div>
          <ul>
            {resend1Data.map((height, index) => (
              <li key={index}>{height}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HistoricStream;
