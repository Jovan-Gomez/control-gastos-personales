const Message = ({ type, children }) => {
  return <div className={`alerta ${type}`}>{children}</div>
}

export default Message
