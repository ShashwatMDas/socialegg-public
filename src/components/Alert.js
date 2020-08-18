import React, { Fragment } from "react";
import { useAlert } from "react-alert";

const Alert = () => {
  const alert = useAlert();

  return (
    <Fragment>
      <button
        onClick={() => {
          alert.show("Oh look, an alert!");
        }}
      >
        Show Alert
      </button>
      <button
      style={{fontFamily: 'Source Code Pro, monospace'}}
        onClick={() => {
          alert.error("Seems like there's a problem somewhere :(  Please contact one of us");
        }}
      >
        Oops, an error
      </button>
      <button
        onClick={() => {
          alert.success("It's ok now!");
        }}
      >
        Success!
      </button>
    </Fragment>
  );
};

export default Alert;
