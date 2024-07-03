import React, { useEffect, useRef, useState } from 'react'
import axios from "axios";

export default function Movie() {
    
    const url = "http://localhost:27001/movies";
    const[datas,setDatas] = useState();
    const[trailer,setTrailer] = useState("");
    const[name,setName] = useState("");
    const[description,setDescription] = useState("");
    const id = useRef(0);
    const check = useRef(true);
    const mId = useRef();

    
    function GetMovies()
    {
        axios.get(url).then((d) => {
            console.log(d.data)
            setDatas(d.data);
        });
    }

    useEffect(() =>
    {
        GetMovies();
    });

    function handleClick()
    {
        if(trailer != "" && name != "" && description != "")
        {
            AddMovie();
            setName("");
            setDescription("");
            setTrailer("");
        }
        else if(trailer == "")
        {
            alert("Enter your movie trailer: ");
        }
        else if(name == "")
        {
            alert("Enter your movie name: ");
        }
        else if(description == "")
        {
            alert("Enter your movie description: ");
        } 
    }

    function AddMovie()
    {
        id.current += 1;
        const movie =
        {
            id:String(id.current),
            trailer: trailer,
            name: name,
            description : description
        }

        axios.post(url, movie).then((data) => console.log(data));
    }

    function DeleteMovie(id,e) 
    {
        e.stopPropagation();
        setName("");
        setDescription("");
        setTrailer("");
        check.current = true;
        axios.delete(url + `/${id}`);
    }

    function UpdateMovie(movie)
    {
        setName(movie.name);
        setDescription(movie.description);
        setTrailer(movie.trailer);
        mId.current = movie.id;
        check.current = false;
    }

    function ChangeMovie()
    {
        const movie =
        {
            id:String(mId.current),
            trailer: trailer,
            name: name,
            description : description
        }
        axios.put(url + `/${mId.current}`, movie).then((data) => console.log(data));
        setName("");
        setDescription("");
        setTrailer("");
        check.current = true;
    }

    return (
        <div>
            <section style={{margin:"auto",padding:"0px 30px 30px 30px",borderRadius:"10px",border:"5px solid black",width:"40%",backgroundColor:"silver",marginTop:"1%"}}>
                <input onChange={(e) => {setTrailer(e.target.value)}} value={trailer} style={{width:"100%",fontSize:"1.5em",padding:"10px",borderRadius:"10px",border:"3px solid black",marginTop:"30px"}} placeholder='Trailer'></input>
                <input onChange={(e) => {setName(e.target.value)}} value={name} style={{width:"100%",fontSize:"1.5em",padding:"10px",borderRadius:"10px",border:"3px solid black",marginTop:"30px"}} placeholder='Name'></input>
                <input onChange={(e) => {setDescription(e.target.value)}} value={description} style={{width:"100%",fontSize:"1.5em",padding:"10px",borderRadius:"10px",border:"3px solid black",marginTop:"30px"}} placeholder='Description'></input>
                <section style={{display:"flex",justifyContent:"center"}}>
                    <button  style={{borderRadius:"10px",border:"3px solid black",backgroundColor:"blue",
                    color:"white",padding:"10px",fontSize:"1.5em",marginTop:"20px",textAlign:"center",width:"30%",display:`${check.current ? "block":"none"}`}}
                    onClick={handleClick}>ADD</button>

                    <button style={{borderRadius:"10px",border:"3px solid black",backgroundColor:"blue",
                    color:"white",padding:"10px",fontSize:"1.5em",marginTop:"20px",textAlign:"center",width:"30%",display:`${check.current ? "none":"block"}`}}
                    onClick={ChangeMovie}>UPDATE</button>

                </section>
            </section>

            <section style={{display:'flex',justifyContent:"start"}}>
                {datas &&
                (
                    datas.map((d) => 
                    (
                        <section onClick={() => UpdateMovie(d)} style={{marginTop:"2%",marginLeft:"2%",backgroundColor:"red",padding:"10px",border:"3px solid black",borderRadius:"10px",width:"20%"}}>
                            <iframe style={{borderRadius:"10px",border:"3px solid white"}}
                                width="350px"
                                height="250px"
                                src={d.trailer}>

                            </iframe>

                            <h1 style={{margin:"auto",fontSize:"1.5em",color:"white",marginTop:"10px"}}>Name: {d.name}</h1>
                            <h1 style={{margin:"auto",fontSize:"1.5em",color:"white"}}>Description: {d.description}</h1>
                            <button style={{borderRadius:"10px",border:"3px solid black",backgroundColor:"green",
                            color:"white",padding:"10px",fontSize:"1.5em",marginTop:"20px",marginLeft:"25%",textAlign:"center",width:"50%"}}
                            onClick={(e) => DeleteMovie(d.id,e)}>DELETE</button>

                        </section>
                    ))
                )
                }
            </section>
        </div>
    )
}
