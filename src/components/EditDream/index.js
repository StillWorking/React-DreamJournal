import React, { useState } from "react";
import { withFirebase } from "../Firebase";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function EditDream(props) {
  const classes = useStyles();

  const {
    authUser,
    firebase,
    dream,
    dreamKey,
    setEditing,
    setOpenSnackbar,
    setSnackbarMsg,
  } = props;
  const uid = authUser.uid;

  // Set default dream object
  const defaultDream = {
    name: dream.name,
    description: dream.description,
    feelings: dream.feelings,
    date: dream.date,
  };

  const [newDream, setNewDream] = useState(defaultDream);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDream({
      ...newDream,
      [name]: value,
    });
  };

  const isValid = newDream.name === "";

  // Add the dream to firebase via the API made in this app
  const handleSubmit = (action) => {
    if (authUser) {
      firebase.updateDream(uid, newDream, dreamKey);
      setEditing(false);
      // Show alert and hide after 3sec
      setOpenSnackbar(true);
      setSnackbarMsg("Updated dream");
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
          value={newDream.name}
          label="Dream name"
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
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => handleSubmit("add")}
        disabled={isValid}
      >
        Save dream
      </Button>
    </form>
  );
}

export default withFirebase(EditDream);
