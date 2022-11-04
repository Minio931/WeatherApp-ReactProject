import WeatherItem from "./WeatherItem";

import classes from "./WeatherCard.module.css";

const WeatherCard = (props) => {
  const item = props.data;
  return (
    <div className={classes["item-holder"]}>
      <WeatherItem
        temp={Math.round(item.temp)}
        pressure={item.pressure}
        tempFeelsLike={item.tempFeelsLike}
        description={item.description}
        wind={item.wind}
        clouds={item.clouds}
        icon={item.icon}
      />
    </div>
  );
};

export default WeatherCard;
