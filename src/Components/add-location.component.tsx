import { Component, ChangeEvent } from "react";
import LocationDataService from "../Services/location.service";
import ILocationData from '../Types/location.type';

type Props = {};
type State = ILocationData & {
  submitted: boolean
};

export default class AddLocation extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveLocation = this.saveLocation.bind(this);
    this.newLocation = this.newLocation.bind(this);
    this.state = {
      title: "",
      description: "",
      date: "",
      published: false,
      submitted: false,
    };
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
  onChangeDate(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      date: e.target.value,
    });
  }
  saveLocation() {
    let data = {
      title: this.state.title,
      description: this.state.description,
      date: this.state.date,
      published: false
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
      title: "",
      description: "",
      date: "",
      published: false,
      submitted: false,
    });
  }
}