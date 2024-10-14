import styled from "styled-components";

const StyledTime = styled.div`
    display: flex;
    border: 1px solid gray;
    justify-content: center;
`

const Time = ({currMinutes, currSeconds}: {currMinutes: number, currSeconds: number}) => {
    return <StyledTime>{currMinutes}:{currSeconds}</StyledTime>;
}

export default Time;