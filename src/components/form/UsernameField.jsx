import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import LabelWrapper from "../ui/LabelWrapper";
import StyledFontAwesomeIconHideName from "../ui/username/StyledFontAwesomeIconHideName";

import Input from "../common/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StyledFontAwesomeIconInvalidName from "../ui/username/StyledFontAwesomeIconInvalidName";
import ValidationHint from "../ui/validation/ValidationHint";

export default function UsernameField({
  user,
  setUser,
  validName,
  userFocus,
  setUserFocus,
  userRef,
}) {
  return (
    <>
      <LabelWrapper htmlFor="username">
        Username:
        <StyledFontAwesomeIconHideName icon={faCheck} $validName={validName} />
        <StyledFontAwesomeIconInvalidName
          icon={faTimes}
          $validName={validName}
          $user={user}
        />
      </LabelWrapper>
      <Input
        type="text"
        id="username"
        ref={userRef}
        autoComplete="off"
        onChange={(e) => setUser(e.target.value)}
        value={user}
        required
        aria-invalid={validName ? "false" : "true"}
        aria-describedby="uidnote"
        onFocus={() => setUserFocus(true)}
        onBlur={() => setUserFocus(false)}
        placeholder="Put name ..."
      />
      <ValidationHint
        id="uidnote"
        $show={userFocus && user && !validName}
        $fontSize="1.2rem"
      >
        <FontAwesomeIcon icon={faInfoCircle} />
        4 to 24 characters.
        <br />
        Must begin with a letter.
        <br />
        Letters, numbers, underscores, hyphens allowed.
      </ValidationHint>
    </>
  );
}
