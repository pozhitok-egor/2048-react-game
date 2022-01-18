import {AdditionalScore, Score, ScoreTitle, ScoreValue} from "./Header.styled";

const Header = () => {
  return (
    <div style={{display: "flex", justifyContent: "flex-end", gap: "1rem"}}>
      <Score>
        <AdditionalScore>+12</AdditionalScore>
        <ScoreTitle>SCORE</ScoreTitle>
        <ScoreValue>1000</ScoreValue>
      </Score>
      <Score>
        <ScoreTitle>BEST</ScoreTitle>
        <ScoreValue>12000</ScoreValue>
      </Score>
    </div>
  );
};

export default Header;
