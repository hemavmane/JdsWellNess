import React from "react";
import "./Styles/Comp02.css";
const Comp02 = ({ data }) => {
  // console.log("DATA", data);
  return (
    <div className="Comp02">
      <article>
        {data.map((ele, ind) => {
          return (
            <div key={ind} className="Comp02Wrapper">
              <div className="Comp02Wrapper01">
                <h4>{ele.title}</h4>
                <div className="Comp02ImagAndDesc">
                  <img src={ele.image} alt="image" />
                  <p>{ele.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </article>
    </div>
  );
};

export default Comp02;
