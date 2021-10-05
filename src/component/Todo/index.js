import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import Grid from "@mui/material/Grid";
import { ALERT_EMPTY_TODO, ALERT_DELET_TODO } from "../../Constants";
import "./index.css";

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState([]);

  const handleChange = (e) => {
    if (e.keyCode === 13) {
      addItem();
    }
  };

  const addItem = () => {
    if (!inputData) {
      alert(ALERT_EMPTY_TODO);
    } else {
      setItems([...items, inputData]);
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

  // remove all
  const removeAll = () => {
    setItems([]);
  };
  return (
    <>
      <Grid item xs={12} md={6} className="main-container" style={{ margin: "0 auto" }}>
        <Card
          className="main-container"
          sx={{ maxWidth: 345 }}
          style={{
            margin: "0 auto",
            borderRadius: "20px",
            backgroundColor: "#F8F8FF",
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" style={{ textAlign: "center" }}>
              Todo App
            </Typography>
            <Typography variant="h6" component="div">
              <TextField id="standard-basic" label="✍ Add Items..." variant="standard" value={inputData} onKeyDown={handleChange} onChange={(e) => setInputData(e.target.value)} />
              <Button style={{ marginTop: "15px" }} size="medium" variant="contained" color="primary" onClick={() => addItem()}>
                <AddIcon />
              </Button>
            </Typography>
            <Typography>
              {items.map((elem, id) => {
                return (
                  <div key={id}>
                    <h3 style={{ display: "flex", justifyContent: "space-between" }}>
                      {elem}
                      <Button size="small" variant="contained" color="error" onClick={() => deleteItem(id)}>
                        <DeleteIcon />
                      </Button>
                    </h3>
                  </div>
                );
              })}
            </Typography>
          </CardContent>

          <CardActions>
            <Button style={{ marginLeft: "25%" }} size="small" variant="contained" color="success" onClick={() => removeAll()}>
              CHECK LIST
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default Todo;
