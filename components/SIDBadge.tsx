import React, { useState, useEffect } from 'react';
import { useAddress } from "@thirdweb-dev/react";
import { ethers } from 'ethers';

const SID = require('@siddomains/sidjs').default;
const SIDfunctions = require('@siddomains/sidjs');

const SIDBadge = () => {
  const [name, setName] = useState(null);
  const address = useAddress();

  useEffect(() => {
    async function fetchName() {
      const rpc = "https://arb1.arbitrum.io/rpc";
      const provider = new ethers.providers.JsonRpcProvider(rpc);
      const chainId = 42161; // Arbitrum One chain id
      const sid = new SID({ provider, sidAddress: SIDfunctions.getSidAddress(chainId) });

      try {
        const retrievedName = await sid.getName(address);
        const arb_name = retrievedName.name;
        console.log("Name:", arb_name);
        setName(arb_name);
      } catch (error) {
        console.error("Error fetching name:", error);
      }
    }

    fetchName();
  }, [address]);

  return (
    <button className="green-button px-4 py-2 rounded"> 
      {name ? (
        <>{name}</>
      ) : (
        <>{`${address}`.slice(0, 4)}...{`${address}`.slice(-4)}</>
      )}
    </button>
  );
};

export default SIDBadge;