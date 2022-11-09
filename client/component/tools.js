import axios from "axios";
import { URL } from "@env";
export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
// export const BASE_OUR_API_URL = "https://onservic-server.onrender.com";
// export const BASE_OUR_API_URL = "http:/192.168.18.7:3001";
export const BASE_OUR_API_URL = "http://172.105.253.132:3001";

export const axiosInstance = axios.create({
  baseURL: BASE_OUR_API_URL + "/v1/api/",

  // baseURL: URL,
  headers: { "Content-Type": "application/json" },
});
