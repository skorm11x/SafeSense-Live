
//Wait until window is loaded to avoid null reference
window.onload = function(){

var container;
var footer, footerP;
var footerText, footerTextTwo, lineBreak, bold;
var camera, controls, scene, renderer;
var lighting, ambient, keyLight, fillLight, backLight;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {

  //Create HTML ELEMENTS to be added to index Page
    container = document.getElementById('index3DCanvas');
    document.body.appendChild(container);

    //create new camera perspective
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0,0,50);

    //create new scene
    scene = new THREE.Scene();
    // ambient = new THREE.AmbientLight(0x00ffff, 1.0);
    // scene.add(ambient);

    scene.add(new THREE.HemisphereLight());

    //add lighting to the Scene
    keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
    keyLight.position.set(-100, 0, 100);

    fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
    fillLight.position.set(100, 0, 100);

    backLight = new THREE.DirectionalLight(0xffffff, 1.0);
    backLight.position.set(100, 0, -100).normalize();

    scene.add(keyLight);
    scene.add(fillLight);
    scene.add(backLight);

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
    document.addEventListener('mousemove', onMouseMove, false);
});
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(600, 600);
    //renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor( 0x489FBC, 0);

    container.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

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

}
