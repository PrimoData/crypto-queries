import React, { useState, useEffect } from 'react';
import {
  useMintNFT,
  useContract,
  Web3Button,
  useAddress,
} from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const SID = require('@siddomains/sidjs').default;
const SIDfunctions = require('@siddomains/sidjs');

const MintNFT = ({
  query,
  queryType,
}: {
  query: string | null;
  queryType: string | null;
}) => {
  const [name, setName] = useState(null);
  const address = useAddress() ?? '';
  const contractAddress = '0x3f29674536d9faAB80899C3aa1B055b01C16DDbF';
  const { contract } = useContract(contractAddress);
  const { mutateAsync: mintNft, isLoading, error } = useMintNFT(contract);

  useEffect(() => {
    async function fetchName() {
      const rpc = 'https://arb1.arbitrum.io/rpc';
      const provider = new ethers.providers.JsonRpcProvider(rpc);
      const chainId = 42161; // Arbitrum One chain id
      const sid = new SID({
        provider,
        sidAddress: SIDfunctions.getSidAddress(chainId),
      });

      try {
        const retrievedName = await sid.getName(address);
        const arb_name = retrievedName.name;
        console.log('MINT Name:', arb_name);
        setName(arb_name);
      } catch (error) {
        console.error('Error fetching name:', error);
      }
    }

    fetchName();
  }, [address]);

  return (
    <Web3Button
      connectWallet={{
        btnTitle: 'Create Query NFT',
      }}
      className={'green-button'}
      contractAddress={contractAddress}
      {...(query ? null : { isDisabled: true })}
      onSuccess={(result) => alert('Created Query NFT!')}
      action={() =>
        mintNft({
          metadata: {
            name: 'Query NFT',
            description: query,
            properties: {
              createdByAddress: address,
              createdByArb: name,
              queryType: queryType,
            },
          },
          to: address, // Use useAddress hook to get current wallet address
        })
      }
    >
      Create Query NFT
    </Web3Button>
  );
};

export default MintNFT;
