import Expense from './Expense'

const ListExpensive = ({ expensives, handleEditExpense, handlerDeleteExpense }) => {
  return (
    <div className='listado-gastos contenedor'>
      <h2>{expensives.length ? 'Gastos' : 'Aun no hay gastos'}</h2>
      {expensives.map((expense) => (
        <Expense
          key={expense.id}
          expense={expense}
          handleEditExpense={handleEditExpense}
          handlerDeleteExpense={handlerDeleteExpense}
        />
      ))}
    </div>
  )
}

export default ListExpensive
