interface ComparisonTableProps {
  data: {
    headers: string[];
    rows: {
      feature: string;
      values: string[];
    }[];
  };
}

export default function ComparisonTable({ data }: ComparisonTableProps) {
  if (!data || !data.headers || !data.rows) {
    return null;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#1a1a1a]">
            <th className="border border-[#2a2a2a] p-4 text-left text-white font-semibold">
              Feature
            </th>
            {data.headers.map((header, idx) => (
              <th
                key={idx}
                className="border border-[#2a2a2a] p-4 text-center text-white font-semibold"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className={rowIdx % 2 === 0 ? 'bg-[#0a0a0a]' : 'bg-[#141414]'}
            >
              <td className="border border-[#2a2a2a] p-4 text-[#d1d5db] font-medium">
                {row.feature}
              </td>
              {row.values.map((value, valIdx) => (
                <td
                  key={valIdx}
                  className="border border-[#2a2a2a] p-4 text-center text-[#9ca3af]"
                >
                  {value === '✓' || value === 'Yes' ? (
                    <span className="text-[#10b981] text-xl">✓</span>
                  ) : value === '✗' || value === 'No' ? (
                    <span className="text-[#ef4444] text-xl">✗</span>
                  ) : (
                    value
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
