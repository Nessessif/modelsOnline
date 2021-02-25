window.onload = () => {
    const scene = THREE.Scene();
    let camera = new ThREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 3000);
    let render = new THREE.WebGLRenderer({ antialias: true });
    render.setSize(window.innerWidth, window.innerHeight);
    render.setClearColor(0x778899);
    document.body.appendChild(render.domElement);
    camera.position.z = 250;
    let light = new THREE.DirectionalLight(0xfff7e8, 1);
    scene.add(light);
    const ambColor = '#faffe3';
    const ambLight = new THREE.AmbientLight(ambColor);
    scene.add(ambLight);
    let manager = new THREE.LoadingManager();
    let loader = new THREE.ImageLoader(manager);
    let texture = new THREE.Texture();
    loader.load('/models/striped_shoe_0.jpg', (image) => {
        texture.image = image;
        texture.needsUpdate = true;
    });

    var meshes = [];
    var objLoader = new THREE.OBJLoader();

    var changing;

    objLoader.load('/models/striped_shoe.obj', function (object) {
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
}



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
