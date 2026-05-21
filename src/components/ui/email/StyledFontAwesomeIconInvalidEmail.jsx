import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SyledFontAwesomeIconInvalidEmail = styled(FontAwesomeIcon)`
  display: ${({ $validEmail, $email }) => {
    if (!$validEmail && $email) return "";
    return "none";
  }};
  color: ${({ $validEmail, $email }) => ($validEmail || $email ? "" : "red")};
  margin-left: ${({ $validEmail, $email }) =>
    $validEmail || $email ? "0.25rem" : ""};
`;

export default SyledFontAwesomeIconInvalidEmail;
