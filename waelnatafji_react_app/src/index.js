import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

function App(props) {
const [error, setError] = useState(null);
const [isLoaded, setIsLoaded] = useState(false);
const [items, setItems] = useState([]);

    useEffect(() => {
      setInterval(() => {
       fetch("http://localhost:3000/measurement")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result);
          },
          (error) => {
            setIsLoaded(false);
            setError(error);
          }
        )
      }, 30000);
    }, []);

  return (
    <>
    <div className="row m-4">
    <Welcome name="Wael Natafji" />
    </div>
    {isLoaded ? "":<h4 className="d-flex justify-content-center">Reading in data...</h4>}
    <div className="col-10 d-flex justify-content-center m-auto">
    <table className="table table-striped table-hover">
  <thead>
    <tr className="table-dark">
      <th scope="col">#</th>
      <th scope="col"><h3>Unit_id</h3></th>
      <th scope="col"><h3>Temperature</h3></th>
      <th scope="col"><h3>Unix_timestamp</h3></th>
    </tr>
  </thead>
  <tbody>
  {items.map((item,index) => {
      return (
      <tr>
        <th scope="row"><h5>{index}</h5></th>
        <td><h4>{item.unit_id}</h4></td>
        <td><h4>{item.temperature}</h4></td>
        <td><h4>{item.unix_timestamp}</h4></td>
        </tr>
        );
    }
  )
 }
    </tbody>
</table>
</div>
    <div className="row col-6 d-flex justify-content-center m-auto">
      <form onSubmit={addData} className = "p-3 m-3">
        <div className="col-3">
        <input type="text" id="id" className="form-control m-3" placeholder={'ID'} name='ID'></input>
        </div>
        <div className="col-3">
      <input type="number" step="0.1" min='-3' max='3' id="temp" className="form-control m-3" placeholder={'Temp'} name='Temp'></input>
        </div>
        <div className="col-4">
      <button type="submit" className="btn btn-success m-2">Test add data</button>
        </div>
      </form>
    </div>
    </>
  );
}

function Welcome(props) {
  return <h1 className="title d-flex justify-content-center">Lab-2 Mobile-platform , {props.name}</h1>; 
}

async function addData(event){ 
  event.preventDefault();
  let temp = event.target.elements.temp.value ;
  let id = event.target.elements.id.value ;
  if(temp!= 0 && id !=''){
     const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ unit_id: id , temperature : temp })
  };
  fetch('http://localhost:3000/measurement/add', requestOptions).then(res => res.json()).then(result => console.log(result));
  }
  else {
  alert("Insert information");  
  }
 
}
const element = <App/>; 

ReactDOM.render(element, document.getElementById("index"));