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
    email: string;
    phone: string;
}

export interface ILocationData {
    id?: string | null,
    host: string,
    title: string,
    description: string,
    startDate: string,
    endDate: string,
    image: string,
    website: string,
    coords: number[],
    email: string,
    number: string
}