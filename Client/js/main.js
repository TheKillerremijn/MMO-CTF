var scene, camera, renderer, loadmanager;
var map, actor;
var controls;
var debug;

var prevTime = Date.now();

var blocker = document.getElementById('blocker');
var instructions = document.getElementById('instructions');

var onKeyDown = function (event) {
    if (event.keyCode == 27) {
        if (controlsEnabled == true) {
            controls.enabled = false;
            controlsEnabled = false;

            blocker.style.display = '-webkit-box';
            blocker.style.display = '-moz-box';
            blocker.style.display = 'box';

            instructions.style.display = '';
        } else {
            controlsEnabled = true;
            controls.enabled = true;

            blocker.style.display = 'none';

            instructions.style.display = 'none';
        }
    }
};
document.addEventListener('keydown', onKeyDown, false);

instructions.addEventListener('click', function (event) {

    controlsEnabled = true;
    controls.enabled = true;

    blocker.style.display = 'none';

    instructions.style.display = 'none';

}, false);

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 100000);
    camera.position.y = 800;
    camera.rotation.x = -Math.PI / 2;
    camera.rotation.z = -Math.PI/2;


    renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    loadmanager = new THREE.LoadingManager();
    loadmanager.onProgress = function ( item, loaded, total ) {
        console.log( item, loaded, total );
    };

    //Load Map
    map = new Map();

    //Load Actors
    controls = new PlayerController();
    actor = new Actor(controls, 0x990000);

    var axisHelper = new THREE.AxisHelper( 200 );
    scene.add( axisHelper );

    scene.add(map);

    map.add(actor);
    actor.position.x = 2;


    debug = new DebugInfo();
}

function render() {
    requestAnimationFrame(render);

    var now = Date.now();
    var delta = (now - prevTime) / 1000;

    //console.log("Delta: " + delta + " FPS: " + 1000/(delta*1000));

    //Update Objects
    actor.update(delta);
    THREE.AnimationHandler.update(delta);

    //Print debug info
    debug.update();

    prevTime = now;

    renderer.render(scene, camera);
}

init();
render();