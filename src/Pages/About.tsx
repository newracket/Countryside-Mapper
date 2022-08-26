import React from "react";
import CustomNavbar from "../Components/CustomNavbar";

class Home extends React.Component {
    render() {
        return (
            <>
                <CustomNavbar page="about"></CustomNavbar>
                About
            </>
        );
    }
}

export default Home;