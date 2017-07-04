var scene, camera, renderer, horizontalBlock;
var cameraZoom, thetaAngle, phiAngle;
init();
animate();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 10);

    //INIT CAMERA
    initCamera();

    moveCamera();

    var material = new THREE.MeshBasicMaterial({color: 0x00FF00});
    // var geometry = new THREE.Geometry();
    //
    // geometry.vertices.push(
    //     //bottom-left-front, bottom-left-rear
    //     new THREE.Vector3(-5, -5, -1), new THREE.Vector3(-5, -5, 1),
    //     //bottom-right-front, bottom-right-rear
    //     new THREE.Vector3(5, -5, -1), new THREE.Vector3(5, -5, 1),
    //     //top-left-front, top-left-rear
    //     new THREE.Vector3(-5, -4.5, -1), new THREE.Vector3(-5, -4.5, 1),
    //     //top-left-front, top-left-rear
    //     new THREE.Vector3(5, -4.5, -1), new THREE.Vector3(5, -4.5, 1)
    // );
    var geometry = new THREE.BoxGeometry(0.1, 0.5, 5);

    horizontalBlock = new THREE.Mesh(geometry, material);

    scene.add(horizontalBlock);
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 0);
    document.body.appendChild(renderer.domElement);
}

function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}


//Mouse actions
window.addEventListener("keydown", function (e) {
    switch (e.key) {
        case 'ArrowLeft':
            thetaAngle = angleToRange(thetaAngle - 1);
            moveCamera();
            break;
        case 'ArrowRight':
            thetaAngle = angleToRange(thetaAngle + 1);
            moveCamera();
            break;
        case 'ArrowUp':
            phiAngle = angleToRange(phiAngle + 1);
            moveCamera();
            break;
        case 'ArrowDown':
            phiAngle = angleToRange(phiAngle - 1);
            moveCamera();
            break;
        case 'Enter':
            initCamera();
            break;
    }

    console.log("position", camera.position.x, camera.position.y, camera.position.z);
    console.log("rotation", camera.rotation.x, camera.rotation.y, camera.rotation.z);
});

function initCamera() {
    cameraZoom = 10;
    phiAngle = 90;
    thetaAngle = 0;
}

function moveCamera() {
    var degToRad = Math.PI / 180;

    var phiRad = phiAngle * degToRad;
    var thetaRad =  thetaAngle * degToRad;

    //phi is latitude, theta is longitude
    // var x = cameraZoom * Math.cos(phiRad) * Math.cos(thetaRad);
    // var y = cameraZoom * Math.cos(phiRad) * Math.sin(thetaRad);
    // var z = cameraZoom * Math.sin(phiRad);

    //phi is colatitude, theta is longitude
    var x = cameraZoom * Math.sin(phiRad) * Math.cos(thetaRad);
    var z = cameraZoom * Math.sin(phiRad) * Math.sin(thetaRad);
    var y = cameraZoom * Math.cos(phiRad);



    camera.position.set(x, y, z);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    console.log(camera.position.x, camera.position.y, camera.position.z, "zoom", cameraZoom, "theta(y)", thetaAngle, "phi(x)", phiAngle);

    var tmaterial = new THREE.PointsMaterial({
        color: 0xff0000,
        size: 0.1,
        opacity: 0.5
    });

    var tgeometry = new THREE.Geometry();
    tgeometry.vertices.push(new THREE.Vector3(x, y, z));
    var point = new THREE.Points(tgeometry, tmaterial);
    scene.add(point);
}

function angleToRange(angle) {
    return (360 + (angle) % 360) % 360;
}
