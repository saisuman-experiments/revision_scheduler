import {useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function SubmitPage(){
const [tpc,setTpc]=useState();
const [startDate,setStartDate]=useState();
const[fr,setFr]=useState();
const[sr,setSr]=useState();
let navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
        id:parseInt(Math.random()*1000),
        tpc:tpc,
        startDate:startDate,
        firstRevision:fr,
        secondRevision:sr
    };

    try {
      // Send the data to the backend
      const response = await axios.post("http://localhost:5000/api/update", data);
      console.log("Data updated:", response.data);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  
    setTpc("");
    setFr("");
    setSr("");
    setStartDate("");

  };

  function handleListPage(){
    navigate("/");
  }

    return(
       <form onSubmit={handleSubmit}> 
       <div className="container">
    <div>

    <h1>Revision Scheduler</h1>
    
        
    
    <label>Enter Topic</label><br></br>
    <input id="tpc" name="tpc" value={tpc} onChange={(e)=>setTpc(e.target.value)} required></input>
    </div>
    <div>
    <label>Revision Date</label><br></br>
   
    <input 
        type="date" 
        value={startDate}
        required
        onChange={(e)=>{
            setStartDate(e.target.value);
            
           }} 
      />
    </div>
    <div>
    <label>1st Revision</label><br></br>
    <input type="number" value={fr} onChange={(e)=>setFr(e.target.value)} required></input>
    </div>
    <div>
    <label>2nd Revision</label><br></br>
    <input type="number"value={sr} onChange={(e)=>setSr(e.target.value)}></input>
    </div>
    <div>
    <button>Add to list</button>
    <button onClick={handleListPage}>Revision List</button>
    </div>
    <footer style={{padding:"10px"}}>
        <small>*Enter revision in days.</small>
    </footer>
    </div>
    
    </form>
   
    
    
    
   )
}


