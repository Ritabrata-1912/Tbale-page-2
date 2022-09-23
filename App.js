import './App.css';
import React,{useState} from "react";
import data from "./mock_data.json";
function App() {
  const items=Object.keys(data);
  const [searchItem,setSearchItem]=useState("");
  const [varItem,setVarItem]=useState([]);
  const [val,setVal]=useState(-1);
  const [content,setContent]=useState([]);
  const fade_in={display:"block",transition:"1s ease"};
  const fade_out={display:"none",transition:"1s ease"};
  const [fadeItem,setFadeItem]=useState(fade_in);
  const [fadeVar,setFadeVar]=useState(fade_out);
  const [cost,setCost]=useState(0);
  const [fades1,setFades1]=useState(fade_out);
  const [fades2,setFades2]=useState(fade_out);
  const [chgval,setChgval]=useState(-1);
  // const [chgvar,setChgvar]=useState('');
  const srchng=(event)=>{
    setSearchItem(event.target.value);

    // console.log(searchItem);
  };
  const srchclk=(i)=>{setSearchItem(i);};
  const varclk = ()=>{
    let test=[];
    for(const el of data[searchItem])
    {
      test=[...test,el.name];
    }
    setVarItem(test);
    setFadeItem(fade_out);
    setFadeVar(fade_in);
  }
  const addclk=()=>{
     const a=data[searchItem][val];
     setContent([...content,[searchItem,a['name'],a['price']]]);
     setFadeItem(fade_in);
     setFadeVar(fade_out);
     setSearchItem('');
     const tcost=cost+a.price;
     setCost(tcost);
  }
  const varclk1=(i)=>{setVal(i)}
  const edclk=()=>{setFades1(fade_out);
  setFades2(fade_in);}
  const delclk=()=>{setFades1(fade_out);const tstart=content.slice(0,chgval);
  const tend=content.slice(chgval+1);
  const tcost=cost-content[chgval][2];
  setCost(tcost);
setContent([...tstart,...tend]);}
  const svclk=()=>{setFades2(fade_out);}
  const cnclclk=()=>{setFades2(fade_out);}
  const cntchng=(num)=>{if(JSON.stringify(fades1)===JSON.stringify(fade_in))
  setFades1(fade_out);
    else
  setFades1(fade_in);
   setChgval(num);}
  return (
    <>
      <div className="main">
        <div className="head">Good Evening</div>
        <div className="head1">Table No 1</div>
        <table>
            <thead>
                <tr>
                    <th>Item Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
            {(content!==[])?(content.map((a,index)=>(
             <tr key={index} onClick={()=>cntchng(index)}>
              <td>{a[1]}</td>
              <td>{a[2]}</td>
             </tr>
             ))):null}
            </tbody>
        </table>
        {(cost!==0)?<div className='cost'>Total Cost : Rs.{cost}</div>:null}
        <div className="head4">
          <div className="sub1" style={fades1}><button className='edit' onClick={edclk}>Edit</button>
          <button className='del' onClick={delclk}>Delete</button></div>
          <div className="sub2" style={fades2}><button className='save' onClick={svclk}>Save</button>
          <button className='cncl' onClick={cnclclk}>Cancel</button></div>
        </div>
        <div className="head3">
            <div className="itmsrch" style={fadeItem}>
              <div className="itmsrch1">
              <input type="text" value={searchItem} onChange={srchng}/>
              <button onClick={varclk}>Choose variant</button>
              </div>
              <div className="drop">
                {items.filter((i)=>{
                  const sitem=searchItem.toLowerCase();
                  const itm=i.toLowerCase();
                  return(
                    sitem && itm.startsWith(sitem) && sitem!==itm
                  );

                }).map((i,v)=>(
                  <div className="drop_row" onClick={()=>srchclk(i)} key={v}>{i}</div>
                ))}
              </div>
            </div>
            <div className="varsrch" style={fadeVar}>
              <div className="varbox">
                {varItem.map((i,v)=>(
                  <div className="var" key={v} onClick={()=>varclk1(v)}>{i}</div>
                ))}
                </div> 
              <button onClick={addclk}>Add</button>
            </div>
        </div>
    </div>
    </>
  );
}

export default App;