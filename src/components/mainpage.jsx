import React from 'react'
import CardItem from './CardItem'
import Footer from './Footer'

function mainpage() {
  return (
    <>
    <div className="container my-3">
        <h1 className='text-center'>Home Page</h1>
        <div className="row">
            <div className="col-md-4">
                <CardItem title="Main Title" description="Description about the content shown in the specific card it will  be unique for each card and will be shown in the card body." imageUrl="" url="/read-more" author="ABC Author" source="Source" />
            </div>
            <div className="col-md-4">
                <CardItem title="Main Title" description="Description about the content shown in the specific card it will  be unique for each card and will be shown in the card body." imageUrl="" url="https://www.google.com" author="ABC Author" source="Source" />
            </div>
            <div className="col-md-4">
                <CardItem title="Main Title" description="Description about the content shown in the specific card it will  be unique for each card and will be shown in the card body." imageUrl="" url="https://www.google.com" author="ABC Author" source="Source" />
            </div>
            <div className="col-md-4">
                <CardItem title="Main Title" description="Description about the content shown in the specific card it will  be unique for each card and will be shown in the card body." imageUrl="" url="https://www.google.com" author="ABC Author" source="Source" />
            </div>
            <div className="col-md-4">
                <CardItem title="Main Title" description="Description about the content shown in the specific card it will  be unique for each card and will be shown in the card body." imageUrl="" url="https://www.google.com" author="ABC Author" source="Source" />
            </div>
            <div className="col-md-4">
                <CardItem title="Main Title" description="Description about the content shown in the specific card it will  be unique for each card and will be shown in the card body." imageUrl="" url="https://www.google.com" author="ABC Author" source="Source" />
            </div>
            <div className="col-md-4">
                <CardItem title="Main Title" description="Description about the content shown in the specific card it will  be unique for each card and will be shown in the card body." imageUrl="" url="https://www.google.com" author="ABC Author" source="Source" />
            </div>
        </div>
    </div>
    <Footer isFixed={false}/>
    </>
  )
}

export default mainpage