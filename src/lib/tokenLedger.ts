import { transactions as seedTransactions } from "@/data/transactions";
import type { Transaction, TransactionType } from "@/types";

let ledger: Transaction[] = [...seedTransactions];

export function createTransaction(data: {
  type: TransactionType;
  userId: string;
  modelId?: string;
  tokenAmount: number;
  status?: Transaction["status"];
  description: string;
}) {
  const transaction: Transaction = {
    id: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
    type: data.type,
    userId: data.userId,
    modelId: data.modelId,
    tokenAmount: data.tokenAmount,
    status: data.status ?? "success",
    createdAt: new Date().toISOString(),
    description: data.description,
    commission: Math.round(data.tokenAmount * 0.3),
    refundStatus: "none",
    fraudFlag: false
  };

  ledger = [transaction, ...ledger];
  return transaction;
}

export function listTransactions() {
  return ledger;
}

export function filterTransactions(type?: TransactionType) {
  return type ? ledger.filter((item) => item.type === type) : ledger;
}
