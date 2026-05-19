import FeatureList from "../components/ui/lists/FeatureList";
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
        <FeatureList>
          <li>✔ Track inventory in real time</li>
          <li>✔ Predict shortages with AI</li>
          <li>✔ Generate smart reports</li>
        </FeatureList>
      </StartPageCard>
    </>
  );
};

export default StartPage;
