import styled from "styled-components";

const StyledTime = styled.div`
  display: flex;
  border: 1px solid gray;
  width: 100px;
  justify-content: center;
`;

const Time = ({ currSeconds }: { currSeconds: number }) => {
  const displaySeconds: number = currSeconds % 60;
  const displayMinutes: number = (currSeconds - displaySeconds) / 60;

  return <StyledTime>{displaySeconds < 10
    ? `${displayMinutes}:0${displaySeconds}`
    : `${displayMinutes}:${displaySeconds}`}</StyledTime>;
};

export default Time;
