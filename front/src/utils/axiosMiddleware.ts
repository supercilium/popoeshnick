import axios from 'axios'

const instance = axios.create()

instance.defaults.timeout = 6000

instance.interceptors.request.use((config) => {
  // Do something before request is sent
  // console.log(config)
  return config
}, (error) => {
  // Do something with request error
  // console.log(error)
  return Promise.reject(error)
})

instance.interceptors.response.use((response) => {
  // Do something with response data
  // console.log(response.status)
  return response
}, (error) => {
  // Do something with response error
  // console.log(error)
  return Promise.reject(error)
})

export default instance
