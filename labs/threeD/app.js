//N320 12.9.2019//CCochran413
//I followed your video and then i broke the code some how LOL
var canvas = document.getElementById("renderCanvas");

var rgCost = document.getElementById("rgCost");

var infoBox = document.getElementById("infoBox");

var filterButtons = document.querySelectorAll(".filterNav");

var camera, scene, data, selectedPieces;

var selectedType = "all";


fetch("data/furniture.json", {method:'get'})

    .then(response => response.json())

    .then((jsonData)=>{

        data = jsonData;

        data.furniture.forEach((piece, idx)=>{

            var p = BABYLON.SceneLoader.ImportMesh(

                "", "./models/house/", piece.asset, scene,

                (meshes) => {

                    var containerNode = new BABYLON.TransformNode("root");

                    piece.asset = containerNode;

                    piece.asset.dataID = idx;



                    meshes.forEach((mesh)=>{

                        mesh.parent = containerNode;

                    })

                    TweenMax.to(piece.asset.position, 10, {y:4});

                }

            )

        })        

    })

var engine = new BABYLON.Engine(canvas, true);



scene = createScene();

engine.runRenderLoop(function(){

    scene.render();

})



function createScene(){

    scene = new BABYLON.Scene(engine);

    camera = new BABYLON.ArcRotateCamera(

        "c", Math.PI / 2, Math.PI / 4, 4, BABYLON.Vector3.Zero(), scene

    );

    var light = new BABYLON.DirectionalLight(

        "l", new BABYLON.Vector3(0, -.5, 1.0), scene

    );

    return scene;

}

function selectType(event){


    selectedType = event.target.getAttribute("data-type");

    filterButtons.forEach((button)=>{

        button.classList.remove("selected")

    });

    event.target.classList.add("selected");



}



function showAvailable(){

    var amount = Number(rgCost.value);

    selectedPieces = data.furniture.filter((piece)=>{

        if(selectedType == "all" ){

            return piece.price < amount;

        } else { 

            return ((piece.price < amount) && (piece.type == selectedType));

        }

    })




    data.furniture.forEach((piece)=>{

        TweenLite.to(piece.asset.position, .7, {y:5, onComplete: showFiltered})



    })

}



function showFiltered(){

    selectedPieces.forEach((piece, idx)=>{



        TweenLite.to(piece.asset.position, .7, {y:0, x: idx})



    })

}



window.addEventListener("click", function(){

    var pickResult = scene.pick(scene.pointerX, scene.pointerY);

    var selectedObject = pickResult.pickedMesh;
    if(selectedObject){

        var dataId = selectedObject.parent.dataID;

        var itemInfo = data.furniture[dataId];

        infoBox.innerHTML = `${itemInfo.style} ${itemInfo.type} : $${itemInfo.price}`;



    }

})