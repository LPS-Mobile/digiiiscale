import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

export default function Map(props) {
    const { route, types = true, height_ } = props
    const MARKUPS = [[51.505, -0.09], [51.505, -0.02], [51.505, -0.12], [51.520, -0.10], [51.520, -0.05],
    [51.540, -0.05], [51.540, -0.09], [51.540, -0.02], [51.540, -0.12], [51.480, -0.10], [51.480, -0.05],
    [51.450, -0.09], [51.450, -0.02], [51.450, -0.12], [51.580, -0.10], [51.580, -0.05],
    [51.580, -0.05], [51.540, -0.09], [51.600, -0.02], [51.600, -0.12], [51.440, -0.10], [51.440, -0.05],
    [51.490, 0.1]
    ]
    return (<>
        {types && <div className="product_types">
            <ul>
                <li><span>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" viewBox="0 0 31.955 31.955">
                        <g>
                            <path d="M27.25,4.655C20.996-1.571,10.88-1.546,4.656,4.706C-1.571,10.96-1.548,21.076,4.705,27.3   c6.256,6.226,16.374,6.203,22.597-0.051C33.526,20.995,33.505,10.878,27.25,4.655z" />
                            <path d="M13.288,23.896l-1.768,5.207c2.567,0.829,5.331,0.886,7.926,0.17l-0.665-5.416   C17.01,24.487,15.067,24.5,13.288,23.896z M8.12,13.122l-5.645-0.859c-0.741,2.666-0.666,5.514,0.225,8.143l5.491-1.375   C7.452,17.138,7.426,15.029,8.12,13.122z M28.763,11.333l-4.965,1.675c0.798,2.106,0.716,4.468-0.247,6.522l5.351,0.672   C29.827,17.319,29.78,14.193,28.763,11.333z M11.394,2.883l1.018,5.528c2.027-0.954,4.356-1.05,6.442-0.288l1.583-5.137   C17.523,1.94,14.328,1.906,11.394,2.883z" />
                            <circle cx="15.979" cy="15.977" r="6.117" />
                        </g>
                    </svg>
                </span>

                    Flower</li>
                <li><span>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" viewBox="0 0 31.955 31.955">
                        <g>
                            <path d="M27.25,4.655C20.996-1.571,10.88-1.546,4.656,4.706C-1.571,10.96-1.548,21.076,4.705,27.3   c6.256,6.226,16.374,6.203,22.597-0.051C33.526,20.995,33.505,10.878,27.25,4.655z" />
                            <path d="M13.288,23.896l-1.768,5.207c2.567,0.829,5.331,0.886,7.926,0.17l-0.665-5.416   C17.01,24.487,15.067,24.5,13.288,23.896z M8.12,13.122l-5.645-0.859c-0.741,2.666-0.666,5.514,0.225,8.143l5.491-1.375   C7.452,17.138,7.426,15.029,8.12,13.122z M28.763,11.333l-4.965,1.675c0.798,2.106,0.716,4.468-0.247,6.522l5.351,0.672   C29.827,17.319,29.78,14.193,28.763,11.333z M11.394,2.883l1.018,5.528c2.027-0.954,4.356-1.05,6.442-0.288l1.583-5.137   C17.523,1.94,14.328,1.906,11.394,2.883z" />
                            <circle cx="15.979" cy="15.977" r="6.117" />
                        </g>
                    </svg>
                </span>
                    Non Flower</li>
                <li><span>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" viewBox="0 0 31.955 31.955">
                        <g>
                            <path d="M27.25,4.655C20.996-1.571,10.88-1.546,4.656,4.706C-1.571,10.96-1.548,21.076,4.705,27.3   c6.256,6.226,16.374,6.203,22.597-0.051C33.526,20.995,33.505,10.878,27.25,4.655z" />
                            <path d="M13.288,23.896l-1.768,5.207c2.567,0.829,5.331,0.886,7.926,0.17l-0.665-5.416   C17.01,24.487,15.067,24.5,13.288,23.896z M8.12,13.122l-5.645-0.859c-0.741,2.666-0.666,5.514,0.225,8.143l5.491-1.375   C7.452,17.138,7.426,15.029,8.12,13.122z M28.763,11.333l-4.965,1.675c0.798,2.106,0.716,4.468-0.247,6.522l5.351,0.672   C29.827,17.319,29.78,14.193,28.763,11.333z M11.394,2.883l1.018,5.528c2.027-0.954,4.356-1.05,6.442-0.288l1.583-5.137   C17.523,1.94,14.328,1.906,11.394,2.883z" />
                            <circle cx="15.979" cy="15.977" r="6.117" />
                        </g>
                    </svg>
                </span>
                    Miscellianies Products</li>
            </ul>
        </div>}


        <div className="location_map" style={{ height: height_ }}>
            <MapContainer className="markup-map" center={[51.505, -0.09]} zoom={11} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a hr="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {route ? <Routing /> :
                    (MARKUPS.map((e, i) => {
                        return <Marker position={e} key={i}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    }))}
            </MapContainer>
        </div>

        {/* <p className="map_bottom_title">
            Tap map to enlarge
        </p> */}
    </>
    )
}

L.Marker.prototype.options.icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
});

function Routing() {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        const routingControl = L.Routing.control({
            waypoints: [L.latLng(57.74, 11.94), L.latLng(57.6792, 11.949)],
            routeWhileDragging: true
        }).addTo(map);

        return () => map.removeControl(routingControl);
    }, [map]);

    return null;
}
