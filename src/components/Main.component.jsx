import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../Context/Context";
import { ethers } from "ethers";
//import Web3 from "web3";
import { CoinAddress,CoinABI } from "../lib/constant-coin";
import {ABI , Address} from '../lib/constant-transaction';
const initialCoins = 5000000;
const TokenPrice = '1000000000000000'; //0.001eth 



const GetCoinContract=()=>{
    if(typeof window !== 'undefined'){
        const eth = window.ethereum;
        if(eth == null) return alert("Please install metamask");
        const provider = new ethers.providers.Web3Provider(eth);
        const signer = provider.getSigner();
        const transactionContract = new ethers.Contract(
            CoinAddress,
            CoinABI,
            signer
        )
        return transactionContract;
    }
}
const GetEtheriumContract =()=>{
    if(typeof window !== 'undefined'){
        const eth = window.ethereum;
        if(eth == null) return alert("please install metamask");
        const provider = new ethers.providers.Web3Provider(eth);
        const signer = provider.getSigner();
        const transactionContract = new ethers.Contract(
            Address,
            ABI,
            signer
        )
        return transactionContract;
    }
}

const Main = () =>{
    const {toggle,currentAccount} = useContext(TokenContext);
    const [accountBalance,setAccountBalance] = useState(0);
    const [contractBalance,setContractBalance] =useState(0);
    const [noOfTokens,setNoOfTokens] = useState(0);
    
    useEffect(()=>{
        const setBalance =async()=>{
            const coin = await getCoinBalance(currentAccount)
            setAccountBalance(coin);
            const contractCoin = await getCoinBalance(Address);
            setContractBalance(contractCoin);
        }
        setBalance();
    })

    const contract = GetEtheriumContract();

    const BuyTokens =async (event)=>{
        event.preventDefault();
        console.log("ok");
        console.log(currentAccount);
        setNoOfTokens((parseInt(noOfTokens) + 1));
        console.log(noOfTokens);
        console.log(`${Math.floor((TokenPrice*noOfTokens*10)/9)}`)
        const tx = await contract.buyTokens(noOfTokens,{
            value: `${Math.floor((TokenPrice*noOfTokens*10)/9)}`,
            from:currentAccount,
        })              
        tx.wait();
        console.log(tx);
    }
    const SellTokens =async (event)=>{
        event.preventDefault();
        console.log("selling");
        const tx = await contract.sellTokens(noOfTokens,{
            from:currentAccount,
        })              
        tx.wait();
        console.log(tx);
    }
    
    const getCoinBalance=async(currentAccount)=>{
        try{
        const coinContract = GetCoinContract();
        const coinBalance = await coinContract.coinBalance(currentAccount);
        const result = coinBalance.toNumber();
        return result;
    }
        catch(error){
            console.error(error);
        }
    }
    
    return(
    <div className="flex flex-col  content-center items-center h-screen">
        <h1 className="my-5 text-black text-2xl font-bold">Token Price = 0.01 ETH</h1>
        <div className=" flex text-black font-extrabold font-serif text-2xl">
            <h1 className="flex justify-center">You have currently {accountBalance? accountBalance:0} tokens in your account</h1>
        </div>
        {toggle === "Buy"?(
        <div className="flex my-10 justify-center content-center self-center w-3/4 h-1/3">
            <form className="flex content-center flex-col rounded-3xl border-4 p-3 items-center justify-center w-1/2">
                <div className="flex">
                    <label className="p-2 m-2 text-black font-bold">No Of Tokens youu wanna buy</label>
                    <input className="p-2 m-2 rounded-2xl text-black" onChange={e=> setNoOfTokens(e.target.value)} type="number" placeholder="00"/>
                </div>
                <button onClick={BuyTokens} className=" w-1/4 flex p-3 m-3 items-center justify-center border-2 rounded-2xl font-bold text-2xl bg-[#45121283] hover:bg-[#451245ec] hover:text-2xl ">Buy</button>
            </form>
        </div>):(
            <div className="flex my-10 justify-center content-center self-center w-3/4 h-1/3">
                <form className="flex content-center flex-col rounded-3xl border-4 p-3 items-center justify-center w-1/2">
                    <div className="flex">
                        <label className="p-2 m-2 text-black font-bold">No Of Tokens you wanna Sell</label>
                        <input className="p-2 m-2 rounded-2xl text-black" onChange={e=> setNoOfTokens(e.target.value)} type="number" placeholder="00"/>
                    </div>
                    <button onClick={SellTokens} className=" w-1/4 flex p-3 m-3 items-center justify-center border-2 rounded-2xl font-bold text-2xl bg-[#45121283] hover:bg-[#451245ec] hover:text-2xl ">Sell</button>
                </form>
            </div>
        )
    }
        <div className=" flex text-black font-extrabold font-serif text-2xl">
            <h1 className="flex justify-center">Coins left: {contractBalance? contractBalance:"0"}</h1>
        </div>
        <progress className="w-3/4 h-4 rounded-2xl"  value={contractBalance/initialCoins} max="100"></progress>
    </div>
    )
}
export default Main;