"use client";

import { useState } from "react";
import { ChevronDown, Calendar, X } from "lucide-react";

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

export type TransactionFormValues = {
  description: string;
  category: string;
  date: string;
  amount: string;
};

export default function TransactionFormModal({
  open,
  mode,
  onClose,
  onSubmit,
}: {
  open: boolean;
  mode: "expense" | "income";
  onClose: () => void;
  onSubmit: (data: TransactionFormValues) => void;
}) {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");

  if (!open) return null;

  const categories =
    mode === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  const reset = () => {
    setDescription("");
    setCategory("");
    setDate("");
    setAmount("");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = () => {
    if (!description || !category || !date || !amount) return;
    onSubmit({ description, category, date, amount });
    reset();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md rounded-lg bg-white p-5 shadow-xl sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-base font-bold text-[#111827]">
            {mode === "expense" ? "Add Expense" : "Add Income"}
          </h2>

          <button
            type="button"
            aria-label="Close"
            onClick={handleClose}
            className="text-gray-400 transition hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
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
  );
}