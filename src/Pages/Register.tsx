import React from "react";
import { Container } from "react-bootstrap";
import CustomNavbar from "../Components/CustomNavbar";
import { ILocationData } from "../Types";
import LocationDataService from "../Services/location.service";

interface State {
    location: string,
}



class Register extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);

        this.state = { location: "" };
    }

    formSubmit(event: any) {
        event.preventDefault();

        const matches = new RegExp("\\(([\\d.-]+),\\s+([\\d.-]+)\\)", "g").exec(event.target.address.value);
        if (matches !== null && matches.length === 3) {
            return this.uploadToFirebase(event, parseFloat(matches[1]), parseFloat(matches[2]));
        }

        const apiRequest = `http://api.positionstack.com/v1/forward?access_key=bedfc7a12881cb1b9a3009b1712a0bb0&query=${event.target.address.value}`;
        fetch(apiRequest)
            .then(res => res.json())
            .then(res => {
                const data = res.data;

                if (data.length > 0) {
                    const lat = data[0]?.latitude;
                    const long = data[0]?.longitude;

                    if (lat === undefined || long === undefined) return;
                    this.uploadToFirebase(event, lat, long);
                }
            })
            .catch(err => console.log(err));
    }

    uploadToFirebase(event: any, lat: number, long: number) {
        const file = event.target.image.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const data: ILocationData = {
                title: event.target?.eventName?.value,
                host: event.target?.hostName?.value,
                startDate: event.target?.startDate?.value.toString(),
                endDate: event.target?.endDate?.value.toString(),
                description: event.target?.description?.value,
                website: event.target?.website?.value,
                image: reader.result as string,
                coords: [lat, long],
                email: event.target?.email?.value,
                number: event.target?.phone?.value
            };

            LocationDataService.create(data)
                .then(() => {
                    console.log("Created new item successfully!");
                    alert("Event successfuly registered!");
                    window.location.reload();
                })
                .catch((e: Error) => {
                    console.log(e);
                });

        }

        reader.readAsDataURL(file);
    }

    async getLocation() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(pos => {
                resolve(pos.coords);
            });
        });
    }

    render() {
        return (
            <div className="pageContainer">
                <CustomNavbar page="login" sticky={false}></CustomNavbar>

                <Container className="loginContainer">
                    <form className="registerDiv" onSubmit={event => this.formSubmit(event)}>
                        <h2>Register</h2>

                        <div className="inputGroup">
                            <label htmlFor="hostName">Host Name: </label>
                            <input id="hostName" name="hostName" className="form-control" placeholder="Host Name" type="text" autoComplete="off" required />
                        </div>

                        <div className="inputGroup">
                            <label htmlFor="eventName">Event Name: </label>
                            <input id="eventName" name="eventName" className="form-control" placeholder="Event Name" type="text" autoComplete="off" required />
                        </div>

                        <div className="inputGroup">
                            <label htmlFor="startDate">Start Date/Time: </label>
                            <input id="startDate" name="startDate" className="form-control" placeholder="Start Date" type="datetime-local" autoComplete="off" required />
                        </div>

                        <div className="inputGroup">
                            <label htmlFor="endDate">End Date/Time: </label>
                            <input id="endDate" name="endDate" className="form-control" placeholder="End Date" type="datetime-local" autoComplete="off" required />
                        </div>

                        <div className="inputGroup">
                            <label htmlFor="description">Event Description: </label>
                            <input id="description" name="description" className="form-control" placeholder="Event Description" type="text" autoComplete="off" required />
                        </div>

                        <div className="inputGroup form-group has-feedback">
                            <label htmlFor="address">Address or (Lat, Long) </label>
                            <input id="address" name="address" className="form-control" value={this.state.location} placeholder="Allow Location Access or Manually Enter" type="text" autoComplete="off"
                                onClick={() => {
                                    if (this.state.location !== "") return;

                                    this.getLocation()
                                        .then((coords: any) => {
                                            this.setState({
                                                location: `(${coords.latitude}, ${coords.longitude})`
                                            });
                                        });
                                }} onChange={event => {
                                    this.setState({
                                        location: event.target.value
                                    });
                                }} required />
                        </div>

                        <div className="inputGroup">
                            <label htmlFor="image">Image: </label>
                            <input id="image" name="image" className="form-control" placeholder="Image Location (URL)" type="file" accept="image/png, image/jpeg, image/jpg" autoComplete="off" required />
                        </div>

                        <div className="inputGroup">
                            <label htmlFor="website">Website: </label>
                            <input id="website" name="website" className="form-control" placeholder="Website" type="url" autoComplete="off" />
                        </div>

                        <div className="inputGroup">
                            <label htmlFor="email">Email Address: </label>
                            <input id="email" name="email" className="form-control" placeholder="Email (will be displayed)" type="email" autoComplete="off" />
                        </div>

                        <div className="inputGroup">
                            <label htmlFor="phone">Phone Number: </label>
                            <input id="phone" name="phone" className="form-control" placeholder="Phone Number (will be displayed)" type="tel" autoComplete="off" />
                        </div>

                        <button className="btn btn-primary">Submit</button>
                    </form >
                </Container >
            </div >
        );
    }
}

export default Register;