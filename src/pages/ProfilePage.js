import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import pinIcon from './pin.png'; // Import the custom pin image

// Define the custom icon using Leaflet's L.icon
const customIcon = L.icon({
    iconUrl: pinIcon,
    iconSize: [38, 38], // Customize size as needed
    iconAnchor: [19, 38], // Anchor point for the bottom-center alignment
    popupAnchor: [0, -38], // Popup position relative to the marker
});

