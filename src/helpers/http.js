import axios from "axios"

const http = () => axios.create({
  baseURL : "https://rickandmortyapi.com/api"
})

export default http
