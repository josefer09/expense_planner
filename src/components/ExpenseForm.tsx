import { categories } from "../data/db";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import type { DraftExpense } from "../types";
import { useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

const initialExpense = {
  amount: 0,
  expenseName: "",
  category: "",
  date: "",
};

export default function ExpenseForm() {
  const [expense, setExpense] = useState<DraftExpense>(initialExpense);

  const [error, setError] = useState("");

  const [previousAmount, setPreviousAmount] = useState(0);

  const { state, dispatch, remainingBudget } = useBudget();

  useEffect(() => {
    if(state.editingId) {
      const editingExpense = state.expenses.filter( currentExpense => currentExpense.id === state.editingId )[0];
      setExpense(editingExpense);
      setPreviousAmount(editingExpense.amount);
    }
  }, [state.editingId]);

  const handleChangeInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const isAmount = ["amount"].includes(name); // Va a retornar false si no estamos escribiendo en amount

    setExpense({
      ...expense,
      [name]: isAmount ? +value : value, // Si estamos en amount, lo transformamos a numero con el "+", si no, solo seteamos el valor
    });
  };

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateExpense = e.target.value;
    setExpense({
      ...expense, // Copia de lo que ya haya
      date: dateExpense
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form");

    // Validar
    if (Object.values(expense).includes("")) {
      // Si algun elemento del objeto contiene un elemento vacio
      setError("Empty Fields");
      return;
    }

    // Validar que no me pase del limite
    if((expense.amount - previousAmount) > remainingBudget) {
      setError('Expense exceeds budget limit');
      return;
    }

    // Agregar un nuevo gasto o actualizar el gasto
    setError("");
    if(state.editingId) {
      dispatch({ type: 'update-expense', payload: { expense: {id: state.editingId, ...expense }}})
    } else {
      dispatch({ type: "add-expense", payload: { expense } });
    }

    // Reiniciar el form
    setExpense(initialExpense);
    setPreviousAmount(0);
  };

  return (
    <>
      <form className=" space-y-5" onSubmit={(e) => handleSubmit(e)}>
        <legend className=" uppercase text-center text-2xl font-black border-b-4 border-indigo-500 py-2">
          {state.editingId === '' ? 'New Expense' : 'Update Expense'}
        </legend>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div className=" flex flex-col gap-2">
          <label htmlFor="expenseName" className=" text-xl">
            Expense Name
          </label>
          <input
            type="text"
            id="expenseName"
            placeholder="Add the name of the expense"
            className=" bg-slate-100 p-2"
            name="expenseName"
            onChange={handleChangeInput}
            value={expense.expenseName}
          />
        </div>
        <div className=" flex flex-col gap-2">
          <label htmlFor="amount" className=" text-xl">
            Amount:
          </label>
          <input
            type="number"
            id="amount"
            placeholder="Add the amount for the expense"
            className=" bg-slate-100 p-2"
            name="amount"
            onChange={handleChangeInput}
            value={expense.amount}
          />
        </div>

        <div className=" flex flex-col gap-2">
          <label htmlFor="category" className=" text-xl">
            Category:
          </label>
          <select
            name="category"
            id="category"
            className=" bg-slate-100 p-2"
            onChange={handleChangeInput}
            value={expense.category}
          >
            <option value="" disabled>
              -- Select category --
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className=" flex flex-col gap-2">
          <label htmlFor="date" className=" text-xl">
            Expense Date
          </label>
          <input
            type="date"
            name="date"
            value={expense.date}
            onChange={handleChangeDate}
            className="bg-slate-100 p-2 border-0"
          />
        </div>
        <input
          type="submit"
          className=" bg-indigo-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
          value={state.editingId === '' ? 'Add Expense' : 'Save Changes'}
        />
      </form>
    </>
  );
}
