import LabelWrapper from "../ui/LabelWrapper";
const ConfirmPasswordField = ({
  validMatch,
  matchPwd,
  setMatchPwd,
  setMatchFocus,
  matchFocus,
}) => {
  return (
    <>
      <LabelWrapper htmlFor="confirm_pwd">Confirm Password:</LabelWrapper>
    </>
  );
};

export default ConfirmPasswordField;
