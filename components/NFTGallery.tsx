import React, { FC, MouseEventHandler } from 'react';
import { ChevronsRight } from 'lucide-react';
import {
    useContract,
    useNFTs,
} from "@thirdweb-dev/react";
import { Badge } from "@/components/ui/badge";

interface TablesProps {
    onSelect: MouseEventHandler<HTMLDivElement>;
    queryType: string; // Add queryType prop
}

const NFTGallery: FC<TablesProps> = ({ onSelect, queryType }) => {

    const { contract: nftCollection } = useContract(
        "0x4091Af43772F9B84e6eCA13ef358167C761D5cf9",
    "nft-collection"
    );

    const { data: nfts, isLoading: loadingNfts } = useNFTs(nftCollection);

    return (
        <>
            <div className="overflow-hidden">
                <h1>{queryType}</h1>
                {loadingNfts ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        {Array.isArray(nfts) &&
                            [...nfts]
                                .reverse()
                                .filter((nft) => nft.metadata.properties?.queryType === queryType) // Filter based on queryType
                                .map((nft, index) => (
                                    <div
                                        key={index}
                                        className="relative bg-white shadow-xl ring-1 ring-gray-900/5 sm:rounded-lg m-2 p-2"
                                    >
                                        <div
                                            className="flex items-center space-x-2"
                                            onClick={onSelect}
                                        >
                                            <code className="text-sm">{nft.metadata.description}</code>
                                            <ChevronsRight size={18} />
                                        </div>
                                        {nft.metadata.properties &&
                                            'createdByAddress' in nft.metadata.properties && (
                                                <Badge
                                                    variant="outline"
                                                    style={{ backgroundColor: '#1EEFA4' }}
                                                >
                                                    Created by:{' '}
                                                    {`${(nft.metadata.properties.createdByArb as string) ||
                                                        (nft.metadata.properties.createdByAddress as string).slice(
                                                            0,
                                                            4
                                                        )}${nft.metadata.properties.createdByArb
                                                            ? ''
                                                            : `...${(nft.metadata.properties.createdByAddress as string).slice(
                                                                -4
                                                            )
                                                            }`
                                                        }`}
                                                </Badge>
                                            )}
                                    </div>
                                ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default NFTGallery;