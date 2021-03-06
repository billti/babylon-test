// If Babylon.js was pre-loaded, rathen than on demand as here, then you could use the below type of
// import, instead of needing to prefix references with "BABYLON."
//
//   import {Engine, Scene} from "babylonjs"
//
// Note that you'd also need to add "babylonjs": "BABYLON" to the 'externals' in the webpack config.

// const babylonSrcPath = "/node_modules/babylonjs/babylon.max.js";
// const babylonMaterialsPath = "/node_modules/babylonjs-materials/babylonjs.materials.js";
const babylonSrcPath = "https://cdn.babylonjs.com/babylon.js"
const babylonMaterialsPath = "https://cdn.babylonjs.com/materialsLibrary/babylon.gridMaterial.js"

let useGrid = true;

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

function loadBabylon() {
  return loadScript(babylonSrcPath).then(() => loadScript(babylonMaterialsPath));
}

let loadButton = document.getElementById("loadButton") as HTMLButtonElement;
loadButton.addEventListener("click", () => {

  let babylonPromise = typeof BABYLON === 'undefined' ? loadBabylon() : Promise.resolve()

  babylonPromise.then(() => {
    var canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
    var engine: BABYLON.Engine = new BABYLON.Engine(canvas!, true);

    //var gridToggle = document.getElementById("useGrid") as HTMLInputElement;
    var skyboxSelect = document.getElementById("skybox") as HTMLSelectElement;

    function createScene(): BABYLON.Scene {
        var scene: BABYLON.Scene = new BABYLON.Scene(engine);

        var camera: BABYLON.ArcRotateCamera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        camera.minZ = 0;

        var light1: BABYLON.HemisphericLight = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);

        var box: BABYLON.Mesh = BABYLON.MeshBuilder.CreateBox("box", {size: 0.5, faceColors: [
          new BABYLON.Color4(1, 0, 0, 1),
          new BABYLON.Color4(1, 1, 0, 1),
          new BABYLON.Color4(0, 1, 0, 1),
          new BABYLON.Color4(0, 1, 1, 1),
          new BABYLON.Color4(0, 0, 1, 1),
          new BABYLON.Color4(1, 0, 1, 1),
        ]}, scene);
        box.position.y = 0.25;

        var sphere: BABYLON.Mesh = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 0.4}, scene);
        sphere.position.z = 0.2;
        sphere.position.y = 0.2;
        sphere.position.x = 0.5;

        var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene);

        function loadSkybox(name: string): BABYLON.StandardMaterial {
          var skyboxMaterial = new BABYLON.StandardMaterial(name, scene);
          skyboxMaterial.backFaceCulling = false;
          skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(`textures/${name}`, scene);
          skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
          skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
          skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

          return skyboxMaterial;
        }

        type skyboxIndex = {[index: string]: BABYLON.StandardMaterial};
        var skybox_materials: skyboxIndex = {
          "darkfield": loadSkybox("darkfield"),
          "desert": loadSkybox("desert"),
          "icelake": loadSkybox("icelake"),
          "range": loadSkybox("range"),
          "skybox": loadSkybox("skybox")
        };

        var desertMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        desertMaterial.backFaceCulling = false;
        desertMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/desert", scene);
        desertMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        desertMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        desertMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

        var cloudsMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        cloudsMaterial.backFaceCulling = false;
        cloudsMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox", scene);
        cloudsMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        cloudsMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        cloudsMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

        var ground: BABYLON.Mesh;
        var grid: BABYLON.GridMaterial;

        function CreateGrid() {
        // Create the ground plane using a grid
        // See example at https://www.babylonjs-playground.com/#1UFGZH#12
          ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 3, height: 3, subdivisions: 3}, scene);
          grid = new BABYLON.GridMaterial("grid", scene);
          grid.gridRatio = 0.1;
          grid.majorUnitFrequency = 5;
          grid.backFaceCulling = false;
          grid.opacity = 0.98;
          grid.mainColor = new BABYLON.Color3(1, 1, 1);
          grid.lineColor = new BABYLON.Color3(1, 1, 1);
          ground.material = grid;
        }

        // Create the ground plane using lines
        var linesArray: Array<BABYLON.LinesMesh> = [];
        function CreateLines() {
          function DoLines(isX: boolean) {
            for(let i = 0; i <= 20; i += 2) {
              let pos = -1 + i * 0.1;
              var points = [
                new BABYLON.Vector3(isX ? pos : -1, 0, isX ? -1 : pos),
                new BABYLON.Vector3(isX ? pos :  1, 0, isX ?  1 : pos)
              ];
              let lineColor = new BABYLON.Color4(1, 1, 1.0, (i % 5 == 0 ? 0.8 : 0.3))
              var colors = [lineColor, lineColor];
              linesArray.push(BABYLON.MeshBuilder.CreateLines("", {points, colors}, useGrid ? null : scene));
            }
          }
          DoLines(true);
          DoLines(false);
        }

        function setSkybox() {
          skybox.material = skybox_materials[skyboxSelect.value];
        }
        skyboxSelect.addEventListener("change", setSkybox);
        setSkybox();

        //useGrid = gridToggle.checked;
        useGrid ? CreateGrid() : CreateLines();
        // gridToggle.addEventListener("change", (ev: Event) => {
        //   useGrid = gridToggle.checked;
        //   if (useGrid) {
        //     // Remove the lines, add the grid
        //     linesArray.forEach(elem => elem.dispose());
        //     linesArray = [];
        //     CreateGrid();
        //   } else {
        //     grid.dispose();
        //     ground.dispose();
        //     CreateLines();
        //   }
        // });

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
