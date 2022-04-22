import React, { useState, useEffect } from 'react'
import {FiCheck} from 'react-icons/fi'
import "./Todo.css"

const Todo = () => {
    const [inputdata, setInputData] = useState("");
    const [items, setItems] = useState([]); 

  const [isEditItem, setIsEditItem] = useState("");
  const [selected, setSelected] = useState(false);
  const [backg, setBackg] = useState("");
  const [imp, setImp] = useState(false);
  const [toggleButton, setToggleButton] = useState(false);
    const addItems = async() => {
        if(!inputdata) //no input is given
        {
            alert("plz enter a value...!")
        }
        else if (inputdata && toggleButton) {
            // setItems(
            //   items.map((curElem) => {
            //     if (curElem.id === isEditItem) {
            //       return { ...curElem, name: inputdata };
            //     }
            //     return curElem;
            //   })
            // );
            const res = await fetch("https://keepify-keepify-backend.herokuapp.com/todo",{
                method:"PUT",
                headers:{
                  "Content-Type":"application/json"
                },
                body:JSON.stringify({

                  title:inputdata,
                  id:isEditItem

                })
              })

              const res2 = await res.json();
          console.log(res2);
      
            setInputData("");
            setIsEditItem(null);
            setToggleButton(false);
            
            getTodo();
          } 
        else
        {
            
            const res = await fetch("https://keepify-keepify-backend.herokuapp.com/todo",{
                method:"POST",
                headers:{
                  'x-access-token': localStorage.getItem('token'),
                  title:inputdata,
                  tag:["general"],
                  selected:selected,
                  important:imp
                }
                
              })

              const res2 = await res.json();
              console.log(res2);
               getTodo(); 
            setInputData("");
            setImp(false); 
            // const myNewInputData = {
            //     id : new Date().getTime().toString(),
            //     //This will give time as an ID to each inputed value and time is always different hence no 2 element will have same ID.
            //     //To delete an element we need an id
            //     name : inputdata,
            //     //This will store the value of data inserted
            // }
            // setItems([...items, myNewInputData]);
            // //baki ki item value as it is and new inputdata will be addes
            // setInputData("");
            //change back to original empty state after adding any value
        }
    }

    //edit the items
  const editItem = (index,title) => {
      console.log(index);
      console.log(title);
    // const item_todo_edited = items.find((curElem) => {
    //   return curElem.id === index;
    // });
    setInputData(title);
    setIsEditItem(index);

    setToggleButton(true);
  };
    //How tod delete items
    const deleteItems = (index) => {
    
    console.log(index);    
    fetch("https://keepify-keepify-backend.herokuapp.com/todo", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "id":index
    },
   
  }
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      // setNotes(json);
    });

    getTodo()
    
  }

    const removeAll = () => {
        fetch("https://keepify-keepify-backend.herokuapp.com/todoclearall", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email: "dadlani"
            })
          }
          )
            .then((response) => response.json())
            .then((json) => {
              console.log(json);
              // setNotes(json);
            });
        //   console.log(_id);
            getTodo()
    }

    const getTodo = async () =>{
      const req = await fetch('https://keepify-keepify-backend.herokuapp.com/todo', {
        method:"GET",
          headers: {
            'x-access-token': localStorage.getItem('token'),
          },
      })
  
      const data = await req.json()
      console.log(data);
      // console.log(data.data[0].todo.title);
      setItems(data.data);
        

    }
    //Adding Local Storage
    useEffect(()=> {        
        getTodo()
    },[])
    const updateCheck = async (index) =>{
      
      const req = await fetch('https://keepify-keepify-backend.herokuapp.com/todo/checkUpdate', {
        method:"PUT",
          headers: {
            'id':index
          },
      })

      getTodo()
    }
    return (
    <React.Fragment>
    <div className='main-div'>
        <div className='child-div'>
            <h1>📝</h1>
            <div className='addItems'>
                <input type="text" placeholder='✍ Add Item' className='form-control'
                value={inputdata}
                onChange={(event)=>setInputData(event.target.value)}
                />
               
                <i className="fa fa-plus add-btn" title="Add a task" onClick={() => {addItems();getTodo()}}></i>
                {/* {/taken from font awesome/} */}
            </div>
            {/* {/Show our items/} */}
            <div className='showItems'>
             
                { 
                  items.map((curElem,index)=> {
                    if(!curElem.todo.selected)
                    {
                      {curElem.todo.important? console.log(true):console.log("false") }
                    return (
                       
                        <div className='eachItem' style={{background:"#FFC812"}} key={index}>
                            <FiCheck style={{width:"3em",height:"3em",cursor:"pointer"}} onClick={(e) => { e.preventDefault(); updateCheck(curElem._id)}} />
                            <h3>{curElem.todo.title}</h3>
                        <div className="todo-btn">
                    
                    <i
                      className="far fa-edit add-btn" title='Edit task'
                      onClick={() => editItem(curElem._id,curElem.todo.title)}></i>
                    
                    {/* <i className="far fa-regular fa-star" title='Mark as important' 
                      ></i> */}
                    
                    <i
                      className="far fa-trash-alt add-btn" title='Delete task'
                      onClick={() => deleteItems(curElem._id)}></i>
                  </div>
                    </div>
                    );}
                })}
            
            </div>
            <div className="showItems">
                <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
                    {/*data-sm-link-text => to change the text when hovered */}
                    <span>Check List</span>
                </button>
            </div>
            <div className='showItems'>
             <p className='txt' style={{fontSize:"3em",fontWeight:"bolder"}}> Completed tasks</p>
             {items.map((curElem,index)=> {
               if(curElem.todo.selected)
               {
                 return (
                    
                     <div className='eachItem' key={index}>
                         {/* <input type={"checkbox"} style={{width:"1.15em",height:"1.15em"}} selected/> */}
                         <h3 style={{textDecoration:"line-through"}}>{curElem.todo.title}</h3>
                     <div className="todo-btn">
                 {/* <i
                   className="far fa-edit add-btn"
                   onClick={() => editItem(curElem._id,curElem.todo.title)}></i> */}
                 <i
                   className="far fa-trash-alt add-btn"
                   onClick={() => deleteItems(curElem._id)}></i>
               </div>
                 </div>
                 );
                  }

             })}
         
         </div>

        </div>


    </div>
    </React.Fragment>
  )
  
}
export default Todo