/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import API_CONFIG from "../config/api";
import axios from "axios";

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();
  const [id, setId] = useState("");
  const [email, setEmail] = useState("marcin@gmail.com");
  const [pwd, setPwd] = useState("123456Mm!");
  const [errMsg, setErrMsg] = useState("");

  const controller = new AbortController();

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.LOGIN}`,
        JSON.stringify({
          email: email,
          password: pwd,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          signal: controller.signal,
        },
      );
      // console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;

      // const roles = response?.data?.roles;
      //console.log(roles);
      setId(JSON.stringify(response?.data.user_id));
      const authData = {
        id: response?.data.user_id,
        name: response.data.name,
        email,
        accessToken,
      };

      setAuth(authData);
      localStorage.setItem("auth", JSON.stringify(authData));

      setEmail("");
      setPwd("");
      controller.abort();
      navigate("/home");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        console.log(err);

        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
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
