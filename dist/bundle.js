/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.ts":
/*!****************!*\
  !*** ./app.ts ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// If Babylon.js was pre-loaded, rathen than on demand as here, then you could use the below type of
// import, instead of needing to prefix references with "BABYLON."
//
//   import {Engine, Scene} from "babylonjs"
//
// Note that you'd also need to add "babylonjs": "BABYLON" to the 'externals' in the webpack config.
Object.defineProperty(exports, "__esModule", { value: true });
// const babylonSrcPath = "/node_modules/babylonjs/babylon.max.js";
// const babylonMaterialsPath = "/node_modules/babylonjs-materials/babylonjs.materials.js";
const babylonSrcPath = "https://cdn.babylonjs.com/babylon.js";
const babylonMaterialsPath = "https://cdn.babylonjs.com/materialsLibrary/babylon.gridMaterial.js";
let useGrid = false;
function loadScript(src) {
    let result = new Promise((resolve, reject) => {
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
let loadButton = document.getElementById("loadButton");
loadButton.addEventListener("click", () => {
    let babylonPromise = typeof BABYLON === 'undefined' ? loadBabylon() : Promise.resolve();
    babylonPromise.then(() => {
        var canvas = document.getElementById("renderCanvas");
        var engine = new BABYLON.Engine(canvas, true);
        var gridToggle = document.getElementById("useGrid");
        var desertToggle = document.getElementById("useDesert");
        useGrid = gridToggle.checked;
        function createScene() {
            var scene = new BABYLON.Scene(engine);
            var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, BABYLON.Vector3.Zero(), scene);
            camera.attachControl(canvas, true);
            var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
            var box = BABYLON.MeshBuilder.CreateBox("box", { size: 0.5, faceColors: [
                    new BABYLON.Color4(1, 0, 0, 1),
                    new BABYLON.Color4(1, 1, 0, 1),
                    new BABYLON.Color4(0, 1, 0, 1),
                    new BABYLON.Color4(0, 1, 1, 1),
                    new BABYLON.Color4(0, 0, 1, 1),
                    new BABYLON.Color4(1, 0, 1, 1),
                ] }, scene);
            box.position.y = 0.3;
            var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
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
            var ground;
            var grid;
            function CreateGrid() {
                // Create the ground plane using a grid
                // See example at https://www.babylonjs-playground.com/#1UFGZH#12
                ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 2, height: 2, subdivisions: 2 }, scene);
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
            var linesArray = [];
            function CreateLines() {
                function DoLines(isX) {
                    for (let i = 0; i <= 20; i += 2) {
                        let pos = -1 + i * 0.1;
                        var points = [
                            new BABYLON.Vector3(isX ? pos : -1, 0, isX ? -1 : pos),
                            new BABYLON.Vector3(isX ? pos : 1, 0, isX ? 1 : pos)
                        ];
                        let lineColor = new BABYLON.Color4(1, 1, 1.0, (i % 5 == 0 ? 0.8 : 0.3));
                        var colors = [lineColor, lineColor];
                        linesArray.push(BABYLON.MeshBuilder.CreateLines("", { points, colors }, useGrid ? null : scene));
                    }
                }
                DoLines(true);
                DoLines(false);
            }
            function setSkybox() {
                skybox.material = desertToggle.checked ? desertMaterial : cloudsMaterial;
            }
            desertToggle.addEventListener("change", setSkybox);
            setSkybox();
            useGrid ? CreateGrid() : CreateLines();
            gridToggle.addEventListener("change", (ev) => {
                useGrid = gridToggle.checked;
                if (useGrid) {
                    // Remove the lines, add the grid
                    linesArray.forEach(elem => elem.dispose());
                    linesArray = [];
                    CreateGrid();
                }
                else {
                    grid.dispose();
                    ground.dispose();
                    CreateLines();
                }
            });
            return scene;
        }
        var scene = createScene();
        engine.runRenderLoop(() => {
            scene.render();
        });
    });
});
exports.default = {
    version: "1.0.0"
};


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map