import '@types/google.maps';

// https://stackoverflow.com/questions/56653284/how-to-fix-type-error-in-angular-google-maps
declare global {
  interface Window {
    google: typeof google;
  }
}