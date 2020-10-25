import React, { useState } from "react";
import { withFirebase } from "../Firebase";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

//Set styles for the forms
const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function AddDream(props) {
  const classes = useStyles();

  const {
    authUser,
    firebase,
    selectedDay,
    setOpenSnackbar,
    setSnackbarMsg,
  } = props;

  const uid = authUser.uid;

  // Set query date for updating database
  selectedDay.year = new Date().getFullYear();
  let queryDate = `${selectedDay.day}-${selectedDay.month}-${selectedDay.year}`;

  // Set default dream object
  const defaultDream = {
    name: "",
    description: "",
    feelings: "",
    date: queryDate,
  };
  
  // Hook to set Dream
  const [dream, setDream] = useState(defaultDream);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDream({
      ...dream,
      date: queryDate,
      [name]: value,
    });
  };

  const isValid = dream.name === "";

  // Add the dream to firebase via the API made in this app
  const handleSubmit = () => {
    if (authUser) {
      firebase.addDream(uid, dream);
      setDream(defaultDream);
      // Show notification
      setOpenSnackbar(true);
      setSnackbarMsg("Added dream");
      setTimeout(() => {
        setOpenSnackbar(false);
      }, 3000);
    }
  };

  return (
    <form noValidate onSubmit={(e) => e.preventDefault()}>
      <FormControl className={classes.formControl}>
        <TextField
          style={{ marginTop: "5px" }}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Dream name"
          value={dream.name}
          name="name"
          onChange={handleChange}
        />
        <TextField
          style={{ marginTop: "5px" }}
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={8}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          style={{ marginTop: "5px" }}
          id="outlined-multiline-static"
          label="Feelings"
          multiline
          rows={2}
          variant="outlined"
          onChange={handleChange}
        />
      </FormControl>
      <Button
        style={{ marginTop: "15px" }}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={isValid}
      >
        Add dream
      </Button>
    </form>
  );
}

export default withFirebase(AddDream);
