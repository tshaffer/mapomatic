import React, { Component } from 'react';

export default class Map extends Component {

    constructor(props) {
        super(props);

        this.map = null;
        this.nearbySegmentsDisplayed = false;

        this.strokeColors = ["red", "blue", "purple", "green", "orange", "pink", "violet", "brown", "maroon", "salmon"];
    }

    initializeMap(mapId) {

        var self = this;

        let minLatitude = 37.00198;
        let maxLatitude = 37.02391;
        let minLongitude = -122.08485;
        let maxLongitude = -122.05154;

        const longitudeCenter = -122.068195;
        const latitudeCenter = 37.012945;

        window.mapboxgl.accessToken = 'pk.eyJ1IjoidGVkc2hhZmZlciIsImEiOiJjaXN2cjR4dXIwMjgwMm9wZ282cmk0aTgzIn0.9EtSUOr_ofLcwCDLM6FUHw';
        this.map = new window.mapboxgl.Map({
            container: 'mapBoxMap', // container id
            style: 'mapbox://styles/tedshaffer/citagbl4b000h2iqbkgub0t26',
        });

        this.map.addControl(new window.mapboxgl.Navigation());

        this.map.on('click', (event) => {
            console.log("map click");
            console.log(event);

            const lat = event.lngLat.lat;
            const lng = event.lngLat.lng;

            const latDelta = 0.005;
            const lngDelta = 0.0083275;

            // swLat, swLng, neLat, neLng
            const swLat = lat - latDelta;
            const swLng = lng - lngDelta;
            const neLat = lat + latDelta;
            const neLng = lng + lngDelta;

            this.props.onExploreSegments(swLat, swLng, neLat, neLng);

            const swBounds = [
                swLng,
                swLat
            ];
            const neBounds = [
                neLng,
                neLat
            ];
            this.map.fitBounds([swBounds, neBounds]);
        });

        this.map.on('load', function () {

            // experiment on adding padding around bounds - instead of a fixed value, perhaps it should be a percentage based on bounds
            const padding = 0.005;
            minLatitude -= padding;
            maxLatitude += padding;

            minLongitude -= padding;
            maxLongitude += padding;

            const minBounds = [
                minLongitude,
                minLatitude
            ];

            const maxBounds = [
                maxLongitude,
                maxLatitude
            ];

            self.map.fitBounds([minBounds, maxBounds]);
        });
    }

    loadAndRenderMap() {

        if (this.map) return;

        let allDataLoaded = true;

        if (this.mapBoxMap && allDataLoaded) {

            this.mapBoxMap.style.height = this.props.mapHeight;

            if (!this.map) {
                this.initializeMap("mapBoxMap");
            }
        }
    }

    displayNearbySegments(nearbySegments) {

        // other potential colours: brown

        nearbySegments.forEach( (nearbySegment, index) => {

            const sourceName = "segment" + index.toString();
            const lineLayerName = "points" + index.toString();

            const pathToDecode = nearbySegment.points;
            const ridePathDecoded = window.google.maps.geometry.encoding.decodePath(pathToDecode);

            let coordinates = [];
            ridePathDecoded.forEach((location) => {
                let longitude = location.lng();
                let latitude = location.lat();
                let lngLat = [longitude, latitude];
                coordinates.push(lngLat);
            });

            this.map.addSource(sourceName, {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "geometry": {
                            "type": "LineString",
                            "coordinates": coordinates,
                        },
                        "properties": {
                            "title": "segment" + index.toString()
                        }
                    }]
                }
            });

            this.map.addLayer({
                "id": lineLayerName,
                "type": "line",
                "source": sourceName,
                "layout": {
                    "line-join": "round",
                    "line-cap": "round",
                },
                "paint": {
                    "line-color": this.strokeColors[index],
                    "line-width": 2
                }
            });
        });
    }

    render() {

        var self = this;

        if (!this.nearbySegmentsDisplayed && this.props.nearbySegments.length > 0) {
            this.displayNearbySegments(this.props.nearbySegments);
            this.nearbySegmentsDisplayed = true;
        }

        return (
            <div id="mapBoxMap"
                ref={(c) => {
                    self.mapBoxMap = c;
                    self.loadAndRenderMap();
                }}
            >
            </div>
        );

    }
}

Map.propTypes = {
    mapHeight: React.PropTypes.string.isRequired,
    onExploreSegments: React.PropTypes.func.isRequired,
    nearbySegments: React.PropTypes.array.isRequired
};
