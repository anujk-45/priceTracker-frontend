import { useEffect, useState } from "react";
import Navbar from "./Navbar"
import classNames from 'classnames'

const Items = () => {
  const API = process.env.REACT_APP_API || 'http://localhost:8000/';

  let [isPending, setIsPending] = useState(false);
  let [err, setErr] = useState(false)
  let [items, setItems] = useState([])
  let [itemStatus, setItemStatus] = useState('Add product');
  let [random, setRandom] = useState(0);
  let token = localStorage.getItem('jwt');

  let [formIsOpen, setFormIsOpen] = useState(false);
  let [url, setUrl] = useState('');
  let [name, setName] = useState('');
  let [requiredPrice, setrequiredPrice] = useState(0);
  let [gmail, setGmail] = useState('');
  let [buttonState, setButtonState] = useState('Add product');

  let [itemId, setItemId] = useState('');

  useEffect(()=> {
    fetch(`${API}items/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      } 
    }).then((response) => {
      console.log(response);
      setIsPending(false)
      if(!response.ok){
        throw new Error('unable to fetch items')
      }
      return response.json()
    }).then((result) => {
      setItems(result)
      console.log(result);
      localStorage.setItem('itemsArray', JSON.stringify(result));
    }).catch((e) => {
      setErr(true)
      console.log(e)
    })
  },[token, random, API])

  const addItem = async() => {
    setItemStatus("Addding product...");
    token = localStorage.getItem('jwt');
    console.log('Inside addItem')
    console.log(url, requiredPrice, gmail)
   
    fetch(`${API}items/addItem`, {
      method: 'POST',
      body: JSON.stringify({
        url,
        requiredPrice,
        gmail,
        name
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      if(!response.ok){
        throw new Error('please provide correct URL')
      }
    
      setRandom(Math.random());
      clearForm();
      return response.json()
    }).then(result => {
      console.log(result)
    }).catch((e) => {
      // setErr(true);
    })
  }

  const handleEditItem = async(index) => {
    const itemsArray = JSON.parse(localStorage.getItem('itemsArray'));
    const item = itemsArray[[index]];
    setItemId(item._id);
    const button = document.getElementById('open-form-button');
    if(buttonState === 'Add product'){
      button.click();
    }
    setUrl(item.url);
    setName(item.name);
    setrequiredPrice(item.requiredPrice);
    setGmail(item.gmail);
    setItemStatus('Save Changes');
  }

  const editItem = async() => {
    setItemStatus('Saving Changes...');
    token = localStorage.getItem('jwt');
    fetch(`${API}items/editItem`, {
      method: 'PUT',
      body: JSON.stringify({
        itemId,
        url,
        requiredPrice,
        gmail,
        name
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      if(!response.ok){
        throw new Error ('Cannot save the changes');
      }
      clearForm();
      setRandom(Math.random());
      return response.json()
    })
  }

  const deleteItem = async(id) => {
    const result = window.confirm("Please confirm to delete the item");
    if(!result){
      return;
    }

    fetch(`${API}items/deleteItem`, {
      method: 'DELETE',
      body: JSON.stringify({id}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      console.log(response)
      if(!response.ok){
        throw new Error('Unable to delete the item')
      }
      setRandom(Math.random());
      return response.json();
    }).then(result => {
      console.log(result)
    }).catch(e => {
      console.log(e)
    })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if(itemStatus === 'Add product'){
      addItem();
    }else {
      editItem();
    }
  }

  const handleProductAddition = () => {
    if(buttonState === 'Add product'){
      setFormIsOpen(true);
      setButtonState('Close');
    }else {
      setFormIsOpen(false);
      setButtonState('Add product');
      clearForm();
    }
  }

  const clearForm = () => {
    setItemStatus("Add product");
    setButtonState("Add product");
    setFormIsOpen(false);
    setUrl('');
    setName('');
    setrequiredPrice(0);
    setGmail('');
  }

  return ( 
    <div>
      <Navbar />
      {isPending && <div>Loading Products...</div>}
      {err && <div>Unable to fetch Products</div>}
      <div className="form-section">
        <h2 className="form-heading">Added Products <button className="button-1" id="open-form-button" onClick={handleProductAddition}>{buttonState}</button></h2>
        <div className={classNames('product-form', {'hidden-product-form': !formIsOpen})}>
          <form onSubmit = {handleFormSubmit}>
            <label htmlFor="url">Add Item</label>
            <input type="url" 
              placeholder="Enter product URL"    
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required 
            />
            <label htmlFor="name">Enter Product Name</label>
            <input type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            required 
            />
            <label htmlFor="price">Required Price</label>
            <input type="number" 
              value={requiredPrice}
              onChange={(e) => setrequiredPrice(e.target.value)}
              required 
            />
            <label htmlFor="email">Gmail ID to get notified</label>
            <input type="email"
              placeholder="Enter gmail id"
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
            required 
            />
            <button className="button-1" id="add-product-button">{itemStatus}</button>
          </form>
        </div>
      </div>
      {(!err) && 
        <table className="itemstable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Current Price</th>
              <th>Required Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
             Array.from(items).map((item, index) => {
                return(
                  <tr key={index}>
                    <td><a href={item.url} target="_blank">{item.name}</a></td>
                    <td>{item.currentPrice}</td>
                    <td>{item.requiredPrice}</td>
                    <td><button className="button-1" onClick={() =>handleEditItem(index)}>Edit</button></td>
                    <td><button className="button-1" onClick={() => deleteItem(item._id)}>Delete</button></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      }
    </div>
  );
}
 
export default Items;