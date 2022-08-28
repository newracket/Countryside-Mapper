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
    this.onChangeHost = this.onChangeHost.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeStart = this.onChangeStart.bind(this);
    this.onChangeEnd = this.onChangeEnd.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onChangeWeb = this.onChangeWeb.bind(this);
    this.onChangeCord = this.onChangeCord.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.deleteLocation = this.deleteLocation.bind(this);
    this.state = {
      currentLocation: {
        id: null,
        host: "",
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        image: "",
        website: "",
        coords: [],
        email: "",
        number: ""
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
  onChangeHost(e: ChangeEvent<HTMLInputElement>) {
    const host = e.target.value;
    this.setState(function (prevState: State) {
      return {
        currentLocation: {
          ...prevState.currentLocation,
          host: host,
        },
      };
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
  onChangeStart(e: ChangeEvent<HTMLInputElement>) {
    const startDate = e.target.value;
    this.setState((prevState) => ({
      currentLocation: {
        ...prevState.currentLocation,
        startDate: startDate,
      },
    }));
  }
  onChangeEnd(e: ChangeEvent<HTMLInputElement>) {
    const endDate = e.target.value;
    this.setState((prevState) => ({
      currentLocation: {
        ...prevState.currentLocation,
        endDate: endDate,
      },
    }));
  }
  onChangeImage(e: ChangeEvent<HTMLInputElement>) {
    const image = e.target.value;
    this.setState((prevState) => ({
      currentLocation: {
        ...prevState.currentLocation,
        image: image,
      },
    }));
  }
  onChangeWeb(e: ChangeEvent<HTMLInputElement>) {
    const website = e.target.value;
    this.setState((prevState) => ({
      currentLocation: {
        ...prevState.currentLocation,
        website: website,
      },
    }));
  }
  onChangeCord(e: ChangeEvent<HTMLInputElement>) {
    const cord = e.target.value;
    this.setState((prevState) => ({
      currentLocation: {
        ...prevState.currentLocation,
        website: cord,
      },
    }));
  }
  onChangeEmail(e: ChangeEvent<HTMLInputElement>) {
    const email = e.target.value;
    this.setState((prevState) => ({
      currentLocation: {
        ...prevState.currentLocation,
        email: email,
      },
    }));
  }
  onChangeNumber(e: ChangeEvent<HTMLInputElement>) {
    const num = e.target.value;
    this.setState((prevState) => ({
      currentLocation: {
        ...prevState.currentLocation,
        number: num,
      },
    }));
  }
  updateLocation() {
    if (this.state.currentLocation.id) {
      const data = {
        host: this.state.currentLocation.host,
        title: this.state.currentLocation.title,
        description: this.state.currentLocation.description,
        startDate: this.state.currentLocation.startDate,
        endDate: this.state.currentLocation.endDate,
        image: this.state.currentLocation.image,
        website: this.state.currentLocation.website,
        coords: this.state.currentLocation.coords,
        email: this.state.currentLocation.email,
        number: this.state.currentLocation.number
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