import type { Category } from "../types";

export function detectCategory(
  merchant: string,
  isIncome = false
): Category {
  const text = merchant.toLowerCase();

  if (isIncome) return "Income";

  if (
    text.includes("swiggy") ||
    text.includes("zomato") ||
    text.includes("biryani") ||
    text.includes("cafe") ||
    text.includes("pizza")
  )
    return "Food";

  if (
    text.includes("uber") ||
    text.includes("ola") ||
    text.includes("petrol") ||
    text.includes("fuel") ||
    text.includes("metro")
  )
    return "Travel";

  if (
    text.includes("amazon") ||
    text.includes("flipkart") ||
    text.includes("myntra")
  )
    return "Shopping";

  if (
    text.includes("spotify") ||
    text.includes("netflix") ||
    text.includes("google play") ||
    text.includes("youtube premium")
  )
    return "Subscription";

  if (
    text.includes("electricity") ||
    text.includes("airtel") ||
    text.includes("jio")
  )
    return "Bills";

  if (text.includes("paid to")) return "Transfer";

  return "Others";
}
