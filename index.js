
import {GLTFLoader} from "./lib/GLTFLoader.js"
import { Vector3 } from "./lib/three.module.js"
import{OrbitControls} from "./lib/OrbitControls.js"
var HEALTHBAR = document.getElementById("HEALTHBAR")
var HEALTHBARUI = document.getElementById("HEALTHBARUI")
var HEALTHBARUI2 = document.getElementById("HEALTHBARUI2")
var SCOREBAR = document.getElementById("SCOREBAR")
var health = 100
var score = 0
var GAMEZONE = document.getElementById("GAME")
var height = GAMEZONE.offsetHeight
var width = GAMEZONE.offsetWidth

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
camera.position.x=0
camera.position.y=0
camera.position.z=-500
const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setClearColor("#87ceeb");
renderer.setSize( width, height )
GAMEZONE.appendChild( renderer.domElement )
const Texloader = new THREE.TextureLoader();
const Objloader = new THREE.OBJLoader();

var light = new THREE.HemisphereLight(0xffffff,0x000000,2);
scene.add(light)

// var backgroundSphere = new THREE.Mesh(
//     new THREE.SphereGeometry(7000,100,100),
//     new THREE.MeshBasicMaterial({
//         map: (new THREE.TextureLoader).load("./public/bg.jpg"),
//         // side: c.DoubleSide
//     })
// );
// backgroundSphere.position.z=7200
// scene.add(backgroundSphere)

var bgWidth
var bgHeight
var bgTexture= Texloader.load(
	'./public/bg2.jpg',
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

var Player1
var Player2
var Player31
var Player32
var Player33
var Player34

var Player1_Tex1
var Player2_Tex1
var Player1_Tex2

var pltex = Texloader.load(
    "../odel/player/Jet_by_dommk/textures/jet_by_dommk_Base_Color.png",
    function(plt){
        Player1_Tex1=plt 
    },
)
var pltex = Texloader.load(
    "../odel/player/Jet_by_dommk/textures/jet_by_dommk_Emissive.png",
    function(plt){
        Player1_Tex2=plt 
    },
)
var pltex = Texloader.load(
    "../odel/Feisar_Ship_OBJ/maps/ok.jpg",
    function(plt){
        Player2_Tex1=plt 
    },
)

var pl = Objloader.load(
    "../odel/player/Jet_by_dommk/model/jet_by_dommk.obj",
    function(player){
        player.scale['x'] =0.08
        player.scale['y'] =0.08
        player.scale['z'] =0.08
        player.rotation['x']= -1.57
        player.rotation['y']= -1.57
        player.position['y']= 300
        // player.material.map=Player_Tex
        player.children[0].material.map=Player1_Tex1
        Player1=player
        scene.add(Player1)
    },
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded of player' );
	},
	function ( error ) {
		console.log( 'An error happened in player' );
	}
)

var pl2 = Objloader.load(
    "../odel/Feisar_Ship_OBJ/Feisar_Ship.obj",
    function(player){
        player.scale['x'] =0.45
        player.scale['y'] =0.45
        player.scale['z'] =0.45
        player.rotation['x']= -1.57
        player.position['y']= -300
        player.children[0].material.map=Player2_Tex1
        Player2=player
        scene.add(Player2)
    },
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded of player' );
	},
	function ( error ) {
		console.log( 'An error happened in player' );
	}
)

var pl31 = Objloader.load(
    "../odel/op.obj",
    function(player){
        player.rotation['x']= -1.57
        player.rotation['y']= -1.41
        player.position['y']= 280
        player.position['x']= 140
        player.children[0].material.color['r']=0.325
        player.children[0].material.color['g']=0.325
        player.children[0].material.color['b']=0.34
        player.children[1].material.color['r']=0.325
        player.children[1].material.color['g']=0.325
        player.children[1].material.color['b']=0.34
        Player31=player
        scene.add(Player31)
    },
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded of player' );
	},
	function ( error ) {
		console.log( 'An error happened in player' );
	}
)

var pl32 = Objloader.load(
    "../odel/op.obj",
    function(player){
        player.rotation['x']= -1.57
        player.rotation['y']= -1.73
        player.position['y']= 280
        player.position['x']= -140
        player.children[0].material.color['r']=0.325
        player.children[0].material.color['g']=0.325
        player.children[0].material.color['b']=0.34
        player.children[1].material.color['r']=0.325
        player.children[1].material.color['g']=0.325
        player.children[1].material.color['b']=0.34
        Player32=player
        scene.add(Player32)
    },
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded of player' );
	},
	function ( error ) {
		console.log( 'An error happened in player' );
	}
)

