
import './App.css';
import {ethers} from "ethers";
import abi from "./contract/salary.json";
import {useState,useEffect} from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Employee from './Components/Employee';
import Navbar from './Components/Navbar';
import Intro from './Components/Intro';
import Manager from './Components/Manager';

function App() {

  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState("None");
  const [address, setaddress] = useState()
  
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x17fe67353969272DdDa9caf150D4F66b0440E646";
      setaddress(contractAddress);
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
     
      }
    };
    connectWallet();
  }, []);

  return (  
    <BrowserRouter>
          <Navbar/>
     <Routes>

    <Route path='/' element={<Intro/>}/>
    <Route path='/employee' element={<Employee state={state}/>}/>
    <Route path='/manager' element={<Manager state={state} address={address}/>}/>   

      </Routes>  
    
    </BrowserRouter>

  );
}

export default App;
