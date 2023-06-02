export const options = (_method: string, _url: string, _data: any) => {
  return {
    method: _method,
    url: `${import.meta.env.VITE_API_USER_URL}${_url}`,
    headers: {'Content-Type': 'application/json'},
    data: _data
  }
}