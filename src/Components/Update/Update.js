import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

function Update(){

    const {id} = useParams()

    const [name,setname]  = useState("")
    const [description,setdes]  = useState("")

    const [category,setcategory]  = useState("")
    const [website,setwebsiteLink]  = useState("")

    const [googleMapsLink,setgoogleMapsLink]  = useState("")
    const [instagramLink,setinstagramLink]  = useState("")

    const [locality,setlocality]  = useState("")
    const [city,setcity]  = useState("")

    const [error,seterror] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{
        axios.get('https://raymish-backend.vercel.app/getuser/'+id)
        .then(res=>{
            console.log(res)
            setname(res.data.name)
            setcategory(res.data.category)
            setcity(res.data.city)
            setdes(res.data.description)
            setgoogleMapsLink(res.data.googleMapsLink)
            setinstagramLink(res.data.instagramLink)
            setlocality(res.data.locality)
            setwebsiteLink(res.data.website)
        })
        .catch(error=>console.log(error))
    },[])

    function onClickSubmit(e){
        e.preventDefault()
        if (name !== "" && description !== "" && category !== "" && website !== "" && googleMapsLink !== "" && instagramLink !== "" && locality !== "" && city !== "" ){
            seterror("")
            axios.put('https://raymish-backend.vercel.app/update/'+id,{name,description,website,instagramLink,googleMapsLink,locality,city,category})
            .then(res=>{
                console.log(res)
                navigate("/")
            })
            .catch(error=>console.log(error))
        }else{
            seterror("All Fields are Mandatory")
        }
    }
    return(
        <div className="bg-primary">
            
            <div className="bg-light rounded m-3 w-75 m-auto m-3">
                <h1 className="m-2">Update Event</h1>
                <hr/>
                <form onSubmit={onClickSubmit}>

                    <div className="m-3">
                        <label htmlFor="name" className="m-3">Name: </label>
                        <input type="text" placeholder="Name of Event" onChange={e=>(setname(e.target.value))} value={name} className="m-3"/>
                    </div>

                    <div className="m-3">
                        <label htmlFor="category" className="m-3">category:</label>
                        <input type="text" placeholder="category" onChange={e=>(setcategory(e.target.value))} value={category} className="m-3"/>
                    </div>

                    <div className="m-3">
                        <label htmlFor="description" className="m-3">Description:</label>
                        <input type="text" placeholder="Description" onChange={e=>(setdes(e.target.value))} value={description} className="m-3"/>
                    </div>

                    <div className="m-3">
                        <label htmlFor="catewebsitegory" className="m-3">websiteLink:</label>
                        <input type="text" placeholder="websiteLink" onChange={e=>(setwebsiteLink(e.target.value))} value={website} className="m-3"/>
                    </div>

                    <div className="m-3">
                        <label htmlFor="googleMapsLink" className="m-3">googleMapsLink:</label>
                        <input type="text" placeholder="googleMapsLink" onChange={e=>(setgoogleMapsLink(e.target.value))} value={googleMapsLink} className="m-3"/>
                    </div>

                    <div className="m-3">
                        <label htmlFor="instagramLink" className="m-3">instagramLink:</label>
                        <input type="text" placeholder="instagramLink" onChange={e=>(setinstagramLink(e.target.value))} value={instagramLink} className="m-3"/>
                    </div>

                    <div className="m-3">
                        <label htmlFor="locality" className="m-3">Locality:</label>
                        <input type="text" placeholder="locality" onChange={e=>(setlocality(e.target.value))} value={locality} className="m-3"/>
                    </div>

                    <div className="m-3">
                        <label htmlFor="city" className="m-3">city:</label>
                        <input type="text" placeholder="city" onChange={e=>(setcity(e.target.value))} value={city} className="m-3"/>
                    </div>

                    <button className="btn btn-success m-3">Submit</button>
                    <Link to="/" className="btn btn-secondary m-3">Back</Link>

                </form>
                <p className="text-danger m-3">{error}</p>
            </div>
        </div>
    )
}

export default Update