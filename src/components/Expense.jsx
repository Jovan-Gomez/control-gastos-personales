import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { formatDate } from '../helpers/formatDate'
import { Casa, Comida, Ahorro, Ocio, Salud, Suscripciones, Gastos } from '../img/Icons'

const Expense = ({ expense, handleEditExpense, handlerDeleteExpense }) => {
  const icons = {
    casa: Casa,
    comida: Comida,
    ahorro: Ahorro,
    ocio: Ocio,
    salud: Salud,
    subcripciones: Suscripciones,
    gastos: Gastos,
  }
  const { name, amount, category, date } = expense

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => handleEditExpense(expense.id)}>Editar</SwipeAction>
    </LeadingActions>
  )
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={() => handlerDeleteExpense(expense.id)}>
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )
  return (
    <SwipeableList>
      <SwipeableListItem leadingActions={leadingActions()} trailingActions={trailingActions()}>
        <div className='gasto sombra'>
          <div className='contenido-gasto'>
            <img src={icons[category]} alt={`icon-${category}`} />
            <div className='descripcion-gasto'>
              <p className='categoria'>{category}</p>
              <p className='nombre-gasto'>{name}</p>
              <p className='fecha-gasto'>
                Agregado el: {''} <span>{formatDate(date)}</span>
              </p>
            </div>
          </div>
          <p className='cantidad-gasto'>{`$${amount}`}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}

export default Expense
