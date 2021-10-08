import React, { useState, useEffect } from "react";
import { Button, Card, Grid, IconButton, TextField, Tooltip } from "@mui/material";

// Icons
import { HighlightOff, DeleteOutlineOutlined } from "@mui/icons-material";

// Constants
import { ALERT_EMPTY_TODO, ALERT_DELETE_TODO, ALERT_DELETE_ALL_TODO } from "../../Constants";

import InputAddItem from "../InputAddItem";

// Custom style
import "./index.css";

const Todo = () => {
  const [searchData, setSearchData] = useState("");
  const [items, setItems] = useState([]);

  // to get the data from LS
  const getLocalItems = () => {
    let list = localStorage.getItem("lists");

    if (list) {
      return JSON.parse(localStorage.getItem("lists"));
    } else {
      return [];
    }
  };

  const handleOnChecked = (value) => {
    const newTodoList = items
      .map((elem) => {
        if (elem.id === value) return { ...elem, checked: !elem.checked };
        return elem;
      })
      .sort(function (a, b) {
        return a.checked - b.checked;
      });
    localStorage.setItem("lists", JSON.stringify(newTodoList));
    setItems(newTodoList);
  };
  const handleOnTextSearch = (targetValue) => {
    searchItem(targetValue);
    setSearchData(targetValue);
  };

  useEffect(() => {
    setItems(getLocalItems());
  }, []);

  const renderTodoList = () => {
    console.log("rendering");
    return getLocalItems().length > 0 ? (
      <Card className="card-full-width todo-list-container">
        <TextField fullWidth label="Search Items..." variant="standard" value={searchData} onChange={(e) => handleOnTextSearch(e.target.value)} />

        {items.map((elem, id) => {
          return (
            <div key={id} className="todo-item">
              <Tooltip title={elem.item}>
                <span style={elem.checked ? { textDecoration: "line-through" } : null} className="todo-item-text">
                  <input
                    type="checkbox"
                    checked={elem.checked}
                    onChange={() => {
                      handleOnChecked(elem.id);
                    }}
                  />{" "}
                  {elem.item}
                </span>
              </Tooltip>
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
  const addItem = (inputData) => {
    const trimValue = inputData.trim();
    if (trimValue === "") {
      alert(ALERT_EMPTY_TODO);
    } else {
      const newInputValue = trimValue.charAt(0).toUpperCase() + trimValue.slice(1);
      const newInputValueArray = { id: Math.random(), item: newInputValue, checked: false };
      setItems([newInputValueArray, ...items]);
      localStorage.setItem("lists", JSON.stringify([newInputValueArray, ...items]));
    }
  };

  // delete the items
  const deleteItem = (index) => {
    // It will ask user to confirm delete action
    if (window.confirm(ALERT_DELETE_TODO)) {
      const updatedItems = items.filter((elem, ind) => {
        return index !== ind;
      });

      localStorage.setItem("lists", JSON.stringify(updatedItems));
      setItems(updatedItems);
    }
  };

  // remove all items
  const removeAll = () => {
    if (window.confirm(ALERT_DELETE_ALL_TODO)) {
      setItems([]);
      localStorage.setItem("lists", JSON.stringify([]));
    }
  };

  // search items
  const searchItem = (value) => {
    if (value === "") {
      setItems(getLocalItems());
      return;
    }
    const searchItems = items.filter((elem, ind) => {
      return elem.item.toLowerCase().includes(value.trim());
    });

    setItems(searchItems);
  };

  return (
    <Grid item={true} id="main-container" xs={10} sm={6} lg={4} style={{ margin: "0 auto" }}>
      <InputAddItem addItem={addItem} />
      {renderTodoList()}
      {renderTodoListFooter()}
    </Grid>
  );
};

export default Todo;
