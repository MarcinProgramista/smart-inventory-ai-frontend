/* eslint-disable no-unused-vars */
import { useState } from "react";

export default function Register() {
  const [success, setSuccess] = useState(false);

  return (
    <>
      {success ? (
        <>
          <h1>success</h1>
        </>
      ) : (
        <>
          <h1>nor</h1>
        </>
      )}
    </>
  );
}
