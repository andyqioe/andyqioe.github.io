let scene, camera, renderer, stars;

//global vars
var accel = 0.001;
var veloStart = Math.random()/2;
var num = -0.0005;
var timer = 1;
var randAccelList = [];
var randAccelListSlower = [];
var strength = .5;
var strength2 = 0.01;
var rotationToggle = false;
var incrementer = .0000001;
var ease = 0.01;
var defaultEase = 0.0002;

// particle speed
var speed = 1.001;
var speedIncrement = 1.001;
init();


// functions 
function cubicEaseInOut(t, b, c, d) {
	t /= d;
	return c*t*t*t + b;
};

function easeOutCubic(t, b, c, d) {
	t /= d;
	t--;
	return c*(t*t*t + 1) + b;
};

function easing(n) {
    return Math.log(n)
}


/* rgb to hex */
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
  function rgbToHex(r, g, b) {
    return "0x" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }
  
function generateRandomColor() {
    r = Math.round(Math.random() * 255);
    g = Math.round(Math.random() * 255);
    b = Math.round(Math.random() * 255);
    return rgbToHex(r, g, b)
}

/* purple to blue */
function generateRandomColor() {
    r = 51
    g = randomIntFromInterval(150, 237)
    b = 255
    return rgbToHex(r, g, b)
}


//initialize
function init() {
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x111111, 50, 200);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 0;
    camera.rotation.x = Math.PI/2;
    camera.rotation.z = Math.PI/2;
    camera.position.y = -150;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

/* generates new geometry */
    starGeo = new THREE.Geometry();
    starPoints = [];
    count = 10000;
    numVertex = 100;
    r = 35;
    theta = 2*Math.PI;
    phi = Math.PI/2;
    velocity = 0.02;
    savedPoints = [];
    savedUnitVectors = [];
    
    for (let i=0; i<numVertex; i++) {
        const newRadius = r * Math.cos((i* Math.PI/numVertex) + phi);
        const newZ = r * Math.sin((i* Math.PI/numVertex) + phi);

        for (let j=0; j<numVertex; j++) {
            const star = new THREE.Vector3();
            star.x = newRadius * Math.cos(j * theta/numVertex);
            star.y = newRadius * Math.sin(j * theta/numVertex);
            star.z = newZ;
            star.velocity = 0.02;
            star.acceleration = 0.01;
            
            const a = star.normalize()
            savedUnitVectors.push(a)

            a.x *= r;
            a.y *= r;
            a.z *= r;

            starGeo.vertices.push(a);
            savedPoints.push(a);
            
        }
    }   

    
    
    material = new THREE.TextureLoader().load('img/star.png');
    starMaterial =  new THREE.PointsMaterial({
        size: 0.2,
        map: material
    })

    for (let i=0; i<starGeo.vertices.length; i++) {
        point = savedUnitVectors[i]

        m = (Math.random()*((1.00 + strength2) - (1.00 - strength2)) + (1.00 - strength2));
        randAccelList.push(m)

        n = (Math.random()*((1.00 + strength) - (1.00 - strength2)) + (1.00 - strength2));
        randAccelListSlower.push(n)
    }

    stars = new THREE.Points(starGeo, starMaterial);
    scene.add(stars);
    animate();
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

function distance(a, b, c) {
    return Math.sqrt(a**2 + b**2 + c**2)
}

