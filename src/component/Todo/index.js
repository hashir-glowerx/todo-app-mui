import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Grid,
  IconButton,
  TextField,
  Typography,
  Tooltip,
} from "@mui/material";

// Icons
import { HighlightOff, DeleteOutlineOutlined } from "@mui/icons-material";

// Constants
import {
  ALERT_EMPTY_TODO,
  ALERT_DELET_TODO,
  ALERT_DELET_ALL_TODO,
} from "../../Constants";

// Custom style
import "./index.css";

const Todo = () => {

  const [inputData, setInputData] = useState("");
  const [searchData, setSearchData] = useState("");
  const [items, setItems] = useState([]);

  const handleOnTextKeyDown = (e) => {
    if (e.keyCode === 13) {
      addItem();
    }
  };
  // to get the data from LS
  const getLocalItmes = () => {
    let list = localStorage.getItem("lists");

    if (list) {
      return JSON.parse(localStorage.getItem("lists"));
    } else {
      return [];
    }
  };

  const handleOnTextChange = (targetValue) => {
    setInputData(targetValue);
  };

  const handleOnChecked = (value) => {
    const newTodoList = items.map((elem) => {
      if (elem.id === value) return { ...elem, checked: !elem.checked };
      return elem;
    }).sort(function(a, b) {
      return a.checked -b.checked 
    });
    localStorage.setItem("lists", JSON.stringify(newTodoList));
    setItems(newTodoList);
  };
  const handleOnTextSearch = (targetValue) => {
    searchItem(targetValue);
    setSearchData(targetValue);
  };

  useEffect(() => {
    setItems(getLocalItmes());
  }, []);

  const renderTodoList = () => {
    return getLocalItmes().length > 0 ? (
      <Card className="card-full-width todo-list-container">
        <TextField
          fullWidth
          label="Search Items..."
          variant="standard"
          value={searchData}
          onChange={(e) => handleOnTextSearch(e.target.value)}
        />

        {items.map((elem, id) => {
          return (
            <>
              <div key={id} className="todo-item">
              
                <Tooltip title={elem.item}>
                  <span
                    style={
                      elem.checked ? { textDecoration: "line-through" } : null
                    }
                    className="todo-item-text"
                  >
                    <input
                  type="checkbox"
                  checked={elem.checked}
                  onChange={() => {
                    handleOnChecked(elem.id);
                  }}
                />
                    {" "}
                    {elem.item}
                  </span>
                </Tooltip>
                <IconButton
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => deleteItem(id)}
                >
                  <DeleteOutlineOutlined fontSize="small" />
                </IconButton>
              </div>
            </>
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
        <Button
          size="small"
          variant="outlined"
          color="error"
          onClick={() => removeAll()}
        >
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
      const newInputValue =
      trimValue.charAt(0).toUpperCase() + trimValue.slice(1);
      const newInputValueArray = { id:Math.random(),item: newInputValue, checked: false };
      setItems([newInputValueArray,...items]);
      localStorage.setItem(
        "lists",
        JSON.stringify([newInputValueArray,...items]),
      );
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

      localStorage.setItem("lists", JSON.stringify(updateditems));
      setItems(updateditems);
    }
  };

  // remove all items
  const removeAll = () => {
    if (window.confirm(ALERT_DELET_ALL_TODO)) {
      setItems([]);
      localStorage.setItem("lists", JSON.stringify([]));
    }
  };

  // search items
  const searchItem = (value) => {
    if (value === "") {
      setItems(getLocalItmes());
      return;
    }
    const searchItems = items.filter((elem, ind) => {
      return elem.item.toLowerCase().includes(value.trim());
    });

    setItems(searchItems);
  };

  return (
    <Grid
      item={true}
      id="main-container"
      xs={10}
      sm={6}
      lg={4}
      style={{ margin: "0 auto" }}
    >
      <Card className="card-full-width">
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{ textAlign: "center" }}
        >
          Your daily todo's
        </Typography>
        <Typography component="div">
          <TextField
            fullWidth
            label="✍ Add Items..."
            variant="standard"
            value={inputData}
            onKeyDown={handleOnTextKeyDown}
            onChange={(e) => handleOnTextChange(e.target.value)}
          />
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
