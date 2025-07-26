export const calculateWalkingTime = (
    latitude: number,
    longitude: number,
    destinationLatitude: number,
    destinationLongitude: number
  ): number => {
    const R = 6371000; // Earth's radius in meters
    const toRadians = (deg: number) => (deg * Math.PI) / 180;
  
    const latRad = toRadians((latitude + destinationLatitude) / 2);
    const dLat = toRadians(destinationLatitude - latitude);
    const dLon = toRadians(destinationLongitude - longitude);
  
    const x = dLon * Math.cos(latRad);
    const y = dLat;
    const distance = Math.sqrt(x * x + y * y) * R; // meters
  
    const walkingSpeed = 1.0; // meters per second (~5 km/h)
    const walkingTimeInSeconds = distance / walkingSpeed;
    const walkingTimeInMinutes = walkingTimeInSeconds / 60;
  
    return Math.round(walkingTimeInMinutes);
  };
  