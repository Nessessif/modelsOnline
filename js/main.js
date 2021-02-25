window.onload = function () {

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 10000);

    var render = new THREE.WebGLRenderer({ antialias: true });
    render.setSize(window.innerWidth, window.innerHeight);
    render.setClearColor(0x778899);

    document.body.appendChild(render.domElement);

    camera.position.z = 250;

    var light = new THREE.DirectionalLight(0xfff7e8, 1);
    scene.add(light);

    var ambColor = '#faffe3';
    var ambLight = new THREE.AmbientLight(ambColor);
    
    scene.add(ambLight);

    var manager = new THREE.LoadingManager();
    var loader = new THREE.ImageLoader(manager);

    var texture = new THREE.Texture();

    loader.load('model/striped_shoe_0.jpg', function (image) {
        texture.image = image;
        texture.needsUpdate = true;
    });

    var meshes = [];
    var objLoader = new THREE.OBJLoader();

    var changing;

    objLoader.load('model/striped_shoe.obj', function (object) {
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                meshes.push(child);
            }
        });

        changing = meshes[0];

        changing.position.y = -80;

        scene.add(changing);

        changing.material = new THREE.MeshPhongMaterial({
            map: texture,
            specular: 0xfff7e8,
        });

    });

    var controls = new THREE.TrackballControls(camera);

    var rendering = function () {
        requestAnimationFrame(rendering);
        controls.update();
        render.render(scene, camera);
    }

    rendering();
};



// var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// var renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// var geometry = new THREE.BoxGeometry(10, 10, 10);
// var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// var cube = new THREE.Mesh(geometry, material);
// scene.add(cube);
// camera.position.z = 25;
// function render() {
//     requestAnimationFrame(render);
//     cube.rotation.x += 0.01;
//     cube.rotation.y += 0.01;
//     renderer.render(scene, camera);
// }
// render();


// // var geometry = new THREE.SphereGeometry(1, 32, 32);
// // var material = new THREE.MeshNormalMaterial();
// // var sphere = new THREE.Mesh(geometry, material);
// // scene.add(sphere);
// // camera.position.z = 3;

// // function render() {
// //     requestAnimationFrame(render);
// //     sphere.rotation.x += 0.01;
// //     sphere.rotation.y += 0.01;
// //     renderer.render(scene, camera);
// // }
// // render();

