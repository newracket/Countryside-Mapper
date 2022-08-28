import { Component, ChangeEvent } from "react";
import { isJSDocThisTag } from "typescript";
import LocationDataService from "../Services/location.service";
import ILocationData from '../Types/location.type';

type Props = {};
type State = ILocationData & {
  submitted: boolean
};

export default class AddLocation extends Component<Props, State> {
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
    this.saveLocation = this.saveLocation.bind(this);
    this.newLocation = this.newLocation.bind(this);
    this.state = {
      host: "",
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      image: "",
      website: "",
      coords: [],
      email: "",
      number: "",
      submitted: false
    };
  }
  onChangeHost(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      host: e.target.value,
    });
  }
  onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      title: e.target.value,
    });
  }
  onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      description: e.target.value,
    });
  }
  onChangeStart(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      startDate: e.target.value,
    });
  }
  onChangeEnd(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      endDate: e.target.value,
    });
  }
  onChangeImage(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      image: e.target.value,
    });
  }
  onChangeWeb(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      website: e.target.value,
    });
  }
  onChangeCord(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      //Change thing into an array with [lat, long]
      coords: []
    });
  }
  onChangeEmail(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      email: e.target.value,
    });
  }
  onChangeNumber(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      number: e.target.value,
    });
  }
  saveLocation() {
    let data = {
      host: this.state.host,
      title: this.state.title,
      description: this.state.description,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      image: this.state.image,
      website: this.state.website,
      coords: this.state.coords,
      email: this.state.email,
      number: this.state.number
    };
    LocationDataService.create(data)
      .then(() => {
        console.log("Created new item successfully!");
        this.setState({
          submitted: true,
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  newLocation() {
    this.setState({
      host: "",
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      image: "",
      website: "",
      coords: [],
      email: "",
      number: "",
      submitted: false,
    });
  }
}