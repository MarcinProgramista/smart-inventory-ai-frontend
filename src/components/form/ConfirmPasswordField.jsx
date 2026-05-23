import {
  faChain,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import LabelWrapper from "../ui/LabelWrapper";
import StyledFontAwesomeIconHidePasswordConfirm from "../ui/confirmPassword/StyledFontAwesomeIconHidePasswordConfirm";
import StyledFontAwesomeIconInvalidPasswordConfirm from "../ui/confirmPassword/StyledFontAwesomeIconInvalidPasswordConfirm";
import Input from "../common/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ValidationHint from "../ui/validation/ValidationHint";
const ConfirmPasswordField = ({
  validMatch,
  matchPwd,
  setMatchPwd,
  setMatchFocus,
  matchFocus,
}) => {
  return (
    <>
      <LabelWrapper htmlFor="confirm_pwd">
        Confirm Password:
        <StyledFontAwesomeIconHidePasswordConfirm
          icon={faChain}
          $validMatch={validMatch}
          $matchPwd={matchPwd}
        />
        <StyledFontAwesomeIconInvalidPasswordConfirm
          icon={faTimes}
          $validMatch={validMatch}
          $matchPwd={matchPwd}
        />
      </LabelWrapper>
      <Input
        type="password"
        id="confirm_pwd"
        onChange={(e) => setMatchPwd(e.target.value)}
        value={matchPwd}
        required
        aria-describedby="confirmnote"
        aria-invalid={validMatch ? "false" : "true"}
        onFocus={() => setMatchFocus(true)}
        onBlur={() => setMatchFocus(false)}
        placeholder="Put the same password like above.."
      />
      <ValidationHint
        id="confirmnote"
        $show={matchFocus && matchPwd && !validMatch}
      >
        <FontAwesomeIcon icon={faInfoCircle} />
        Must match the first password input field.
      </ValidationHint>
    </>
  );
};

export default ConfirmPasswordField;
