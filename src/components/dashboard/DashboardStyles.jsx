import styled from "styled-components";

export const LogoutContainer = styled.div`
  position: fixed;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 5;
`;

export const DashboardWrapper = styled.div`
  position: relative;
  z-index: 2;
  padding: 4rem 2rem 2rem 2rem;
  color: #9deaff;
  height: auto !important;
  min-height: 1500vh !important;
`;
export const Welcome = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #9deaff;
`;
export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;
