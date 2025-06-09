import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import * as XLSX from "xlsx";

function ExpenseListTable({ expensesList, refreshData }) {
  const [loading, setLoading] = useState(false);
  const downloadExpensesAsExcel = () => {
    if (!expensesList.length) {
      toast.error("No expenses to download.");
      return;
    }

    // Format data for Excel
    const data = expensesList.map((expense) => ({
      Name: expense.name,
      Amount: expense.amount,
      Date: format(new Date(expense.createdAt), "dd MMM yyyy"),
    }));

    // Create a new workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");

    // Trigger download
    XLSX.writeFile(workbook, "Expenses.xlsx");
    toast("Expenses downloaded successfully!");
  };

  const deleteExpense = async (expense) => {
    const result = await db
      .delete(Expenses)
      .where(eq(Expenses.id, expense.id))
      .returning();

    if (result) {
      toast("Expense Deleted!");
      refreshData();
    }
  };
  return (
    <div className="mt-3">
      <div className="flex justify-between items-center p-3 rounded-md">
        <h2 className="font-bold text-lg">My Expenses</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={downloadExpensesAsExcel}
        >
          Download
        </button>
      </div>
      <div className="grid grid-cols-4 bg-slate-200 p-2 mt-3">
        <h2 className="font-bold">Name</h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Date</h2>
        <h2 className="font-bold">Action</h2>
      </div>
      {expensesList.map((expenses, index) => (
        <div className="grid grid-cols-4 bg-slate-50 p-2">
          <h2>{expenses.name}</h2>
          <h2>&#x20B9; {expenses.amount}</h2>
          <h2>{format(new Date(expenses.createdAt), "dd MMM yyyy")}</h2>
          <h2>
            <Trash
              className="text-red-600 cursor-pointer"
              onClick={() => deleteExpense(expenses)}
            />
          </h2>
        </div>
      ))}
    </div>
  );
}

export default ExpenseListTable;
