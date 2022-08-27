import React from "react";
import CustomNavbar from "../Components/CustomNavbar";

class Home extends React.Component {
    render() {
        return (
            <>
                <CustomNavbar page="home" sticky={true}></CustomNavbar>
                Home
            </>
        );
    }
}

export default Home;