

const NoResultWiget = ({ text="There is no data" }) => {
  return (
    <div className="dash_block dash-empty d-flex align-items-center justify-content-center">
      <div className="small ">
        <span className="_badge_wrap">
          <span className="_no_badge mt-3">{text}</span>
        </span>
      </div>
    </div>
  );
};

export default NoResultWiget;
