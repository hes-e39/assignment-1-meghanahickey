import styled from "styled-components";

const StyledButtons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

type buttonInfo = {
  name: string;
  clickCallback: () => void;
}

const Buttons = ({inputButtons}: {inputButtons: buttonInfo[]}) => {
  const displayButtons = inputButtons.map(({name, clickCallback}) => {
    return <button key={name} onClick={clickCallback}>{name}</button>;
  });
  return <StyledButtons>{displayButtons}</StyledButtons>;
};

export {Buttons, type buttonInfo};