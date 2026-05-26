import {
  ActivityIcon,
  BarChart3,
  BellRing,
  BrainCircuit,
  LayoutDashboard,
  LineChart,
  Zap,
} from "lucide-react";
import styled from "styled-components";

const NavWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;
const NavButton = styled.button`
  padding: 0.8rem 1.6rem;
  border-radius: 16px;
  background: rgba(0, 60, 105, 0.25);
  border: 1px solid rgba(0, 220, 255, 0.7);
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  transition: 0.25s ease;
  backdrop-filter: blur(12px) saturate(160%);
  /* Neon HOLO glow */
  box-shadow:
    0 0 14px rgba(0, 200, 255, 0.55),
    inset 0 0 14px rgba(0, 200, 255, 0.25),
    0 6px 22px rgba(0, 200, 255, 0.35);
  /* efekt holograficznego rozszczepienia koloru */
  text-shadow:
    0 0 6px rgba(0, 200, 255, 0.6),
    0 6px 22px rgba(0, 140, 255, 0.25);
  transform: perspective(900px) trnalsateZ(0px);
  svg {
    width: 20px;
    height: 20px;
    stroke: #9deaff;
    filter: drop-shadow(0 0 6px rgba(0, 200, 255, 0.9));
  }
  &:hover {
    transform: perspective(900px) translateZ(14px);
    background: rgba#00eaff;
    box-shadow:
      0 0 22px rgba(0, 240, 255, 0.95),
      inset 0 0 18px rgba(0, 200, 255, 0.35),
      0 10px 28px rgba(0, 200, 255, 0.45);
  }
  &:active {
    transform: perspective(900px) translateZ(8px);
    box-shadow:
      0 0 14px rgba(0, 180, 255, 0.7),
      inset 0 0 12px rgba(0, 180, 255, 0.3);
  }
`;
export default function SectionNavigation() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <NavWrapper>
      <NavButton onClick={() => scrollToSection("summary")}>
        <LayoutDashboard />
        Summary
      </NavButton>
      <NavButton onClick={() => scrollToSection("ai-insights")}>
        <BrainCircuit /> AI Insights
      </NavButton>
      <NavButton onClick={() => scrollToSection("quick-actions")}>
        <Zap /> Quick Actions
      </NavButton>
      <NavButton onClick={() => scrollToSection("activity")}>
        <ActivityIcon /> Activity
      </NavButton>
      <NavButton onClick={() => scrollToSection("alerts")}>
        <BellRing /> Alerts
      </NavButton>
      <NavButton onClick={() => scrollToSection("charts")}>
        <BarChart3 /> Charts
      </NavButton>
      <NavButton onClick={() => scrollToSection("forecast")}>
        <LineChart />
        AI Forecast
      </NavButton>
    </NavWrapper>
  );
}
