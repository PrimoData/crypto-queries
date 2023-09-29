// components/Navbar.tsx
import React from 'react';
import Link from 'next/link';
import { ConnectWallet } from '@thirdweb-dev/react';
import SIDBadge from './SIDBadge';

const Navbar = () => {
    return (
        <div className="flex-col md:flex">
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    <div className="text-2xl pr-5">Crypto Queries</div>
                    <div className="flex space-x-4">
                        <Link href="/">
                            SQL
                        </Link>
                        <Link href="/leaderboard">
                            Streaming
                        </Link>
                    </div>
                    <div className="ml-auto flex items-center space-x-4">                        

                        <ConnectWallet
                            theme={"light"}
                            className={"green-button"}                          
                            switchToActiveChain={true}
                            modalSize={"compact"}
                            detailsBtn={() => {
                                return (
                                    <SIDBadge />
                                );
                            }}                            
                        />


                    </div>
                </div>
            </div>
        </div>

    );
};

export default Navbar;