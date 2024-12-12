/* global chrome */
import './App.css';
import {useState} from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [colorPicked,setcolorPicked]=useState("#000000")
  const [colorValues,setcolorValues]=useState({hex:"#000000",rgb:"(0,0,0)"})
  const converthextorgb=(hex)=>{
     let rgb=hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
            ,(m, r, g, b) => '#' + r + r + g + g + b + b)
            .substring(1).match(/.{2}/g)
            .map(x => parseInt(x, 16))
    return rgb
  }
  const handleClick =()=>{
    window.navigator.clipboard.writeText(colorPicked)
    toast("copied to clipboard")
  }
  const convertrgbtohex =(rgb)=>{
    function componentToHex(c) {
      let hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }
    
    return "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);

  }
  const handleColorchange = ()=>{
    chrome.tabs.query({active:true,currentWindow:true},(tabs)=>{
      chrome.tabs.sendMessage(tabs[0].id,{type:"extractColor"},(response)=>{
        const res=response.match(/\d+/g).map(ele=>parseInt(ele))
        const hex=convertrgbtohex(res)
        setcolorPicked(hex)
        setcolorValues({hex,rgb:response})
      })
    })
  }
  return (
    <div className="App">

      <h3>Pick a color:</h3>
      <input type='color' value={colorPicked} onChange={(e)=>{setcolorPicked(e.target.value);
        setcolorValues( (color)=>
          {
           let hex=e.target.value;
           let rgb=converthextorgb(hex)
            rgb=`(${rgb.join(",")})`
            return {hex, rgb}
          })}
      }/>
      <button onClick={handleColorchange}>Handle color change</button>
      <span>The selected colors are :</span>
      <span >RGB: {colorValues.rgb} and 
      HEX: {colorValues.hex}
      </span>
      <button onClick={handleClick}>Copy to Clipboard</button>
      <ToastContainer />

    </div>
  );
}

export default App;
