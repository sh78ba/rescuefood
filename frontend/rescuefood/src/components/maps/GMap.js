import React, { useState, useEffect } from "react";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import io from "socket.io-client";

const GMap = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [distance, setDistance] = useState(null);
  const [data, setData] = useState([]); // Data received from WebSocket

  // WebSocket URL
  const SOCKET_URL = "http://localhost:5002"; // Replace with your backend WebSocket server URL

  useEffect(() => {
    const socket = io(SOCKET_URL);
  
    socket.on("requestedData", (data) => {
      console.log("Received requested data:", data);
      setData(
        data.map((point) => ({
          ...point,
          latitude: Number(point.location[0]), // Correcting latitude
          longitude: Number(point.location[1]), // Correcting longitude
        }))
      );
    });
  
    return () => {
      socket.disconnect();
    };
  }, []);

  // Fetch user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: Number(position.coords.latitude),
            lng: Number(position.coords.longitude),
          });
        },
        (error) => {
          console.error("Error getting location: ", error);
          alert("Unable to fetch location. Please enable location access.");
          setCurrentLocation({ lat: 17.984, lng: 79.531 });
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setCurrentLocation({ lat: 17.984, lng: 79.531 });
    }
  }, []);

  const handleMarkerClick = (point) => {
    setSelectedPoint(point);
    setDistance(null); // Reset previous distance

    if (currentLocation) {
      const service = new window.google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [{ lat: currentLocation.lat, lng: currentLocation.lng }],
          destinations: [{ lat: point.latitude, lng: point.longitude }],
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          console.log("Distance Matrix Response:", response, "Status:", status);
          if (
            status === window.google.maps.DistanceMatrixStatus.OK &&
            response.rows.length > 0 &&
            response.rows[0].elements.length > 0
          ) {
            const element = response.rows[0].elements[0];
            if (element.status === "OK" && element.distance) {
              setDistance(element.distance.text);
            } else {
              console.warn("Distance data unavailable:", element.status);
              setDistance("Distance data not available");
            }
          } else {
            console.error("Error fetching distance:", status);
            setDistance("Unable to fetch distance");
          }
        }
      );
    }
  };

  const handleAccept = (point) => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${currentLocation.lat},${currentLocation.lng}&destination=${point.latitude},${point.longitude}&travelmode=driving`;
    window.open(url, "_blank");
  };

  return (
    <APIProvider apiKey={process.env.REACT_APP_MAP_API}>
      <div className="flex flex-col md:flex-row h-screen">
        {/* Map Section */}
        <div className="w-full md:w-3/5 h-[60vh] md:h-full">
          {currentLocation ? (
            <Map
              style={{ width: "100%", height: "100%" }}
              defaultCenter={currentLocation}
              defaultZoom={13}
              mapId={"6d24858ab309337a"}
            >
              {/* Marker for current location */}
              <AdvancedMarker
                position={{
                  lat: currentLocation.lat,
                  lng: currentLocation.lng,
                }}
                title="Your Location"
              >
                <p className="text-2xl">📍</p>
              </AdvancedMarker>

              {/* Markers for other points */}
              {data.map((point, index) => (
                <AdvancedMarker
                  key={index}
                  position={{
                    lat: point.latitude, // Corrected Latitude
                    lng: point.longitude, // Corrected Longitude
                  }}
                  title={point.restaurantEmail || "Unnamed Restaurant"}
                  onClick={() => handleMarkerClick(point)}
                />
              ))}

              {/* InfoWindow */}
              {selectedPoint && (
                <InfoWindow
                  position={{
                    lat: selectedPoint.latitude,
                    lng: selectedPoint.longitude,
                  }}
                  onCloseClick={() => setSelectedPoint(null)}
                >
                  <div>
                    <h3>{selectedPoint.name}</h3>
                    {distance && <p>Distance: {distance}</p>}
                    <button
                      className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
                      onClick={() => handleAccept(selectedPoint)}
                    >
                      Accept
                    </button>
                  </div>
                </InfoWindow>
              )}
            </Map>
          ) : (
            <div className="flex items-center justify-center h-full">
              Loading your location...
            </div>
          )}
        </div>

        {/* Restaurant List */}
        <div className="w-full md:w-2/5 bg-gray-100 overflow-auto h-[40vh] md:h-full p-4">
          <h2 className="text-xl font-bold mb-4">Available Restaurants</h2>
          <ul className="space-y-3">
            {data.length > 0 ? (
              data.map((restaurant, index) => (
                <li
                  key={index}
                  className="p-4 bg-white rounded shadow flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-semibold">{restaurant.name}</h3>
                    <p className="text-sm text-gray-600">
                      {restaurant.restaurantName || "Name not available"}
                    </p>
                  </div>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() => handleMarkerClick(restaurant)}
                  >
                    View
                  </button>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No restaurants available.</p>
            )}
          </ul>
        </div>
      </div>
    </APIProvider>
  );
};

export default GMap;
