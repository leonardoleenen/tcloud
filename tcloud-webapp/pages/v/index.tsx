import React from "react";
import SearchBar from '../../components/layout/search_bar';
import LeftSideBar from '../../components/layout/left_side_bar';
import RightSideBar from '../../components/layout/rigth_side_bar';
import DocumentArea from '../../components/layout/document_area';
import InfoCard from '../../components/info_card';


import '../../styles/main.scss';

export default () => {
  return (
    <div className="container" >
      <SearchBar />
      <div className="workspace">
        <LeftSideBar>
          <InfoCard label="Entidades detectadas" values = {[{key: "Socios", value:"2"}]}/>
        </LeftSideBar>
        <DocumentArea />
        <RightSideBar />
      </div>


      <style jsx>
        {
          `.container {
             display: grid;
             grid-template-rows: 48px 4fr;
          }
          .workspace { 
            height: 100vh;
            display: grid;
            grid-template-columns: 1fr 3fr 1fr;
          }
          `
        }
      </style>
    </div>
  )
};
