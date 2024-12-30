// import React, { useState, useEffect } from 'react';
// import { AdvancedMarker, APIProvider, Map, InfoWindow } from '@vis.gl/react-google-maps';

// const GMap = () => {
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [selectedPoint, setSelectedPoint] = useState(null);
//   const [distance, setDistance] = useState(null);

//   const data = [
//     { name: "Kakatiya", latitude: 17.994691037415638, longitude: 79.56230520493023 },
//     { name: "Sharada Tiffin Center", latitude: 18.005127425843416, longitude: 79.53987011406065 }
//   ];

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setCurrentLocation({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           });
//         },
//         (error) => {
//           console.error("Error getting location: ", error);
//           alert("Unable to fetch location. Please enable location access.");
//           setCurrentLocation({ lat: 17.984, lng: 79.531 }); // Fallback location
//         }
//       );
//     } else {
//       alert("Geolocation is not supported by this browser.");
//       setCurrentLocation({ lat: 17.984, lng: 79.531 }); // Fallback location
//     }
//   }, []);

//   const handleMarkerClick = (point) => {
//     setSelectedPoint(point);

//     if (currentLocation) {
//       const service = new window.google.maps.DistanceMatrixService();
//       service.getDistanceMatrix(
//         {
//           origins: [currentLocation],
//           destinations: [{ lat: point.latitude, lng: point.longitude }],
//           travelMode: window.google.maps.TravelMode.DRIVING,
//         },
//         (response, status) => {
//           if (status === window.google.maps.DistanceMatrixStatus.OK) {
//             const distanceText = response.rows[0].elements[0].distance.text;
//             setDistance(distanceText);
//           } else {
//             console.error("Error fetching distance: ", status);
//             alert("Unable to fetch distance. Please try again.");
//           }
//         }
//       );
//     }
//   };

//   const handleAccept = (point) => {
//     const url = `https://www.google.com/maps/dir/?api=1&origin=${currentLocation.lat},${currentLocation.lng}&destination=${point.latitude},${point.longitude}&travelmode=driving`;
//     window.open(url, "_blank");
//   };

//   return (

//     <APIProvider apiKey={process.env.REACT_APP_MAP_API}>
     
//       {currentLocation ? (
       
//         <Map
//           style={{ width: '100vw', height: '100vh' }}
//           defaultCenter={currentLocation}
//           defaultZoom={13}
//           mapId={'6d24858ab309337a'}
//         >
//           {/* Marker for current location with custom SVG icon */}
//           <AdvancedMarker
//             position={currentLocation}
//             title="Your Location"
            
//           >
//             <p className='text-2xl'>📍</p>
//           </AdvancedMarker>

//           {/* Markers for other points */}
//           {data.map((point, index) => (
//             <AdvancedMarker
//               key={index}
//               position={{ lat: point.latitude, lng: point.longitude }}
//               title={point.name}
//               onClick={() => handleMarkerClick(point)}
//             />
//           ))}

//           {/* InfoWindow for the selected point */}
//           {selectedPoint && (
//             <InfoWindow
//               position={{ lat: selectedPoint.latitude, lng: selectedPoint.longitude }}
//               onCloseClick={() => setSelectedPoint(null)}
//             >
//               <div>
//                 <h3>{selectedPoint.name}</h3>
//                 {distance && <p>Distance: {distance}</p>}
//                 <button onClick={() => handleAccept(selectedPoint)}>Accept</button>
//               </div>
//             </InfoWindow>
//           )}
//         </Map>
//       ) : (
//         <div>Loading your location...</div>
//       )}
//     </APIProvider>
//   );
// };

// export default GMap;

import React, { useState, useEffect } from 'react';
import { AdvancedMarker, APIProvider, Map, InfoWindow } from '@vis.gl/react-google-maps';
import io from 'socket.io-client';

const GMap = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [distance, setDistance] = useState(null);
  const [data, setData] = useState([]); // Data received from WebSocket

  // WebSocket URL
  const SOCKET_URL = 'http://localhost:5002/resturant/donate'; // Replace with your backend WebSocket server URL

  useEffect(() => {
    // Connect to the WebSocket server
    const socket = io(SOCKET_URL);

    // Listen for data updates
    socket.on('update', (newData) => {
      console.log('Data received from socket:', newData);
     // setData(newData); // Update the state with live data
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
      {currentLocation ? (
        <Map
          style={{ width: '100vw', height: '100vh' }}
          defaultCenter={currentLocation}
          defaultZoom={13}
          mapId={'6d24858ab309337a'}
        >
          {/* Marker for current location with custom SVG icon */}
          <AdvancedMarker
            position={currentLocation}
            title="Your Location"
          >
            <p className='text-2xl'>📍</p>
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
              position={{ lat: selectedPoint.latitude, lng: selectedPoint.longitude }}
              onCloseClick={() => setSelectedPoint(null)}
            >
              <div>
                <h3>{selectedPoint.name}</h3>
                {distance && <p>Distance: {distance}</p>}
                <button onClick={() => handleAccept(selectedPoint)}>Accept</button>
              </div>
            </InfoWindow>
          )}
        </Map>
      ) : (
        <div>Loading your location...</div>
      )}
    </APIProvider>
  );
};

export default GMap;
