﻿// Light
var spot = new BABYLON.SpotLight("spot", new BABYLON.Vector3(0, 30, 10), new BABYLON.Vector3(0, -1, 0), 17, 1, scene);
spot.diffuse = new BABYLON.Color3(1, 1, 1);
spot.specular = new BABYLON.Color3(0, 0, 0);
spot.intensity = 0.3;

// Camera
var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 100, new BABYLON.Vector3.Zero(), scene);
camera.lowerBetaLimit = 0.1;
camera.upperBetaLimit = (Math.PI / 2) * 0.9;
camera.lowerRadiusLimit = 30;
camera.upperRadiusLimit = 150;
camera.attachControl(canvas);

// Ground
var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
groundMaterial.diffuseTexture = new BABYLON.Texture("textures/earth.jpg", scene);

var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "textures/worldHeightMap.jpg", 200, 200, 250, 0, 10, scene, false);
ground.material = groundMaterial;

//Sphere to see the light's position
var sun = new BABYLON.Mesh.CreateSphere("sun", 10, 4, scene);
sun.material = new BABYLON.StandardMaterial("sun", scene);
sun.material.emissiveColor = new BABYLON.Color3(1, 1, 0);

// Skybox
var skybox = BABYLON.Mesh.CreateBox("skyBox", 800.0, scene);
var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
skyboxMaterial.backFaceCulling = false;
skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox/skybox", scene);
skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
skybox.material = skyboxMaterial;

//Sun animation
scene.registerBeforeRender(function () {
    sun.position = spot.position;
    spot.position.x -= 0.5;
    if (spot.position.x < -90)
        spot.position.x = 100;

});