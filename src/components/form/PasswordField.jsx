import {
  faChain,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import LabelWrapper from "../ui/LabelWrapper";
import StyledFontAwesomeIconHidePassword from "../ui/password/StyledFontAwesomeIconHidePassword";
import StyledFontAwesomeIconInvalidPassword from "../ui/password/StyledFontAwesomeIconInvalidPassword";
import Input from "../common/Input";
import ParagraphPassword from "../ui/password/ParagraphPassword";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PasswordField = ({ validPwd, pwd, setPwd, setPwdFocus, pwdFocus }) => {
  return (
    <>
      <LabelWrapper htmlFor="password">
        Password:
        <StyledFontAwesomeIconHidePassword
          icon={faChain}
          $validPwd={validPwd}
        />
        <StyledFontAwesomeIconInvalidPassword
          icon={faTimes}
          $validPwd={validPwd}
          $pwd={pwd}
        />
      </LabelWrapper>
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
      <ParagraphPassword id="pwdnote" $pwdFocus={pwdFocus} $validPwd={validPwd}>
        <FontAwesomeIcon icon={faInfoCircle} />
        8 to 24 characters.
        <br />
        Must include uppercase and lowercase letters, a number and a special
        character.
        <br />
        Allowed special characters: <span aria-label="exclamation mark">!</span>
        <span aria-label="at symbol">@</span>{" "}
        <span aria-label="hashtag">#</span>{" "}
        <span aria-label="dollar sign">$</span>{" "}
        <span aria-label="percent">%</span>
      </ParagraphPassword>
    </>
  );
};

export default PasswordField;
