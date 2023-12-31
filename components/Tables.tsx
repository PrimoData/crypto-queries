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
      'https://assets.coingecko.com/coins/images/1481/thumb/cosmos_hub.png?1555657960',
    text: 'Cosmos Hub',
    code: '`primo-data-338518.kyve.cosmos_pool_0`',
  },
  {
    value: 'item-2',
    image:
      'https://assets.coingecko.com/coins/images/16724/thumb/osmo.png?1632763885',
    text: 'Osmosis',
    code: '`primo-data-338518.kyve.osmosis_pool_1`',
  },
  {
    value: 'item-3',
    image:
      'https://assets.coingecko.com/coins/images/30789/small/bxLJkEWw_400x400.jpg?1687314435',
    text: 'Archway',
    code: '`primo-data-338518.kyve.archway_pool_2`',
  },
  {
    value: 'item-4',
    image:
      'https://assets.coingecko.com/coins/images/27277/thumb/V-65_xQ1_400x400.jpeg?1663121730',
    text: 'Axelar',
    code: '`primo-data-338518.kyve.axelar_pool_3`',
  },
];

const Tables: FC<TablesProps> = ({ onSelect }) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="bg-white shadow-xl ring-1 ring-gray-900/5 sm:rounded-lg m-2 p-0"
    >
      {data.map((item, index) => (
        <AccordionItem key={index} value={item.value} className="p-1">
          <AccordionTrigger className="p-2">
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
              <code className="px-2">{item.code}</code>
              <ChevronsRight size={18} />
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default Tables;
