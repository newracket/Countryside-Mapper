import React from "react";
import CustomNavbar from "../Components/CustomNavbar";

class Home extends React.Component {
    render() {
        return (
            <div className="homeContainer">
                <div style={{backgroundImage: "url(/homeback.jpg)"}} className="homeBackground">
                    <CustomNavbar page="home" sticky={false} transparent={true}></CustomNavbar>
                    <div className="homeIntro">
                        <div className="homeText">Indonesia is one of the world’s major agricultural nations so we created an application to encourage people to visit rural Indonesia, thereby increasing tourism and stimulating the economy.</div>
                    </div>
                </div>
                <div>
                    <div className="aboutCard">
                        <h1><b>Our Mission!</b></h1>
                        <p>Welcome to Countryside Mapper! Our mission is to provide tourists with unique visiting spots. In particular, we focus on the rural areas of Indonesia with agriculture. Some of the commodities include palm oil, natural rubber, cocoa, coffee, tea, cassava, rice, and tropical spices. Feel free to explore this world and plan your next vacation spot. Remember, you are also helping the local economy by planning these visits.</p>
                    </div>
                    <div className="aboutCard">
                        <h1><b>What our app does!</b></h1>
                        <p>Combining our knowledge and research, we created an application focused on rural development by increasing tourism. The term is agritourism: attracting members of the public to visit agricultural operations. Our website shows various agricultural and nature sites that tourists could visit. This could also be incorporated by the local people. They can advertise visiting events they are hosting by adding them to the website. During these events, locals can have recreation, entertainment, or educational experiences for visitors. Of course, locals are allowed and encouraged to charge tourists for their services. This will help the local economy by creating jobs and allows for cultural exchange. The sky is the limit for what locals can do with this. And our application is the platform to help them reach it.</p>
                    </div>
                    <div className="aboutCard">
                        <h1><b>How we built it!</b></h1>
                        <p>We decided to use what we knew in order to create something that could potentially help. Our skill sets ranged from programming in various languages such as react and node.js. However, we had to use some applications we didn’t know like firebase. Regardless, we were pleased to learn more.</p>
                    </div>
                    <div className="aboutCard">
                        <h1><b>What we learned!</b></h1>
                        <p>Through our 48-hour experience, we learned a lot about Indonesia, its many islands, and rural life. However, we also learned a lot about ourselves and our skill sets. We did struggle in some places. But that just means our skills are limited and there is so much more for us to learn. We took this as a learning opportunity to enhance our skills. It was a great experience and although we are not from the area, it would be nice to visit someday.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;