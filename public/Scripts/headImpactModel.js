let s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16;
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

    document.getElementById('loader').style.display = 'block';
    //custom 3s timeout for OBJ loading
    setTimeout(function(){
        document.getElementById('loader').style.display = 'none';
         document.getElementsByTagName("body")[0].style.overflow = 'scroll';
         let loadingScreen = document.getElementById('loading-screen');
         loadingScreen.classList.add('fade-out');
         // loadingScreen.classList.add('fade-out');
    },5000);
     ambient = new THREE.AmbientLight(0xFFFFFF);
     scene.add(ambient);

     //lighting =  new THREE.HemisphereLight(0xFFFFFF,0x269FCB,1.0);

    //scene.add(lighting);


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
    //document.addEventListener('mousemove', onMouseMove, false);
});

    initSensorCircles();

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


    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.setSize(600, 600);
    renderer.setSize(window.innerWidth, window.innerHeight);
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

    window.addEventListener('resize', onWindowResize, false);
}
function initSensorCircles(){
  s1 = new THREE.Mesh(
    new THREE.CircleGeometry(20,32,100,Math.PI*2),
    new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
  );

  s2 = new THREE.Mesh(
    new THREE.CircleGeometry(20,32,100,Math.PI*2),
    new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
  );

  s3 = new THREE.Mesh(
    new THREE.CircleGeometry(20,32,100,Math.PI*2),
    new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
  );

  s4 = new THREE.Mesh(
    new THREE.CircleGeometry(20,32,100,Math.PI*2),
    new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
  );

  s5 = new THREE.Mesh(
    new THREE.CircleGeometry(20,32,100,Math.PI*2),
    new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
  );

  s6 = new THREE.Mesh(
    new THREE.CircleGeometry(20,32,100,Math.PI*2),
    new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
  );

  s7 = new THREE.Mesh(
    new THREE.CircleGeometry(20,32,100,Math.PI*2),
    new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
  );

  s8 = new THREE.Mesh(
    new THREE.CircleGeometry(20,32,100,Math.PI*2),
    new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
  );

  s9 = new THREE.Mesh(
    new THREE.CircleGeometry(20,32,100,Math.PI*2),
    new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
  );

  s10 = new THREE.Mesh(
    new THREE.CircleGeometry(20,32,100,Math.PI*2),
    new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
  );

  s11 = new THREE.Mesh(
    new THREE.CircleGeometry(20,32,100,Math.PI*2),
    new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
  );

  s12 = new THREE.Mesh(
    new THREE.CircleGeometry(20,32,100,Math.PI*2),
    new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
  );

  s13 = new THREE.Mesh(
    new THREE.CircleGeometry(20,32,100,Math.PI*2),
    new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
  );

  s14 = new THREE.Mesh(
    new THREE.CircleGeometry(20,32,100,Math.PI*2),
    new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
  );

  s15 = new THREE.Mesh(
    new THREE.CircleGeometry(20,32,100,Math.PI*2),
    new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
  );

  s16 = new THREE.Mesh(
    new THREE.CircleGeometry(20,32,100,Math.PI*2),
    new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
  );
  //Update Positions
    s1.position.set(-30,-100,50);
    s1.rotateX(-90);
    s2.position.set(30,-100,50);
    s2.rotateX(-90);
    s3.position.set(-30,-80, 93);
    s3.rotateX(108);
    s4.position.set(30,-80, 93);
    s4.rotateX(108);
    s5.position.set(-30,-20, 120)
    s5.rotateX(0);
    s6.position.set(30,-20, 120);
    s6.rotateX(0);
    s7.position.set(-70,-35,50);
    s7.rotateY(90);
    s8.position.set(-70,15,50);
    s8.rotateY(-90);
    s9.position.set(70,-35,50);
    s9.rotateY(90);
    s10.position.set(70,15,50);
    s10.rotateY(-90);
    s11.position.set(-50,45,100);
    s11.rotateY(0);
    s12.position.set(50,45,100);
    s12.rotateY(0);
    s13.position.set(-30,100,50);
    s13.rotateX(90);
    s14.position.set(30,100,50);
    s14.rotateX(90);
    s15.position.set(-40,100,0);
    s15.rotateX(90);
    s16.position.set(40,100,0);
    s16.rotateX(90);
  //Add to scene

    scene.add(s1);
    scene.add(s2);
    scene.add(s3);
    scene.add(s4);
    scene.add(s5);
    scene.add(s6);
    scene.add(s7);
    scene.add(s8);
    scene.add(s9);
    scene.add(s10);
    scene.add(s11);
    scene.add(s12);
    scene.add(s13);
    scene.add(s14);
    scene.add(s15);
    scene.add(s16);
}


function animate() {
  requestAnimationFrame(animate);
    //controls.update();
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

function onTransitionEnd(event){
  const element = event.target;
  element.remove();
}

}
