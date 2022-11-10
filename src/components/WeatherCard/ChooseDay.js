const ChooseDay = (props) => {
  const buttonOnClickHandler = (event) => {
    props.onClick(props.days[event.target.value]);
  };

  return (
    <div>
      <button value="firstDay" onClick={buttonOnClickHandler}>
        Today
      </button>
      <button value="secondDay" onClick={buttonOnClickHandler}>
        Tomorrow
      </button>
      <button value="thirdDay" onClick={buttonOnClickHandler}>
        3rd Day
      </button>
      <button value="fourthDay" onClick={buttonOnClickHandler}>
        4th Day
      </button>
      <button value="fifthDay" onClick={buttonOnClickHandler}>
        5th Day
      </button>
    </div>
  );
};

export default ChooseDay;
