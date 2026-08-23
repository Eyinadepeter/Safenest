"use client";

import { useState } from "react";
import { ChevronDown, Calendar } from "lucide-react";

const CATEGORIES = [
  "Food",
  "Transport",
  "Rent",
  "Utilities",
  "Entertainment",
  "Shopping",
  "Health",
  "Other",
];

export default function TransactionForm({
  onCancel,
  onSubmit,
}: {
  onCancel?: () => void;
  onSubmit?: (data: {
    description: string;
    category: string;
    date: string;
    amount: string;
  }) => void;
}) {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = () => {
    onSubmit?.({ description, category, date, amount });
  };

  return (
    <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="grid grid-cols-2 gap-4">
        {/* Description */}
        <div className="flex flex-col gap-1.5">
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
            className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-200"
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
              className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 pr-9 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-200"
            >
              <option value="" disabled>
                Select a category
              </option>
              {CATEGORIES.map((c) => (
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
          <label htmlFor="date" className="text-xs font-medium text-gray-500">
            Date
          </label>
          <div className="relative">
            <input
              id="date"
              type="date"
              placeholder="dd/mm/yyyy"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 pr-9 text-sm text-gray-900 outline-none transition [&::-webkit-calendar-picker-indicator]:opacity-0 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-200"
            />
            <Calendar
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        {/* Amount */}
        <div className="flex flex-col gap-1.5">
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
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-7 pr-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-200"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="rounded-lg bg-gray-900 px-6 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Add
        </button>
      </div>
    </div>
  );
}