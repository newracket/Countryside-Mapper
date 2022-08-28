import React, { useRef } from "react";
import CustomNavbar from "../Components/CustomNavbar";
import { MapContainer, Popup, TileLayer, useMap, Marker } from 'react-leaflet'
import { LatLngExpression } from "leaflet";
// import LocationList from "../Components/location-list.component";
import LocationDataService from "../Services/location.service";
import { ILocationData } from '../Types';

interface Props {
    position: LatLngExpression;
}

interface State {
    focusedElementIndex: number | null;
    locations: any[];
}

class Map extends React.Component<Props, State> {
    divElements: any[];
    timeout: any;
    // locations!: LocationList;

    static defaultProps = {
        position: [0.789, 113.921],
    };

    constructor(props: Props) {
        super(props);

        this.state = { focusedElementIndex: null, locations: [] };
        this.divElements = [];

        // this.locations = new LocationList({});
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

    componentDidMount() {
        LocationDataService.getAll().orderBy("title", "asc").onSnapshot((items: any) => {
            let locations = new Array<ILocationData>();
            items.forEach((item: any) => {
                let id = item.id;
                let data = item.data();

                locations.push({
                    id: id,
                    host: data.host,
                    title: data.title,
                    description: data.description,
                    startDate: data.startDate,
                    endDate: data.endDate,
                    image: data.image,
                    website: data.website,
                    coords: data.coords,
                    email: data.email,
                    number: data.number
                });
            });

            console.log(locations);
            this.setState({
                locations
            });
        });
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


                        {this.state.locations.map((location, i) => (
                            <Marker position={location.coords as LatLngExpression} key={i} eventHandlers={{
                                click: (e) => {
                                    this.focusElement(i);
                                }
                            }}>
                                {/* <Popup>
                                    {i}. {location.name}<br />
                                    {location.description}
                                </Popup> */}
                            </Marker>
                        ))}
                    </MapContainer>
                    <div className="locationsList">
                        {this.state.locations.map((location, i) => (
                            <div className={`eventGroup${this.state.focusedElementIndex === i ? " focus" : ""}`} key={i} ref={r => this.divElements.push(r)}>
                                <img src={location.image} />
                                <div className="eventText">
                                    <h1><a href={location.website} target="_blank">{location.host}</a></h1>
                                    <h2 className="host">Hosted by {location.host}</h2>
                                    <p className="dates">{location.startDate} {"-"} {location.endDate}</p>
                                    <p className="description">{location.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Map;