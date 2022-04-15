import React, { useState } from "react";
import './Note.css'
import { FaRegTrashAlt } from 'react-icons/fa'
import {FaRegEdit} from 'react-icons/fa'
import UpdateNote from "../UpdateNote/UpdateNote";



function deleteNote(_id) {

  
  fetch("http://localhost:3001/notes", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: _id
    })
  }
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      // setNotes(json);
    });
  console.log(_id);
}
function updateNote(title,content,_id){

  fetch("http://localhost:3001/notes", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: _id,
      title:title,
      content:content
    })
  }
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      // setNotes(json);
    });
  console.log(_id);

    // <UpdateNote id = {_id} title = {title} content = {content} />    
  
}

function Note({ title, content, id,func,color }) {
  
  return (

    <div className="note" style={{backgroundColor:color}} >
     <input type={"text"} className='notetitle' style={{fontWeight:"bolder",backgroundColor:color}}  defaultValue={title} onChange={(event) => updateNote(event.target.value,content ,id)} />
    <hr />
     <textarea
        className="noteContent"
        style={{backgroundColor:color}}
        defaultValue={content}
        onChange={(event) => updateNote(title,event.target.value,id)}
      />
     
      <div className="extraItem">
        <FaRegTrashAlt title="Delete" onClick={() => {deleteNote(id);func()}} className="deleteNote" />
        {/* <FaRegEdit className="updateNote" title="Update" onClick={() => updateNote(id,title,content)}  /> */}
      </div>
    </div>
  );
}

export default Note;