
//Wait until window is loaded to avoid null reference
function loadModel(){

var container;
var footer, footerP;
var footerText, footerTextTwo, lineBreak, bold;
var camera, controls, scene, renderer;
let lighting, ambient, keyLight, fillLight, backLight, secondBackLight;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;


init();
animate();

function init() {

  //Create HTML ELEMENTS to be added to index Page
    container = document.getElementById('HeadImpactModel');
    document.body.appendChild(container);

    //create new camera perspective
    camera = new THREE.PerspectiveCamera(22.5, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0,-1000,0);
    camera.lookAt(0,0,0);
    //create new scene
    scene = new THREE.Scene();
     ambient = new THREE.AmbientLight(0xFFFFFF);
     scene.add(ambient);

     //lighting =  new THREE.HemisphereLight(0xFFFFFF,0x269FCB,1.0);

    //scene.add(lighting);

    //add lighting to the Scene
    keyLight = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    keyLight.position.set(-100, 0, 100);

    fillLight = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    fillLight.position.set(100, 0, 100);

    backLight = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    backLight.position.set(100, 0, -100).normalize();

    secondBacklight = new THREE.DirectionalLight(0xFFFFFF,1.0);
    secondBacklight.position.set(-100,0,-100);

    scene.add(keyLight);
    scene.add(fillLight);
    scene.add(backLight);
    scene.add(secondBacklight);

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

let s1 = new THREE.Mesh(
  new THREE.CircleGeometry(20,32,100,Math.PI*2),
  new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
);

let s2 = new THREE.Mesh(
  new THREE.CircleGeometry(20,32,100,Math.PI*2),
  new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
);

let s3 = new THREE.Mesh(
  new THREE.CircleGeometry(20,32,100,Math.PI*2),
  new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
);

let s4 = new THREE.Mesh(
  new THREE.CircleGeometry(20,32,100,Math.PI*2),
  new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
);

let s5 = new THREE.Mesh(
  new THREE.CircleGeometry(20,32,100,Math.PI*2),
  new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
);

let s6 = new THREE.Mesh(
  new THREE.CircleGeometry(20,32,100,Math.PI*2),
  new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
);

let s7 = new THREE.Mesh(
  new THREE.CircleGeometry(20,32,100,Math.PI*2),
  new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
);

let s8 = new THREE.Mesh(
  new THREE.CircleGeometry(20,32,100,Math.PI*2),
  new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
);

let s9 = new THREE.Mesh(
  new THREE.CircleGeometry(20,32,100,Math.PI*2),
  new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
);

let s10 = new THREE.Mesh(
  new THREE.CircleGeometry(20,32,100,Math.PI*2),
  new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
);

let s11 = new THREE.Mesh(
  new THREE.CircleGeometry(20,32,100,Math.PI*2),
  new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
);

let s12 = new THREE.Mesh(
  new THREE.CircleGeometry(20,32,100,Math.PI*2),
  new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
);

let s13 = new THREE.Mesh(
  new THREE.CircleGeometry(20,32,100,Math.PI*2),
  new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
);

let s14 = new THREE.Mesh(
  new THREE.CircleGeometry(20,32,100,Math.PI*2),
  new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
);

let s15 = new THREE.Mesh(
  new THREE.CircleGeometry(20,32,100,Math.PI*2),
  new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
);

let s16 = new THREE.Mesh(
  new THREE.CircleGeometry(20,32,100,Math.PI*2),
  new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
);


  s1.position.set(-30,-100,50);
  s1.rotateX(-90);
  s2.position.set(30,-100,50);
  s2.rotateX(-90);
  scene.add(s1);
  scene.add(s2);


    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(600, 600);
    //renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor( 0x333F47, 1);

    container.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.maxDistance = 900;
    controls.minDistance = 400;
    controls.enablePan = false;
    //controls.autoRotate = true;

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
}

}
