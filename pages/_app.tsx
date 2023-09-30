// pages/_app.tsx
import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import '../app/globals.css';
import Navbar from '@/components/Navbar';
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
} from '@thirdweb-dev/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      activeChain="arbitrum-goerli"
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      supportedWallets={[metamaskWallet(), coinbaseWallet()]}
    >
      <Head>
        <title>Crypto Queries</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Query blockchain data stored on KYVE Network, login with your wallet, link to SpaceID, and publish SQL NFTs on Arbitrum."
        />
        <meta
          name="keywords"
          content="Crypto queries blockchain data kyve network spaceid arbitrum sql nfts"
        />
        <link
          id="favicon"
          rel="icon"
          href="https://primodata.org/assets/img/database.svg"
        ></link>
      </Head>

      <Navbar />

      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
