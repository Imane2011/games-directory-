# haversine-distance
Fork of haversine-distance npm module for education purpose

This is a part of this module : [https://github.com/dcousens/haversine-distance](https://github.com/dcousens/haversine-distance)

### Usage

```javascript
const a = { latitude: 37.8136, longitude: 144.9631 }
const b = { latitude: 33.8650, longitude: 151.2094 }

console.log(haversine(a, b)) // 714504.18 (in meters)
```

Alternative forms such as `lat`, `lng` and `lon` work too, with mixed support:

```javascript
const a = { lat: 37.8136, lng: 144.9631 }
const b = { lat: 33.8650, lon: 151.2094 }

console.log(haversine(a, b)) // 714504.18 (in meters)
```
