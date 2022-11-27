import classes from "./ChooseDay.module.css";

const ChooseDay = (props) => {
  const buttonOnClickHandler = (event) => {
    props.onClick(props.days[event.target.value]);
  };

  const date = new Date();

  const weekday = date.getDay();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className={classes["form-control"]}>
      <button
        className={classes.button}
        value="firstDay"
        onClick={buttonOnClickHandler}
      >
        Today
      </button>
      <button
        className={classes.button}
        value="secondDay"
        onClick={buttonOnClickHandler}
      >
        Tomorrow
      </button>
      <button
        className={classes.button}
        value="thirdDay"
        onClick={buttonOnClickHandler}
      >
        {days[weekday + 2]}
      </button>
      <button
        className={classes.button}
        value="fourthDay"
        onClick={buttonOnClickHandler}
      >
        {days[weekday + 3]}
      </button>
      <button
        className={classes.button}
        value="fifthDay"
        onClick={buttonOnClickHandler}
      >
        {days[weekday + 4]}
      </button>
    </div>
  );
};

export default ChooseDay;
