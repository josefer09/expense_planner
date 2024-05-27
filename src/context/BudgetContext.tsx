import { ReactNode, createContext, useMemo, useReducer } from "react"
import { BudgeState, BudgetActions, budgetReducer, initialState } from "../reducers/budget-reducer"

// Firma
type BudgetContextProps = {
    state: BudgeState
    dispatch: React.Dispatch<BudgetActions>,
    totalExpenses: number,
    remainingBudget: number,
}

type BudgetProviderProps = {
    children: ReactNode;
}

//?? Context es la accion de tener el estado global
export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps)

//?? Provider son los datos que tendra ese context
export const BudgetProvider = ({children}: BudgetProviderProps) => {
    const [state, dispatch] = useReducer(budgetReducer, initialState);
    const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0), [state.expenses]); // El valor inicial sera 0
  const remainingBudget = state.budget - totalExpenses;


    return (
        <BudgetContext.Provider
        value={{
            state,
            dispatch,
            totalExpenses,
            remainingBudget,
        }}
        >
            {children}
        </BudgetContext.Provider>
    )
}