import { Injectable } from "@angular/core";
import axios, { AxiosRequestConfig, AxiosPromise } from "axios";

@Injectable({
  providedIn: "root"
})
export class ApiWrapperService {
  proxyurl = "https://cors-anywhere.herokuapp.com/";
  BASE_URL = "https://x1z4ftgmb4.execute-api.us-east-1.amazonaws.com/";
  INSTANCE;

  constructor() {
    this.INSTANCE = axios.create({
      baseURL: this.proxyurl + this.BASE_URL,
      timeout: 1000000,
      headers: {}
    });
  }

  async permute(params) {
    return this.INSTANCE.get("/", {
      params: {
        params
      }
      })
      .then(function (response) {
        return {
          response: response,
          isError: false
        };
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code that falls out of the range of 2xx
          console.log("Error", error);
          return {
            response: error,
            isError: true
          };
        } else if (error.request) {
          // The request was made but no response was received
          console.log("Error", error);
          return {
            response: error,
            isError: true
          };
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
          return {
            response: error,
            isError: true
          };
        }
      });
  }
}
