// components/Navbar.tsx
import React from 'react';
import Link from 'next/link';
import { ConnectWallet } from '@thirdweb-dev/react';
import SIDBadge from './SIDBadge';
import BuyArbButton from './BuyArbButton';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold text-white lg:text-3xl">
              Crypto Queries
            </p>
          </div>

          <div className="flex md:hidden">
            <button
              type="button"
              className="text-gray-200 hover:text-gray-400 focus:outline-none focus:text-gray-400"
              aria-label="toggle menu"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:mx-6">
            <Link href="/">
              <p className="my-1 text-sm text-gray-200 md:mx-4 md:my-0">SQL</p>
            </Link>
            <Link href="/ai">
              <p className="my-1 text-sm text-gray-200 md:mx-4 md:my-0">AI</p>
            </Link>
          </div>
        </div>

        <div className="md:flex items-center">
          <div className="flex items-center py-2 -mx-1 md:mx-0">
            <BuyArbButton />

            <ConnectWallet
              theme={'light'}
              className={'green-button'}
              switchToActiveChain={true}
              modalSize={'compact'}
              detailsBtn={() => {
                return <SIDBadge />;
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
