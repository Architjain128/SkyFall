
import {GLTFLoader} from "./lib/GLTFLoader.js"
import { Vector3 } from "./lib/three.module.js"
import{OrbitControls} from "./lib/OrbitControls.js"
var DEBUG=true
var GRid=false
var HEALTHBAR = document.getElementById("HEALTHBAR")
var HEALTHBAR2 = document.getElementById("HEALTHBAR2")
var HEALTHBARUI = document.getElementById("HEALTHBARUI")
var HEALTHBARUI2 = document.getElementById("HEALTHBARUI2")
var EHEALTHBAR = document.getElementById("EHEALTHBAR")
var ENUM = document.getElementById("ENUM")
var EHEALTHBARUI = document.getElementById("EHEALTHBARUI")
var EHEALTHBARUI2 = document.getElementById("EHEALTHBARUI2")
var SCOREBAR = document.getElementById("SCOREBAR")
var SCOREBAR2 = document.getElementById("SCOREBAR2")
var MISS = document.getElementById("MISS")
var health = 100
var ehealth = 100
var Enum = 5
var score = 0
var miss = 10
var cam =0
var GAMEZONE = document.getElementById("GAME")
var height = GAMEZONE.offsetHeight
var width = GAMEZONE.offsetWidth
var STATUS = "INIT"
var STAR1=false
var STAR2=false
var STAR3=false
var pll=false
var v=1
var listfly = [0,0,0,0,0]
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
camera.position.x=0
camera.position.y=0
camera.position.z=-500
const camera2 = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
camera2.position.x=0
camera2.position.y=-450
camera2.position.z=-150
const renderer = new THREE.WebGLRenderer({antialias: true,alpha: true})
renderer.setClearColor("#87ceeb");
renderer.setSize( width, height )
GAMEZONE.appendChild( renderer.domElement )
const Texloader = new THREE.TextureLoader();
const Objloader = new THREE.OBJLoader();

var light = new THREE.HemisphereLight(0xffffff,0x000000,2);
scene.add(light)

var HudCanvas = document.createElement('canvas')
HudCanvas.width = width
HudCanvas.height = height
var HudBitmap = HudCanvas.getContext('2d')
HudBitmap.font = "Normal 40px Arial";
HudBitmap.textAlign = 'center';
HudBitmap.fillStyle = "rgba(245,245,245,0.75)";
HudBitmap.fillText('Initializing...',width/2, height/2);
var cameraHUD = new THREE.OrthographicCamera(-width/2, width/2, height/2, -height/2, 0, 30 )
var sceneHUD = new THREE.Scene();
var HudTexture = new THREE.Texture(HudCanvas) 
HudTexture.needsUpdate = true;
var material = new THREE.MeshBasicMaterial( {map: HudTexture} );
material.transparent = true;

var planeGeometry = new THREE.PlaneGeometry( width, height );
var plane = new THREE.Mesh( planeGeometry, material );
sceneHUD.add( plane );
console.log("hu",plane)


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
        camera2.aspect = width/height
        camera.updateProjectionMatrix()
        camera2.updateProjectionMatrix()
	}
);
scene.background = bgTexture;
bgTexture.wrapS = THREE.MirroredRepeatWrapping;
bgTexture.wrapT = THREE.MirroredRepeatWrapping;


