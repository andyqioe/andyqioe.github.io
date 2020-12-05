let scene, camera, renderer, stars;

/*global vars*/
var accel = 0.001;
var veloStart = Math.random()/2;
init();

function init() {
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x111111, 150, 200);

    camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = Math.PI/2;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

/* generates new geometry */
    starGeo = new THREE.Geometry();
    
    starPoints = []
    count = 6000

    for(let i=0; i <count; i++) { 
        rand1 = Math.random() * 600 - 300
        rand2 = Math.random() * 600 - 300
        rand3 = Math.random() * 600 - 300
        let star = new THREE.Vector3();
        star.x = rand1 
        star.y = rand2 
        star.z = rand3
        starPoints.push(star)
    }
    
    function distanceSort(a,b) {
        return b.manhattanDistanceTo(camera.position) - a.manhattanDistanceTo(camera.position);
    }

    starPoints.sort(distanceSort);

/* creates vertices inside geometry */
    for(let i=0; i<count; i++) {
        star = starPoints[i]
        star.velocity = Math.random()/2;
        star.acceleration = accel;
        /* adds vertices to the starGeo geometry */
        starGeo.vertices.push(star);
    }

    /* loads img texture */
    let sprite = new THREE.TextureLoader().load('img/star.png');
    let texture = new THREE.TextureLoader().load('img/alphamap.png');
    let starMaterial = new THREE.PointsMaterial({
        color: 0xFF0000,
        size: 0.5,
        map: sprite,
    });

    const object = new THREE.Object3D();
    scene.add(object);
    stars = new THREE.Points(starGeo, starMaterial);
    scene.add(stars);
    animate();
}

/* generate random int */
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
/* animate */

count = 0
let num = -0.0005

function animate() {

    /* resets count */
    /* console.log(count)  */

    starGeo.vertices.forEach(p=>{
        p.velocity += p.acceleration
        p.y += p.velocity;
        p.x -= p.velocity;
        /* if(p.y < -200) {
            p.y = 200;
            p.velocity = 0;
        } */
        if(p.y > 300) {
            p.y = -300;
            
        }
        if(p.x < -300) {
            p.x = 300;
        }
        
    })

    starGeo.verticesNeedUpdate = true;
    /* stars.rotation.y += num; */

    if ((stars.rotation.y > .2) || (stars.rotation.y < -.2)) {
        num *= -1
    }
    
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
}
