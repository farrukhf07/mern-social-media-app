import React from "react";
import NavItems from "./NavItems";
import PreviousBtn from "./PreviousBtn";
import Footer from "./Footer";

function About() {
  return (
    <>
      <div className="container">
        <div className="row justify-content-between p-3">
          <div className="col-1">
            <PreviousBtn name={'Previous'}/>
          </div>
          <div className="col-1">
            <PreviousBtn name={'Back'}/>
          </div>
        </div>
        <NavItems
          pageTitle="About Us"
          item1={"Rules & Regulations"}
          item2={"Policies"}
          item3={"Terms & Conditions"}
        />
      </div>
      <Footer isFixed={true}/>
    </>
  );
}

export default About;
