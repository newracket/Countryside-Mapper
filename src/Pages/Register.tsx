import React from "react";
import { Container } from "react-bootstrap";
import CustomNavbar from "../Components/CustomNavbar";

class Register extends React.Component {
    render() {
        return (
            <div className="pageContainer">
                <CustomNavbar page="login" sticky={false}></CustomNavbar>

                <Container className="loginContainer">
                    {/* <div className="iconLoginGroup"> */}
                    {/* <div className="logo">
                            <img src="icon.png" className="logoImage" />
                        </div> */}
                    <form className="registerDiv">
                        <h2>Register</h2>

                        <div className="inputGroup">
                            <label htmlFor="hostName">Host Name: </label>
                            <input id="hostName" className="form-control" placeholder="Host Name" type="text" autoComplete="off" required />
                        </div>

                        <div className="inputGroup">
                            <label htmlFor="eventName">Event Name: </label>
                            <input id="eventName" className="form-control" placeholder="Event Name" type="text" autoComplete="off" required />
                        </div>

                        <div className="inputGroup">
                            <label htmlFor="startDate">Start Date/Time: </label>
                            <input id="startDate" className="form-control" placeholder="Start Date" type="datetime-local" autoComplete="off" required />
                        </div>

                        <div className="inputGroup">
                            <label htmlFor="endDate">End Date/Time: </label>
                            <input id="endDate" className="form-control" placeholder="End Date" type="datetime-local" autoComplete="off" required />
                        </div>

                        <div className="inputGroup">
                            <label htmlFor="eventDescription">Event Description: </label>
                            <input id="eventDescription" className="form-control" placeholder="Event Description" type="text" autoComplete="off" required />
                        </div>

                        <div className="inputGroup">
                            <label htmlFor="latitude">Event Location (Latitude): </label>
                            <input id="latitude" className="form-control" placeholder="Event Description" type="number" autoComplete="off" required />
                        </div>

                        <div className="inputGroup">
                            <label htmlFor="longitude">Event Location (Longitude): </label>
                            <input id="longitude" className="form-control" placeholder="Event Description" type="number" autoComplete="off" required />
                        </div>

                        <div className="inputGroup">
                            <label htmlFor="image">Image: </label>
                            <input id="image" className="form-control" placeholder="Event Description" type="file" accept="image/png, image/jpeg, image/jpg" autoComplete="off" required />
                        </div>

                        <div className="inputGroup">
                            <label htmlFor="eventName">Website: </label>
                            <input id="eventName" className="form-control" placeholder="Website" type="url" autoComplete="off" />
                        </div>

                        <div className="inputGroup">
                            <label htmlFor="eventName">Email Address: </label>
                            <input id="eventName" className="form-control" placeholder="Email (will be displayed)" type="email" autoComplete="off" />
                        </div>

                        <div className="inputGroup">
                            <label htmlFor="eventName">Phone Number: </label>
                            <input id="eventName" className="form-control" placeholder="Phone Number (will be displayed). Format: 112-345-6789" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" autoComplete="off" />
                        </div>

                        <button className="btn btn-primary">Submit</button>
                    </form>
                    {/* </div> */}
                </Container>
            </div>
        );
    }
}

export default Register;