var ctr = 0
var MissileList = []
var PlaneList = []
var Player1
var Player2
var Player31
var Player32
var Player33
var Player34
var Player1_Tex1
var Player2_Tex1
var Player1_Tex2
var Missile_Tex
var Star1
var Star2
var Star3
var sta1 = Objloader.load(
    "../odel/star/star.obj",
    function(mm){
        console.log("star",mm)
        mm.scale['x']=5
        mm.scale['y']=5
        mm.scale['z']=5
        mm.position['x']=Math.floor(Math.random() * 350)+50
        mm.position['y']=Math.floor(Math.random() * 400)-200
        mm.children[0].material.color['r']=1
        mm.children[0].material.color['g']=215/255
        mm.children[0].material.color['b']=0
        Star1=mm
        scene.add(Star1)
        STAR1=true
    },
    function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded of player' );
    },
    function ( error ) {
        console.log( 'An error happened in player' );
    }
)
var sta2 = Objloader.load(
    "../odel/star/star.obj",
    function(mm){
        console.log("star",mm)
        mm.scale['x']=5
        mm.scale['y']=5
        mm.scale['z']=5
        mm.position['x']=-1*(Math.floor(Math.random() * 350)+50)
        mm.position['y']=Math.floor(Math.random() * 400)-200
        mm.children[0].material.color['r']=1
        mm.children[0].material.color['g']=215/255
        mm.children[0].material.color['b']=0
        Star2=mm
        scene.add(Star2)
        STAR2=true
    },
    function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded of player' );
    },
    function ( error ) {
        console.log( 'An error happened in player' );
    }
)
var sta3 = Objloader.load(
    "../odel/star/star.obj",
    function(mm){
        console.log("star",mm)
        mm.scale['x']=5
        mm.scale['y']=5
        mm.scale['z']=5
        mm.position['x']=0
        mm.position['y']=0
        mm.children[0].material.color['r']=1
        mm.children[0].material.color['g']=0
        mm.children[0].material.color['b']=0
        Star3=mm
        scene.add(Star3)
        STAR3=true
    },
    function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded of player' );
    },
    function ( error ) {
        console.log( 'An error happened in player' );
    }
)
var mmtex = Texloader.load(
    "../odel/AIM-54_Phoenix_OBJ/AIM-54\ phoenix\ texture.jpeg",
    function(mmt){
        Missile_Tex=mmt
    },
)
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
        player.children[0].material.map=Player1_Tex1
        player["health"]=100
        Player1=player
        listfly[0]=1
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
        player.position['z']= -30
        player.children[0].material.map=Player2_Tex1
        Player2=player
        pll=true
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
        PlaneList.push(Player31)
        listfly[1]=1
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
        listfly[2]=1
        PlaneList.push(Player32)
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
        listfly[3]=1
        PlaneList.push(Player33)
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
        listfly[4]=1
        PlaneList.push(Player34)
        scene.add(Player34)
    },
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded of player' );
	},
	function ( error ) {
		console.log( 'An error happened in player' );
	}
)

if(GRid==true){
    var gridHelper = new THREE.GridHelper( 1000, 10);
    gridHelper.rotation['x']=1.57
    console.log(gridHelper.rotation)
    scene.add( gridHelper );
}

window.addEventListener("resize",()=>{resize()})
if(DEBUG==true){
    var controls = new OrbitControls(camera, renderer.domElement)
    var controls2 = new OrbitControls(camera2, renderer.domElement)
    controls.update();
    controls2.update();
}

render()

