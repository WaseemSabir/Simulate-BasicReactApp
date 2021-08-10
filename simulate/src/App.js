import './App.css';
import PopUp from "./components/PopUp"
import React, { useState } from 'react';
import axios from "axios";

function App() {

  const [show, setShow] = useState(false);
  const [arr, setArr] = useState([]);
  const [rec, setRec] = useState(false);
  const [fail, setFail] = useState(false);

  const addClick = () =>
  {
    setShow(!show);
  }

  const DataRec = (ev) =>
  {
    setRec(false);
    setFail(false);
    if(ev.type==="Price")
    {
      if(ev.month==="June") // month that should have price
      {
        ev.number = 300;
      }
      else
      {
        ev.number = 0;
      }
      let temp = arr;
      temp.push(ev)
      setArr(temp)
    }
    else
    {
      ev.month = ''
      ev.number = 50000; // price for facebook
      let temp = arr;
      temp.push(ev)
      setArr(temp)
    }
  }

  const RangeSlider = (ev,i) =>{
    let temp = arr.map((val,ind) =>{
      if(ind===i)
      {
        val.number = ev.target.value;
        return val;
      }
      else
      {
        return val;
      }
    })
    setArr(temp);
  }

  function View(ev)
  {
    let tempIndex = ev.index
    if(ev.value.type==="Price")
    {
      return (
        <div className="d-flex">
          <div className="text-dark mr-1 h4">{ev.value.type}</div>
          <div className="text-dark mt-1 mr-2 h6">({ev.value.month})</div>
          <label htmlFor="customRange{ev.index}" className="form-label">{ev.value.number}</label>
          <input type="range" className="form-range" min="0" max="300" id="customRange{ev.index}" value={ev.value.number} onChange={(even) => RangeSlider(even,tempIndex)} />
        </div>
      );
    }
    else
    {
      return (
      <div className="d-flex">
        <div className="text-dark mr-2 h4">{ev.value.type}</div>
        <label htmlFor="customRange{ev.index}" className="form-label">{ev.value.number}</label>
        <input type="range" className="form-range" min="0" max="50000" id="customRange{ev.index}" value={ev.value.number} onChange={(ev) => RangeSlider(ev,tempIndex)}/>
      </div>
      );
    }
  }

  const deleteArr = (i) =>{
    let temp = arr.filter((val,ind) =>{
      return (ind!==i)
    })
    setArr(temp);
  }

  const simClick = () =>{
    axios.post("http://localhost:4400",arr)
    .then(res => {
        setArr([]);
        setRec(true);
    })
    .catch(function(error) {
        setFail(true);
    });
  }

  const SimulateBtn = () =>{
    if(arr.length)
    {
      return (
        <div className="btn btn-success mt-2" onClick={simClick}>Simulate</div>
      );
    }
    else
    {
      return(
        <></>
      );
    }
  }

  const FailOrSucc = () => {
    if(rec)
    {
      return (
        <div className="text-dark mt-2">Data recieved by server successfully, you can send more requests if you desire.</div>
      );
    }
    else if(fail)
    {
      return (
        <div className="text-dark mt-2">Failed to send data to server, try again!</div>
      );
    }
    else
    {
      return(
        <></>
      );
    }
  }

  return (
    <>
      <div className="container">
        <div className="btn btn-primary btn-lg mt-2" onClick={addClick}>Add New Choice</div>
        <div className="mt-5">
        {
          arr.map((val,ind) =>{
            return (
              <div key={ind} className="d-flex mt-2">
                <View value={val} index={ind} />
                <div className="btn btn-secondary mr-2" onClick={() => deleteArr(ind)}>Delete</div>
              </div>
            )
          })
        }
        </div>
        <SimulateBtn />
        <FailOrSucc />
      </div>
      <PopUp show={show} callBack={addClick} updateData={DataRec}/>
    </>
  );
}

export default App;
