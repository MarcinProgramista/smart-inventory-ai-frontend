import { faChain, faTimes } from "@fortawesome/free-solid-svg-icons";
import LabelWrapper from "../ui/LabelWrapper";
import StyledFontAwesomeIconHidePassword from "../ui/password/StyledFontAwesomeIconHidePassword";
import StyledFontAwesomeIconInvalidPassword from "../ui/password/StyledFontAwesomeIconInvalidPassword";
import Input from "../common/Input";

const PasswordField = ({ validPwd, pwd, setPwd, setPwdFocus, pwdFocus }) => {
  return (
    <LabelWrapper htmlFor="password">
      Password:
      <StyledFontAwesomeIconHidePassword icon={faChain} $validPwd={validPwd} />
      <StyledFontAwesomeIconInvalidPassword
        icon={faTimes}
        $validPwd={validPwd}
        $pwd={pwd}
      />
      <Input
        type="password"
        id="password"
        onChange={(e) => setPwd(e.target.value)}
        value={pwd}
        required
        aria-invalid={validPwd ? "false" : "true"}
        aria-describedby="pwdnote"
        onFocus={() => setPwdFocus(true)}
        onBlur={() => setPwdFocus(false)}
        placeholder="Put password .."
      />
    </LabelWrapper>
  );
};

export default PasswordField;
