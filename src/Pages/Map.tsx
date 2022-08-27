import React, { useRef } from "react";
import CustomNavbar from "../Components/CustomNavbar";
import { MapContainer, Popup, TileLayer, useMap, Marker } from 'react-leaflet'
import { LatLngExpression } from "leaflet";
import { LocationData } from "../Types";

interface Props {
    position: LatLngExpression;
    locations: LocationData[];
}

class Map extends React.Component<Props> {
    static defaultProps = {
        position: [0.789, 113.921],
        locations: [{
            coords: [0.812, 114.255],
            name: "Event 1",
            host: "Host 1",
            startDate: new Date(),
            endDate: new Date(),
            description: "Description 1"
        }, {
            coords: [0.721, 114.255],
            name: "Event 2",
            host: "Host 2",
            startDate: new Date(),
            endDate: new Date(),
            description: "Description 2"
        }, {
            coords: [0.812, 112.255],
            name: "Event 3",
            host: "Host 3",
            startDate: new Date(),
            endDate: new Date(),
            description: "Description 3"
        }, {
            coords: [0.721, 112.255],
            name: "Event 4",
            host: "Host 4",
            startDate: new Date(),
            endDate: new Date(),
            description: "Description 4"
        }, {
            coords: [0.741, 122.255],
            name: "Event 4",
            host: "Host 4",
            startDate: new Date(),
            endDate: new Date(),
            description: "Description 4"
        }, {
            coords: [0.721, 112.255],
            name: "Event 4",
            host: "Host 4",
            startDate: new Date(),
            endDate: new Date(),
            description: "Description 4"
        }]
    };

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

                        {this.props.locations.map((location, i) => (
                            <Marker position={location.coords} key={i}>
                                <Popup>
                                    {i}. {location.name}<br />
                                    {location.description}
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                    <div className="locationsList">
                        {this.props.locations.map((location, i) => {
                            return (
                                <div className="eventGroup" key={i}>
                                    <h1>{location.name}</h1>
                                    <h2 className="host">Hosted by {location.host}</h2>
                                    <p className="dates">{location.startDate.toLocaleString("en-us", { dateStyle: "short", timeStyle: "short" })} - {location.endDate.toLocaleString("en-us", { dateStyle: "short", timeStyle: "short" })}</p>

                                    <p className="description">{location.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Map;