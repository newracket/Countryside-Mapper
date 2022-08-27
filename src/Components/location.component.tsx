import { Component, ChangeEvent } from "react";
import LocationDataService from "../Services/location.service";
import ILocationData from "../Types/location.type";
type Props = {
  location: ILocationData,
  refreshList: Function
};
type State = {
  currentLocation: ILocationData;
  message: string;
}
export default class Location extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.deleteLocation = this.deleteLocation.bind(this);
    this.state = {
      currentLocation: {
        id: null,
        title: "",
        description: "",
        date: "",
        published: false,
      },
      message: "",
    };
  }
  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const { location } = nextProps;
    if (prevState.currentLocation.id !== location.id) {
      return {
        currentLocation: location,
        message: ""
      };
    }
    return prevState.currentLocation;
  }
  componentDidMount() {
    this.setState({
      currentLocation: this.props.location,
    });
  }
  onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    const title = e.target.value;
    this.setState(function (prevState: State) {
      return {
        currentLocation: {
          ...prevState.currentLocation,
          title: title,
        },
      };
    });
  }
  onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    const description = e.target.value;
    this.setState((prevState) => ({
      currentLocation: {
        ...prevState.currentLocation,
        description: description,
      },
    }));
  }
  onChangeDate(e: ChangeEvent<HTMLInputElement>) {
    const date = e.target.value;
    this.setState((prevState) => ({
      currentLocation: {
        ...prevState.currentLocation,
        date: date,
      },
    }));
  }
  updatePublished(status: boolean) {
    if (this.state.currentLocation.id) {
      LocationDataService.update(this.state.currentLocation.id, {
        published: status,
      })
        .then(() => {
          this.setState((prevState) => ({
            currentLocation: {
              ...prevState.currentLocation,
              published: status,
            },
            message: "The status was updated successfully!",
          }));
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  }
  updateLocation() {
    if (this.state.currentLocation.id) {
      const data = {
        title: this.state.currentLocation.title,
        description: this.state.currentLocation.description,
        date: this.state.currentLocation.date
      };
      LocationDataService.update(this.state.currentLocation.id, data)
        .then(() => {
          this.setState({
            message: "The location was updated successfully!",
          });
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  }
  deleteLocation() {
    if (this.state.currentLocation.id) {
      LocationDataService.delete(this.state.currentLocation.id)
        .then(() => {
          this.props.refreshList();
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  }
}