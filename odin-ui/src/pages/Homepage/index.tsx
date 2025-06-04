import React from "react";
import { withLayout } from "../../layouts";
import { DEFAULT_CENTRAL_POSITION, DEFAULT_ZOOM } from "../../constants/map";
import { Map } from "../../components/Map";

export const HomePage: React.FC = withLayout(() => {
  return (
    <Map center={DEFAULT_CENTRAL_POSITION} zoom={DEFAULT_ZOOM} />
  );
});