import Time from "../generic/DisplayTime"
import Buttons from "../generic/Button";

const Stopwatch = () => {
    const buttons = ["Start", "Stop"];
    return (
        <div>
            <Time currMinutes={0} currSeconds={30}/>
            <Buttons inputButtons={buttons}/>
        </div>
    )
};

export default Stopwatch;
