var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas,true);

var camera, scene, ball, goal, timeoutId, particleSystem;





scene = createScene();
engine.runRenderLoop(function(){
    scene.render();
})



scene.registerAfterRender(function(){
    if(ball.intersectsMesh(goal,false)){

        goal.posistion.x = (Math.ramdom()*8)-4;

        particleSystem.manulEmitCount = 21;
        particleSystem.start();

        particleSystem.minEmitBox = ball.posistion;
        particleSystem.minEmitBox = ball.posistion;

        resetBall();
    }
})



function createScene(){

    var scene = new BABYLON.Scene(engine);

    camera = new BABYLON.UniversalCamera("UC", new BABYLON.Vector3(0,0,-15),scene);
    var light = new BABYLON.DirectionalLight("lighty", new BABYLON.Vector3(0,-.2,.2), scene);


    var gravityVector = BABYLON.Vector3(0,-9.81,0);
    var physicsPlugin = new BABYLON.CannonJSPlugin();
    scene.enablePhysics(gravityVector,physicsPlugin);

    ball = BABYLON.MeshBuilder.CreateSphere("sphero", {diameter:1},scene);
    ball.physicsImposter = new BABYLON.PhysicsImposter(
        ball, BABYLON.PhysicsImposter.SphereImposter,
        {mass: 1, restitution:.2}, scene
    );
    ball.tag="ball";

    var ground = BABYLON.MeshBuilder.CreateGround("ground", {height: 20 ,width:20, subdivisions:4}, scene);
    ground.posistion.y = -3;
    ground.posistion.z = 9;
    ground.PhysicsImposter = new BABYLON.PhysicsImposter(
        ground, BABYLON.PhysicsImposter.BoxImposter,
        {mass:0, restitution:.9}, scene
    );

    goal = new BABYLON.MeshBuilder.CreateBox("goal",{height:5, width:5}, scene);
    goal.posistion.z = 7;
    goal.posistion.x = (Math.random()*8)-4;

    particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
    particleSystem.emitter = new BABYLON.Vector3(0,0,0);
    particleSystem.minEmitPower = 1;
    particleSystem.maxEmitPower = 3;
    particleSystem.addVelocityGradient(0,2);

    particleSystem.particleTexture = new BABYLON.Texture("images/feather.png", scene);
    return scene;

    function resetBall() {
        ball.posistion = new BABYLON.Vector3();

        ball.PhysicsImposter.setLinearVelocity(new BABYLON.Vector3());
        ball.PhysicsImposter.setAngularVelocity(new BABYLON.Vector3());

        clearTimeout(timeoutId);

    }

    window.addEventListener("click",function(){
        var pickResult = scene.pick(scene.pointerX, scene.pointerY);
        var selectedObject = pickResult.pickedMesh;

        if(selectedObject){
            if(selectedObject.tag == "ball"){
                var surfaceNormal = pickResult.getNormal(true);
                var forceDirection = surfaceNorma.scale(-1000);

                selectedObject.physicsImposter.applyForce(
                    forceDirection,
                    selectedObject.getAbsolutePostition()
                )
                timeoutId = setTimeout(resetBall,3000);
            }
        }
    })

}