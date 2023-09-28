import React from 'react';
import { useMintNFT, useContract, Web3Button, useAddress } from "@thirdweb-dev/react";

const MintNFT = ({
    query,
}: {
    query: string | null;
}) => {
    const address = useAddress() ?? "";
    const contractAddress = "0x4091Af43772F9B84e6eCA13ef358167C761D5cf9";
    const { contract } = useContract(contractAddress);
    const { mutateAsync: mintNft, isLoading, error } = useMintNFT(contract);

    return (
        <Web3Button
            connectWallet={{
                btnTitle: "Create SQL NFT",
            }} contractAddress={contractAddress}
            {...(query ? null : { isDisabled: true })}
            onSuccess={(result) => alert("Created SQL NFT!")}
            action={() =>
                mintNft({
                    metadata: {
                        name: "SQL NFT",
                        description: query,
                    },
                    to: address, // Use useAddress hook to get current wallet address
                })
            }
        >
            Create SQL NFT
        </Web3Button>
    );
};

export default MintNFT;