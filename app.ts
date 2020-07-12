import * as BABYLON from "babylonjs"

var canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
var engine: BABYLON.Engine = new BABYLON.Engine(canvas!, true);

function createScene(): BABYLON.Scene {
    var scene: BABYLON.Scene = new BABYLON.Scene(engine);

    var camera: BABYLON.ArcRotateCamera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    var light1: BABYLON.HemisphericLight = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);

    var sphere: BABYLON.Mesh = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);

    return scene;
}

var scene: BABYLON.Scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});
