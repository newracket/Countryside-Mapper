import React from "react";
import CustomNavbar from "../Components/CustomNavbar";

class Home extends React.Component {
    render() {
        return (
            <>
                <CustomNavbar page="home"></CustomNavbar>
                Home
            </>
        );
    }
}

export default Home;