import WeatherItem from "./WeatherItem";

import classes from "./WeatherCard.module.css";

const WeatherCard = (props) => {
  let content = props.data.map((item) => (
    <WeatherItem
      id={item.id}
      name={item.name}
      country={item.country}
      time={item.time}
      temp={Math.round(item.temp)}
      pressure={item.pressure}
      tempFeelsLike={item.tempFeelsLike}
      description={item.description}
      wind={item.wind}
      clouds={item.clouds}
      icon={item.icon}
    />
  ));

  if (props.isLoading) {
    content = <p>Loading...</p>;
  }

  if (props.error) {
    content = <p>{props.error}</p>;
  }

  return <div className={classes["item-holder"]}>{content}</div>;
};

export default WeatherCard;
