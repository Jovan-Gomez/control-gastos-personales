import { useEffect, useState } from 'react'
import Message from './Message'
import IconClose from '../img/cerrar.svg'

const Modal = ({ onClose, animateModal, saveExpensive, expenseInfo }) => {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    if (Object.keys(expenseInfo).length > 1) {
      setName(expenseInfo.name)
      setAmount(expenseInfo.amount)
      setCategory(expenseInfo.category)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if ([name, amount, category].includes('')) {
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 1000)
      return
    }
    if (expenseInfo.name) {
      saveExpensive({ name, amount, category, date: expenseInfo.date, id: expenseInfo.id })
    } else {
      saveExpensive({ name, amount, category })
    }
    onClose()
  }
  return (
    <div className='modal'>
      <div className='cerrar-modal'>
        <img src={IconClose} alt='close-modal' onClick={onClose} />
      </div>
      <form onSubmit={handleSubmit} className={`formulario ${animateModal ? 'animar' : 'cerrar'}`}>
        <legend>{`${expenseInfo.name ? 'Editar' : 'Nuevo'} Gasto`}</legend>
        <div className='campo'>
          <label htmlFor='nameExpensive'>Nombre del Gasto</label>
          <input
            id='nameExpensive'
            type='text'
            placeholder='Nombre del gasto'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='campo'>
          <label htmlFor='amount'>Cantidad</label>
          <input
            id='amount'
            type='number'
            placeholder='cantidad'
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <div className='campo'>
          <label htmlFor='category'>Categoria</label>
          <select id='category' value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value=''>-- Seleccione --</option>
            <option value='comida'>Comida</option>
            <option value='casa'>Casa</option>
            <option value='gastos'>Gastos Varios</option>
            <option value='ocio'>Ocio</option>
            <option value='salud'>Salud</option>
            <option value='ahorro'>Ahorro</option>
            <option value='subcripciones'>Subcripciones</option>
          </select>
        </div>
        <input type='submit' value={`${expenseInfo.name ? 'Guardar' : 'Agregar'} Gasto`} />
        {error && <Message type='error'>Todos los campos son obligatorios</Message>}
      </form>
    </div>
  )
}

export default Modal
