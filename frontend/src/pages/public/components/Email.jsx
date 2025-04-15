import React from "react";

function Email(props) {
  return (
    <input {...props} type="email" name="email" placeholder="Enter you email" />
  );
}

export default Email;
