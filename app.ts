// If Babylon.js was pre-loaded, rathen than on demand as here, then you could use the below type of
// import, instead of needing to prefix references with "BABYLON."
//
//   import {Engine, Scene} from "babylonjs"
//
// Note that you'd also need to add "babylonjs": "BABYLON" to the 'externals' in the webpack config.

const babylonSrcPath = "/node_modules/babylonjs/babylon.max.js";

function loadScript(src: string): Promise<unknown> {
  let result = new Promise( (resolve, reject) => {
    let script = document.createElement("script");
    script.setAttribute("src", src);
    script.onload = () => resolve();
    script.onerror = () => reject("Failed to load script: " + src);
    document.body.appendChild(script);
  });
  return result;
}

let loadButton = document.getElementById("loadButton") as HTMLButtonElement;
loadButton.addEventListener("click", () => {

  let babylonPromise = typeof BABYLON === 'undefined' ? loadScript(babylonSrcPath) : Promise.resolve()

  babylonPromise.then(() => {
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
  });
});

export default {
  version: "1.0.0"
};
