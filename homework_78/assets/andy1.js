let scene, camera, renderer, stars;
var count = 0
let num = -0.0005


init();
/* render(); */
animate();

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = Math.PI/2;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

/* world axis */
    worldAxis = new THREE.Vector3(0,0,1);

/* light source */

    var light = new THREE.HemisphereLight();
    light.position.set(1,1,1);
    scene.add(light);

/* generates new geometry */
    starGeo = new THREE.Geometry();


    starPoints = []
    count = 500


    for(let i=0; i <count; i++) { 
        rand1 = Math.random()
        rand2 = Math.random()
        let star = new THREE.Vector3();
        star.x = rand1 * 600 - 300
        star.y = rand2 * 600 - 300
        star.velocity = 0;
        star.acceleration = 0.005;
        starPoints.push(star)
    }



    function distanceSort(a,b) {
        return b.manhattanDistanceTo(camera.position) - a.manhattanDistanceTo(camera.position);
    }

    starPoints.sort(distanceSort);

/* creates vertices inside geometry */
/*     for(let i=0; i<count; i++) {
        star = starPoints[i]
        star.velocity = 0;
        star.acceleration = 0.005; */

        /* adds vertices to the starGeo geometry */
/*         starGeo.vertices.push(star);
    } */

/* loads img texture */
/*     let sprite = new THREE.TextureLoader().load('img/star.png');
    let texture = new THREE.TextureLoader().load('img/alphamap.png');
    let starMaterial = new THREE.PointsMaterial({
        color: 0xFF0000,
        size: 0.3,
        map: sprite,
    }); */

/* creates new instance mesh */
    var geometry = new THREE.IcosahedronBufferGeometry(0.0025, 1)
    var material = new THREE.MeshStandardMaterial({
        opacity: .5,
        depthTest: false,
        depthWrite: false,

        emissive: 0xFF0000
    })
    mesh = new THREE.InstancedMesh(geometry, material, count);
    scene.add(mesh);

    transform = new THREE.Object3D();
    color = new THREE.Color();

    for(let i=0; i<count; i++) {
        transform.position.copy(starPoints[i]);
        transform.scale.setScalar( Math.random() * 0.75 + 0.25 );
        transform.updateMatrix();
        color.setHex(Math.random() * 0xffffff )

        mesh.setMatrixAt(i, transform.matrix);
        mesh.setColorAt(i, color)
    }

    console.log(mesh.geometry)

    for(let i=0; i<count; i++) {
        mesh.getMatrixAt(i, transform.position);
        /* console.log(transform.position) */
    }

 /*    stars = new THREE.Points(starGeo, starMaterial);
    scene.add(stars); */
    
}

/* generate random int */
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
/* animate */


function animate() {

    /* resets count */
/*     count += 1 
    if (count>1000) {
        count = 0
    }        */    
    /* console.log(count)  */
    
    starGeo.vertices.forEach(p=>{
        p.velocity += p.acceleration
        p.y += p.velocity;
        p.x -= p.velocity;
        /* if(p.y < -200) {
            p.y = 200;
            p.velocity = 0;
        } */
        if(p.y > 200) {
            p.y = -200;
            p.velocity = 0;
        }
        if(p.x < -200) {
            p.x = 200;
            p.velocity = 0;
        }
        
    })
    for(let i=0; i<count; i++) {
        mesh.getMatrixAt(i, transform.position);
        transform.position.y += 10
        mesh.setMatrixAt(i, transform.position);
    } 

    
    
    mesh.instanceMatrix.needsUpdate = true;
    starGeo.verticesNeedUpdate = true;
    /* stars.rotation.y += num; */

/*     if ((stars.rotation.y > .2) || (stars.rotation.y < -.2)) {
        num *= -1
    } */
    
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
}


console.log(transform.rotateOnWorldAxis(worldAxis, 1))

/* function render() {
    renderer.render(scene, camera);
} */
