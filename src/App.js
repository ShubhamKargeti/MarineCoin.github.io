import Header from './components/Header.Component';
import './App.css';
import { TokenContextProvider } from './Context/Context';
import Main from './components/Main.component';

function App() {
  return (
    <TokenContextProvider>
      <div className="App">
        <div className="flex-col justify-between h-screen  text-white bg-[#b343f493]">
        <Header/>
        <Main/>
        </div>
      </div>
    </TokenContextProvider>
    
  );
}

export default App;
