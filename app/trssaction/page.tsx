"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Calendar, ArrowLeft } from "lucide-react";
import { addStoredTransaction } from "../lib/transactions";

const EXPENSE_CATEGORIES = [
  "Housing",
  "Groceries",
  "Transport",
  "Utilities",
  "Goals",
  "Entertainment",
  "Health",
  "Other",
];

const INCOME_CATEGORIES = [
  "Income",
  "Salary",
  "Freelance",
  "Investment",
  "Gift",
  "Other",
];

export default function TransactionPage() {
  const router = useRouter();

  const [type, setType] = useState<"expense" | "income">("expense");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const categories = type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  const handleTypeChange = (next: "expense" | "income") => {
    setType(next);
    setCategory("");
  };

  const handleCancel = () => {
    router.push("/payment");
  };

  const handleSubmit = () => {
    if (!description || !category || !date || !amount) {
      setError("Fill in every field before adding a contribution.");
      return;
    }

    addStoredTransaction({ description, category, date, amount, type });
    router.push("/payment");
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-lg">
        <button
          type="button"
          onClick={handleCancel}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-[#123b65] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Budget Planner
        </button>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <h1 className="text-lg font-bold text-[#111827]">
            Add Manual Contribution
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Record an expense or income entry to your budget
          </p>

          {/* Type toggle */}
          <div className="mt-5 grid grid-cols-2 gap-2 rounded-md bg-[#f1f4f7] p-1">
            <button
              type="button"
              onClick={() => handleTypeChange("expense")}
              className={`rounded-md py-2 text-sm font-medium transition ${
                type === "expense"
                  ? "bg-white text-[#123b65] shadow-sm"
                  : "text-gray-500"
              }`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange("income")}
              className={`rounded-md py-2 text-sm font-medium transition ${
                type === "income"
                  ? "bg-white text-[#123b65] shadow-sm"
                  : "text-gray-500"
              }`}
            >
              Income
            </button>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Description */}
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label
                htmlFor="description"
                className="text-xs font-medium text-gray-500"
              >
                Description
              </label>
              <input
                id="description"
                type="text"
                placeholder="e.g. Annual Rent"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-md border border-gray-200 bg-[#f7f9fb] px-3 py-2.5 text-sm text-[#111827] placeholder-gray-400 outline-none transition focus:border-[#123b65] focus:bg-white focus:ring-2 focus:ring-[#123b65]/10"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="category"
                className="text-xs font-medium text-gray-500"
              >
                Category
              </label>
              <div className="relative">
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full appearance-none rounded-md border border-gray-200 bg-[#f7f9fb] px-3 py-2.5 pr-9 text-sm text-[#111827] outline-none transition focus:border-[#123b65] focus:bg-white focus:ring-2 focus:ring-[#123b65]/10"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>

            {/* Date */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="date"
                className="text-xs font-medium text-gray-500"
              >
                Date
              </label>
              <div className="relative">
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full appearance-none rounded-md border border-gray-200 bg-[#f7f9fb] px-3 py-2.5 pr-9 text-sm text-[#111827] outline-none transition [&::-webkit-calendar-picker-indicator]:opacity-0 focus:border-[#123b65] focus:bg-white focus:ring-2 focus:ring-[#123b65]/10"
                />
                <Calendar
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>

            {/* Amount */}
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label
                htmlFor="amount"
                className="text-xs font-medium text-gray-500"
              >
                Amount (₦)
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                  ₦
                </span>
                <input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full rounded-md border border-gray-200 bg-[#f7f9fb] py-2.5 pl-7 pr-3 text-sm text-[#111827] placeholder-gray-400 outline-none transition focus:border-[#123b65] focus:bg-white focus:ring-2 focus:ring-[#123b65]/10"
                />
              </div>
            </div>
          </div>

          {error && <p className="mt-3 text-xs text-[#ef4444]">{error}</p>}

          {/* Actions */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-md border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-md bg-[#123b65] px-6 py-2 text-sm font-medium text-white transition hover:bg-[#0d3154]"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}