var pl33 = Objloader.load(
    "../odel/op.obj",
    function(player){
        player.rotation['x']= -1.57
        player.rotation['y']= -1.25
        player.position['y']= 250
        player.position['x']= 280
        player.children[0].material.color['r']=0.325
        player.children[0].material.color['g']=0.325
        player.children[0].material.color['b']=0.34
        player.children[1].material.color['r']=0.325
        player.children[1].material.color['g']=0.325
        player.children[1].material.color['b']=0.34
        Player33=player
        scene.add(Player33)
    },
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded of player' );
	},
	function ( error ) {
		console.log( 'An error happened in player' );
	}
)

var pl34 = Objloader.load(
    "../odel/op.obj",
    function(player){
        player.rotation['x']= -1.57
        player.rotation['y']= -1.89
        player.position['y']= 250
        player.position['x']= -280
        player.children[0].material.color['r']=0.325
        player.children[0].material.color['g']=0.325
        player.children[0].material.color['b']=0.34
        player.children[1].material.color['r']=0.325
        player.children[1].material.color['g']=0.325
        player.children[1].material.color['b']=0.34
        Player34=player
        scene.add(Player34)
    },
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded of player' );
	},
	function ( error ) {
		console.log( 'An error happened in player' );
	}
)
var gridHelper = new THREE.GridHelper( 1000, 10);
gridHelper.rotation['x']=1.57
console.log(gridHelper.rotation)
scene.add( gridHelper );

scene.background = bgTexture;
bgTexture.wrapS = THREE.MirroredRepeatWrapping;
bgTexture.wrapT = THREE.MirroredRepeatWrapping;

window.addEventListener("resize",()=>{resize()})
var controls = new OrbitControls(camera, renderer.domElement)
controls.update();

render()


document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 87||keyCode == 38) {
        Player2.position['y'] +=2
    } else if (keyCode == 83||keyCode == 40) {
        Player2.position['y'] -=2
    } else if (keyCode == 65||keyCode == 37) {
        Player2.position['x'] +=2
    } else if (keyCode == 68||keyCode == 39) {
        Player2.position['x'] -=2
    } else if (keyCode == 32) {
        console.log("space")
    } else if (keyCode == 76) {
        Player2.rotation['y'] -=0.05
    }else if (keyCode == 77) {
        Player2.rotation['y'] +=0.05
    }else if (keyCode == 80) {
        health = Math.min(100,health + 10)
    }else if (keyCode == 81) {
        health = Math.max(0,health - 10)
    }

}
function random_value(a){
    return Math.random()*2*a -a
}
function random(){
    var a = 2
    Player31.position['x'] = Player31.position['x'] + random_value(a)
    Player31.position['y'] = Player31.position['y'] + random_value(a)
    Player32.position['x'] = Player32.position['x'] + random_value(a)
    Player32.position['y'] = Player32.position['y'] + random_value(a)
    Player33.position['x'] = Player33.position['x'] + random_value(a)
    Player33.position['y'] = Player33.position['y'] + random_value(a)
    Player34.position['x'] = Player34.position['x'] + random_value(a)
    Player34.position['y'] = Player34.position['y'] + random_value(a)
}

function render() {
    requestAnimationFrame(render)
    controls.update()
    renderer.render( scene, camera )
    scorify()
    healthify()
    // random()
}

function scorify(){
    SCOREBAR.innerHTML=score
}

function healthify(){
    if(health>70 && health <= 100)
    {
        HEALTHBARUI.style.backgroundColor="green"
        // HEALTHBAR.style.color="green"
        HEALTHBARUI2.style.height = ((100-health)+"%").toString()
    }else if(health>30 && health <= 70){
        HEALTHBARUI.style.backgroundColor="orange"
        // HEALTHBAR.style.color="orange"
        HEALTHBARUI2.style.height = ((100-health)+"%").toString()
    }else
    {
        HEALTHBARUI.style.backgroundColor="red"
        // HEALTHBAR.style.color="orange"
        HEALTHBARUI2.style.height = ((100-health)+"%").toString()
    }
    HEALTHBAR.innerHTML=health
}

function resize(){
    GAMEZONE = document.getElementById("GAME")
    height = GAMEZONE.offsetHeight
    width = GAMEZONE.offsetWidth
    renderer.setSize(width,height)
    camera.aspect = width/height
    camera.updateProjectionMatrix()
}