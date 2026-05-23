import styled from "styled-components";

const ValidationHint = styled.p`
  position: ${({ $show }) => ($show ? "relative" : "absolute")};
  left: ${({ $show }) => ($show ? "" : "9999px")};

  font-size: ${({ $show, $fontSize = "0.75rem" }) => ($show ? $fontSize : "")};

  border-radius: ${({ $show }) => ($show ? "0.5rem" : "")};

  background: ${({ $show }) => ($show ? "#000" : "")};

  color: ${({ $show }) => ($show ? "#fff" : "")};

  padding: ${({ $show }) => ($show ? "0.25rem" : "")};

  bottom: ${({ $show }) => ($show ? "-10px" : "")};

  svg {
    margin-right: 0.25rem;
  }
`;

export default ValidationHint;
