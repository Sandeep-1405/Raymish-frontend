import react, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'
import './Home.css'


function Home(){
    const [data,setdata] = useState([])
    const [error,seterror] = useState("")
    const [filter,setfilter] = useState("All")

    useEffect(()=>{
        //console.log(filter)
        function fetchData(){
            if (filter === "All"){
                axios.get('http://localhost:3000/')
                .then(res=>{
                    //console.log(res.data)
                    setdata(res.data)
                })
                .catch(error=>console.log(error))
            }else{
                axios.get('http://localhost:3000/filtered-user/'+filter)
                .then(res=>{
                    //console.log(res.data)
                    setdata(res.data)
                })
                .catch(error=>console.log(error))
            }
        }
        fetchData()
    },[filter])

    function handleDelete(id){
        //console.log(id)
        axios.delete('http://localhost:3000/delete/'+id)
        .then(res=> {
            window.location.reload()
            //console.log(res)
        })
        .catch(error=>console.log(error))
    }

    return(
        <div className='bg-primary home-card p-5'>
            <h1 className='m-3 bg-light w-25 m-auto'>Events</h1>
            <div className='d-flex justify-content-around m-3'>
                <Link to="/add-event" className='btn btn-success m-3'>+Add Event</Link>
                <div className='d-flex '>
                    <p className='text-light m-3'>Filter By: </p>
                    <select onChange={e=>(setfilter(e.target.value))} className='select m-2'>
                        <option value="All">All</option>
                        <option value="Kids">Kids</option>
                        <option value="Sports">Sports</option>
                        <option value="Family">Family</option>
                        <option value="Nightlife">Nightlife</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Meetups">Meetups</option>
                        <option value="Dance">Dance</option>
                        <option value="Music">Music</option>
                    </select>
                </div>
            </div>
            
            <div className='d-flex justify-content-center flex-wrap p-5'>
                {data.map(Details=>{
                    return <>
                    <div key={Details._id} className='shadow m-3 p-3 cards'>
                        <h6>Name: {Details.name}</h6>
                        <p>Category: {Details.category}</p>
                        <p>Description: {Details.description}</p>
                        <a href={Details.website} className='m-2'>Portfolio</a>
                        <br/>
                        <a href={Details.googleMapsLink} className='m-2'>Location</a>
                        <br/>
                        <a href={Details.instagramLink} className='m-2'>InstagramLink</a>
                        <p className='m-2'>Locality: {Details.locality}</p>
                        <p>City: {Details.city}</p>
                        
                        <div>
                            <Link to={`update/${Details._id}`} className='btn btn-primary m-3'>Update</Link>
                            <button className='btn btn-danger m-3' onClick={(e)=>(handleDelete(Details._id))}>Delete</button>
                        </div>
                    </div>
                    </>
                })}
            </div>
            <p>{error}</p>
        </div>
    )
}

export default Home