// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiEndpoint: 'http://192.168.0.130:8080',
  firebaseConfig: {
    apiKey: "AIzaSyBluB1w-ga3Va_8FVBf3T-6Tu3x7bwY5uE",
    authDomain: "taskman-4face.firebaseapp.com",
    databaseURL: "https://taskman-4face.firebaseio.com",
    projectId: "taskman-4face",
    storageBucket: "taskman-4face.appspot.com",
    messagingSenderId: "1079710720690",
    appId: "1:1079710720690:web:e5e3478f28a18a0da31fab",
    measurementId: "G-9LH24QMPWV"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