document.addEventListener("keyup", onDocumentKeyUp, false);
function onDocumentKeyUp(event) {
    var keyCode = event.which;
    if (keyCode == 67) {
        cam=0
        if(cam==0){
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
                    camera2.aspect = width/height
                    camera.updateProjectionMatrix()
                    camera2.updateProjectionMatrix()
                }
            );
            scene.background = bgTexture;
            bgTexture.wrapS = THREE.MirroredRepeatWrapping;
            bgTexture.wrapT = THREE.MirroredRepeatWrapping;
        } else{
            var bgWidth
            var bgHeight
            var bgTexture= Texloader.load(
                './public/image.jpg',
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
                    camera2.aspect = width/height
                    camera.updateProjectionMatrix()
                    camera2.updateProjectionMatrix()
                }
            );
            scene.background = bgTexture;
            bgTexture.wrapS = THREE.MirroredRepeatWrapping;
            bgTexture.wrapT = THREE.MirroredRepeatWrapping;
        }
    }

}

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
        if(miss>0){
            miss-=1
            fire()
        }
    } else if (keyCode == 76) {
        Player2.rotation['y'] -=0.05
    }else if (keyCode == 77) {
        Player2.rotation['y'] +=0.05
    }else if (keyCode == 80) {
        health = Math.min(100,health + 10)
    }else if (keyCode == 81) {
        health = Math.max(0,health - 10)
    }else if (keyCode == 27) {
        STATUS="GAMEOVER"
    }else if (keyCode == 82) {
        location.reload()
    }else if (keyCode == 67) {
        cam=1
        if(cam==0){
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
                    camera2.aspect = width/height
                    camera.updateProjectionMatrix()
                    camera2.updateProjectionMatrix()
                }
            );
            scene.background = bgTexture;
            bgTexture.wrapS = THREE.MirroredRepeatWrapping;
            bgTexture.wrapT = THREE.MirroredRepeatWrapping;
        } else{
            var bgWidth
            var bgHeight
            var bgTexture= Texloader.load(
                './public/image.jpg',
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
                    camera2.aspect = width/height
                    camera.updateProjectionMatrix()
                    camera2.updateProjectionMatrix()
                }
            );
            scene.background = bgTexture;
            bgTexture.wrapS = THREE.MirroredRepeatWrapping;
            bgTexture.wrapT = THREE.MirroredRepeatWrapping;
        }
    }

}

function random_value(a,b){
    return Math.random()*2*a -(a*b)
}

function random(){
    var a = 2
    var b=1.01
    if(listfly[1])
    {
        Player31.position['x'] = Player31.position['x'] + random_value(a,1)
        Player31.position['y'] = Player31.position['y'] + random_value(a,b)
    }
    if(listfly[2])
    {
        Player32.position['x'] = Player32.position['x'] + random_value(a,1)
        Player32.position['y'] = Player32.position['y'] + random_value(a,b)
    }
    if(listfly[3]){
        Player33.position['x'] = Player33.position['x'] + random_value(a,1)
        Player33.position['y'] = Player33.position['y'] + random_value(a,b)
    }
    if(listfly[4]){
        Player34.position['x'] = Player34.position['x'] + random_value(a,1)
        Player34.position['y'] = Player34.position['y'] + random_value(a,b)
    }
    if(listfly[0]){
        Player1.position['x'] = Player1.position['x'] + random_value(1.5*a,1)
        Player1.position['y'] = Player1.position['y'] + random_value(1.5*a,b)
    }
}

function plane_collison()
{
    var Missy=Player2
    for(let j=0 ;j<PlaneList.length;j++)
    {
        var Plany = PlaneList[j]
        if(Plany.position['z']!=-100000){
            let cf = Plany.position['x'] - Missy.position['x']
            let cf2 = Plany.position['y'] - Missy.position['y']
            if(((cf<80)&&(cf>-80))&&((cf2<110)&&(cf2>-110))){
                console.log(cf,cf2)
                Plany.position['z']=-100000
                listfly[1+j]=0
                score+=150
                health-=20
            }
        }
    }
    if(ehealth>0){
        var Plany = Player1
        if(Plany.position['z']!=-100000){
            let cf = Plany.position['x'] - Missy.position['x']
            let cf2 = Plany.position['y'] - Missy.position['y']
            if(((cf<80)&&(cf>-80))&&((cf2>-100)&&(cf2<100))){
                console.log(cf,cf2)
                console.log("col")
                // Missy.position['z']=-100000
                var h=100
                h=Math.min(h,health)
                h=Math.min(h,ehealth)
                Plany['health']-=h
                ehealth-=h
                health-=h
                if(Plany['health']<=0)
                {
                    Plany.position['z']=-100000
                    Plany['health']=0
                    listfly[0]=0
                    score+=500
                }
                // break
            }
        }
    }
}

