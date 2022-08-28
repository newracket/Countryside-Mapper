import { Component } from "react";
import LocationDataService from "../Services/location.service";
import Location from "./location.component";
import ILocationData from '../Types/location.type';
type Props = {};
type State = {
  locations: Array<ILocationData>,
};
export default class LocationsList extends Component<Props, State> {
  unsubscribe: () => void;
  constructor(props: Props) {
    super(props);
    this.getLocations = this.getLocations.bind(this);
    this.onDataChange = this.onDataChange.bind(this);
    this.state = {
      locations: [],
    };
    this.unsubscribe = () => { };
  }

  componentDidMount() {
    this.unsubscribe = LocationDataService.getAll().orderBy("title", "asc").onSnapshot(this.onDataChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getLocations() {
    return this.state.locations;
  }

  onDataChange(items: any) {
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
    this.setState({
      locations: locations
    });
  }


}