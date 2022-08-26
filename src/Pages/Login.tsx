import React from "react";
import { Container } from "react-bootstrap";
import CustomNavbar from "../Components/CustomNavbar";

class Home extends React.Component {
    render() {
        return (
            <>
                <CustomNavbar page="login"></CustomNavbar>

                <Container className="loginContainer">
                    <div className="loginDiv">
                        <h2>Login</h2>
                        <input name="username" className="form-control" placeholder="username" type="text" autoComplete="off" />
                        <input name="password" className="form-control" placeholder="password" type="password" autoComplete="off" />
                        <button className="btn btn-primary">Submit</button>
                        <hr />
                        <button className="btn btn-success">
                            Signup
                        </button>
                    </div>
                </Container>
            </>
        );
    }
}

export default Home;