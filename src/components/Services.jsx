import React from 'react'
import NavItems from './NavItems'
import PreviousBtn from './PreviousBtn'
import Footer from './Footer'

function Services() {
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
        <NavItems pageTitle={"Services"} item1={"Web Development"} item2={"App Development"} item3={"Coud Services"}/>
    </div>
    <Footer isFixed={true}/>
    </>
  )
}

export default Services