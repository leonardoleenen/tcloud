import React from "react";

export default (props) => {
  return <div className= "searchBar">
    {props.children} 
    <style jsx>
      {`
        .searchBar {
          display:grid;
          grid-template-columns: repeat(20,1fr);
          height: 58px;
          background-color: white;
        }
      `}
    </style>
  </div>;
};
