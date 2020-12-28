export const isAuthenticated = () => {
  const token = localStorage.getItem('token')
  if(token === "" || token == null) {
    return false
  }
  if(token.length > 0) {
    return true
  }
  return false
}
