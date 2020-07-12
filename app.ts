// Below is removed by WebPack during the build. It's available as an 'external'
import {Engine, Scene, MeshBuilder, ArcRotateCamera, HemisphericLight, Vector3, Mesh} from "babylonjs"

var canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
var engine: Engine = new Engine(canvas!, true);

function createScene(): Scene {
    var scene: Scene = new Scene(engine);

    var camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    var light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);

    var sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);

    return scene;
}

var scene: Scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});
