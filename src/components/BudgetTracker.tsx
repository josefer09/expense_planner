import { ReactCircularBar } from "../config/progressbar-adapter";
import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";


// Importacion del adapter

export default function BudgetTracker() {
  const { CircularProgressbar, buildStyles } = ReactCircularBar.progressbar();

  const { state, totalExpenses, remainingBudget, dispatch } = useBudget();

  const percentage = +((totalExpenses / state.budget) * 100).toFixed(2);

  function levelPercentage (percentageNumber: number): string {
    if( percentageNumber >= 90 ) {
      return '#DC2626';

    } else if ( percentageNumber >= 75) {
      return '#ffca28';

    } else {
      return '#818cf8';
    }
  }


  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex justify-center">
          <CircularProgressbar 
            value={percentage}
            styles={buildStyles({
              pathColor: levelPercentage(percentage),
              trailColor: '#F5F5F5',
              textColor: '#818cf8',
              textSize: '8',
            })}
            text={`${percentage}% Spent`}
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-8">
          <button
            type="button"
            className=" bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
            onClick={() => dispatch({ type: 'reset-app'})}
          >
            Restar App
          </button>
          <AmountDisplay label="Budget" amount={state.budget} />
          <AmountDisplay label="Available" amount={remainingBudget} />
          <AmountDisplay label="Spent" amount={totalExpenses} />
        </div>
      </div>
    </>
  );
}
