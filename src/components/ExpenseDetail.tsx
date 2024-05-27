import { useMemo } from "react";
import { formatDate } from "../helpers";
import { Expense } from "../types";
import AmountDisplay from "./AmountDisplay";
import { categories } from "../data/db";
import "react-swipeable-list/dist/styles.css";
import { SwipeableAdapter } from "../config/swipeable-adapter";
import { useBudget } from "../hooks/useBudget";

// Adapter
const {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
  } = SwipeableAdapter.swipeableAdapter();

type ExpenseDetailProps = {
  expense: Expense;
};

export default function ExpenseDetail({ expense }: ExpenseDetailProps) {

  const { dispatch } = useBudget();
  const categoryInfo = useMemo(
    () => categories.filter((cat) => cat.id === expense.category)[0],
    [expense]
  ); // Cada que cambien los gastos se ejecuta esta funcion

  const leadingActions = () => (

    <LeadingActions>
        <SwipeAction onClick={() => dispatch({ type: 'get-editin-id', payload: { id: expense.id}})}>
            Update
        </SwipeAction>
    </LeadingActions>
  )
  
  const trailingActions = () => (
    <TrailingActions>
        <SwipeAction onClick={() => dispatch({ type: 'delete-expense', payload: {id: expense.id}})} destructive={true}>
            Delete
        </SwipeAction>
    </TrailingActions>
  )

  
  return (
    <>
      <SwipeableList>
        <SwipeableListItem
            maxSwipe={30}
            leadingActions={leadingActions()}
            trailingActions={trailingActions()}
        >
          <div className=" bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center">
            <div>
              <img
                src={`/icono_${categoryInfo.icon}.svg`}
                alt="expense icon"
                className=" w-20"
              />
            </div>
            <div className=" flex-1 space-y-2">
              <p className=" text-sm font-bold uppercase text-slate-500">
                {categoryInfo.name}
              </p>
              <p>{expense.expenseName}</p>
              <p className=" text-slate-600 text-sm">
                {formatDate(expense.date!.toString())}
              </p>
            </div>
            <AmountDisplay amount={expense.amount} />
          </div>
        </SwipeableListItem>
      </SwipeableList>
    </>
  );
}
