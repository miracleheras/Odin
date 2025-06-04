import { MapContainer } from "react-leaflet";
import styled from "styled-components";

export const StyledMapContainer = styled(MapContainer)`
  height: 100%;
  width: 100%;
  z-index: 1;
`;

export const ShipPositionControl = styled.div`
  position: absolute;
  top: 100px;
  right: 100px;
  z-index: 1000;
  background-color: white;
  padding: 15px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  gap: 30px;
  min-width: 200px;

  h1 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }
`;

export const StyledInput = styled.input`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #007bff;
  }

  &::placeholder {
    color: #999;
  }
`;

export const StyledButton = styled.button`
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #004085;
  }
`;