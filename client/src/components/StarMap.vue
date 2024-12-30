<script setup>
// import Celestial from 'd3-celestial';
import { onMounted } from "vue";

// var config = {
//   width: 0,     // Default width, 0 = full parent width; height is determined by projection
//   projection: "aitoff",  // Map projection used: airy, aitoff, armadillo, august, azimuthalEqualArea, azimuthalEquidistant, baker, berghaus, boggs, bonne, bromley, collignon, craig, craster, cylindricalEqualArea, cylindricalStereographic, eckert1, eckert2, eckert3, eckert4, eckert5, eckert6, eisenlohr, equirectangular, fahey, foucaut, ginzburg4, ginzburg5, ginzburg6, ginzburg8, ginzburg9, gringorten, hammer, hatano, healpix, hill, homolosine, kavrayskiy7, lagrange, larrivee, laskowski, loximuthal, mercator, miller, mollweide, mtFlatPolarParabolic, mtFlatPolarQuartic, mtFlatPolarSinusoidal, naturalEarth, nellHammer, orthographic, patterson, polyconic, rectangularPolyconic, robinson, sinusoidal, stereographic, times, twoPointEquidistant, vanDerGrinten, vanDerGrinten2, vanDerGrinten3, vanDerGrinten4, wagner4, wagner6, wagner7, wiechel, winkel3
//   projectionRatio: null, // Optional override for default projection ratio
//   transform: "galactic", // Coordinate transformation: equatorial (default), ecliptic, galactic, supergalactic
//   center: [1300, 43.615021, -116.202316],       // Initial center coordinates in equatorial transformation [hours, degrees, degrees],
//   // otherwise [degrees, degrees, degrees], 3rd parameter is orientation, null = default center
//   orientationfixed: true,  // Keep orientation angle the same as center[2]
//   background: { fill: "#000000", stroke: "#000000", opacity: 1 }, // Background style
//   adaptable: true,    // Sizes are increased with higher zoom-levels
//   interactive: true,  // Enable zooming and rotation with mousewheel and dragging
//   disableAnimations: false, // Disable all animations
//   form: true,        // Display settings form
//   location: true,    // Display location settings
//   controls: true,     // Display zoom controls
//   lang: "",           // Language for names, so far only for constellations: de: german, es: spanish
//   // Default:en or empty string for english
//   container: "celestial-map",   // ID of parent element, e.g. div
//   datapath: "/data/",  // Path/URL to data files, empty = subfolder 'data'
//   stars: {
//     show: true,    // Show stars
//     limit: 6,      // Show only stars brighter than limit magnitude
//     colors: true,  // Show stars in spectral colors, if not use "color"
//     style: { fill: "#ff0000", opacity: 1 }, // Default style for stars
//     names: true,   // Show star names (Bayer, Flamsteed, Variable star, Gliese, whichever applies first)
//     proper: true, // Show proper name (if present)
//     desig: false,  // Show all names, including Draper and Hipparcos
//     namelimit: 2.5,  // Show only names for stars brighter than namelimit
//     namestyle: {
//       fill: "#ddddbb", font: "11px Georgia, Times, 'Times Roman', serif", align: "left", baseline: "top"
//     },
//     propernamestyle: {
//       fill: "#ddddbb", font: "11px Georgia, Times, 'Times Roman', serif", align: "right", baseline: "bottom"
//     },
//     propernamelimit: 1.5,  // Show proper names for stars brighter than propernamelimit
//     size: 7,       // Maximum size (radius) of star circle in pixels
//     exponent: -0.28, // Scale exponent for star size, larger = more linear
//     data: 'stars.6.json' // Data source for stellar data
//     //data: 'stars.8.json' // Alternative deeper data source for stellar data
//   },
//   dsos: {
//     show: false,    // Show Deep Space Objects
//     limit: 6,      // Show only DSOs brighter than limit magnitude
//     names: true,   // Show DSO names
//     desig: true,   // Show short DSO names
//     namelimit: 4,  // Show only names for DSOs brighter than namelimit
//     namestyle: { fill: "#cccccc", font: "11px Helvetica, Arial, serif", align: "left", baseline: "top" },
//     size: null,    // Optional seperate scale size for DSOs, null = stars.size
//     exponent: 1.4, // Scale exponent for DSO size, larger = more non-linear
//     data: 'dsos.bright.json',  // Data source for DSOs
//     //data: 'dsos.6.json'  // Alternative broader data source for DSOs
//     //data: 'dsos.14.json' // Alternative deeper data source for DSOs
//     symbols: {  //DSO symbol styles
//       gg: { shape: "circle", fill: "#ff0000" },                                 // Galaxy cluster
//       g: { shape: "ellipse", fill: "#ff0000" },                                // Generic galaxy
//       s: { shape: "ellipse", fill: "#ff0000" },                                // Spiral galaxy
//       s0: { shape: "ellipse", fill: "#ff0000" },                                // Lenticular galaxy
//       sd: { shape: "ellipse", fill: "#ff0000" },                                // Dwarf galaxy
//       e: { shape: "ellipse", fill: "#ff0000" },                                // Elliptical galaxy
//       i: { shape: "ellipse", fill: "#ff0000" },                                // Irregular galaxy
//       oc: { shape: "circle", fill: "#ffcc00", stroke: "#ffcc00", width: 1.5 },  // Open cluster
//       gc: { shape: "circle", fill: "#ff9900" },                                 // Globular cluster
//       en: { shape: "square", fill: "#ff00cc" },                                 // Emission nebula
//       bn: { shape: "square", fill: "#ff00cc", stroke: "#ff00cc", width: 2 },    // Generic bright nebula
//       sfr: { shape: "square", fill: "#cc00ff", stroke: "#cc00ff", width: 2 },    // Star forming region
//       rn: { shape: "square", fill: "#00ooff" },                                 // Reflection nebula
//       pn: { shape: "diamond", fill: "#00cccc" },                                // Planetary nebula
//       snr: { shape: "diamond", fill: "#ff00cc" },                                // Supernova remnant
//       dn: { shape: "square", fill: "#999999", stroke: "#999999", width: 2 },    // Dark nebula grey
//       pos: { shape: "marker", fill: "#cccccc", stroke: "#cccccc", width: 1.5 }   // Generic marker
//     }
//   },
//   constellations: {
//     show: true,    // Show constellations
//     names: true,   // Show constellation names
//     desig: false,   // Show short constellation names (3 letter designations)
//     namestyle: {
//       fill: "#cccc99", align: "center", baseline: "middle", opacity: 0.8,
//       font: ["bold 14px Helvetica, Arial, sans-serif",  // Different fonts for brighter &
//         "bold 12px Helvetica, Arial, sans-serif",  // sdarker constellations
//         "bold 11px Helvetica, Arial, sans-serif"]
//     },
//     lines: true,   // Show constellation lines
//     linestyle: { stroke: "#cccccc", width: 4, opacity: 0.6 },
//     bounds: false,  // Show constellation boundaries
//     boundstyle: { stroke: "#cccc00", width: 0.5, opacity: 0.8, dash: [2, 4] }
//   },
//   mw: {
//     show: true,    // Show Milky Way as filled polygons
//     style: { fill: "#ffffff", opacity: "0.15" }
//   },
//   lines: {
//     graticule: {
//       show: true, stroke: "#cccccc", width: 0.6, opacity: 0.8,      // Show graticule lines
//       // grid values: "outline", "center", or [lat,...] specific position
//       lon: { pos: ["center"], fill: "#eee", font: "10px Helvetica, Arial, sans-serif" },
//       // grid values: "outline", "center", or [lon,...] specific position
//       lat: { pos: ["center"], fill: "#eee", font: "10px Helvetica, Arial, sans-serif" }
//     },
//     equatorial: { show: true, stroke: "#aaaaaa", width: 1.3, opacity: 0.7 },    // Show equatorial plane
//     ecliptic: { show: true, stroke: "#66cc66", width: 1.3, opacity: 0.7 },      // Show ecliptic plane
//     galactic: { show: false, stroke: "#cc6666", width: 1.3, opacity: 0.7 },     // Show galactic plane
//     supergalactic: { show: false, stroke: "#cc66cc", width: 1.3, opacity: 0.7 } // Show supergalactic plane
//   }
// };

