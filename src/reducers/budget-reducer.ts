import { UuidAdapter } from "../config/uuid-adapter";
import { Expense, DraftExpense } from '../types/index';
import { Category } from '../../../calorie-tracker/src/types/index';

export type BudgetActions = 
    { type: 'add-budget', payload: {budget: number}} |
    { type: 'show-modal',} | 
    { type: 'close-modal'} |
    { type: 'add-expense', payload: { expense: DraftExpense}} |
    { type: 'delete-expense', payload: { id: Expense['id']}} |
    { type: 'get-editin-id', payload: {id: Expense['id']}} |
    { type: 'update-expense', payload: { expense: Expense}} |
    { type: 'reset-app'} |
    { type: 'add-filter-category', payload: { id: Category['id'] } }

export type BudgeState = {
    budget: number;
    modal: boolean;
    expenses: Expense[];
    editingId: Expense['id'];
    currentCategory: Category['id']
}

const initialBudget = (): number => {
    const localStorageBudget = localStorage.getItem('budget');
    return localStorageBudget ? +localStorageBudget : 0;
}

const localStorageExpenses = (): Expense[] => {
    const localStorageExpenses = localStorage.getItem('expenses');
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : [];
}

export const initialState: BudgeState = {
    budget: initialBudget(),
    modal: false,
    expenses: localStorageExpenses(),
    editingId: '',
    currentCategory: '',
}

const createExpense = (draftExpense: DraftExpense) : Expense => {
    return {
        ...draftExpense,
        id: UuidAdapter.v4(), // Le anademos un id
    }
}

// Construccion del reducer
export const budgetReducer = (
    state: BudgeState = initialState,
    actions: BudgetActions,
) => {
    if(actions.type === 'add-budget') {

        return {
            ...state,
            budget: actions.payload.budget,
        }
    }

    if(actions.type === 'show-modal') {

        return {
            ...state, // Copia del state
            modal: true,
        }
    }

    if(actions.type === 'close-modal') {

        return {
            ...state, // Copia del state
            modal: false,
            editingId: '',
        }
    }

    if(actions.type === 'add-expense') {
        const expense = createExpense(actions.payload.expense);

        return {
            ...state,
            expenses: [...state.expenses, expense],
            modal: false,
        }
    }

    if(actions.type === 'delete-expense') {
        const expensesUpdate = state.expenses.filter( expense => expense.id !== actions.payload.id);

        return {
            ...state,
            expenses: expensesUpdate,
        }
    }

    if(actions.type === 'get-editin-id') {

        return {
            ...state,
            editingId: actions.payload.id,
            modal: true,
        }
    }

    if(actions.type === 'update-expense') {

        const expensesUpdate = state.expenses.map( expense => expense.id === actions.payload.expense.id ? actions.payload.expense : expense );

        return {
            ...state,
            expenses: expensesUpdate,
            modal: false,
            editingId: '',
        }
    }

    if(actions.type === 'reset-app') {
        
        return {
            ...state,
            budget: 0,
            expenses: [],

        }
    }

    if(actions.type === 'add-filter-category') {
        return {
            ...state,
            currentCategory: actions.payload.id,
        }
    }

    return state;
}