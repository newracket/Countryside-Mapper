import React from "react";
import CustomNavbar from "../Components/CustomNavbar";
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { LatLngExpression } from "leaflet";
import LocationDataService from "../Services/location.service";
import { ILocationData } from '../Types';

interface Props {
    position: LatLngExpression;
}

interface State {
    focusedElementIndex: number | null;
    searchValue: string;
    locations: any[];
}

class Map extends React.Component<Props, State> {
    divElements: any[];
    timeout: any;
    locationsListElement: any;

    constructor(props: Props) {
        super(props);

        this.state = { focusedElementIndex: null, searchValue: "", locations: [] };
        this.divElements = [];
        this.locationsListElement = React.createRef();

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
            this.locationsListElement.current.scrollBy(0, -10);
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

    filterWithSearch(element: ILocationData) {
        if (this.state.searchValue.length === 0) return true;

        const v = (
            element.title.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
            element.host.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
            element.description.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
            element.website.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
            element.email.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
            element.number.toLowerCase().includes(this.state.searchValue.toLowerCase())
        );
        return v;
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

                        {this.state.locations.filter(this.filterWithSearch).map((location, i) => (
                            <Marker position={location.coords as LatLngExpression} key={i} eventHandlers={{
                                click: (e) => {
                                    this.focusElement(i);
                                }
                            }} />
                        ))}
                    </MapContainer>
                    <div className="locationsContainer">
                        <input name="search" id="search" className="form-control" placeholder="Search" type="text" onChange={this.searchChanged} autoComplete="off" />
                        <div className="locationsList" ref={this.locationsListElement}>

                            {this.state.locations.filter(this.filterWithSearch).map((location, i) => {
                                return (
                                    <div className={`eventGroup${this.state.focusedElementIndex === i ? " focus" : ""}`} key={i} ref={r => this.divElements.push(r)}>
                                        <img src={location.image} />
                                        <div className="eventText">
                                            <h1><a href={location.website} target="_blank">{location.title}</a></h1>
                                            <h2 className="host">Hosted by {location.host}</h2>
                                            <p className="dates">{new Date(location.startDate).toLocaleString("en-us", { dateStyle: "short", timeStyle: "short" })} - {new Date(location.endDate).toLocaleString("en-us", { dateStyle: "short", timeStyle: "short" })}</p>

                                            <p className="description">{location.description}</p>
                                            <p className="contacts"><strong>Email:</strong> {location.email}, <strong>Phone Number</strong>: {location.number}</p>
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