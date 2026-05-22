/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import NeonUserIcon from "../components/icons/NeonUserIcon";
import ButtonRow from "../components/layout/ButtonRow";
import Logo from "../components/ui/Logo";
import NeonCard from "../components/ui/NeonCard";
import ParagraphError from "../components/ui/typography/ParagraphError";
import Title from "../components/ui/typography/Title";
import LabelWrapper from "../components/ui/LabelWrapper";
import Input from "../components/common/Input";
import SmallText from "../components/ui/typography/SmallText";
import FeatureList from "../components/ui/lists/FeatureList";
import RegisterButton from "../components/ui/buttons/RegisterButton";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [id, setId] = useState("");
  const [email, setEmail] = useState("marcin@gmail.com");
  const [pwd, setPwd] = useState("123456Mm!");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
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
        <form onSubmit={handleSubmit}>
          <LabelWrapper htmlFor="email">Email:</LabelWrapper>
          <Input
            type="email"
            id="email"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            placeholder="name@example.com"
          />
          <LabelWrapper htmlFor="password">Password:</LabelWrapper>
          <Input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            placeholder="put password"
          />
          <RegisterButton>Log in</RegisterButton>
        </form>
        <SmallText>
          Need account?<a href="/register"> Register</a>
        </SmallText>
        <FeatureList>
          <li>✔ Track inventory in real time</li>
          <li>✔ Predict shortages with AI</li>
          <li>✔ Generate smart reports</li>
        </FeatureList>
      </NeonCard>
    </>
  );
};
export default Login;
