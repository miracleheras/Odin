import { DEFAULT_CENTRAL_POSITION, DEFAULT_ZOOM, SAR_IMAGE_COORDS, DEFAULT_SHIP_POSITION } from "../../constants";
import { TileLayer, ImageOverlay, Marker, Popup } from "react-leaflet";
import { Lighthouse, Position } from "../../types";
import { ShipPositionControl, StyledMapContainer, StyledInput, StyledButton } from "./style";
import 'leaflet/dist/leaflet.css';
import { LatLngBounds, Icon } from 'leaflet';
import { useEffect, useState } from 'react';

import lighthouseIcon from '../../assets/lighthouse.svg';
import shipIcon from '../../assets/ship.svg';
import { fetchImage, fetchLighthouses } from "../../services/api";

interface MapProps {
    center?: Position;
    zoom?: number;
}

const customLighthouseIcon = new Icon({
    iconUrl: lighthouseIcon,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24]
});

const customShipIcon = new Icon({
    iconUrl: shipIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
});

export const Map: React.FC<MapProps> = ({
    center = DEFAULT_CENTRAL_POSITION,
    zoom = DEFAULT_ZOOM,
}) => {
    const [lighthouses, setLighthouses] = useState<Lighthouse[]>([]);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [shipPosition, setShipPosition] = useState<Position>(DEFAULT_SHIP_POSITION);
    const [inputErrors, setInputErrors] = useState<{ lat?: string; lng?: string }>({});

    useEffect(() => {
        const loadLighthouses = async () => {
            try {
                const fetchedLighthouses = await fetchLighthouses();
                setLighthouses(fetchedLighthouses);
            } catch (error) {
                console.error('Failed to fetch lighthouses:', error);
            }
        };

        const loadImage = async () => {
            try {
                const fetchedImage = await fetchImage();
                setImageUrl(fetchedImage);
            } catch (error) {
                console.error('Failed to fetch image:', error);
            }
        };

        loadLighthouses();
        loadImage();
    }, []);

    const validatePosition = (value: string, type: 'lat' | 'lng'): boolean => {
        if (!value || value.trim() === '') {
            setInputErrors(prev => ({ ...prev, [type]: 'Value cannot be empty' }));
            return false;
        }

        const numValue = parseFloat(value);
        if (isNaN(numValue)) {
            setInputErrors(prev => ({ ...prev, [type]: 'Must be a valid number' }));
            return false;
        }

        if (type === 'lat' && (numValue < -90 || numValue > 90)) {
            setInputErrors(prev => ({ ...prev, [type]: 'Latitude must be between -90 and 90' }));
            return false;
        }

        if (type === 'lng' && (numValue < -180 || numValue > 180)) {
            setInputErrors(prev => ({ ...prev, [type]: 'Longitude must be between -180 and 180' }));
            return false;
        }

        setInputErrors(prev => ({ ...prev, [type]: undefined }));
        return true;
    };

    const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'lat' | 'lng') => {
        const value = e.target.value;
        if (validatePosition(value, type)) {
            setShipPosition(prev => ({
                ...prev,
                [type]: parseFloat(value)
            }));
        }
    };

    const imageBounds = new LatLngBounds(
        [SAR_IMAGE_COORDS[0].lng, SAR_IMAGE_COORDS[0].lat],
        [SAR_IMAGE_COORDS[2].lng, SAR_IMAGE_COORDS[2].lat]
    );

    return (
        <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
            <ShipPositionControl>
                <h1>Ship Position</h1>
                <div>
                    <StyledInput
                        type="number"
                        value={shipPosition.lat}
                        onChange={(e) => handlePositionChange(e, 'lat')}
                        placeholder="Latitude"
                        step="0.00001"
                        min="-90"
                        max="90"
                    />
                    {inputErrors.lat && <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{inputErrors.lat}</div>}
                </div>
                <div>
                    <StyledInput
                        type="number"
                        value={shipPosition.lng}
                        onChange={(e) => handlePositionChange(e, 'lng')}
                        placeholder="Longitude"
                        step="0.00001"
                        min="-180"
                        max="180"
                    />
                    {inputErrors.lng && <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{inputErrors.lng}</div>}
                </div>
                <StyledButton onClick={() => setShipPosition(DEFAULT_SHIP_POSITION)}>
                    Reset Position
                </StyledButton>
            </ShipPositionControl>
            <StyledMapContainer center={center} zoom={zoom} scrollWheelZoom={true} boxZoom={true}>
                <TileLayer
                    url={`${process.env.REACT_APP_MAP_URL}`}
                />
                <ImageOverlay
                    url={imageUrl}
                    bounds={imageBounds}
                    opacity={1}
                />
                <Marker
                    position={[shipPosition.lat, shipPosition.lng]}
                    icon={customShipIcon}
                >
                    <Popup>
                        <div>
                            <h3>Ship Location</h3>
                            <p>Latitude: {shipPosition.lat}</p>
                            <p>Longitude: {shipPosition.lng}</p>
                        </div>
                    </Popup>
                </Marker>
                {lighthouses.map((lighthouse, index) => (
                    <Marker
                        key={index}
                        position={[lighthouse.latitude, lighthouse.longitude]}
                        icon={customLighthouseIcon}
                    >
                        <Popup>
                            <div>
                                <h3>{lighthouse.name}</h3>
                                <p>Range: {lighthouse.range}</p>
                                <p>Type: {lighthouse.type}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </StyledMapContainer>
        </div>
    );
};