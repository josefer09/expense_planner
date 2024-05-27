import { useState, useMemo } from "react"
import { useBudget } from "../hooks/useBudget";



export default function BudgetForm() {

    const [budget, setBudget] = useState(0);

    const {dispatch} = useBudget();

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber);
    }

    const isValid = useMemo( () => {
        return isNaN(budget) || budget <= 0;
    }, [budget]); // Cada vez que budget cambie queremos revisar/ejecutar esta funcion

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Definir Presupuesto');
        dispatch({ type: 'add-budget', payload: {budget}});
    }
  return (
    <>
    <form className=" space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-5">
            <label htmlFor="budget" className="text-4xl text-indigo-600 font-bold text-center">
                Define Budget
            </label>
            <input
            id="budget" 
            type="number"
            className=" w-full bg-white border border-gray-200 p-2"
            placeholder="Define your budget"
            name="budget"
            onChange={ handleChange } 
            />
        </div>
        <input type="submit"
        value='Define'
        className=" bg-indigo-600 hover:bg-indigo-700 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-10"
        disabled={isValid}
        />
    </form>
    </>
  )
}
