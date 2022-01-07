import { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const BudgetControl = ({ budget, expensives, resetApp }) => {
  const [available, setAvailable] = useState(0)
  const [lost, setLost] = useState(0)
  const [percent, setPercent] = useState(0)
  const [color, setColor] = useState('')

  useEffect(() => {
    const totalLost = expensives.reduce((total, expense) => expense.amount + total, 0)
    const totalAvailable = budget - totalLost
    const calcPercent = (((budget - totalAvailable) / budget) * 100).toFixed(2)
    setAvailable(totalAvailable)
    setLost(totalLost)
    setTimeout(() => {
      setPercent(Number(calcPercent))
    }, 900)
  }, [expensives])
  useEffect(() => {
    if (percent < 40) {
      setColor('#3b82f6')
    }
    if (percent > 40 && percent < 60) {
      setColor('#f6b93b')
    }
    if (percent > 60 && percent < 80) {
      setColor('#f6893b')
    }
    if (percent > 80) {
      setColor('#dc2626')
    }
  }, [percent])

  const formarAmount = (amount = 0) => {
    return amount.toLocaleString('es-US', {
      style: 'currency',
      currency: 'USD',
    })
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
      <div>
        <CircularProgressbar
          value={percent}
          styles={buildStyles({
            pathColor: color,
            trailColor: '#F5F5F5',
            textColor: color,
          })}
          text={`${percent}% Gastado`}
        />
      </div>
      <div className='contenido-presupuesto'>
        <button className='reset-app' type='button' onClick={resetApp}>
          Resetear App
        </button>
        <p>
          <span>Presupuesto: </span> {formarAmount(budget)}
        </p>
        <p className={`${available < 0 && 'negativo'}`}>
          <span>Disponible: </span> {formarAmount(available)}
        </p>
        <p>
          <span>Gastado: </span> {formarAmount(lost)}
        </p>
      </div>
    </div>
  )
}

export default BudgetControl
