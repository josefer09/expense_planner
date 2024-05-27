export type Expense = {
    id: string,
    amount: number,
    expenseName: string,
    category: string,
    date: string,
}

export type DraftExpense = Omit<Expense, 'id'> //TODO Me copia los mismos atributos del type sin el id

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];