const myConfig = {
  // transform: "robinson",
  projection: "orthographic",
  width: 800,
  form: true,
  background: { fill: "#ffffff", stroke: "#000000", opacity: 0.01 }, // Background style
  center: [1300, 43.615021, -116.202316], // Initial center coordinates in equatorial transformation [hours, degrees, degrees],
  // projectionRatio: null, // Optional override for default projection ratio
  orientationfixed: true,
  stars: {
    show: true,
  },
  // dsos: {
  //   show: true,
  // },
  mw: {
    show: true, // Show Milky Way as filled polygons
    style: { fill: "#00ffff", opacity: "0.15" },
  },
  constellations: {
    show: true,
    names: true,
    desig: false,
  },
  horizon: {
    //Show horizon marker, if location is set and map projection is all-sky
    show: false,
    stroke: "#cccccc", // Line
    width: 1.0,
    fill: "#000000", // Area below horizon
    opacity: 0.5,
  },
  daylight: {
    //Show day sky as a gradient, if location is set and map projection is hemispheric
    show: false,
  },
  planets: {
    //Show planet locations, if date-time is set
    show: false,
    // List of all objects to show
    which: [
      "sol",
      "mer",
      "ven",
      "ter",
      "lun",
      "mar",
      "jup",
      "sat",
      "ura",
      "nep",
    ],
    // Font styles for planetary symbols
    symbols: {
      // Character and color for each symbol in 'which' above (simple circle: \u25cf), optional size override for Sun & Moon
      sol: { symbol: "\u2609", letter: "Su", fill: "#ffff00", size: "" },
      mer: { symbol: "\u263f", letter: "Me", fill: "#cccccc" },
      ven: { symbol: "\u2640", letter: "V", fill: "#eeeecc" },
      ter: { symbol: "\u2295", letter: "T", fill: "#00ccff" },
      lun: { symbol: "\u25cf", letter: "L", fill: "#ffffff", size: "" }, // overridden by generated crecent, except letter & size
      mar: { symbol: "\u2642", letter: "Ma", fill: "#ff6600" },
      cer: { symbol: "\u26b3", letter: "C", fill: "#cccccc" },
      ves: { symbol: "\u26b6", letter: "Ma", fill: "#cccccc" },
      jup: { symbol: "\u2643", letter: "J", fill: "#ffaa33" },
      sat: { symbol: "\u2644", letter: "Sa", fill: "#ffdd66" },
      ura: { symbol: "\u2645", letter: "U", fill: "#66ccff" },
      nep: { symbol: "\u2646", letter: "N", fill: "#6666ff" },
      plu: { symbol: "\u2647", letter: "P", fill: "#aaaaaa" },
      eri: { symbol: "\u26aa", letter: "E", fill: "#eeeeee" },
    },
    symbolStyle: {
      fill: "#00ccff",
      font: "bold 17px 'Lucida Sans Unicode', Consolas, sans-serif",
      align: "center",
      baseline: "middle",
    },
    symbolType: "symbol", // Type of planet symbol: 'symbol' graphic planet sign, 'disk' filled circle scaled by magnitude
    // 'letter': 1 or 2 letters S Me V L Ma J S U N
    names: true, // Show name in nameType language next to symbol
    nameStyle: {
      fill: "#00ccff",
      font: "14px 'Lucida Sans Unicode', Consolas, sans-serif",
      align: "right",
      baseline: "top",
    },
    namesType: "desig", // Language of planet name (see list below of language codes available for planets),
    // or desig = 3-letter designation
  },
};

function drawMap() {
  // @ts-ignore
  if (!window.Celestial) {
    return setTimeout(() => {
      console.log("huh");
      drawMap();
    }, 300);
  }
  // @ts-ignore
  // eslint-disable-next-line no-undef
  // Celestial.date(new Date())
  // @ts-ignore
  // eslint-disable-next-line no-undef
  Celestial.display(myConfig);
}

onMounted(() => {
  drawMap();
  // Celestial.display(config)
});

// function showPlanets() {
//   myConfig.planets.show = !myConfig.planets.show;
//   drawMap();
// }
</script>

<template>
  <div>
    <!-- <button @click="showPlanets">Toggle Planets 🌎</button> -->
    <div class="d-flex justify-content-center" id="celestial-map"></div>
  </div>
</template>

<style lang="scss" scoped>
#celestial-map {
  background-size: cover;
  background-attachment: fixed;
  background-image: url(https://images.unsplash.com/photo-1449100840062-49e9aca7c8ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODB8fHNwYWNlfGVufDB8fDB8fHwy);
  min-height: 94dvh;
  padding-top: 1.5em;
}
</style>
