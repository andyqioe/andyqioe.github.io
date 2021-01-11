let scene, camera, renderer, stars;

/*global vars*/
var accel = 0.001;
var veloStart = Math.random()/2;
var num = -0.0005
init();
/* rgb to hex */

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
  function rgbToHex(r, g, b) {
    return "0x" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

/* function generateRandomColor() {
    r = Math.round(Math.random() * 255)
    g = Math.round(Math.random() * 255)
    b = Math.round(Math.random() * 255)
    return rgbToHex(r, g, b)
} */

/* purple to blue */
function generateRandomColor() {
    r = 51
    g = randomIntFromInterval(150, 237)
    b = 255
    return rgbToHex(r, g, b)
}

function init() {
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x111111, 150, 200);

    camera = new THREE.PerspectiveCamera(150, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = Math.PI/2;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

/* generates new geometry */
    starGeo = new THREE.Geometry();
    
    starPoints = []
    count = 20000

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
    let sprite = new THREE.TextureLoader().load('assets/star.png');
    let starMaterial = new THREE.PointsMaterial({
        color: 0x92cad1,
        size: 0.1,
        map: sprite,
    });
    
    console.log(starMaterial)

    stars = new THREE.Points(starGeo, starMaterial);
    scene.add(stars);
    animate();
}

/* generate random int */
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
/* animate */



function animate() {

    /* resets count */
    /* console.log(count)  */

    starGeo.vertices.forEach(p=>{
        if (p.velocity < .1) {
            p.velocity += p.acceleration
        }
        
        p.y -= p.velocity;
        
        if(p.y < -300) {
            p.y = 300;
        }
       /*  if(p.y > 300) {
            p.y = -300;
        } */
        if(p.x < -300) {
            p.x = 300;
        }

        
    })

    starGeo.verticesNeedUpdate = true;
    stars.rotation.y += num;

    if ((stars.rotation.y > .2) || (stars.rotation.y < -.2)) {
        num *= -1
    }
    
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
}
