import { render, screen, fireEvent } from '@testing-library/react';
import { Map } from './index';
import { DEFAULT_CENTRAL_POSITION, DEFAULT_ZOOM } from '../../constants';

jest.mock('styled-components', () => ({
    __esModule: true,
    default: {
        div: () => 'div',
    },
}));

jest.mock('react-leaflet', () => ({
    MapContainer: () => null,
    TileLayer: () => null,
    ImageOverlay: () => null,
    Marker: () => null,
    Popup: () => null,
}));

jest.mock('../../services/api', () => ({
    fetchLighthouses: jest.fn().mockResolvedValue([]),
    fetchImage: jest.fn().mockResolvedValue('test-image-url'),
}));

jest.mock('./style', () => ({
    StyledMapContainer: 'div',
    ShipPositionControl: 'div',
    StyledInput: 'input',
    StyledButton: 'button',
}));

describe('Map Component', () => {
    it('renders with default props', () => {
        render(<Map />);
        expect(screen.getByText('Ship Position')).toBeInTheDocument();
    });

    it('renders with custom center and zoom', () => {
        const customCenter = { lat: 60, lng: 20 };
        const customZoom = 10;
        render(<Map center={customCenter} zoom={customZoom} />);
        expect(screen.getByText('Ship Position')).toBeInTheDocument();
    });

    it('handles latitude input validation', () => {
        render(<Map />);
        const latInput = screen.getByPlaceholderText('Latitude');
        
        fireEvent.change(latInput, { target: { value: '100' } });
        expect(screen.getByText('Latitude must be between -90 and 90')).toBeInTheDocument();
        
        fireEvent.change(latInput, { target: { value: '45' } });
        expect(screen.queryByText('Latitude must be between -90 and 90')).not.toBeInTheDocument();
    });

    it('handles longitude input validation', () => {
        render(<Map />);
        const lngInput = screen.getByPlaceholderText('Longitude');
        
        fireEvent.change(lngInput, { target: { value: '200' } });
        expect(screen.getByText('Longitude must be between -180 and 180')).toBeInTheDocument();
        
        fireEvent.change(lngInput, { target: { value: '45' } });
        expect(screen.queryByText('Longitude must be between -180 and 180')).not.toBeInTheDocument();
    });
}); 