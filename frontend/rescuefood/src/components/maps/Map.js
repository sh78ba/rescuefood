import {AdvancedMarker, APIProvider, Map} from '@vis.gl/react-google-maps';

function Map() {
  const position = {lat: 53.54992, lng: 10.00678};

  return (
    <APIProvider apiKey={'YOUR API KEY HERE'}>
      <Map defaultCenter={position} defaultZoom={10} mapId="DEMO_MAP_ID">
        <AdvancedMarker position={position} />
      </Map>
    </APIProvider>
  );
}

export default Map;