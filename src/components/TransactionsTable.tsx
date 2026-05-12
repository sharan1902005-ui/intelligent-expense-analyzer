interface Props {
  transactions: {
    date: string;
    merchant: string;
    amount: number;
    category: string;
  }[];
}

export default function TransactionsTable({ transactions }: Props) {
  return (
    <div className="bg-white/90 backdrop-blur-2xl border border-pink-100 shadow-lg rounded-3xl p-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Transactions</h2>

      <div className="overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-pink-100">
              <th className="pb-4 text-gray-500 font-medium">Date</th>
              <th className="pb-4 text-gray-500 font-medium">Merchant</th>
              <th className="pb-4 text-gray-500 font-medium">Amount</th>
              <th className="pb-4 text-gray-500 font-medium">Category</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={index} className="border-b border-pink-50 hover:bg-pink-50">
                <td className="py-4 text-slate-800">{tx.date}</td>
                <td className="text-slate-800">{tx.merchant}</td>
                <td className="text-slate-800">₹{tx.amount}</td>
                <td>
                  <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm">
                    {tx.category}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
