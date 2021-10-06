import React, { useState } from "react";
import { Button, Card, Grid, IconButton, TextField, Typography } from "@mui/material";

// Icons
import { HighlightOff, DeleteOutlineOutlined } from "@mui/icons-material";

// Constants
import { ALERT_EMPTY_TODO, ALERT_DELET_TODO, ALERT_DELET_ALL_TODO } from "../../Constants";

// Custom style
import "./index.css";

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState([]);

  const handleOnTextKeyDown = (e) => {
    if (e.keyCode === 13) {
      addItem();
    }
  };

  const handleOnTextChange = (targetValue) => {
    setInputData(targetValue);
  };

  const renderTodoList = () => {
    return items.length > 0 ? (
      <Card className="card-full-width todo-list-container">
        {items.map((elem, id) => {
          return (
            <div key={id} className="todo-item">
              <span className="todo-item-text"> {elem}</span>
              <IconButton size="small" variant="outlined" color="error" onClick={() => deleteItem(id)}>
                <DeleteOutlineOutlined fontSize="small" />
              </IconButton>
            </div>
          );
        })}
      </Card>
    ) : (
      <></>
    );
  };

  const renderTodoListFooter = () => {
    return items.length > 0 ? (
      <Card className="card-full-width" style={{ textAlign: "center" }}>
        <Button size="small" variant="outlined" color="error" onClick={() => removeAll()}>
          <HighlightOff fontSize="small" /> &nbsp; RESET LIST
        </Button>
      </Card>
    ) : (
      <></>
    );
  };

  // Capitalize first letter and add new input value in todo list
  const addItem = () => {
    const trimValue = inputData.trim();
    if (trimValue === "") {
      alert(ALERT_EMPTY_TODO);
    } else {
      const newInputValue = trimValue.charAt(0).toUpperCase() + trimValue.slice(1);
      setItems([...items, newInputValue]);
      setInputData("");
    }
  };

  // delete the items
  const deleteItem = (index) => {
    // It will ask user to confirm delete action
    if (window.confirm(ALERT_DELET_TODO)) {
      const updateditems = items.filter((elem, ind) => {
        return index !== ind;
      });

      setItems(updateditems);
    }
  };

  // remove all items
  const removeAll = () => {
    if (window.confirm(ALERT_DELET_ALL_TODO)) setItems([]);
  };

  return (
    <Grid item={true} id="main-container" container xs={10} sm={6} lg={4} style={{ margin: "0 auto" }}>
      <Card className="card-full-width">
        <Typography gutterBottom variant="h5" component="div" style={{ textAlign: "center" }}>
          Your daily todo's
        </Typography>
        <Typography component="div">
          <TextField fullWidth label="✍ Add Items..." variant="standard" value={inputData} onKeyDown={handleOnTextKeyDown} onChange={(e) => handleOnTextChange(e.target.value)} />
          <small>
            Press <em>Enter</em> to add your todo to list.
          </small>
        </Typography>
      </Card>
      {renderTodoList()}
      {renderTodoListFooter()}
    </Grid>
  );
};

export default Todo;
