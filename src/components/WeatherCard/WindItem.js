import classes from "./WindItem.module.css";

const WindItem = (props) => {
  const windSpeed = props.data.speed;
  const windDirectionInDegrees = props.data.deg;
  const mystyle = {
    transform: `rotate(${windDirectionInDegrees}deg)`,
  };

  return (
    <div className={classes["wind-item"]}>
      <div className={classes["wind-item__speed"]}>
        <span>{windSpeed} km/h</span>
      </div>
      <div style={mystyle} className={classes["wind-item__direction"]}>
        <div className={classes.firstLine}></div>
        <div className={classes.secondLine}></div>
        <div className={classes.thirdLine}></div>
      </div>
      <div>
        <span>{props.time}</span>
      </div>
    </div>
  );
};

export default WindItem;
