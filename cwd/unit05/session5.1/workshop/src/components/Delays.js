import React from "react";
import {Route, NavLink} from "react-router-dom"

import DataAPI from "../api/DataAPI";

export const Delays = () => (
  <div className="page columns">
    <DelaysList />

    <div className="content">
      {/* {} */}
      <Route path="delays/date/:dateId" component={DelaysOnDate}/>
    </div>
  </div>
);

const DelaysOnDate = props => {
  const dateId = props.match.params.dateId;
  const delays = DataAPI.getDelaysOnDate(dateId);

  return <div className="content">
    {delays.length > 0 ? (
      delays.map(({id, from, to, minutesHuman }) => (
        <p key={id}>
          from {from} to {to} - {minutesHuman} delay
        </p>
      ))
    ) : (
      <p>No delays for this date.</p>
    )}
  </div>
}

const DelaysList = () => {
  const delayDates = DataAPI.getDistinctDates();

  return (
    <div className="sidebar">
      {delayDates.map(({ date, dateHuman }) => (
        <NavLink key={date} to={`/delays/date/${date}`}>
          {dateHuman}
          </NavLink>
      ))}
    </div>
  );
};
