import React from "react";
import { withFirebase } from "../Firebase";
import loader from "./loader.gif";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

function DreamList(props) {
  const {
    loading,
    dreams,
    editDream,
    setOpenSnackbar,
    setSnackbarMsg,
    setEditing,
  } = props;

  const deleteDream = (i) => {
    // Get key of dream in firebase
    const dreamKey = Object.keys(dreams)[i];
    // Connect to our firebase API
    const emptyDream = {
      date: null,
      description: "",
      feelings: "",
      name: "",
    };

    props.firebase.updateDream(props.authUser.uid, emptyDream, dreamKey);

    // Show notification
    setOpenSnackbar(true);
    setSnackbarMsg("Deleted dream");
    setTimeout(() => {
      setOpenSnackbar(false);
    }, 3000);

    // stop editing
    setEditing(false);
  };

  return (
    <>
      {loading === true ? <img src={loader} alt={loader}></img> : ""}

      {dreams === "not set" || dreams === null ? (
        <p>No dreams added yet.</p>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Feelings</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.values(dreams).map((dream, i) => {
                let { name, description, feelings } = dream;
                return (
                  <TableRow key={i}>
                    <TableCell>{name}</TableCell>
                    <TableCell>{description}</TableCell>
                    <TableCell>{feelings}</TableCell>
                    <TableCell>
                      <DeleteIcon onClick={(e) => deleteDream(i)} />
                      <EditIcon
                        onClick={(e) => editDream(dream, i)}
                        style={{ marginLeft: "20px" }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
export default withFirebase(DreamList);
