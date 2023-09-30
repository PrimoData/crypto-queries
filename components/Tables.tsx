// components/Tables.tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import React, { FC, MouseEventHandler } from 'react';
import { ChevronsRight } from 'lucide-react';

interface TablesProps {
  onSelect: MouseEventHandler<HTMLDivElement>; // Replace HTMLDivElement with the correct element if needed
}

// Define your data
const data = [
  {
    value: 'item-1',
    image:
      'https://assets.coingecko.com/coins/images/12559/thumb/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    text: 'Avalanche',
    code: 'primo-data-338518.kyve.pool_1',
  },
  {
    value: 'item-2',
    image:
      'https://assets.coingecko.com/coins/images/2069/thumb/Stacks_logo_full.png?1604112510',
    text: 'Stacks',
    code: 'primo-data-338518.kyve.pool_2',
  },
  {
    value: 'item-3',
    image:
      'https://assets.coingecko.com/coins/images/11090/thumb/InjXBNx9_400x400.jpg?1674707499',
    text: 'Celo',
    code: 'primo-data-338518.kyve.pool_7',
  },
  {
    value: 'item-4',
    image:
      'https://assets.coingecko.com/coins/images/1481/thumb/cosmos_hub.png?1555657960',
    text: 'Cosmos',
    code: 'primo-data-338518.kyve.pool_9',
  },
  {
    value: 'item-5',
    image:
      'https://assets.coingecko.com/coins/images/16724/thumb/osmo.png?1632763885',
    text: 'Osmosis',
    code: 'primo-data-338518.kyve.pool_29',
  },
];

const Tables: FC<TablesProps> = ({ onSelect }) => {
  return (
    <Accordion type="single" collapsible>
      {data.map((item, index) => (
        <AccordionItem key={index} value={item.value}>
          <AccordionTrigger>
            <div className="flex justify-between items-center w-full">
              <span>
                <img
                  src={item.image}
                  alt={item.text}
                  className="inline-block w-6 h-6 mr-2"
                />
                {item.text}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex items-center space-x-2">
            <div className="flex items-center space-x-2" onClick={onSelect}>
              <code>{item.code}</code>
              <ChevronsRight size={18} />
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default Tables;
