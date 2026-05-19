/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import NeonCard from "../components/ui/NeonCard";
import Title from "../components/ui/typography/Title";
import StyledLink from "../components/ui/buttons/StyledLink";
import Button from "../components/ui/buttons/Button";
import ButtonRow from "../components/layout/ButtonRow";
import NeonUserIcon from "../components/icons/NeonUserIcon";
import Logo from "../components/ui/Logo";
import ParagraphError from "../components/ui/typography/ParagraphError";
import UsernameField from "../components/form/UsernameField";
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export default function Register() {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <>
      {success ? (
        <NeonCard>
          <Title>Success!</Title>
          <StyledLink to="/login">
            <Button>Log In</Button>
          </StyledLink>
        </NeonCard>
      ) : (
        <NeonCard>
          <ButtonRow>
            <NeonUserIcon />
            <Logo>SmartInventoryAI</Logo>
          </ButtonRow>
          <ParagraphError ref={errRef} $errMsg={errMsg} aria-live="assertive">
            {errMsg}
          </ParagraphError>
          <Title>Create your account</Title>
          <form onSubmit={handleSubmit}>
            <UsernameField
              user={user}
              setUser={setUser}
              validName={validName}
              userFocus={userFocus}
              setUserFocus={setUserFocus}
              userRef={userRef}
            />
          </form>
        </NeonCard>
      )}
    </>
  );
}
