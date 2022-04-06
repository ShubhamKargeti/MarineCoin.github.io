import Logo from '../assets/uniswap.png';
import { useContext } from 'react';
import { TokenContext } from '../Context/Context';
const Header = ()=>{
   const {ConnectWallet,toggle,setToggle,currentAccount} = useContext(TokenContext);
   const buyClass = toggle==="Buy"? "flex m-0 p-3 bg-[#e32461]  rounded-2xl  hover:cursor-pointer justify-center w-1/2":"flex m-0 p-3  bg-[#343567]  rounded-2xl  hover:cursor-pointer justify-center w-1/2";
   const sellClass = toggle!=="Sell"? "flex m-0 p-3 bg-[#343567]  rounded-2xl  hover:cursor-pointer justify-center w-1/2":"flex m-0 p-3 bg-[#e32461]   rounded-2xl  hover:cursor-pointer justify-center w-1/2";
   console.log(toggle);
   console.log("current",currentAccount);
   return(
    <div className="flex justify-between justify-items-end items-center w-screen p-4">
        <div className='flex justify-start items-start'>
            <img src={Logo} alt="logo" height={50} width={50} />
        </div>
        <div className='flex m-1 p-0 w-1/4 rounded-2xl text-[1.2rem]'>
            <div className={buyClass} onClick= {()=>setToggle("Buy")}>BUY</div>
            <div className={sellClass} onClick= {()=>setToggle("Sell")}>SELL</div>
        </div>
        <div className="flex justify-evenly">
            <div className="rounded-2xl bg-[#343567] text-[1.3rem] p-2 ">
                <button onClick={()=>ConnectWallet()}>{currentAccount?`${currentAccount.substring(0,10)}`:"ConnectWallet"}</button>
            </div>
        </div>
    </div>
    )
}
export default Header;