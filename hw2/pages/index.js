import fetch from 'isomorphic-unfetch'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import {useState} from 'react'
import axios from 'axios'
// import {Button , Card} from 'semantic-ui-react'

export const getStaticProps= async()=>{


  const res = await fetch('http://localhost:3000/api/planets')
 const data = await res.json()
console.log(data.data)
 return{
     props:{planets: data.data}
 }

}

const Planets= ({planets})=>{
  const [isUpdate , setIsUpdate]=useState(false)
  const [planetsnew, setPlanets]= useState(planets)
  const [name, setName]= useState()
  const [moons, setMoons]= useState()
  const [length, setLeng]= useState()
  const [id,setId]=useState()

const handelPost= ()=>{
  axios.post('http://localhost:3000/api/planets',{name:name , moons:moons ,length:length})
  .then( res=>{ 
    console.log(res)
    setPlanets(res.data.data)
    
  })

}

const hanelDeleted = (id)=>{
  axios.delete(`http://localhost:3000/api/planets/${id}`)
  .then( res=>{ 
    console.log(res)
    setPlanets(res.data.data)
    
  })



}

const isUpdated =(id)=>{
  setIsUpdate(true)
  setId(id)

}
 
const handelPut =()=>{
  axios.put(`http://localhost:3000/api/planets/${id}`,{name:name , moons:moons , length:length})
  .then( res=>{ 
    console.log(res)
    setPlanets(res.data.data)
    
  })

}


return (
  <>
<div className="main">
{planetsnew.map(planet=>{
      return <div className="card">
        <h1>{planet.name}</h1>
      <h2>{planet.moons}</h2>
      <h2>{planet.length}</h2>
      <button className="btn" onClick={()=>hanelDeleted(planet._id)}>Delete</button>
      <button className="btn" onClick={()=>isUpdated(planet._id)}>Update</button>
      </div>
  })}
</div>
<div className="mindev">
{isUpdate?
<div className="form1">
  <input  onChange={(e)=>setName(e.target.value)}></input>
  <br/><br/><input  onChange={(e)=>setMoons(e.target.value)}></input>
  <br/><br/><input  onChange={(e)=>setLeng(e.target.value)}></input>
  <br/><br/><button onClick={handelPut}>Save</button>
</div>
:


<div className="form">
 <br/><br/> <input onChange={(e)=>setName(e.target.value)}></input>
 <br/><br/> <input onChange={(e)=>setMoons(e.target.value)}></input>
 <br/><br/> <input onChange={(e)=>setLeng(e.target.value)}></input>
 <br/><br/> <button onClick={handelPost}>Add</button>
  
</div>
}
</div>
</>
)
}


export default Planets