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
    // Connect to the WebSocket server
    const socket = io(SOCKET_URL);

    // Listen for data updates
    socket.on("requestedData", (data) => {
      console.log("Received requested data:", data);
      setData(data); // Update the state with live data
    });

    // Cleanup on component unmount
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
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location: ", error);
          alert("Unable to fetch location. Please enable location access.");
          setCurrentLocation({ lat: 17.984, lng: 79.531 }); // Fallback location
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setCurrentLocation({ lat: 17.984, lng: 79.531 }); // Fallback location
    }
  }, []);

  const handleMarkerClick = (point) => {
    setSelectedPoint(point);

    if (currentLocation) {
      const service = new window.google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [currentLocation],
          destinations: [{ lat: point.latitude, lng: point.longitude }],
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === window.google.maps.DistanceMatrixStatus.OK) {
            const distanceText = response.rows[0].elements[0].distance.text;
            setDistance(distanceText);
          } else {
            console.error("Error fetching distance: ", status);
            alert("Unable to fetch distance. Please try again.");
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
              {/* Marker for current location with custom SVG icon */}
              <AdvancedMarker position={currentLocation} title="Your Location">
                <p className="text-2xl">📍</p>
              </AdvancedMarker>

              {/* Markers for other points from WebSocket data */}
              {data.map((point, index) => (
                <AdvancedMarker
                  key={index}
                  position={{ lat: point.latitude, lng: point.longitude }}
                  title={point.name}
                  onClick={() => handleMarkerClick(point)}
                />
              ))}

              {/* InfoWindow for the selected point */}
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
                      {restaurant.address || "Address not available"}
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
