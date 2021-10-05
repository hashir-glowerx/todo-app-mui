import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Grid from "@mui/material/Grid";
import "./index.css";

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState([]);

  const addItem = () => {
    if (!inputData) {
      alert("plzz fill data");
    } else {
      setItems([...items, inputData]);
      setInputData("");
    }
  };

  // delete the items
  const deleteItem = (index) => {
    const updateditems = items.filter((elem, ind) => {
      return index !== ind;
    });

    setItems(updateditems);
  };

  // remove all
  const removeAll = () => {
    setItems([]);
  };
  return (
    <>
      <Grid item xs={12} md={6} style={{ margin: "0 auto" }}>
        <Card
          sx={{ maxWidth: 345 }}
          style={{
            margin: "0 auto",
            borderRadius: "10px",
            backgroundColor: "#F8F8FF",
          }}
        >
          <CardActionArea>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                style={{ textAlign: "center" }}
              >
                Todo App
              </Typography>
              <Typography variant="h6" component="div">
                <TextField
                  id="standard-basic"
                  label="✍ Add Items..."
                  variant="standard"
                  value={inputData}
                  onChange={(e) => setInputData(e.target.value)}
                />
                <Button
                  style={{ marginTop: "15px" }}
                  size="medium"
                  variant="contained"
                  color="primary"
                  onClick={() => addItem()}
                >
                  <AddIcon />
                </Button>
              </Typography>
              <Typography  variant="h6" component="div" style={{justifyContent:'space-between'}}>
                {items.map((elem, id) => {
                  return (
                    <div key={id}>
                      <h4>
                        {elem}
                        <Button
                          size="small"
                          variant="contained"
                          color="error"
                          onClick={() => deleteItem(id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </h4>
                    </div>
                  );
                })}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              style={{ marginLeft: "25%" }}
              size="small"
              variant="contained"
              color="success"
              onClick={() => removeAll()}
            >
              CHECK LIST
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default Todo;
