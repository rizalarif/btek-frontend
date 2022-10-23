import { useEffect, useState } from 'react'
import axios from 'axios'
import './assets/style.css'

function App() {
  const [characters, setCharacters] = useState([])

  useEffect(() =>{
    const fetchData = async () => {
      try{
        const {data} = await axios.get(`https://rickandmortyapi.com/api/character`)
        setCharacters(data.results)
      }catch(error){
        console.error(error);
      }
    }
    fetchData()
  },[])

  return (
    <div className="App">
      <div className="results">
        {characters.map(character => (
          <div>
            <img src={character.image} alt={character.name}/>
            {character.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
