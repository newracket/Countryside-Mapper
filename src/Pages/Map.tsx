import React, { useRef } from "react";
import CustomNavbar from "../Components/CustomNavbar";
import { MapContainer, Popup, TileLayer, useMap, Marker } from 'react-leaflet'
import { LatLngExpression } from "leaflet";
import { LocationData } from "../Types";

interface Props {
    position: LatLngExpression;
    locations: LocationData[];
}

interface State {
    focusedElementIndex: number | null;
    searchValue: string;
}

class Map extends React.Component<Props, State> {
    divElements: any[];
    timeout: any;

    static defaultProps: Props = {
        position: [0.789, 113.921],
        locations: [{
            coords: [0.812, 114.255],
            name: "Event 1",
            host: "Host 1",
            startDate: new Date(),
            endDate: new Date(),
            description: "Description 1",
            imageLocation: "plants.jpg",
            website: "https://google.com",
            email: "abc@gmail.com",
            phone: "111-111-1111"
        }, {
            coords: [0.721, 114.255],
            name: "Event 2",
            host: "Host 2",
            startDate: new Date(),
            endDate: new Date(),
            description: "Description 2",
            imageLocation: "plants.jpg",
            website: "https://google.com",
            email: "abc@gmail.com",
            phone: "111-111-1111"
        }, {
            coords: [0.812, 112.255],
            name: "Event 3",
            host: "Host 3",
            startDate: new Date(),
            endDate: new Date(),
            description: "Description 3",
            imageLocation: "plants.jpg",
            website: "https://google.com",
            email: "abc@gmail.com",
            phone: "111-111-1111"
        }, {
            coords: [0.721, 112.255],
            name: "Event 4",
            host: "Host 4",
            startDate: new Date(),
            endDate: new Date(),
            description: "Description 4",
            imageLocation: "plants.jpg",
            website: "https://google.com",
            email: "abc@gmail.com",
            phone: "111-111-1111"
        }, {
            coords: [0.541, 122.255],
            name: "Event 5",
            host: "Host 5",
            startDate: new Date(),
            endDate: new Date(),
            description: "Description 5",
            imageLocation: "plants.jpg",
            website: "https://google.com",
            email: "abc@gmail.com",
            phone: "111-111-1111"
        }, {
            coords: [0.721, 113.255],
            name: "Event 6",
            host: "Host 6",
            startDate: new Date(),
            endDate: new Date(),
            description: "Description 6",
            imageLocation: "plants.jpg",
            website: "https://google.com",
            email: "abc@gmail.com",
            phone: "111-111-1111"
        }]
    };

    constructor(props: Props) {
        super(props);

        this.state = { focusedElementIndex: null, searchValue: "" };
        this.divElements = [];

        this.focusElement = this.focusElement.bind(this);
        this.searchChanged = this.searchChanged.bind(this);
        this.filterWithSearch = this.filterWithSearch.bind(this);
    }

    focusElement(i: number | null) {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        this.setState({
            focusedElementIndex: i
        });

        if (i !== null) {
            this.divElements[i].scrollIntoView();
            this.timeout = setTimeout(() => this.focusElement(null), 2000);
        }
    }

    searchChanged(event: any) {
        const value = event?.target?.value;
        if (value === undefined) return;

        this.setState({
            searchValue: value
        });
    }

    filterWithSearch(element: LocationData) {
        if (this.state.searchValue.length === 0) return true;

        const v = (
            element.name.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
            element.host.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
            element.description.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
            element.website.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
            element.email.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
            element.phone.toLowerCase().includes(this.state.searchValue.toLowerCase())
        );
        return v;
    }

    render() {
        return (
            <div className="pageContainer">
                <CustomNavbar page="map" sticky={false}></CustomNavbar>
                <div className="mapContainer">
                    <MapContainer center={this.props.position} zoom={6} scrollWheelZoom={true}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {this.props.locations.filter(this.filterWithSearch).map((location, i) => (
                            <Marker position={location.coords} key={i} eventHandlers={{
                                click: (e) => {
                                    this.focusElement(i);
                                }
                            }} />
                        ))}
                    </MapContainer>
                    <div className="locationsContainer">
                        <input name="search" id="search" className="form-control" placeholder="Search" type="text" onChange={this.searchChanged} autoComplete="off" />
                        <div className="locationsList">

                            {this.props.locations.filter(this.filterWithSearch).map((location, i) => {
                                return (
                                    <div className={`eventGroup${this.state.focusedElementIndex === i ? " focus" : ""}`} key={i} ref={r => this.divElements.push(r)}>
                                        <img src={location.imageLocation} />
                                        <div className="eventText">
                                            <h1><a href={location.website} target="_blank">{location.name}</a></h1>
                                            <h2 className="host">Hosted by {location.host}</h2>
                                            <p className="dates">{location.startDate.toLocaleString("en-us", { dateStyle: "short", timeStyle: "short" })} - {location.endDate.toLocaleString("en-us", { dateStyle: "short", timeStyle: "short" })}</p>

                                            <p className="description">{location.description}</p>
                                            <p className="contacts"><strong>Email:</strong> {location.email}, <strong>Phone Number</strong>: {location.phone}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Map;