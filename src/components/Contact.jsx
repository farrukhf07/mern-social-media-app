import React from 'react'
import NavItems from './NavItems'
import PreviousBtn from './PreviousBtn'
import Footer from './Footer'

function Contact() {
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
        <NavItems pageTitle={"Contact Us"} item1={"Chief Executive Officer"} item2={"Chief Operational Officer"} item3={"Manager"}/>
    </div>
    <Footer isFixed={true}/>
    </>
  )
}

export default Contact