import "./../styles/notesHome.css";
import ListItem from "./ListItem";
import React from "react";

const NotesHome = () => {
    return (
      <div>
        <h1>List Title</h1>
        <div className="list">
          <ListItem />
          <ListItem />
          <button type="button" className="addItem">+</button>
        </div>
      </div>
    );
  };

  export default NotesHome;
