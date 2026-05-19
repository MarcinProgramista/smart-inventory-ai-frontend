/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import NeonCard from "../components/ui/NeonCard";
import Title from "../components/ui/typography/Title";
import StyledLink from "../components/ui/buttons/StyledLink";
import Button from "../components/ui/buttons/Button";
import ButtonRow from "../components/layout/ButtonRow";
import NeonUserIcon from "../components/icons/NeonUserIcon";
import Logo from "../components/ui/Logo";
import ParagraphError from "../components/ui/typography/ParagraphError";

export default function Register() {
  const userRef = useRef();
  const errRef = useRef();
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");

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
          <form onSubmit={handleSubmit}></form>
        </NeonCard>
      )}
    </>
  );
}
