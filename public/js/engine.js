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

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
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
            horizontalBlock.rotation.x -= 0.1;
            break;
        case 'ArrowRight':
            horizontalBlock.rotation.x += 0.1;
            break;
        case 'ArrowUp':
            horizontalBlock.rotation.y += 0.1;
            break;
        case 'ArrowDown':
            horizontalBlock.rotation.y -= 0.1;
            break;
        case 'Enter':
            camera.position.x = 0;
            camera.position.y = 0;
            camera.position.z = 10;
            camera.rotation.x = 0;
            camera.rotation.y = 0;
            camera.rotation.z = 0;
            camera.rotation.z = 0;
            horizontalBlock.rotation.x = 0;
            horizontalBlock.rotation.y = 0;
            break;
    }

    console.log("position", camera.position.x, camera.position.y, camera.position.z);
    console.log("rotation", camera.rotation.x, camera.rotation.y, camera.rotation.z);
});