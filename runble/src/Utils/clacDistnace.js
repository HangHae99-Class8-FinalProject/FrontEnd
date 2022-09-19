import { getDistanceBetween } from "geolocation-distance-between";

const calcDistance = ({ path }) => {
  let distanceBetween = 0;
  if (1 < path.length) {
    for (let i = 0; i < path.length; i++) {
      if (path.length - 1 === i) {
        distanceBetween += getDistanceBetween(
          { latitude: path[i]?.lat, longitude: path[i]?.lng },
          { latitude: path[i]?.lat, longitude: path[i]?.lng }
        );
      } else {
        distanceBetween += getDistanceBetween(
          { latitude: path[i]?.lat, longitude: path[i]?.lng },
          {
            latitude: path[i + 1]?.lat,
            longitude: path[i + 1]?.lng
          }
        );
      }
    }
  }
  return distanceBetween;
};

export default calcDistance;
