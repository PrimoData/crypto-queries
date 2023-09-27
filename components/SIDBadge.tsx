import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { useAddress } from "@thirdweb-dev/react";
import { ethers } from 'ethers';

const SID = require('@siddomains/sidjs').default;
const SIDfunctions = require('@siddomains/sidjs');

const SIDBadge = () => {
  const [name, setName] = useState(null);
  // const address = useAddress();
  const address = "0x36C172CACe537D1DbE36a37531cB338dd416f65a";

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
    <Badge variant="outline" style={{ backgroundColor: "#1EEFA4" }}>
      {name ? (
        <>{name}</>
      ) : (
        <a href="https://space.id/tld/2" target="_blank" rel="noopener noreferrer">
          Get .arb domain
        </a>
      )}
    </Badge>
  );
};

export default SIDBadge;