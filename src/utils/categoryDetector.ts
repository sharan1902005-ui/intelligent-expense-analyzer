import type { Category } from "../types";

export const detectCategory = (
  merchant: string,
  isIncome = false
): Category => {
  if (isIncome) return "Income";

  const text = merchant.toLowerCase();

  if (
    text.includes("swiggy") ||
    text.includes("zomato") ||
    text.includes("biryani") ||
    text.includes("pizza") ||
    text.includes("kfc") ||
    text.includes("burger") ||
    text.includes("dominos") ||
    text.includes("restaurant") ||
    text.includes("hotel") ||
    text.includes("cafe") ||
    text.includes("tea") ||
    text.includes("juice")
  ) return "Food";

  if (
    text.includes("uber") ||
    text.includes("ola") ||
    text.includes("rapido") ||
    text.includes("petrol") ||
    text.includes("fuel") ||
    text.includes("bus") ||
    text.includes("train") ||
    text.includes("metro") ||
    text.includes("flight") ||
    text.includes("airport")
  ) return "Travel";

  if (
    text.includes("spotify") ||
    text.includes("netflix") ||
    text.includes("youtube") ||
    text.includes("google play") ||
    text.includes("prime") ||
    text.includes("hotstar")
  ) return "Subscription";

  if (
    text.includes("amazon") ||
    text.includes("flipkart") ||
    text.includes("myntra") ||
    text.includes("ajio") ||
    text.includes("meesho")
  ) return "Shopping";

  if (
    text.includes("electricity") ||
    text.includes("bill") ||
    text.includes("recharge") ||
    text.includes("airtel") ||
    text.includes("jio") ||
    text.includes("bsnl") ||
    text.includes("vodafone")
  ) return "Bills";

  if (
    text.includes("upi") ||
    text.includes("paid to") ||
    text.includes("received from") ||
    text.includes("sasikumar") ||
    text.includes("sabarish") ||
    text.includes("santhosh") ||
    text.includes("buila") ||
    text.includes("shivakumar") ||
    text.includes("chat")
  ) return "Transfer";

  return "Others";
};
