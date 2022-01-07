export const generateId = () => {
  const number = Math.random().toString().substr(2)
  const date = Date.now().toString()
  return number + date
}
