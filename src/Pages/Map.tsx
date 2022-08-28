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
<<<<<<< HEAD
    searchValue: string;
=======
    locations: any[];
>>>>>>> chris
}

class Map extends React.Component<Props, State> {
    divElements: any[];
    timeout: any;
<<<<<<< HEAD
    locationsListElement: any;
=======
    // locations!: LocationList;
>>>>>>> chris

    static defaultProps: Props = {
        position: [0.789, 113.921],
<<<<<<< HEAD
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
            coords: [2.721, 114.255],
            name: "Event 2",
            host: "Host 2",
            startDate: new Date(),
            endDate: new Date(),
            description: "Description 2",
            imageLocation: "plants2.jpg",
            website: "https://google.com",
            email: "abc@gmail.com",
            phone: "111-111-1111"
        }, {
            coords: [-0.812, 112.255],
            name: "Event 3",
            host: "Host 3",
            startDate: new Date(),
            endDate: new Date(),
            description: "Description 3",
            imageLocation: "plants3.jpg",
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
            imageLocation: "plants4.webp",
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
            imageLocation: "plants5.jpg",
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
            imageLocation: "plants6.jpg",
            website: "https://google.com",
            email: "abc@gmail.com",
            phone: "111-111-1111"
        }]
=======
>>>>>>> chris
    };

    constructor(props: Props) {
        super(props);

<<<<<<< HEAD
        this.state = { focusedElementIndex: null, searchValue: "" };
        this.divElements = [];
        this.locationsListElement = React.createRef();

        this.focusElement = this.focusElement.bind(this);
        this.searchChanged = this.searchChanged.bind(this);
        this.filterWithSearch = this.filterWithSearch.bind(this);
=======
        this.state = { focusedElementIndex: null, locations: [] };
        this.divElements = [];

        // this.locations = new LocationList({});
>>>>>>> chris
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
            this.locationsListElement.current.scrollBy(0, -10);
            this.timeout = setTimeout(() => this.focusElement(null), 2000);
        }
    }

<<<<<<< HEAD
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

=======
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

>>>>>>> chris
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

<<<<<<< HEAD
                        {this.props.locations.filter(this.filterWithSearch).map((location, i) => (
                            <Marker position={location.coords} key={i} eventHandlers={{
=======

                        {this.state.locations.map((location, i) => (
                            <Marker position={location.coords as LatLngExpression} key={i} eventHandlers={{
>>>>>>> chris
                                click: (e) => {
                                    this.focusElement(i);
                                }
                            }} />
                        ))}
                    </MapContainer>
<<<<<<< HEAD
                    <div className="locationsContainer">
                        <input name="search" id="search" className="form-control" placeholder="Search" type="text" onChange={this.searchChanged} autoComplete="off" />
                        <div className="locationsList" ref={this.locationsListElement}>

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
=======
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
>>>>>>> chris
                    </div>
                </div>
            </div>
        );
    }
}

export default Map;