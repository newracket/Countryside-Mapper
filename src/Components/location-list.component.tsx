import { Component } from "react";
import LocationDataService from "../Services/location.service";
import Location from "./location.component";
import ILocationData from '../Types/location.type';
type Props = {};
type State = {
  locations: Array<ILocationData>,
  currentLocation: ILocationData | null,
  currentIndex: number
};
export default class LocationsList extends Component<Props, State> {
  unsubscribe: () => void;
  constructor(props: Props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveLocation = this.setActiveLocation.bind(this);
    this.onDataChange = this.onDataChange.bind(this);
    this.state = {
      locations: [],
      currentLocation: null,
      currentIndex: -1
    };
    this.unsubscribe = () => { };
  }
  componentDidMount() {
    this.unsubscribe = LocationDataService.getAll().orderBy("title", "asc").onSnapshot(this.onDataChange);
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  onDataChange(items: any) {
    let locations = new Array<ILocationData>();
    items.forEach((item: any) => {
      let id = item.id;
      let data = item.data();
      locations.push({
        id: id,
        title: data.title,
        description: data.description,
        date: data.date,
        published: data.published
      });
    });
    this.setState({
      locations: locations
    });
  }
  refreshList() {
    this.setState({
      currentLocation: null,
      currentIndex: -1
    });
  }
  setActiveLocation(location: ILocationData, index: number) {
    this.setState({
      currentLocation: location,
      currentIndex: index
    });
  }
}