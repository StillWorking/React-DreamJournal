import React, { useState, useEffect } from "react";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import CalendarBody from "./calendar-body";
import CalendarHead from "./calendar-head";
import AddDream from "../AddDream/AddDream";
import EditDream from "../EditDream";
import DreamList from "../DreamList";

function Calendar(props) {
  const { firebase, authUser } = props;

  let defaultSelectedDay = {
    day: moment().format("D"),
    month: moment().month(),
  };

  /*** HOOKS ***/
  const [dateObject, setdateObject] = useState(moment());
  const [showMonthTable, setShowMonthTable] = useState(false);
  const [selectedDay, setSelected] = useState(defaultSelectedDay);
  const [dreams, setDreams] = useState(true);
  const [loading, setLoading] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState(null);

  /*** CALENDAR HEAD ***/
  const allMonths = moment.months();
  const currentMonth = () => dateObject.format("MMMM");
  const currentYear = () => dateObject.format("YYYY");

  const setMonth = (month) => {
    let monthNo = allMonths.indexOf(month);
    let newDateObject = Object.assign({}, dateObject);
    newDateObject = moment(dateObject).set("month", monthNo);
    setdateObject(newDateObject);
    setShowMonthTable(false);
  };

  const toggleMonthSelect = () => setShowMonthTable(!showMonthTable);

  /*** CALENDAR BODY ***/
  const setSelectedDay = (day) => {
    setSelected({
      day,
      month: currentMonthNum(),
    });
  };

  const currentMonthNum = () => dateObject.month();
  const daysInMonth = () => dateObject.daysInMonth();
  const currentDay = () => dateObject.format("D");
  const actualMonth = () => moment().format("MMMM");

  const firstDayOfMonth = () => moment(dateObject).startOf("month").format("d");

  const retrieveData = () => {
    let queryDate = `${selectedDay.day}-${selectedDay.month}-${selectedDay.year}`;

    let ref = firebase.db.ref().child(`users/${authUser.uid}/dreams`);
    ref
      .orderByChild("date")
      .equalTo(queryDate)
      .on("value", (snapshot) => {
        let data = snapshot.val();
        setDreams(data);
        setLoading(false);
        // setEditing(false); Add later
      });
  };
  // eslint-disable-next-line 
  useEffect(() => retrieveData(), [selectedDay]);

  /*** EDIT DREAM ***/
  const [editing, setEditing] = useState(false);
  const [dream, setDream] = useState(null);
  const [dreamKey, setDreamKey] = useState(null);

  const editDream = (dream, i) => {
    setDreamKey(Object.keys(dreams)[i]);
    setEditing(true);
    setDream(dream);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs='auto' md='auto' lg='auto'>
        <CalendarHead
          allMonths={allMonths}
          currentMonth={currentMonth}
          currentYear={currentYear}
          setMonth={setMonth}
          showMonthTable={showMonthTable}
          toggleMonthSelect={toggleMonthSelect}
        />
        <CalendarBody
          firstDayOfMonth={firstDayOfMonth}
          daysInMonth={daysInMonth}
          currentDay={currentDay}
          currentMonth={currentMonth}
          currentMonthNum={currentMonthNum}
          actualMonth={actualMonth}
          setSelectedDay={setSelectedDay}
          selectedDay={selectedDay}
          weekdays={moment.weekdays()}
        />
      </Grid>
      <Grid item xs={8} md={3} lg={2}>
        <Paper style={{
          width:"400%"
        }} className="paper">
          {editing ? (
            <>
              <h3>
                Edit dream on {selectedDay.day}-{selectedDay.month + 1}
              </h3>
              <EditDream
                dream={dream}
                dreamKey={dreamKey}
                selectedDay={selectedDay}
                authUser={props.authUser}
                setEditing={setEditing}
                setOpenSnackbar={setOpenSnackbar}
                setSnackbarMsg={setSnackbarMsg}
              />
            </>
          ) : (
            <>
              <h3>
                Add dream on {selectedDay.month + 1}-{selectedDay.day}
              </h3>
              <AddDream
                selectedDay={selectedDay}
                authUser={props.authUser}
                setOpenSnackbar={setOpenSnackbar}
                setSnackbarMsg={setSnackbarMsg}
              />
            </>
          )}
        </Paper>
      </Grid>
      <Grid item xs={16} md={8}>
        <Paper className="paper">
          <h3>
            Dreams on {selectedDay.month + 1}-{selectedDay.day}
          </h3>
          <DreamList
            loading={loading}
            dreams={dreams}
            authUser={props.authUser}
            setOpenSnackbar={setOpenSnackbar}
            setSnackbarMsg={setSnackbarMsg}
            editDream={editDream}
            setEditing={setEditing}
          />
        </Paper>
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={openSnackbar}
        message={snackbarMsg}
        autoHideDuration={6000}
      />
    </Grid>
  );
}
export default Calendar;
