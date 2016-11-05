import React, { Component } from 'react';

class Map extends Component {

    constructor(props) {
        super(props);

        this.map = null;
    }

    initializeMap(mapId) {

        var self = this;

        // let minLongitude = 9999;
        // let maxLongitude = -9999;
        // let minLatitude = 9999;
        // let maxLatitude = -9999;

        // for (let segmentIndex = 0; segmentIndex < self.props.activitiesData.length; segmentIndex++) {
        //     let pathToDecode = self.props.activitiesData[segmentIndex].polyline;
        //     let ridePathDecoded = window.google.maps.geometry.encoding.decodePath(pathToDecode);
        //     ridePathDecoded.forEach((location) => {
        //         let longitude = location.lng();
        //         let latitude = location.lat();
        //
        //         if (longitude > maxLongitude) maxLongitude = longitude;
        //         if (longitude < minLongitude) minLongitude = longitude;
        //
        //         if (latitude > maxLatitude) maxLatitude = latitude;
        //         if (latitude < minLatitude) minLatitude = latitude;
        //
        //     });
        // }
        //
        // const longitudeCenter = (minLongitude + maxLongitude) / 2.0;
        // const latitudeCenter = (minLatitude + maxLatitude) / 2.0;

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

//             for (let segmentIndex = 0; segmentIndex < self.props.activitiesData.length; segmentIndex++) {
//
//                 let sourceName = "segment" + segmentIndex.toString();
//                 let lineLayerName = "points" + segmentIndex.toString();
//
//                 const segmentData = self.props.activitiesData[segmentIndex];
//
//                 let pathToDecode = segmentData.polyline;
//                 let ridePathDecoded = window.google.maps.geometry.encoding.decodePath(pathToDecode);
//
//                 let coordinates = [];
//                 ridePathDecoded.forEach((location) => {
//                     let longitude = location.lng();
//                     let latitude = location.lat();
//                     let lngLat = [longitude, latitude];
//                     coordinates.push(lngLat);
//                 });
//
//                 self.activityMap.addSource(sourceName, {
//                     "type": "geojson",
//                     "data": {
//                         "type": "FeatureCollection",
//                         "features": [{
//                             "type": "Feature",
//                             "geometry": {
//                                 "type": "LineString",
//                                 "coordinates": coordinates,
//                             },
//                             "properties": {
//                                 "title": "segment" + segmentIndex.toString()
//                             }
//                         }]
//                     }
//                 });
//
//                 self.activityMap.addLayer({
//                     "id": lineLayerName,
//                     "type": "line",
//                     "source": sourceName,
//                     "layout": {
//                         "line-join": "round",
//                         "line-cap": "round",
//                     },
//                     "paint": {
//                         "line-color": segmentData.strokeColor,
//                         "line-width": 2
//                     }
//                 });
//             }
//
// // create a GeoJSON point to serve as a starting point
//             if (self.props.showMarker) {
//                 let coordinates = [longitudeCenter, latitudeCenter];
//                 if (self.props.mapLatitudeLongitude && self.props.mapLatitudeLongitude.length > 0) {
//                     coordinates = self.props.mapLatitudeLongitude;
//                 }
//                 self.markerPoint = {
//                     "type": "Point",
//                     "coordinates": coordinates
//                 };
//                 self.activityMap.addSource('markerLocation', { type: 'geojson', data: self.markerPoint });
//
//                 self.activityMap.addLayer({
//                     "id": "markerCircle",
//                     "type": "circle",
//                     "source": "markerLocation",
//                     "paint": {
//                         "circle-radius": 8,
//                         "circle-color": "red",
//                         "circle-opacity": 0.8
//                     }
//                 });
//             }
        });
    }

    loadAndRenderMap() {

        if (this.map) return;

        let allDataLoaded = true;
        // if (this.props.activitiesData.length == this.props.totalActivities) {
        //     this.props.activitiesData.forEach( (activityData) => {
        //         if (activityData.polyline == "") {
        //             allDataLoaded = false;
        //         }
        //     });
        // }
        // else {
        //     allDataLoaded = false;
        // }

        if (this.mapBoxMap && allDataLoaded) {

            this.mapBoxMap.style.height = this.props.mapHeight;

            if (!this.map) {
                this.initializeMap("mapBoxMap");
            }
        }
    }

    handleMouseDown(event) {
        console.log("handleMouseDown");
        console.log(event);
    }

    render() {

        var self = this;

        // if (this.activityMap && this.props.showMarker && this.props.mapLatitudeLongitude && this.props.mapLatitudeLongitude.length > 0) {
        //     this.setMarkerPosition();
        // }

        // const mapLegendJSX = this.buildMapLegend(this.props.activitiesData);

        return (
            <div id="mapBoxMap"
                ref={(c) => {
                    self.mapBoxMap = c;
                    self.loadAndRenderMap();
                }}
                onMouseDown={this.handleMouseDown}
            >
            </div>
        );
    }
}

Map.propTypes = {
    mapHeight: React.PropTypes.string.isRequired
};


export default Map;
