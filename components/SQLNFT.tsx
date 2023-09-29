import React from "react";
import {
    ThirdwebNftMedia,
    useContract,
    useNFTs,
} from "@thirdweb-dev/react";


const SQLNFTs = () => {

    const { contract: nftCollection } = useContract(
        "0x4091Af43772F9B84e6eCA13ef358167C761D5cf9",
        "nft-collection"
    );

    const { data: nfts, isLoading: loadingNfts } = useNFTs(nftCollection);

    return (
        <>
            <div className="overflow-hidden">
                {loadingNfts ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        {Array.isArray(nfts) &&
                            [...nfts].reverse().map((nft) => (
                                <div className="relative bg-white shadow-xl ring-1 ring-gray-900/5 sm:rounded-lg">
                                    <div className="text-center mb-4">
                                        <p className="m-2">{nft.metadata.description}</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
            </div>

        </>
    );
};

export default SQLNFTs;