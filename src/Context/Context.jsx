import React, { useState,useEffect } from "react";
export const TokenContext = React.createContext();
export const TokenContextProvider = ({children})=>{
    useEffect(()=>{
        CheckWalllet()
    })
    const [currentAccount ,setCurrentAccount] = useState("");
    const [toggle ,setToggle] = useState("Sell");
       // const tokenValue = 0.001;
        let eth;
        if(typeof window !== 'undefined'){
            eth = window.ethereum;
        }
    const ConnectWallet =async(metamask = eth)=>{
        try{
            if(!metamask){
                return alert('Please install metamask');
            }
            const Accounts = await metamask.request({method : 'eth_requestAccounts'});
            if(Accounts.length) setCurrentAccount(Accounts[0]);
        }
        catch(error){
            console.error(error);
            console.log("wallet obj not available")
        }
    }
    const CheckWalllet =async(metamask =eth)=>{
        try{
            if(!metamask){
                return alert('Please install metamask');
            }
            const Accounts = await metamask.request({method : 'eth_requestAccounts'});
            setCurrentAccount(Accounts[0]);
        }
        catch(error){
            console.log(error);
        }
    }
    return(
        <TokenContext.Provider 
        value={{ConnectWallet , currentAccount,toggle,setToggle} }>
        {children}
        </TokenContext.Provider>
    )
}