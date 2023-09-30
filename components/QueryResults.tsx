import React from 'react';

type QueryResultsProps = {
  results: { data: any } | null;
};

const QueryResults: React.FC<QueryResultsProps> = ({ results }) => {
  return (
    <div className="mt-4">
      <table className="table-auto">
        <thead>
          <tr>
            {results?.data?.length > 0 &&
              Object.keys(results?.data[0]).map((key, index) => (
                <th key={index} className="px-4 py-2">
                  {key}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {results?.data.map((row: Record<string, unknown>, index: number) => (
            <tr key={index}>
              {Object.values(row).map((value, i) => (
                <td key={i} className="border px-4 py-2">
                  {String(value)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QueryResults;
