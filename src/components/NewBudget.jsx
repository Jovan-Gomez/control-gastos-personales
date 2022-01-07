import { useState } from 'react'
import Message from './Message'

const NewBudget = ({ budget, setBudget, setIsValidBudget }) => {
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!budget || budget == 0 || budget < 0) {
      setError(true)
      return
    }
    setIsValidBudget(true)
    setError(false)
  }
  return (
    <div className='contenedor-presupuesto contenedor sombra'>
      <form onSubmit={handleSubmit} className='formulario'>
        <div className='campo'>
          <label>Definir Presupuesto</label>
          <input
            className='nuevo-presupuesto'
            type='number'
            placeholder='Añade tu Presupuesto'
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
          />
        </div>
        <input type='submit' value='añadir' />
        {error && <Message type='error'>Presupuesto Invalido</Message>}
      </form>
    </div>
  )
}

export default NewBudget
