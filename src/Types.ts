import { LatLngExpression } from "leaflet"

export type LocationData = {
    coords: LatLngExpression;
    name: string;
    host: string;
    startDate: Date;
    endDate: Date;
    description: string;
    imageLocation: string;
    website: string;
}