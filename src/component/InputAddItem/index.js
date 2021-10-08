import React, { useState } from "react";
import { Card, TextField, Typography } from "@mui/material";

const InputAddItem = (props) => {
  const [inputData, setInputData] = useState("");

  const handleOnTextChange = (targetValue) => {
    setInputData(targetValue);
  };

  const handleOnTextKeyDown = (e) => {
    if (e.keyCode === 13) {
      props.addItem(inputData);
      setInputData("");
    }
  };

  return (
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
  );
};

export default InputAddItem;
