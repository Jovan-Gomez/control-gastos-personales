import { useEffect, useState } from 'react'
import Filters from './components/Filters'
import Header from './components/Header'
import ListExpensive from './components/ListExpensive'
import Modal from './components/Modal'
import { generateId } from './helpers/generateId'
import IconNewExpense from './img/nuevo-gasto.svg'

function App() {
  const [expensives, setExpensives] = useState([])
  const [budget, setBudget] = useState(Number(localStorage.getItem('budget' ?? 0)))
  const [open, setOpen] = useState(false)
  const [isValidBudget, setIsValidBudget] = useState(0)
  const [animateModal, setAnimateModal] = useState(false)
  const [expenseInfo, setExpenseInfo] = useState({})
  const [filter, setFilter] = useState('')
  const [expensivesfilter, setExpensivesFilter] = useState([])

  useEffect(() => {
    if (Number(localStorage.getItem('budget')) > 0) {
      setIsValidBudget(true)
    }
    if (localStorage.getItem('expensives') !== null) {
      setExpensives(JSON.parse(localStorage.getItem('expensives')))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('budget', budget ?? 0)
  }, [budget])

  useEffect(() => {
    localStorage.setItem('expensives', JSON.stringify(expensives) ?? [])
  }, [expensives])

  useEffect(() => {
    if (filter) {
      setExpensivesFilter(expensives.filter((el) => el.category === filter))
    }
  }, [filter])

  const handleModal = () => {
    setOpen(true)
    setTimeout(() => {
      setAnimateModal(true)
    }, 500)
  }

  const handleCloseModal = () => {
    setAnimateModal(false)
    setTimeout(() => {
      setExpenseInfo({})
      setOpen(false)
    }, 500)
  }

  const saveExpensive = (expense = {}) => {
    if (expense.id) {
      setExpensives((prev) => prev.map((el) => (el.id === expense.id ? expense : el)))
      return
    }
    expense.id = generateId()
    expense.date = Date.now()
    setExpensives([...expensives, expense])
  }

  const handleEditExpense = (id) => {
    setExpenseInfo(expensives.find((el) => el.id === id))
    handleModal()
  }
  const handlerDeleteExpense = (id) => {
    setExpensives((prev) => prev.filter((el) => el.id !== id))
  }

  const resetApp = () => {
    const res = confirm('Estas seguro de resetear la app?')
    if (res) {
      setIsValidBudget(false)
      setBudget(0)
      setExpensives([])
      setFilter('')
      setExpensivesFilter([])
    }
  }

  return (
    <div className={`${open && 'fijar'}`}>
      <Header
        budget={budget}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
        expensives={expensives}
        resetApp={resetApp}
      />
      {isValidBudget && (
        <>
          <main>
            <Filters filter={filter} setFilter={setFilter} />
            <ListExpensive
              expensives={expensivesfilter.length > 0 ? expensivesfilter : expensives}
              handleEditExpense={handleEditExpense}
              handlerDeleteExpense={handlerDeleteExpense}
            />
          </main>
          <div className='nuevo-gasto'>
            <img src={IconNewExpense} onClick={handleModal} />
          </div>
        </>
      )}
      {open && (
        <Modal
          onClose={handleCloseModal}
          animateModal={animateModal}
          setAnimateModal={setAnimateModal}
          saveExpensive={saveExpensive}
          expenseInfo={expenseInfo}
        />
      )}
    </div>
  )
}

export default App
