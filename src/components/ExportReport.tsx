import jsPDF from "jspdf";
import type { Transaction } from "../types";

interface Props {
  transactions: Transaction[];
}

export default function ExportReport({ transactions }: Props) {
  const exportPDF = () => {
    const doc = new jsPDF();

    const expenses = transactions.filter((t) => t.type === "expense");
    const total = expenses.reduce((sum, t) => sum + t.amount, 0);

    doc.setFontSize(20);
    doc.text("Intelligent Expense Analyzer Report", 20, 20);

    doc.setFontSize(14);
    doc.text(`Total Spending: Rs.${total}`, 20, 40);

    let y = 60;

    expenses.forEach((tx) => {
      doc.text(
        `${tx.date} | ${tx.merchant} | Rs.${tx.amount} | ${tx.category}`,
        20,
        y
      );
      y += 10;

      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("expense-report.pdf");
  };

  return (
    <button
      onClick={exportPDF}
      className="bg-gradient-to-r from-violet-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:scale-105 transition"
    >
      Export PDF Report
    </button>
  );
}
