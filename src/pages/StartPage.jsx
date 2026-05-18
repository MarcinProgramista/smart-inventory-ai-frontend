import StartPageCard from "../components/ui/StartPageCard";
import Subtitle from "../components/ui/typography/Subtitle";
import Title from "../components/ui/typography/Title";

const StartPage = () => {
  return (
    <>
      <StartPageCard>
        <Title>SmartInventoryAI</Title>
        <Subtitle>
          AI - powered inventory & warehouse management system.
        </Subtitle>
      </StartPageCard>
    </>
  );
};

export default StartPage;