function render() {
    requestAnimationFrame(render)
    if(DEBUG==true){
        controls.update()
        controls2.update()
    }
    if(cam==0){
        renderer.render( scene, camera )
    }else{
    renderer.render( scene, camera2 )
    }
    if(STATUS==="GAMEOVER" || STATUS==="YOU WON"){
        document.getElementById("HUD").style.display="none"
        renderer.render(sceneHUD, cameraHUD); 
    }
    star_collision()
    firey()
    starify()
    Hudupdate()
    scorify()
    healthify()
    random()
    if(pll==true){
    plane_collison()
    }
}

function Hudupdate(){
    HudBitmap.clearRect(0, 0, width, height);
    HudBitmap.fillText(STATUS ,width/2, height / 2);
    HudBitmap.fillText("Score : "+score , width / 2, (2* height) / 3);
    HudTexture.needsUpdate = true;
    material = new THREE.MeshBasicMaterial( {map: HudTexture} );
    material.transparent = true;
}

function fire(){
    console.log(Player2)
    var Missile1
    var mis = Objloader.load(
        "../odel/AIM-54_Phoenix_OBJ/AIM-54_Phoenix.obj",
        function(mm){
            console.log("mm",mm)
            mm.scale['x']=0.1
            mm.scale['y']=0.1
            mm.scale['z']=0.1
            mm.rotation['x']=Player2.rotation['x']
            mm.position['x']=-34+Player2.position['x']
            mm.position['y']=Player2.position['y']
            for(let i=0;i<12;i++){
            mm.children[i].material.map=Missile_Tex
            }
            mm['archit']=[ctr,-1.57,Math.sin(Player2.rotation['y']-1.57),Math.cos(Player2.rotation['y']-1.57),Player2.position['x'],Player2.position['y'],Player2.rotation['y']]
            Missile1=mm
            scene.add(Missile1)
            MissileList.push(Missile1)
            ctr++
        },
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded of missile' );
        },
        function ( error ) {
            console.log( 'An error happened in player' );
        }
    )
}

function firey(){
    for(let i=0;i<MissileList.length;i++)
    {
        var Missy=MissileList[i]
        if(Missy.position['z']!=-100000){
            Missy.rotation['y']=Missy['archit'][6]
            Missy.position['y']-=2*Missy['archit'][2]
            Missy.position['x']+=2*Missy['archit'][3]
            for(let j=0 ;j<PlaneList.length;j++)
            {
                var Plany = PlaneList[j]
                if(Plany.position['z']!=-100000){
                    let cf = Plany.position['x'] - Missy.position['x']
                    let cf2 = Plany.position['y'] - Missy.position['y']
                    if(((cf<40)&&(cf>-40))&&((cf2>-50)&&(cf2<50))){
                        console.log(cf,cf2)
                        console.log("col")
                        Missy.position['z']=-100000
                        Plany.position['z']=-100000
                        listfly[1+j]=0
                        score+=150
                        // break
                    }
                }
            }
            if(Player1['health']>0){
                var Plany = Player1
                if(Plany.position['z']!=-100000){
                    let cf = Plany.position['x'] - Missy.position['x']
                    let cf2 = Plany.position['y'] - Missy.position['y']
                    if(((cf<80)&&(cf>-80))&&((cf2>-100)&&(cf2<100))){
                        console.log(cf,cf2)
                        console.log("col")
                        Missy.position['z']=-100000
                        Plany['health']-=20
                        ehealth-=20
                        if(Plany['health']<=0)
                        {
                            Plany.position['z']=-100000
                            Plany['health']=0
                            listfly[0]=0
                            score+=500
                        }
                        // break
                    }
                }
            }
            if(Missy.position['x']>450 || Missy.position['x']<-450 || Missy.position['y']>400 || Missy.position['y']<-400){
                Missy.position['z']=-100000
            }
        }
    }
}

function removeEntity(object) {
    var selectedObject = scene.getObjectByName(object.name);
    scene.remove( selectedObject );
    render()
}

function starify(){
    if(STAR1==true){
        Star1.rotation['x']+=.02
    }
    if(STAR2==true){
        Star2.rotation['x']+=.02
    }
    if(STAR3==true){
        Star3.rotation['x']+=.1
        if(Star3.position['y']==150){
            v=1
        }
        if(Star3.position['y']==-150){
            v=-1
        }
        Star3.position['y']-=v
    }
}

