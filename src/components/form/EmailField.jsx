import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import StyledFontAwesomeIconHideEmail from "../ui/email/StyledFontAwesomeIconHideEmail";
import LabelWrapper from "../ui/LabelWrapper";
import StyledFontAwesomeIconInvalidEmail from "../ui/email/StyledFontAwesomeIconInvalidEmail";
export default function EmailField({
  email,
  setEmail,
  validEmail,
  setEmailFocus,
  emailFocus,
  emailRef,
}) {
  return (
    <>
      <LabelWrapper htmlFor="email">
        Email:
        <StyledFontAwesomeIconHideEmail
          icon={faCheck}
          $validEmail={validEmail}
        />
        <StyledFontAwesomeIconInvalidEmail
          icon={faTimes}
          $validEmail={validEmail}
          $email={email}
        />
      </LabelWrapper>
    </>
  );
}
