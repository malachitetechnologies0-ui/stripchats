import { tokenPackages } from "@/data/tokenPackages";
import { users } from "@/data/users";
import { createTransaction } from "@/lib/tokenLedger";

const balances = new Map(users.map((user) => [user.id, user.walletBalance]));

export function getWalletBalance(userId: string) {
  return balances.get(userId) ?? 0;
}

export function addTokens(userId: string, packageId: string) {
  const selectedPackage = tokenPackages.find((item) => item.id === packageId) ?? tokenPackages[0];
  const balance = getWalletBalance(userId) + selectedPackage.tokens;
  balances.set(userId, balance);
  createTransaction({
    type: "recharge",
    userId,
    tokenAmount: selectedPackage.tokens,
    description: `Mock recharge: ${selectedPackage.label}`
  });
  return balance;
}

export function deductTokens(userId: string, amount: number, reason: string) {
  const balance = getWalletBalance(userId);
  if (balance < amount) {
    return { ok: false, balance, message: "Insufficient token balance." };
  }

  const nextBalance = balance - amount;
  balances.set(userId, nextBalance);
  createTransaction({
    type: "tip",
    userId,
    tokenAmount: amount,
    description: reason
  });
  return { ok: true, balance: nextBalance, message: "Tokens deducted." };
}
