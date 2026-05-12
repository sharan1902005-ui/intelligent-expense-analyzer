import type { ChangeEvent } from "react";
import * as pdfjsLib from "pdfjs-dist";
import type { Transaction } from "../types";
import { detectCategory } from "../utils/categoryDetector";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface Props {
  onImport: (transactions: Transaction[]) => void;
}

export default function DataInput({ onImport }: Props) {
  const handleCSV = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split("\n").slice(1);

      const transactions: Transaction[] = lines
        .map((line) => {
          const [date, merchant, amount] = line.split(",");
          if (!date || !merchant || !amount) return null;
          return {
            id: crypto.randomUUID(),
            date,
            merchant,
            amount: Number(amount),
            category: detectCategory(merchant),
            type: "expense",
          };
        })
        .filter(Boolean) as Transaction[];

      onImport(transactions);
    };
    reader.readAsText(file);
  };

  const handlePDF = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const text = content.items.map((item: any) => item.str).join(" ");
        fullText += text + "\n";
      }

      const regex =
        /(\d{2}\s[A-Za-z]{3},\s\d{4}).*?(Paid to|Received from)\s(.*?)\s.*?₹([\d,]+(?:\.\d+)?)/g;

      const transactions: Transaction[] = [];
      let match;

      while ((match = regex.exec(fullText)) !== null) {
        const date = match[1];
        const typeText = match[2];
        const merchant = match[3].trim();
        const amount = parseFloat(match[4].replace(/,/g, ""));
        const isIncome = typeText === "Received from";
        const lowerMerchant = merchant.toLowerCase();

        if (
          lowerMerchant.includes("statement") ||
          lowerMerchant.includes("summary") ||
          lowerMerchant.includes("balance")
        ) continue;

        transactions.push({
          id: crypto.randomUUID(),
          date,
          merchant,
          amount,
          category: detectCategory(merchant, isIncome),
          type: isIncome ? "income" : "expense",
        });
      }

      if (transactions.length === 0) { alert("No transactions found in PDF"); return; }
      onImport(transactions);
    } catch (error) {
      console.error(error);
      alert("Failed to read PDF");
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-pink-100 p-8 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Import Transactions</h2>
          <p className="text-gray-500 mt-1">Upload your statement securely</p>
        </div>
        <div className="text-sm px-4 py-2 rounded-2xl bg-pink-50 text-pink-600 font-medium">
          Secure Upload
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* CSV */}
        <label className="cursor-pointer group">
          <div className="border border-pink-100 bg-gradient-to-br from-white to-pink-50 rounded-3xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center text-3xl">
                📊
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800">CSV Upload</h3>
                <p className="text-gray-500 text-sm">Import spreadsheet transactions</p>
              </div>
            </div>
            <div className="mt-5 px-4 py-3 rounded-2xl bg-white border border-pink-100 text-gray-600 text-sm truncate">
              Select CSV file...
            </div>
          </div>
          <input type="file" accept=".csv" className="hidden" onChange={handleCSV} />
        </label>

        {/* PDF */}
        <label className="cursor-pointer group">
          <div className="border border-pink-100 bg-gradient-to-br from-white to-pink-50 rounded-3xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center text-3xl">
                📄
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800">PDF Statement</h3>
                <p className="text-gray-500 text-sm">Upload bank statement PDF</p>
              </div>
            </div>
            <div className="mt-5 px-4 py-3 rounded-2xl bg-white border border-pink-100 text-gray-600 text-sm truncate">
              Select PDF file...
            </div>
          </div>
          <input type="file" accept=".pdf" className="hidden" onChange={handlePDF} />
        </label>

      </div>
    </div>
  );
}
