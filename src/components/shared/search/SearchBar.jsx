/* eslint-disable no-unused-vars */
import { Search } from "lucide-react";
import styled from "styled-components";

const SearchWrapper = styled.div`
  margin: 1.5rem 0 2rem 0;
  width: 100%;
  max-width: 480px;
`;
const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.8rem 1rem;
  border-radius: 12px;
  background: rgba(0, 0, 20, 0.45);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(157, 234, 255, 0.25);
  box-shadow: 0 0 15px rgba(157, 234, 255, 0.15);
  &:focus-within {
    border-color: #00c6ff;
    box-shadow: 0 0 18px #00c6ff;
  }
  svg {
    stroke: #9deaff;
    width: 20px;
    height: 20px;
  }
`;
export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <SearchWrapper>
      <SearchBox>
        <Search />
      </SearchBox>
    </SearchWrapper>
  );
}
