# Crypto Queries

Open Platform to Query Decentralized Blockchain Data.

- [Live App](https://crypto-queries.vercel.app/)
- [Video Demo](https://www.youtube.com/watch?v=LXIRhIoTa3I)

_Note: This project was completed as part of the [LearnWeb3 Hackathon](https://learnweb3.io/hackathons/decentralized-intelligence-season-1/) in October 2023._

## Purpose

The overarching aim of this project was to create an open and user-centric approach to blockchain data consumption, empowering users to take ownership of their data and explore innovative methods of querying data through AI.

## Description

"Crypto Queries" allows users to harness the power of blockchain data from KYVE and Streamr through SQL and AI queries, with the ability to preserve their favorite queries as NFTs on Arbitrum (`components/MintNFT.tsx`). Moreover, they can execute queries created by other users (`components/NFTGallery.tsx`), and establish their identity using `.arb` domain names from Space ID (`components/SIDBadge.tsx`).

The project comprises two dynamic pages, comprised of multiple components:

1. The SQL page (`pages/index.tsx`) functions as a decentralized blockchain data warehouse, akin to Dune and Flipside, allowing users to enter SQL queries that are run against a KYVE powered by data lake (`pages/api/runQuery.tsx`). What sets "Crypto Queries" apart is that it relies on KYVE as a trustless data source for its blockchain data and utilizes NFTs to store queries, which creators own.
2. The AI page (`pages/ai.tsx`) offers a means to interact with real-time blockchain data sourced from KYVE and streamed through Streamr (`components/LiveStream.tsx`). Users can ask questions or write prompts referencing the streaming data (`pages/api/chat.tsx`). These "AI" queries are essentially natural language queries, and they, too, can be stored as NFTs and utilized by others.

Finally, users are uniquely identifiable through SpaceID `.arb` domain names, facilitating recognition within the platform. A future idea is to create & integrate a new .sql domain name once SpaceID 3.0 is launched.

## Tech Stack

- [KYVE Network](https://kyve.network/) - Trustless blockchain data source.
- [Airbyte](https://airbyte.io/) - Use to ELT data from KYVE to BigQuery.
- [Google BigQuery](https://cloud.google.com/bigquery) - Data warehouse storing KYVE data.
- [Streamr](https://streamr.network/) - Real-time blockchain data sourced from KYVE.
- [Space ID](https://spaceid.xyz/) - `.arb` domain names for user identification.
- [thirdweb](https://thirdweb.com/) - Use to mint query NFTs.
- [Arbitrum One](https://arbitrum.io/) - Blockchain for NFTs stored on.
- [OpenAI](https://openai.com/) - Use to respond to AI x Streamr queries.
- [Next.js](https://nextjs.org/) - Frontend framework for dApp.
- [Vercel](https://vercel.com/) - Hosting for dApp.

## Free to Use

Feel copy and edit into your own version, which you can do by forking this GitHub repo, then running the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Next, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Finally, deploy to [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).
