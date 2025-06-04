import axios from "axios";
import { Lighthouse } from "../types";

export const fetchLighthouses = async (): Promise<Lighthouse[]> => {
    const response = await axios.get<Lighthouse[]>(`${process.env.REACT_APP_API_BASE_URL}/lighthouses`);
    return response.data;
};

export const fetchImage = async (): Promise<string> => {
    return `${process.env.REACT_APP_API_BASE_URL}/image`;
};