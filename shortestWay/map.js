// The following example creates five accessible and
// focusable markers.
// https://geo-devrel-javascript-samples.web.app/samples/playground.html?showToolbar=true&previewHeight=1200px&sample=marker-accessibility

function initMap(): void {
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        // @10.7717726,106.6751501,16z
        zoom: 16,
        center: { lat: 10.7717726, lng: 106.6751501 },
      }
    );
  
    // Set LatLng and title text for the markers. The first marker (Boynton Pass)
    // receives the initial focus when tab is pressed. Use arrow keys to
    // move between markers; press tab again to cycle through the map controls.
    const tourStops: [string, google.maps.LatLngLiteral][] = [
      ["0", { lat: 10.772057821632572, lng: 106.65772976024374 }], // 10.772057821632572, 106.65772976024374 BKHCM
      // S di den
      ["1", { lat: 10.777776343175464, lng: 106.65615310560754 }], // 10.777776343175464, 106.65615310560754 BacHai 
      ["2", { lat: 10.770458144400079, lng: 106.65812896703537 }], // 10.770458144400079, 106.65812896703537 LuGia 
      ["3", { lat: 10.771823329955119, lng: 106.65454712251662 }], // 10.771823329955119, 106.65454712251662 DuongSo2
      // BacHai-1 di den
      ["4", { lat: 10.780698947286918, lng: 106.65883937592979 }], // 10.780698947286918, 106.65883937592979 BH-TThai
      ["5", { lat: 10.790726753539229, lng: 106.65243369243284 }], // 10.790726753539229, 106.65243369243284 LTK-LLQ
      // LTK-5 di den
      ["6", { lat: 10.792910414878278, lng: 106.65336968269361 }], // 10.792910414878278, 106.65336968269361 BayHien
      // BayHien-6 di den
      ["7", { lat: 10.786922547836749, lng: 106.66464836565248 }], // 10.786922547836749, 106.66464836565248 BH-CMT8
      // BachaiTthai-4 di den
      ["8", { lat: 10.776463607307363, lng: 106.66360707636785 }], // 10.776463607307363, 106.66360707636785 TThai-THThanh
      // Ds2-3 den
      ["9", { lat: 10.77089338478601, lng: 106.65446773173873 }], // 10.77089338478601, 106.65446773173873 // giao
      
      ["10", { lat: 10.782918878716055, lng:  106.67209431071942}],
      ["11", { lat: 10.77785454891686,  lng: 106.68163754521308  }],
      ["12", { lat: 10.763878876553791, lng:  106.65999309603258 }],
      ["13", { lat: 10.767706303533785, lng:  106.66709641061104 }],
      ["14", { lat: 10.77119455757179,  lng: 106.65271576998013  }],
      ["15", { lat: 10.769023379929529, lng:  106.6523372803702  }],
      ["16", { lat: 10.762189192899454, lng:  106.65703389131929 }],
      ["17", { lat: 10.769705422355038, lng:  106.670821727247   }],
      ["18", { lat: 10.770980241201105, lng:  106.67317376983755 }],
      ["19", { lat: 10.767713507002547, lng:  106.67440386110738 }],
      ["20", { lat: 10.76805458890977,  lng: 106.66784420235396  }],//////13
      ["21", { lat: 10.767779125689174, lng:  106.67153088084996 }],
      ["22", { lat: 10.772768121509259, lng:  106.67901638626824 }],
      ["23", { lat: 10.768148177593597, lng:  106.68431745985716 }],//////////37
      ["24", { lat: 10.771204493889464, lng:  106.69668806119425 }],///////38
      ["25", { lat: 10.77361555912127,  lng: 106.6894515703773   }],
  
      ["26", { lat: 10.777921052371905, lng:  106.6655341284583  }],
      ["27", { lat: 10.773383197487698, lng:  106.66479670872054 }],
      ["28", { lat: 10.77459967732329,  lng: 106.66799683188445  }],
      ["29", { lat: 10.773861589023479, lng:  106.67775025068336 }],
      ["30", { lat: 10.776745590517097, lng:  106.68370526237231 }],
  
      ["31", { lat: 10.771401281554503, lng:  106.69326389095136 }],
      ["32", { lat: 10.773998272118577, lng:  106.697131865906   }],
      ["33", { lat: 10.77125092878340,  lng: 106.69476655748049  }],
      ["34", { lat: 10.768066166038839, lng:  106.69542049573025 }],
      ["35", { lat: 10.769255330253085, lng:  106.69471090323937 }],
      ["36", { lat: 10.76671297337168,  lng: 106.68831065691157  }],
      ["37", { lat: 10.76843521747423,  lng: 106.68449833627282  }],
      ["38", { lat: 10.765414449483469, lng:  106.68163213900428 }],
      ["39", { lat: 10.76335046841981,  lng: 106.68705843480394  }],
      ["40", { lat: 10.764977050703363, lng:  106.69267952070925 }],
      ["41", { lat: 10.761641864130862, lng:  106.68982723701967 }],
      ["42", { lat: 10.756447647569217, lng:  106.68516618806498 }],
  
      ["43", { lat: 10.76295407314022,  lng:  106.68769845942457 }],
      ["44", { lat: 10.759878574306581, lng:  106.6689012145103  }],
      
      ["45", { lat: 10.763792636977218, lng:  106.66805316970427 }],
      ["46", { lat: 10.760759007004909, lng:  106.6731372608997  }],
      ["47", { lat: 10.764632326618273, lng:  106.67224520774772 }],
      ["48", { lat: 10.765455361545186, lng:  106.67522177383292 }],
      ["49", { lat: 10.777988891820344, lng:  106.67101924128664 }],
      ["50", { lat: 10.780244125028853, lng:  106.6770299074032  }],
      ["51", { lat: 10.779431999922748, lng:  106.67858858792914 }],
      ["52", { lat: 10.77281607344259,  lng: 106.69543532563307  }],
      ["53", { lat: 10.772118985964035, lng:  106.69595708484457 }],
      ["54", { lat: 10.770191735714532, lng:  106.69414136278851 }],
      ["55", { lat: 10.780419846322275, lng:  106.67955190161776 }],
      ["56", { lat: 10.78109587122429, lng:  106.66970597962111 }],
      ["57", { lat: 10.762230,lng: 106.676486}],
  
      
      ["58", { lat: 10.77315441234125, lng: 106.69764112705654 }], // 10.77315441234125, 106.69764112705654 ChoBenThanh
    ];
  
    // Create an info window to share between markers.
    const infoWindow = new google.maps.InfoWindow();
  
    // Create the markers.
    tourStops.forEach(([title, position], i) => {
      const marker = new google.maps.Marker({
        position,
        map,
        //title: `${i + 1}. ${title}`,
        label: title, // `${i}`
        optimized: false,
      });
    });
    
    // Path
    function haversineDistance(src, dst) {
      var R = 6371071.0; // Radius of the Earth in meters
      var rlat1 = src.lat * (Math.PI/180); // Convert degrees to radians
      var rlat2 = dst.lat * (Math.PI/180); // Convert degrees to radians
      var difflat = rlat2 - rlat1; // Radian difference (latitudes)
      var difflng = (src.lng - dst.lng) * (Math.PI/180); // Radian difference (longitudes)
      
      var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2) + Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflng/2)*Math.sin(difflng/2)));
      return Math.floor(d);
    }
    
    function lineBetweenTwoMarker(src, dst, color = "green"): void {
      const srcPosition = src.at(1);
      const dstPosition = dst.at(1);
      const srcTitle = src.at(0);
      const dstTitle = dst.at(0);
      const flightPath = new google.maps.Polyline({
        path: [srcPosition, dstPosition],
        geodesic: true,
        strokeColor: color,
        strokeOpacity: 0.8,
        strokeWeight: 4,
      });
  
      flightPath.setMap(map);
  //     console.log("Distance from ", srcTitle, " to ", dstTitle, " is ", haversineDistance(srcPosition, dstPosition));
      console.log(srcTitle, dstTitle, haversineDistance(srcPosition, dstPosition));
    }

    function drawPath(path, color): void {
        console.log("path.size()", path.length);
        for (let i = 0; i < path.length-1; i++){
            lineBetweenTwoMarker(tourStops[path[i]], tourStops[path[i+1]], "red");
        }
    }
    
    console.log("59");
    console.log("179");
    lineBetweenTwoMarker(tourStops[0], tourStops[1]);
    lineBetweenTwoMarker(tourStops[0], tourStops[3]);
    lineBetweenTwoMarker(tourStops[0], tourStops[2]);
    
    lineBetweenTwoMarker(tourStops[1], tourStops[0]);
    lineBetweenTwoMarker(tourStops[1], tourStops[4]);
    lineBetweenTwoMarker(tourStops[1], tourStops[5]);
  
    lineBetweenTwoMarker(tourStops[2], tourStops[0]);
    lineBetweenTwoMarker(tourStops[2], tourStops[8]);
    lineBetweenTwoMarker(tourStops[2], tourStops[9]);
    lineBetweenTwoMarker(tourStops[2], tourStops[12]);
    
    lineBetweenTwoMarker(tourStops[3], tourStops[0]);
    lineBetweenTwoMarker(tourStops[3], tourStops[9]);
    
    lineBetweenTwoMarker(tourStops[4], tourStops[1]);  
    lineBetweenTwoMarker(tourStops[4], tourStops[7]);
    lineBetweenTwoMarker(tourStops[4], tourStops[8]);
    
    lineBetweenTwoMarker(tourStops[5], tourStops[1]);
    lineBetweenTwoMarker(tourStops[5], tourStops[6]);
    
    lineBetweenTwoMarker(tourStops[6], tourStops[5]);
    lineBetweenTwoMarker(tourStops[6], tourStops[7]);
    
    lineBetweenTwoMarker(tourStops[7], tourStops[6]);
    lineBetweenTwoMarker(tourStops[7], tourStops[4]);
    lineBetweenTwoMarker(tourStops[7], tourStops[10]);
    
    lineBetweenTwoMarker(tourStops[8], tourStops[2]);
    lineBetweenTwoMarker(tourStops[8], tourStops[4]);
    lineBetweenTwoMarker(tourStops[8], tourStops[26]);//
    lineBetweenTwoMarker(tourStops[8], tourStops[27]);//
   
    lineBetweenTwoMarker(tourStops[9], tourStops[2]);
    lineBetweenTwoMarker(tourStops[9], tourStops[3]);
    lineBetweenTwoMarker(tourStops[9], tourStops[14]);
    
    lineBetweenTwoMarker(tourStops[10], tourStops[7]);
    lineBetweenTwoMarker(tourStops[10], tourStops[50]);
    lineBetweenTwoMarker(tourStops[10], tourStops[56]);
    
    lineBetweenTwoMarker(tourStops[11], tourStops[29]);//
    lineBetweenTwoMarker(tourStops[11], tourStops[30]);//
    lineBetweenTwoMarker(tourStops[11], tourStops[51]);//
    lineBetweenTwoMarker(tourStops[11], tourStops[55]);//
    
    lineBetweenTwoMarker(tourStops[12], tourStops[2]);
    lineBetweenTwoMarker(tourStops[12], tourStops[13]);
    lineBetweenTwoMarker(tourStops[12], tourStops[16]);
    
    lineBetweenTwoMarker(tourStops[13], tourStops[12]);
    lineBetweenTwoMarker(tourStops[13], tourStops[20]);
    lineBetweenTwoMarker(tourStops[13], tourStops[27]);
    lineBetweenTwoMarker(tourStops[13], tourStops[45]);
    
    lineBetweenTwoMarker(tourStops[14], tourStops[9]);
    lineBetweenTwoMarker(tourStops[14], tourStops[15]);
    
    lineBetweenTwoMarker(tourStops[15], tourStops[14]);//
    lineBetweenTwoMarker(tourStops[15], tourStops[16]);//
    
    lineBetweenTwoMarker(tourStops[16], tourStops[12]);
    lineBetweenTwoMarker(tourStops[16], tourStops[15]);
    
    lineBetweenTwoMarker(tourStops[17], tourStops[20]);
    lineBetweenTwoMarker(tourStops[17], tourStops[18]);
    lineBetweenTwoMarker(tourStops[17], tourStops[21]);
    lineBetweenTwoMarker(tourStops[17], tourStops[28]);
    
    lineBetweenTwoMarker(tourStops[18], tourStops[17]);
    lineBetweenTwoMarker(tourStops[18], tourStops[19]);
    lineBetweenTwoMarker(tourStops[18], tourStops[29]);
    
    
    lineBetweenTwoMarker(tourStops[19], tourStops[18]);
    lineBetweenTwoMarker(tourStops[19], tourStops[21]);
    lineBetweenTwoMarker(tourStops[19], tourStops[22]);
    lineBetweenTwoMarker(tourStops[19], tourStops[38]);
    lineBetweenTwoMarker(tourStops[19], tourStops[47]);
    lineBetweenTwoMarker(tourStops[19], tourStops[48]);
    
    lineBetweenTwoMarker(tourStops[20], tourStops[13]);
    lineBetweenTwoMarker(tourStops[20], tourStops[17]);
    lineBetweenTwoMarker(tourStops[20], tourStops[21]);
    
    lineBetweenTwoMarker(tourStops[21], tourStops[17]);
    lineBetweenTwoMarker(tourStops[21], tourStops[20]);
    lineBetweenTwoMarker(tourStops[21], tourStops[19]);
    lineBetweenTwoMarker(tourStops[21], tourStops[47]);
    
    lineBetweenTwoMarker(tourStops[22], tourStops[19]);
    lineBetweenTwoMarker(tourStops[22], tourStops[29]);
    lineBetweenTwoMarker(tourStops[22], tourStops[30]);
    lineBetweenTwoMarker(tourStops[22], tourStops[23]);
    
    lineBetweenTwoMarker(tourStops[23], tourStops[22]);
    lineBetweenTwoMarker(tourStops[23], tourStops[37]);
    lineBetweenTwoMarker(tourStops[23], tourStops[38]);
    
    lineBetweenTwoMarker(tourStops[24], tourStops[33]);
    lineBetweenTwoMarker(tourStops[24], tourStops[53]);
    lineBetweenTwoMarker(tourStops[24], tourStops[54]);
    
    lineBetweenTwoMarker(tourStops[25], tourStops[30]);
    lineBetweenTwoMarker(tourStops[25], tourStops[31]);
    lineBetweenTwoMarker(tourStops[25], tourStops[37]);
    
    lineBetweenTwoMarker(tourStops[26], tourStops[8]);
    lineBetweenTwoMarker(tourStops[26], tourStops[28]);
    lineBetweenTwoMarker(tourStops[26], tourStops[56]);
    
    lineBetweenTwoMarker(tourStops[27], tourStops[8]);
    lineBetweenTwoMarker(tourStops[27], tourStops[13]);
    lineBetweenTwoMarker(tourStops[27], tourStops[28]);
    
    lineBetweenTwoMarker(tourStops[28], tourStops[17]);
    lineBetweenTwoMarker(tourStops[28], tourStops[26]);
    lineBetweenTwoMarker(tourStops[28], tourStops[27]);
    
    lineBetweenTwoMarker(tourStops[29], tourStops[11]);
    lineBetweenTwoMarker(tourStops[29], tourStops[18]);
    lineBetweenTwoMarker(tourStops[29], tourStops[22]);
    
    lineBetweenTwoMarker(tourStops[30], tourStops[11]);
    lineBetweenTwoMarker(tourStops[30], tourStops[22]);
    lineBetweenTwoMarker(tourStops[30], tourStops[25]);
    
    lineBetweenTwoMarker(tourStops[31], tourStops[25]);
    lineBetweenTwoMarker(tourStops[31], tourStops[33]);
    lineBetweenTwoMarker(tourStops[31], tourStops[52]);
    lineBetweenTwoMarker(tourStops[31], tourStops[54]);
    
    lineBetweenTwoMarker(tourStops[32], tourStops[52]);
    lineBetweenTwoMarker(tourStops[32], tourStops[58]);
    
    lineBetweenTwoMarker(tourStops[33], tourStops[24]);
    lineBetweenTwoMarker(tourStops[33], tourStops[31]);
    lineBetweenTwoMarker(tourStops[33], tourStops[53]);
    
    lineBetweenTwoMarker(tourStops[34], tourStops[35]);
    lineBetweenTwoMarker(tourStops[34], tourStops[40]);
    
    lineBetweenTwoMarker(tourStops[35], tourStops[34]);
    lineBetweenTwoMarker(tourStops[35], tourStops[36]);
    lineBetweenTwoMarker(tourStops[35], tourStops[54]);
    
    lineBetweenTwoMarker(tourStops[36], tourStops[37]);
    lineBetweenTwoMarker(tourStops[36], tourStops[35]);
    lineBetweenTwoMarker(tourStops[36], tourStops[39]);
    
    lineBetweenTwoMarker(tourStops[37], tourStops[23]);
    lineBetweenTwoMarker(tourStops[37], tourStops[25]);
    lineBetweenTwoMarker(tourStops[37], tourStops[36]);
    
    lineBetweenTwoMarker(tourStops[38], tourStops[19]);
    lineBetweenTwoMarker(tourStops[38], tourStops[23]);
    lineBetweenTwoMarker(tourStops[38], tourStops[42]);
    lineBetweenTwoMarker(tourStops[38], tourStops[57]);
    
    lineBetweenTwoMarker(tourStops[39], tourStops[36]);
    lineBetweenTwoMarker(tourStops[39], tourStops[43]);
    
    lineBetweenTwoMarker(tourStops[40], tourStops[34]);
    lineBetweenTwoMarker(tourStops[40], tourStops[41]);
    lineBetweenTwoMarker(tourStops[40], tourStops[43]);
   
    lineBetweenTwoMarker(tourStops[41], tourStops[40]);
    lineBetweenTwoMarker(tourStops[41], tourStops[42]);
    lineBetweenTwoMarker(tourStops[41], tourStops[43]);
    
    lineBetweenTwoMarker(tourStops[42], tourStops[38]);
    lineBetweenTwoMarker(tourStops[42], tourStops[41]);
    
    lineBetweenTwoMarker(tourStops[43], tourStops[39]);
    lineBetweenTwoMarker(tourStops[43], tourStops[40]);
    lineBetweenTwoMarker(tourStops[43], tourStops[41]);
    
    lineBetweenTwoMarker(tourStops[44], tourStops[45]);
    lineBetweenTwoMarker(tourStops[44], tourStops[46]);
    lineBetweenTwoMarker(tourStops[44], tourStops[47]);
    
    lineBetweenTwoMarker(tourStops[45], tourStops[13]);
    lineBetweenTwoMarker(tourStops[45], tourStops[44]);
    lineBetweenTwoMarker(tourStops[45], tourStops[47]);
    
    lineBetweenTwoMarker(tourStops[46], tourStops[44]);
    lineBetweenTwoMarker(tourStops[46], tourStops[47]);
    lineBetweenTwoMarker(tourStops[46], tourStops[57]);
    
    lineBetweenTwoMarker(tourStops[47], tourStops[19]);
    lineBetweenTwoMarker(tourStops[47], tourStops[21]);
    lineBetweenTwoMarker(tourStops[47], tourStops[44]);
    lineBetweenTwoMarker(tourStops[47], tourStops[45]);
    lineBetweenTwoMarker(tourStops[47], tourStops[46]);
    lineBetweenTwoMarker(tourStops[47], tourStops[48]);
    
    lineBetweenTwoMarker(tourStops[48], tourStops[19]);
    lineBetweenTwoMarker(tourStops[48], tourStops[47]);
    lineBetweenTwoMarker(tourStops[48], tourStops[57]);
    
    lineBetweenTwoMarker(tourStops[49], tourStops[56]);
    lineBetweenTwoMarker(tourStops[49], tourStops[50]);
    
    lineBetweenTwoMarker(tourStops[50], tourStops[10]);
    lineBetweenTwoMarker(tourStops[50], tourStops[49]);
    lineBetweenTwoMarker(tourStops[50], tourStops[51]);
    
    lineBetweenTwoMarker(tourStops[51], tourStops[11]);
    lineBetweenTwoMarker(tourStops[51], tourStops[50]);
    lineBetweenTwoMarker(tourStops[51], tourStops[55]);
    
    lineBetweenTwoMarker(tourStops[52], tourStops[31]);
    lineBetweenTwoMarker(tourStops[52], tourStops[32]);
    
    lineBetweenTwoMarker(tourStops[53], tourStops[33]);
    lineBetweenTwoMarker(tourStops[53], tourStops[24]);
    lineBetweenTwoMarker(tourStops[53], tourStops[52]);
    lineBetweenTwoMarker(tourStops[53], tourStops[58]);
    
    lineBetweenTwoMarker(tourStops[54], tourStops[24]);
    lineBetweenTwoMarker(tourStops[54], tourStops[31]);
    lineBetweenTwoMarker(tourStops[54], tourStops[35]);
    
    lineBetweenTwoMarker(tourStops[55], tourStops[11]);
    lineBetweenTwoMarker(tourStops[55], tourStops[51]);
    
    lineBetweenTwoMarker(tourStops[56], tourStops[10]);
    lineBetweenTwoMarker(tourStops[56], tourStops[26]);
    lineBetweenTwoMarker(tourStops[56], tourStops[49]);
    
    lineBetweenTwoMarker(tourStops[57], tourStops[38]);
    lineBetweenTwoMarker(tourStops[57], tourStops[46]);
    lineBetweenTwoMarker(tourStops[57], tourStops[48]);
    
    lineBetweenTwoMarker(tourStops[58], tourStops[32]);
    lineBetweenTwoMarker(tourStops[58], tourStops[53]);
    

    //let path1 = [0, 2, 8, 26, 56, 10, 50, 51, 11, 30, 25, 31, 33, 53, 58];
    //drawPath(path1, "red");

    // let path2 = [0, 2, 12, 13, 20, 21, 19, 38, 23, 37, 25, 31, 33, 53, 58];
    // drawPath(path2, "red");

    // let path3 = [0, 2, 8, 27, 28, 17, 18, 29, 22, 30, 25, 31, 33, 53, 58];
    // drawPath(path3, "red");

  }
  
  declare global {
    interface Window {
      initMap: () => void;
    }
  }
  window.initMap = initMap;
  export {};
  