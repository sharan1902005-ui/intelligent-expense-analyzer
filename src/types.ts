export type Category =
  | "Food"
  | "Travel"
  | "Transport"
  | "Shopping"
  | "Bills"
  | "Subscription"
  | "Subscriptions"
  | "Entertainment"
  | "Income"
  | "Transfer"
  | "Others";

export interface Transaction {
  id: string;
  date: string;
  merchant: string;
  amount: number;
  category: Category;
  type: "expense" | "income";
}
