
//Wait until window is loaded to avoid null reference
window.onload = function(){

let container;
var footer, footerP;
var footerText, footerTextTwo, lineBreak, bold;
let camera, controls, scene, renderer;
var lighting, ambient, keyLight, fillLight, backLight;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

    let headSensors = {
        sensorOne: [],
        sensorTwo: [],
        sensorThree: [],
        sensorFour: [],
        sensorFive: [],
        sensorSix: [],
        sensorSeven: [],
        sensorEight: [],
        sensorNine: [],
        sensorTen: [],
        sensorEleven: [],
        sensorTwelve: [],
        sensorThirteen: [],
        sensorFourteen: [],
        sensorFifteen: [],
        sensorSixteen: [],
    };
let damping = 5.0;
let distance = 5;
let cameraTarget = new THREE.Vector3();
init();
//initMaterials();
animate();

function init() {

  //Create HTML ELEMENTS to be added to index Page
    container = document.getElementById('index3DCanvas');
    document.body.appendChild(container);

    //create new camera perspective
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(3.25,2.0,-5);
    camera.lookAt(0,0.5,0);
    //create new scene
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xd7cbb1,1,80);
     ambient = new THREE.AmbientLight(0xFF0000, 1.0);
     scene.add(ambient);

    //scene.add(new THREE.HemisphereLight());



    //add lighting to the Scene
    // keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
    // keyLight.position.set(-100, 0, 100);
    //
    // fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
    // fillLight.position.set(100, 0, 100);
    //
    // backLight = new THREE.DirectionalLight(0xffffff, 1.0);
    // backLight.position.set(100, 0, -100).normalize();
    //
    // scene.add(keyLight);
    // scene.add(fillLight);
    // scene.add(backLight);

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath('Assets/Models/');
    mtlLoader.load('./Nurbs/NurbsHead.mtl', function (materials) {

    materials.preload();


    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('Assets/Models/');
    objLoader.load('./Nurbs/NurbsHead.obj', function (object) {

        scene.add(object);

    });

    window.addEventListener('resize', onWindowResize, false);
    //document.addEventListener('mousemove', onMouseMove, false);
});
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(600, 600);
    //renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor( 0x489FBC, 0);

    container.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = damping;
    controls.enableZoom = true;

}
function initMaterials(){
    materialsLib = {
        main: [
            new THREE.MeshStandardMaterial({ color: 0xff4400,envMap: envMap,metalness: 0.0, roughness: 0.3,
                name: 'no-impact'}),
            new THREE.MeshStandardMaterial( { color: 0x001166, envMap: envMap, metalness: 0.0, roughness: 0.2,
                name: 'low-impact' } ),
            new THREE.MeshStandardMaterial( { color: 0x990000, envMap: envMap, metalness: 0.0, roughness: 0.2,
                name: 'medium-impact' } ),
            new THREE.MeshStandardMaterial( { color: 0x000000, envMap: envMap, metalness: 0.0, roughness: 0.5,
                name: 'hard-impact' } ),
            new THREE.MeshStandardMaterial( { color: 0xffffff, envMap: envMap, metalness: 0.0, roughness: 0.5,
                name: 'test-impact' } ),
            new THREE.MeshStandardMaterial( { color: 0x555555, envMap: envMap, envMapIntensity: 2.0, metalness: 1.0,
                roughness: 0.2, name: 'default-standby'})
        ]
    }
}

function animate() {
  requestAnimationFrame(animate);
    controls.update();
  render();
}
function render() {
  renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
};

function onMouseMove(event) {
    mouseX = event.clientX - window.innerWidth / 2;
    mouseY = event.clientY - window.innerHeight / 2;
    camera.position.x += (mouseX - camera.position.x) * 0.005;
    camera.position.y += (mouseY - camera.position.y) * 0.005;
    //set up camera position
    camera.lookAt(scene.position);
};

};
