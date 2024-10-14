import styled from "styled-components";

const StyledButtons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const Buttons = ({ inputButtons }: { inputButtons: string[] }) => {
  const displayButtons = inputButtons.map((buttonName) => {
    return <button>{buttonName}</button>;
  });
  return <StyledButtons>{displayButtons}</StyledButtons>;
};

export default Buttons;