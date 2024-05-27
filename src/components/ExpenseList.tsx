import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import ExpenseDetail from "./ExpenseDetail";

export default function ExpenseList() {
  const { state } = useBudget();

  
  const filteredExpenses = state.currentCategory ? state.expenses.filter( expense => expense.category === state.currentCategory) : state.expenses; // Si no hay nada en currentCategory del state, se trae todos los gastos
  const isEmpty = useMemo(() => filteredExpenses.length === 0, [state.expenses]);
  return (
    <>
      <div className="mt-10 bg-white shadow-lg rounded-lg p-5">
        {isEmpty ? (
          <p className=" text-2xl text-gray-600 font-bold">No expenses</p>
        ) : (
          <>
          <p className=" text-2xl text-gray-600 font-bold my-5">Expense List</p>
          { filteredExpenses.map( expense => (
            <ExpenseDetail
                key={expense.id}
                expense={expense}
            />
          ))}
          </>
        )}
      </div>
    </>
  );
}
