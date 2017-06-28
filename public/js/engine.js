var scene, camera, renderer, horizontalBlock;
var cameraZoom, thetaAngle, phiAngle;
init();
animate();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
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
    var geometry = new THREE.BoxGeometry(5, 0.5, 0.1);

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
            phiAngle = (phiAngle - 45) % 360;
            // need to position camera as point on sphere of radius "r"
            //on keydown event use following system to calculate next coordinates:
            //x' = r*sin(θ)*cos(φ)
            //y' = r*sin(θ)*sin(φ)
            //z' = r*cos(θ)
            //https://en.wikipedia.org/wiki/Spherical_coordinate_system
            //circle positioning x=cos(angle)*radius; y=sin(angle)*radius
            //deg to rad degValue*Math.PI/180 //use this to calculate angle in radians
            moveCamera();
            break;
        case 'ArrowRight':
            phiAngle = (phiAngle + 45) % 360;
            moveCamera();
            break;
        case 'ArrowUp':
            thetaAngle = (thetaAngle + 45) % 360;
            moveCamera();
            break;
        case 'ArrowDown':
            thetaAngle = (thetaAngle - 45) % 360;
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
    thetaAngle = 0;
    phiAngle = 0;
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 10;
}

function moveCamera() {
    var degToRad = Math.PI / 360;
    var x = cameraZoom * Math.sin(thetaAngle * degToRad) * Math.cos(phiAngle * degToRad);
    var y = cameraZoom * Math.sin(thetaAngle * degToRad) * Math.sin(phiAngle * degToRad);
    var z = cameraZoom * Math.cos(thetaAngle * degToRad);
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
