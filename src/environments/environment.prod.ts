// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { constants } from "./constants";
import { endpoints } from "./endpoints";

export const environment = {
  production: true,
  api: {
    url: "http://localhost:8000/api/",
    ...endpoints,
  },
  constants : {
    ...constants
  }
};
