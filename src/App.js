import React from "react";
import { useState } from "react";
import Logo from "./logo"



function App() {
    const [ items , setItems ]  = useState([]);
 function handleAddItems(item){
    setItems((items) => [...items,item]);
  }
  function handleDeleteItems(id){
    setItems((items) => items.filter((item)=>item.id !== id));
  }
  function handleUpdate(id){
    setItems((items) => items.map((item) => item.id === id ?
  {...item,packed : !item.packed} : item
))
  }
  return (
    <div className="app">
      <Logo />
      <Form  handleitems={handleAddItems}/>
      <PackingList items ={items} itemdelete={handleDeleteItems} itemupdate={handleUpdate} />
      <Stats items={items} />
    </div>
  );
}



function Form({handleitems}) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

 



  function handleSubmit(e) {
    e.preventDefault();

    if(!description){
      alert("field is empty");
      return;
    }

    const Newitems = { description , quantity , packed : false, id : Date.now()
    }

handleitems(Newitems);

    console.log(Newitems);
    setDescription("");
    setQuantity(1);

  }


  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do your need for your trip</h3>
      <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      
      <input
        type="text"
        placeholder="Enter the list"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({items,itemdelete,itemupdate}) {

  const [ sortBy , setSortBy ] = useState("input");

  let sorteditems;
  if(sortBy === 'input') {sorteditems = items;}

  if(sortBy === 'description') {
    sorteditems =items.slice().sort((a,b) => a.description.localeCompare(b.description));
  }
  if(sortBy === 'packed') {
    sorteditems =items.slice().sort((a,b) => Number(a.packed) - Number(b.packed));
  }
  return (
    <div className="list">
      <ul>
        {sorteditems.map((item) => (
          <Item item={item} key={item.id} itemdelete={itemdelete} itemupdate={itemupdate} />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)}> 
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed items</option>
          </select>
        </div>
    </div>
  );
}

function Item({ item,itemdelete,itemupdate }) {
  return (
    <li>
      <input type="checkbox" value={item.packed}
      onChange={()=>itemupdate(item.id)}
      />
      <span style={{ textDecoration: item.packed ? "line-through" : "none" }}>
        {item.quantity} {item.description}
      </span>
      <button onClick={()=>itemdelete(item.id)}>❌</button>
    </li>
  
  );
}

function Stats({items}) {
  if(!items.length) return (
  <p className="stats"> 
  <em>
    you didnt added any packing list
    </em>
  </p> 
);
  const Numlist = items.length;
  const Numpacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((Numpacked / Numlist) * 100) ;
  return (
    <footer className="stats">
      <em>
        { percentage === 100 ? "Your fully packed for the trip" :
        `You have ${Numlist} items on yout list , and you already packed ${Numpacked} (${percentage}%)`
        }
        </em>
    </footer>
  );
}

export default App;
