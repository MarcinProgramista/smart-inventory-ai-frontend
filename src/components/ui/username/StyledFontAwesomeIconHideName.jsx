import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const StyledFontAwesomeIconHideName = styled(FontAwesomeIcon)`
  color: ${({ $validName }) => ($validName ? "limegreen" : "")};
  margin-left: ${({ $validName }) => ($validName ? "0.25rem" : "")};
  display: ${({ $validName }) => ($validName ? "" : "none")};
`;
export default StyledFontAwesomeIconHideName;
