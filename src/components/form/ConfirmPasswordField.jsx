import { faCheck } from "@fortawesome/free-solid-svg-icons";
import LabelWrapper from "../ui/LabelWrapper";
import StyledFontAwesomeIconHidePasswordConfirm from "../ui/confirmPassword/StyledFontAwesomeIconHidePasswordConfirm";
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
          icon={faCheck}
          $validMatch={validMatch}
          $matchPwd={matchPwd}
        />
      </LabelWrapper>
    </>
  );
};

export default ConfirmPasswordField;
