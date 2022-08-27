import firebase from "../firebase";
import ILocationData from "../Types/location.type"
const db = firebase.firestore().collection("locations")

class LocationDataService {

  getAll() {
    return db;
  }

  create(location: ILocationData) {
    return db.add(location);
  }

  update(id: string, value: any) {
    return db.doc(id).update(value);
  }

  delete(id: string) {
    return db.doc(id).delete();
  }
}
export default new LocationDataService();
