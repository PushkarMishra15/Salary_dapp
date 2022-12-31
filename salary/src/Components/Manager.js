import React from 'react'
import { useState, useEffect } from 'react'
import "./Manager.css"
import {ethers} from "ethers";

export default function Manager({state,address}) {
  
    const [registeredemployee, setregisteredemployee] = useState([])
    const [result, setresult] = useState("Salary Not Transfered");
    const {contract} = state;

  useEffect(()=>{

    const registeredEmp=async()=>{

     const registeredEmployee = await contract.getEmployee();
      console.log(registeredEmployee);
      setregisteredemployee(registeredEmployee);
    
    }
    
    contract && registeredEmp();

  },[contract])
  
  const Transfer_Salary = async()=>{
    console.log("Initiated")   
  const amount = document.querySelector("#amountInput").value; 
  if(amount!=0){

  const new_amount = {value:ethers.utils.parseEther(amount)};
  try{

    await contract.transferSalary(new_amount)  
    setresult("Salary Transfered !");

  }catch(e){
     if(e.message.includes("You are not the manager !"))
    { 
     setresult("You are not the manager !")
    }
  else{
    setresult("Something Went Wrong !")
  }
}
  }else
  setresult("Enter the amount !")
  }
     
    return (
    <div>
        <div className="container2">
 <style>{'body { background-color:   #d6d5e7}'}</style>
       <div className="REmployee">
       <div className="REmplo">Registered Employees
       </div>
       <div className="EmpList">
        
       {registeredemployee!==0 && registeredemployee.map((name)=> <p key={name}>{name}</p>)}</div>

       <div className="mb-3 amount">
          <label htmlFor="exampleInputPassword1" className="amountHead">Amount</label>
          <input type="number" className="form-control" id="amountInput" placeholder='In eth'/>
        </div>
      
       <button type="button" className="Transfer" onClick={Transfer_Salary}>Transfer Salary</button>
     
       <div className="contract_address">
        Contract Address  
       </div>
       <div className="address">{address}</div>

       <div className="status">
         Status - {result} 
       </div>
       </div>
 </div>
    </div>
  )
}
