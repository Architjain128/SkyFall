
import {GLTFLoader} from "./lib/GLTFLoader.js"
import{OrbitControls} from "./OrbitControls.js"
var GAMEZONE = document.getElementById("GAME")
var height = GAMEZONE.offsetHeight
var width = GAMEZONE.offsetWidth

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
camera.position.x=10
camera.position.y=10
camera.position.z=-500
const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setClearColor("#87ceeb");
renderer.setSize( width, height )
GAMEZONE.appendChild( renderer.domElement )

var bgWidth
var bgHeight
const Texloader = new THREE.TextureLoader();
var bgTexture= Texloader.load(
	'./public/bg.jpg',
	function ( texture ) {
        console.log(texture)
        var img = texture.image;
        bgWidth= img.width;
        bgHeight = img.height;
        GAMEZONE = document.getElementById("GAME")
        height = GAMEZONE.offsetHeight
        width = GAMEZONE.offsetWidth
        renderer.setSize(width,height)
        camera.aspect = width/height
        camera.updateProjectionMatrix()
        // scene.backgroundSize = "100% auto"
	}
);
scene.background = bgTexture;
bgTexture.wrapS = THREE.MirroredRepeatWrapping;
bgTexture.wrapT = THREE.MirroredRepeatWrapping;

window.addEventListener("resize",()=>{resize()})
var controls = new OrbitControls(camera, renderer.domElement)
controls.update();

render()

function render() {
    requestAnimationFrame(render)
    controls.update()
    renderer.render( scene, camera )
}

function resize(){
    GAMEZONE = document.getElementById("GAME")
    height = GAMEZONE.offsetHeight
    width = GAMEZONE.offsetWidth
    renderer.setSize(width,height)
    camera.aspect = width/height
    camera.updateProjectionMatrix()
}