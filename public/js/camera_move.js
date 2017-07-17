var camera, raycaster, mouse3D, isMouseDown = false, onMouseDownPosition,
    radius = 10, theta = 45, onMouseDownTheta = 45, phi = 60, onMouseDownPhi = 60;
// phi = 90;
// theta = 0;


//     camera = new THREE.Camera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
//     camera.position.x = radius * Math.sin( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );
//     camera.position.y = radius * Math.sin( phi * Math.PI / 360 );
//     camera.position.z = radius * Math.cos( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );
//     camera.target.position.y = 200;
//
//     scene = new THREE.Scene();
//
//     // Grid
//
//     var geometry = new THREE.Geometry();
//     geometry.vertices.push( new THREE.Vertex( new THREE.Vector3( - 500, 0, 0 ) ) );
//     geometry.vertices.push( new THREE.Vertex( new THREE.Vector3( 500, 0, 0 ) ) );
//
//     linesMaterial = new THREE.LineColorMaterial( 0x000000, 0.2 );
//
//     for ( var i = 0; i <= 20; i ++ ) {
//
//         var line = new THREE.Line( geometry, linesMaterial );
//         line.position.z = ( i * 50 ) - 500;
//         scene.addObject( line );
//
//         var line = new THREE.Line( geometry, linesMaterial );
//         line.position.x = ( i * 50 ) - 500;
//         line.rotation.y = 90 * Math.PI / 180;
//         scene.addObject( line );
//
//     }
//
//
//     plane = new THREE.Mesh( new Plane( 1000, 1000 ) );
//     plane.rotation.x = - 90 * Math.PI / 180;
//     scene.addObject( plane );
//
//     cube = new Cube( 50, 50, 50 );
//
//     ray = new THREE.Ray( camera.position, null );
//
//     brush = new THREE.Mesh( cube, new THREE.MeshColorFillMaterial( colors[ color ], 0.4 ) );
//     brush.position.y = 2000;
//     brush.overdraw = true;
//     scene.addObject( brush );
//
//     onMouseDownPosition = new THREE.Vector2();
//
//     // Lights
//
//     var ambientLight = new THREE.AmbientLight( 0x404040 );
//     scene.addLight( ambientLight );
//
//     var directionalLight = new THREE.DirectionalLight( 0xffffff );
//     directionalLight.position.x = 1;
//     directionalLight.position.y = 1;
//     directionalLight.position.z = 0.75;
//     directionalLight.position.normalize();
//     scene.addLight( directionalLight );
//
//     var directionalLight = new THREE.DirectionalLight( 0x808080 );
//     directionalLight.position.x = - 1;
//     directionalLight.position.y = 1;
//     directionalLight.position.z = - 0.75;
//     directionalLight.position.normalize();
//     scene.addLight( directionalLight );
//
//     renderer = new THREE.CanvasRenderer();
//     renderer.setSize( window.innerWidth, window.innerHeight );
//
//     container.appendChild(renderer.domElement);
//
//
//     document.addEventListener( 'mousemove', onDocumentMouseMove, false );
//     document.addEventListener( 'mousedown', onDocumentMouseDown, false );
//     document.addEventListener( 'mouseup', onDocumentMouseUp, false );
//
//     document.addEventListener( 'mousewheel', onDocumentMouseWheel, false );
//
//     if ( window.location.hash ) {
//
//         buildFromHash();
//
//     }
//
// }
function initCamera() {
    raycaster = new THREE.Raycaster(); // create once

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('mouseup', onDocumentMouseUp, false);
    document.addEventListener('mousewheel', onDocumentMouseWheel, false);
    window.addEventListener("keydown", onDocumentArrowKeydown, false);
}

function onDocumentMouseDown(event) {

    event.preventDefault();

    isMouseDown = true;

    onMouseDownTheta = theta;
    onMouseDownPhi = phi;
    onMouseDownPosition.x = event.clientX;
    onMouseDownPosition.y = event.clientY;

}

function onDocumentMouseMove(event) {

    event.preventDefault();

    if (isMouseDown) {

        theta = -( ( event.clientX - onMouseDownPosition.x ) * 0.5 ) + onMouseDownTheta;
        phi = ( ( event.clientY - onMouseDownPosition.y ) * 0.5 ) + onMouseDownPhi;

        phi = Math.min(180, Math.max(0, phi));

        camera.position.x = radious * Math.sin(theta * Math.PI / 360) * Math.cos(phi * Math.PI / 360);
        camera.position.y = radious * Math.sin(phi * Math.PI / 360);
        camera.position.z = radious * Math.cos(theta * Math.PI / 360) * Math.cos(phi * Math.PI / 360);
        camera.updateMatrix();

    }

    mouse3D = raycaster.setFromCamera(new THREE.Vector2(( event.clientX / renderer.domElement.width ) * 2 - 1, -( event.clientY / renderer.domElement.height ) * 2 + 1, 0.5), camera);
    raycaster.direction = mouse3D.subSelf(camera.position).normalize();

    render();

}

function onDocumentMouseUp(event) {

    event.preventDefault();

    isMouseDown = false;

    onMouseDownPosition.x = event.clientX - onMouseDownPosition.x;
    onMouseDownPosition.y = event.clientY - onMouseDownPosition.y;

    if (onMouseDownPosition.length() > 5) {

        return;

    }

    render();

}

function onDocumentMouseWheel(event) {

    radious -= event.wheelDeltaY;

    camera.position.x = radious * Math.sin(theta * Math.PI / 360) * Math.cos(phi * Math.PI / 360);
    camera.position.y = radious * Math.sin(phi * Math.PI / 360);
    camera.position.z = radious * Math.cos(theta * Math.PI / 360) * Math.cos(phi * Math.PI / 360);
    camera.updateMatrix();

    render();

}

function onDocumentArrowKeydown(e) {
    switch (e.key) {
        case 'ArrowLeft':
            theta = angleToRange(theta - 1);
            break;
        case 'ArrowRight':
            theta = angleToRange(theta + 1);
            break;
        case 'ArrowUp':
            phi = --phi < 1 ? 1 : phi;
            break;
        case 'ArrowDown':
            phi = ++phi > 180 ? 180 : phi;
            break;
        case 'Enter':
            initCamera();
            break;
    }

    var phiRad = degToRad(phi);
    var thetaRad = degToRad(theta);

    //phi is colatitude, theta is longitude
    var x = radius * Math.sin(phiRad) * Math.cos(thetaRad);
    var z = radius * Math.sin(phiRad) * Math.sin(thetaRad);
    var y = radius * Math.cos(phiRad);

    camera.position.set(x, y, z);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // console.log(camera.position.x, camera.position.y, camera.position.z, "zoom", radius, "theta(y)", theta, "phi(x)", phi);

    var tmaterial = new THREE.PointsMaterial({
        color: 0xff0000,
        size: 0.1,
        opacity: 0.5
    });

    var tgeometry = new THREE.Geometry();
    tgeometry.vertices.push(new THREE.Vector3(x, y, z));
    var point = new THREE.Points(tgeometry, tmaterial);
    scene.add(point);

    // console.log("position", camera.position.x, camera.position.y, camera.position.z);
    // console.log("rotation", camera.rotation.x, camera.rotation.y, camera.rotation.z);
}


// https://gist.github.com/665235

function decode(string) {

    var output = [];
    string.split('').forEach(function (v) {
        output.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(v));
    });
    return output;

}

function encode(array) {

    var output = "";
    array.forEach(function (v) {
        output += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(v);
    });
    return output;

}

function degToRad(deg) {
    return deg * Math.PI / 180;
}