function star_collision(){
    if(STAR1==true){
        let cf= Star1.position['x']-Player2.position['x']
        let cf2= Star1.position['y']-Player2.position['y']
        // console.log(cf,cf2)
        if((((cf)<60)  && ((cf)>-60 ))&& (((cf2)<80)  && ((cf2)>-80 ))){
            console.log("colosion1")
            score+=100
            Star1.position['z']=-100000
            STAR1=false
            removeEntity(Star1)
        }
    }
    if(STAR2==true){
        let cf= Star2.position['x']-Player2.position['x']
        let cf2= Star2.position['y']-Player2.position['y']
        // console.log(cf,cf2)
        if((((cf)<60)  && ((cf)>-60 ))&& (((cf2)<80)  && ((cf2)>-80 ))){
            console.log("colosion2")
            Star2.position['z']=-100000
            score+=100
            STAR2=false
            removeEntity(Star2)
        }
    }
    if(STAR3==true){
        let cf= Star3.position['x']-Player2.position['x']
        let cf2= Star3.position['y']-Player2.position['y']
        // console.log(cf,cf2)
        if((((cf)<60)  && ((cf)>-60 ))&& (((cf2)<80)  && ((cf2)>-80 ))){
            console.log("colosion2")
            Star3.position['z']=-100000
            score-=50
            health-=20
            STAR3=false
            removeEntity(Star2)
        }
    }
}

function scorify(){
    SCOREBAR.innerHTML=score
    SCOREBAR2.innerHTML=score
}

function healthify(){
    if(health>70 && health <= 100)
    {
        HEALTHBARUI.style.backgroundColor="green"
        HEALTHBARUI2.style.height = ((100-health)+"%").toString()
    }else if(health>30 && health <= 70){
        HEALTHBARUI.style.backgroundColor="orange"
        HEALTHBARUI2.style.height = ((100-health)+"%").toString()
    }else
    {
        HEALTHBARUI.style.backgroundColor="red"
        HEALTHBARUI2.style.height = ((100-health)+"%").toString()
    }
    HEALTHBAR.innerHTML=health
    HEALTHBAR2.innerHTML=health
    if(health==0){
        STATUS="GAMEOVER"
    }

    if(ehealth>70 && ehealth <= 100)
    {
        EHEALTHBARUI.style.backgroundColor="green"
        EHEALTHBARUI2.style.height = ((100-ehealth)+"%").toString()
    }else if(health>30 && ehealth <= 70){
        EHEALTHBARUI.style.backgroundColor="orange"
        EHEALTHBARUI2.style.height = ((100-ehealth)+"%").toString()
    }else
    {
        EHEALTHBARUI.style.backgroundColor="red"
        EHEALTHBARUI2.style.height = ((100-ehealth)+"%").toString()
    }
    EHEALTHBAR.innerHTML=ehealth
    Enum = 0
    for(let i=0;i<listfly.length;i++)
    {
        Enum+=listfly[i]
    }
    var Mizz = 0
    for(let i=0;i<MissileList.length;i++)
    {
        if(MissileList[i].position['z']==-100000){
            Mizz+=1
        }
    }
    if(Mizz==10){
        STATUS="GAMEOVER"
    }
    MISS.innerHTML=("MISSILE REMAINING : "+ (miss)).toString()
    ENUM.innerHTML=("ENEMIES REMAINING : "+ Enum).toString()
    if(ehealth==0 && health>0 && Enum==0){
        STATUS="YOU WON"
    }
}

function resize(){
    GAMEZONE = document.getElementById("GAME")
    height = GAMEZONE.offsetHeight
    width = GAMEZONE.offsetWidth
    renderer.setSize(width,height)
    camera.aspect = width/height
    camera2.aspect = width/height
    camera.updateProjectionMatrix()
    camera2.updateProjectionMatrix()
}