import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StyledFontAwesomeIconHideEmail from "../ui/email/StyledFontAwesomeIconHideEmail";
import LabelWrapper from "../ui/LabelWrapper";
import StyledFontAwesomeIconInvalidEmail from "../ui/email/StyledFontAwesomeIconInvalidEmail";
import Input from "../common/Input";
import ValidationHint from "../ui/validation/ValidationHint";
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
      <Input
        type="email"
        id="email"
        ref={emailRef}
        autoComplete="off"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
        aria-invalid={validEmail ? "false" : "true"}
        aria-describedby="uidnote"
        onFocus={() => setEmailFocus(true)}
        onBlur={() => setEmailFocus(false)}
        placeholder="Put email .."
      />
      <ValidationHint id="uidnote" $show={emailFocus && email && !validEmail}>
        <FontAwesomeIcon icon={faInfoCircle} />
        username part of the email, allowing alphanumeric characters and some
        special characters like ., _, %, +, and -.
        <br />
        Must have "@" symbol that separates the username from the domain.
        <br />
        Must begin with a letter.
        <br />
        Domain part, allowing letters, digits, dots, and hyphens
        <br />
        top-level domain (TLD), which must consist of at least 2 alphabetic
        characters.
      </ValidationHint>
    </>
  );
}
