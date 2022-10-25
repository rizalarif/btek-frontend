import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import http from '../helpers/http'

const CharacterDetail = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const [data, setData] = React.useState({})

  const getCharacterDetail = async () => {
    const {data: results} = await http().get('/character/'+id)
    setData(results)
  }

  React.useEffect(()=>{
    getCharacterDetail()
  },[])

  return (
    <>
      {data.name &&(
        <div>
          <img src={data.image} alt={data.name} />
          <div>{data.name}</div>
        </div>
      )}
      <div>
        <button type='button' className='btn' onClick={ () => navigate(-1)}>Back</button>
      </div>
    </>
  )
}

export default CharacterDetail
