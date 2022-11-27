import ForecastItem from "./ForecastItem";
import ChooseDay from "./ChooseDay";
import classes from "./WeatherForecastItem.module.css";

import { useEffect, useState } from "react";

const pullData = (day, index, data) => {
  day.push(
    data.filter(
      (item) =>
        item.time.substring(0, item.time.indexOf(" ")) ===
        data[index].time.substring(0, data[index].time.indexOf(" "))
    )
  );
};

const WeatherForecastItem = (props) => {
  const [pickedDay, setPickedDay] = useState(null);
  useEffect(() => {
    setPickedDay(null);
  }, [props.data]);

  const weatherData = props.data;
  const dayOne = [];
  const dayTwo = [];
  const dayThree = [];
  const dayFour = [];
  const dayFive = [];

  let index = 0;

  pullData(dayOne, index, weatherData);
  index += dayOne[0].length;
  pullData(dayTwo, index, weatherData);
  index += dayTwo[0].length;
  pullData(dayThree, index, weatherData);
  index += dayThree[0].length;
  pullData(dayFour, index, weatherData);
  index += dayFour[0].length;
  pullData(dayFive, index, weatherData);

  const days = {
    firstDay: dayOne,
    secondDay: dayTwo,
    thirdDay: dayThree,
    fourthDay: dayFour,
    fifthDay: dayFive,
  };

  let content = <div></div>;

  if (props.isLoading) {
    content = <p>Loading...</p>;
  }

  if (props.error) {
    content = <p>{props.error}</p>;
  }
  const pickDay = (day) => {
    setPickedDay(day);
  };

  if (props.isSent && !props.isLoading && !props.error) {
    const displayDay = pickedDay ? pickedDay : dayOne;

    content = <ForecastItem weatherInfo={displayDay} />;
  }

  return (
    <div className={classes.module}>
      {props.isSent && content}
      {props.isSent && <ChooseDay days={days} onClick={pickDay} />}
    </div>
  );
};

export default WeatherForecastItem;