function animate() {
    timer += 1;
    
        /* starGeo.vertices = savedPoints; */
    
    var acceleration = 1.001
        // transformation 
    
    var withEasing = cubicEaseInOut(timer/1000, 0, 0.35, 1)
    var withEasing2 = easeOutCubic(timer/1000, 0, 0.35, 1)


    incrementer += 0.0001;
    var retract = incrementer

    // splash

    // expand

   /*  if (timer < 100) {
        if ((ease > 0) & (ease != defaultEase)) {
            ease -= withEasing2/1000
        }
        else if (ease < 0) {
            ease = defaultEase
        }
        for (let i=0; i<starGeo.vertices.length; i++) {
            var p = savedPoints[i];
            var temp = randAccelList[i]
            var randVelo = (Math.random()*((0.99999) - (0.99999 - strength)) + (0.99999 - strength))
            
            if ((distance(p.x, p.y, p.z) < r + 40) & (distance(p.x, p.y, p.z) > r - 20)) {
                nX = p.x * temp * ease;
                nY = p.y * temp * ease;
                nZ = p.z * temp * ease; 
            }
    
            else if (distance(p.x, p.y, p.z) >= r + 40) {
                nX = 0;
                nY = 0;
                nZ = 0; 
            }
            
            
            var ps = starGeo.vertices[i]
            ps.x += nX  
            ps.y += nY
            ps.z += nZ
        }
    } */
    
    // hyperspace
    
   /*  if ((timer >= 100) & (timer < 10000)){
        if (speed < 3.00) {
            speed *= speedIncrement
        }

        if (speed > 3.00) {
            speed = 3.00;
        }

        for (let i=0; i<starGeo.vertices.length; i++) {
            
            var u = savedUnitVectors[i];
            var p = savedPoints[i];
            var temp = randAccelListSlower[i]
            var tempR = 50

            nX = p.x * temp * ease;
            nY = p.y * temp * ease;
            nZ = p.z * temp * ease; 
            // var randVelo = (Math.random()*((0.99999) - (0.99999 - strength2)) + (0.99999 - strength2))
            
            if ((distance(p.x, p.y, p.z) < r + 50) & (distance(p.x, p.y, p.z) > r + 20)) {
                nX = ((p.x * temp) - tempR *u.x);
                nY = ((p.y * temp) - tempR *u.y);
                nZ = ((p.y * temp) - tempR *u.z); 
                
            }   
            
            else if (distance(p.x, p.y, p.z) < r + 50) {
                nX = -((p.x * temp) - tempR *u.x);
                nY = -((p.y * temp) - tempR *u.y);
                nZ = -((p.z * temp) - tempR *u.z); 
            }
            
            var ps = starGeo.vertices[i]
            ps.x += nX/500
            ps.y += nY/500
            ps.z += nZ/500

            if (distance(p.x, p.y, p.z) < r - 15) {
                rotationToggle = true;
            }   
        }
    } */

    //disperse
    if (timer >= 100) {

        starGeo.vertices.forEach(p=>{
            randomIntFromInterval(1, 1)
            temp = (Math.random()*0.01 + 1)
            p.x *= temp
            p.y *= temp
            p.z *= temp
    
            if ((p.y > r-5) || (p.y < r-5)) {
                p.x *= temp
                p.y *= temp
                p.z *= temp
            }
            p.velocity += p.acceleration

        })
    }
        /* camera.rotation.x += 0.01 */
        /* camera.rotation.y += 0.01 */
    var rotationSpeed = easing(timer) * 10**-4;
    var movingSpeed = easing(timer) * 10**-3 + 0.5;
    /* if (rotationToggle == true) {
        camera.rotation.z += rotationSpeed; 
        camera.position.y += .5
    } */
    /* camera.rotation.z += rotationSpeed;  */
    /* camera.position.y += movingSpeed; */
        

/*     starGeo.vertices.forEach(p=>{
        randomIntFromInterval(1, 1);
        temp = (Math.random()*0.01 + 1);

        if (distance(p.x, p.y, p.z) < r + 10) {
            p.x *= temp
            p.y *= temp
            p.z *= temp
        }
        
        p.velocity += p.acceleration

    }) */


    /* my transition!! */
/*     starGeo.vertices.forEach(p=>{
        randomIntFromInterval(1, 1)
        temp = (Math.random()*0.01 + 1)
        p.x *= temp
        p.y *= temp
        p.z *= temp

        if ((p.y > r-5) || (p.y < r-5)) {
            p.x *= temp
            p.y *= temp
            p.z *= temp
        }
        p.velocity += p.acceleration

    }) */
    /* camera.position.y += 0.05 */
    
    starGeo.verticesNeedUpdate = true;
    
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
}
