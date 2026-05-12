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
    <div className="bg-white/90 backdrop-blur-2xl border border-pink-100 shadow-lg rounded-3xl px-8 py-6 mb-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Import Transactions</h2>

      <div className="flex gap-4 flex-wrap">
        <input
          type="file"
          accept=".csv"
          onChange={handleCSV}
          className="bg-white border border-pink-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
        <input
          type="file"
          accept=".pdf"
          onChange={handlePDF}
          className="bg-white border border-pink-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
      </div>
    </div>
  );
}
