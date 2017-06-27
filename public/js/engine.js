var scene, camera, renderer, horizontalBlock;
init();
animate();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

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

    camera.position.z = 10;
    camera.target = THREE.Vector3(0, 0, 0);

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
            camera.target = THREE.Vector3(0, 0, 0);
            cameraPosAngle = 180;
            // need to position camera as point on sphere of radius "r"
            //on keydown event use following system to calculate next coordinates:
            //x' = r*sin(θ)*cos(φ)
            //y' = r*sin(θ)*sin(φ)
            //z' = r*cos(θ)
            //https://en.wikipedia.org/wiki/Spherical_coordinate_system
            //circle positioning x=cos(angle)*radius; y=sin(angle)*radius
            //deg to rad degValue*Math.PI/180 //use this to calculate angle in radians
            break;
        case 'ArrowRight':
            camera.position.x += 0.1;
            camera.position.z -= 0.1;
            break;
        case 'ArrowUp':
            camera.position.y += 0.1;
            break;
        case 'ArrowDown':
            camera.position.y -= 0.1;
            break;
        case 'Enter':
            camera.position.x = 0;
            camera.position.y = 0;
            camera.position.z = 10;
            camera.rotation.x = 0;
            camera.rotation.y = 0;
            camera.rotation.z = 0;
            camera.rotation.z = 0;
            camera.rotation.x = 0;
            camera.rotation.y = 0;
            break;
    }

    console.log("position", camera.position.x, camera.position.y, camera.position.z);
    console.log("rotation", camera.rotation.x, camera.rotation.y, camera.rotation.z);
});

function calcCameraPosition(x, y, z) {

}
