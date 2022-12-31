import { useState } from "react";
import React from 'react'
import "./Employee.css"


const Employee=({state})=>{

const [Estatus, setEstatus] = useState();

const Submit=async()=>{

  const {contract} = state;
    
  const Raddress = document.querySelector("#Eaddress").value;

  console.log(Raddress);
 if(Raddress!=0){
  try{
   
   await contract.registerEmployee(Raddress)
   setEstatus("You have been Registered !")

  }catch(error){
    if(error.message.includes("You have already registered !"))
    setEstatus("You have already registered")
    else
    setEstatus("Something Went Wrong !");
  }
}else
{
  setEstatus("Enter the address first !");
}
}

    
return(
    <>
    <div className="Econtainer1">
    <style>{'body { background-color:   #d6d5e7}'}</style>
    <div className="Econtainer">
        <div id="Eregister">

        Enter your address to Register 
        </div>
        <input type="text"  id="Eaddress"   size="50"/>
    </div>
    <button className="Ebtn" onClick={Submit}>Register</button>
    <div className="Estatus">
         {Estatus}
    </div>
    
    </div>

    </>
)
}

export default Employee;