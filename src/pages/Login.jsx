/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import NeonUserIcon from "../components/icons/NeonUserIcon";
import ButtonRow from "../components/layout/ButtonRow";
import Logo from "../components/ui/Logo";
import NeonCard from "../components/ui/NeonCard";
import ParagraphError from "../components/ui/typography/ParagraphError";
import Title from "../components/ui/typography/Title";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  return (
    <>
      <NeonCard>
        <ButtonRow>
          <NeonUserIcon />
          <Logo>SmartInventoryAI</Logo>
        </ButtonRow>
        <ParagraphError ref={errRef} $errMsg={errMsg} aria-live="assertive">
          {errMsg}
        </ParagraphError>
        <Title>Log in</Title>
      </NeonCard>
    </>
  );
};
export default Login;
