import React from 'react'
import CardItem from './CardItem'
import PreviousBtn from './PreviousBtn'
import Footer from './Footer'

function ReadMore() {
  return (
    <>
        <h1 className='text-center pb-3'>Detail Page</h1>
        <div className="container-fluid p-0">
            <img
                src="https://ichef.bbci.co.uk/news/1024/branded_news/f275/live/7f2b2010-750e-11f0-9cb3-2344cd85f55f.jpg"
                style={{ width: '100%', height: '300px', minHeight:'100px', objectFit: 'cover', display: 'block' }}
                alt="Detail"
            />
            <div className="container py-2">
                <h1>Title of the NEWS</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil voluptas facilis adipisci dolore mollitia. Minima repellat laborum id sint, magnam veniam, voluptas doloribus aperiam amet consequuntur nesciunt. Qui similique repellat velit reprehenderit? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi suscipit quasi eius et quae ab dignissimos ea, sed quia eaque asperiores illum labore? Explicabo, voluptatibus. Soluta, veniam deserunt? Voluptas ullam totam tempora? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis enim, hic quod modi inventore velit quas ea natus recusandae quam fugiat officiis? Ratione minus tempore vitae sunt eius provident, numquam saepe consequuntur.</p>
                <hr />
                <div className="row justify-content-end">
                    <div className="col-1">
                    <PreviousBtn name={"Back"}/>
                    </div>
                </div>

                <h2>Related News</h2>

            </div>
        </div>
        <div className="container my-3">
        <div className="row">
            <div className="col-md-4">
                <CardItem title="Main Title" description="Description about the content shown in the specific card it will  be unique for each card and will be shown in the card body." imageUrl="" url="" author="ABC Author" source="Source" />
            </div>
            <div className="col-md-4">
                <CardItem title="Main Title" description="Description about the content shown in the specific card it will  be unique for each card and will be shown in the card body." imageUrl="" url="" author="ABC Author" source="Source" />
            </div>
            <div className="col-md-4">
                <CardItem title="Main Title" description="Description about the content shown in the specific card it will  be unique for each card and will be shown in the card body." imageUrl="" url="" author="ABC Author" source="Source" />
            </div>
            <div className="col-md-4">
                <CardItem title="Main Title" description="Description about the content shown in the specific card it will  be unique for each card and will be shown in the card body." imageUrl="" url="" author="ABC Author" source="Source" />
            </div>
            <div className="col-md-4">
                <CardItem title="Main Title" description="Description about the content shown in the specific card it will  be unique for each card and will be shown in the card body." imageUrl="" url="" author="ABC Author" source="Source" />
            </div>
            <div className="col-md-4">
                <CardItem title="Main Title" description="Description about the content shown in the specific card it will  be unique for each card and will be shown in the card body." imageUrl="" url="" author="ABC Author" source="Source" />
            </div>
        </div>
    </div>
    <Footer isFixed={false}/>
    </>
  )
}

export default ReadMore