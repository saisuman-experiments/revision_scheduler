import { data } from "../Data/Data"
import {useState ,useEffect} from "react";
//import './Main.css';

import SubmitPage from "./SubmitPage";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Main(){
    let navigate=useNavigate();
    const todayDate=new Date().toISOString().split("T")[0]
    const [selectedDateTo,setselectedDateTo]=useState(todayDate);
    const [selectedDateFrom,setselectedDateFrom]=useState(todayDate);
    const [frequencyList,setFL]=useState(true);
   // const[frequencyListUpdated,]
    const [data,setData]=useState();
    let newList=[];

    useEffect(() => {
        fetch('http://localhost:5000/api/data')
          .then(response => response.json())
          .then(data => {
          //  console
            setData(data); // Set the fetched data into the state
          })
          .catch(error => {
            console.error('Error fetching data:', error); // Handle errors
          });
      }, []);
    
      console.log(data);
    //  useEffect(()=>{
        if(data!==undefined){
        data.map((d)=>{
            let fd = new Date(d.startDate);  
  fd.setDate(fd.getDate() + Number(d.firstRevision)); 
  let sd = new Date(d.startDate);  
  sd.setDate(sd.getDate() + Number(d.secondRevision));

  d.fd=fd;
  d.sd=sd;
        });

        
    }
 
    if(data!==undefined) {
        if(new Date(selectedDateTo).toDateString()===new Date().toDateString() && new Date(selectedDateFrom).toDateString()===new Date().toDateString()){
        let a=data.filter((d)=>{
            return new Date(d.fd).toDateString()===new Date(selectedDateTo).toDateString();
        });
        a.forEach((e)=>{
            e.due={
                fd: new Date(e.fd).toDateString()===new Date().toDateString()?'highlight':"",
                sd: new Date(e.sd).toDateString()===new Date().toDateString()?'highlight':"",

            };
            
        })
        
        //setFL([...data]);
        newList=[...a]
    }else if(selectedDateTo!=="" && selectedDateFrom!==""){
        newList=[];
   let a=[];
   let b=[];
         a=data.filter((d)=>{
            let fd = new Date(d.fd); 
            fd.setDate(fd.getDate()+7); 
            return new Date(d.fd)>=new Date (selectedDateTo) && new Date (selectedDateFrom)>=new Date(d.fd);
           
        });

         b=data.filter((d)=>{
            let sd = new Date(d.sd); 
            sd.setDate(sd.getDate() + 7); 
            return new Date(d.sd)>=new Date (selectedDateTo) && new Date (selectedDateFrom)>=new Date(d.sd);
           
        });

        let c=new Set([...a,...b]);
        let d=[...c];
        const today = new Date();
console.log(today);
console.log(d);
        d.forEach((e)=>{
            e.due={
                fd: new Date(e.fd).toDateString()===today.toDateString()?'highlight':"",
                sd: new Date(e.sd).toDateString()===today.toDateString()?'highlight':"",

            };
            
        })
        newList=[...d];
       
        
       
            }

    }

   function handleToday(){
    setselectedDateTo(todayDate);
    setselectedDateFrom(todayDate)
   }
   
    // function showTpc(){
    //     setFL(false);
    //     setFL(true);
        
    // }


    return(<div className="submitContainer">
   <h1>Revision Scheduler</h1>
    {/* <SubmitPage></SubmitPage> */}

   
      <label>From:</label>
      <input 
        type="date" 
        value={selectedDateTo}
        onChange={(e)=>{
            setselectedDateTo(e.target.value);
            setselectedDateFrom("");
           }} 
      />
       <label>To:</label>
      <input 
        type="date" 
        value={selectedDateFrom}
        min={selectedDateTo}
        onChange={(e)=>{
            setselectedDateFrom(e.target.value);
        }} 
      />
      <button onClick={handleToday}>Reset To Today</button>
      {newList.length>0 && <h3>Total topics : {newList.length}</h3>}
      {/* <button onClick={showTpc} className="buttonContainer">Show Topics</button> */}
      
      <table>
        <thead>
        <tr>
                <th>Topic</th>
                <th>Last Revision</th>
                <th>1st Revision</th>
                <th>2nd Revision</th>
            </tr>
        </thead>
        <tbody>
        {newList.length>0 && newList.map((f)=>
    
    <tr>
        <td style={{color: "#6A1B9A",fontWeight:"600"}}>{f.tpc}</td>
        <td>{new Date(f.startDate).toLocaleDateString()}</td>
        <td className={f.due.fd}>{f.firstRevision?f.fd.toLocaleDateString():"-"}</td>
        <td className={f.due.sd}>{f.secondRevision?f.sd.toLocaleDateString():"-"}</td>
    </tr>
    

    )}
        </tbody>
      </table>


    {!newList.length>0 && <div>No Topics found</div>}

    <button onClick={()=>{navigate("/submit")}} className="buttonContainer">Add New Topics</button>
    </div>)

    
}