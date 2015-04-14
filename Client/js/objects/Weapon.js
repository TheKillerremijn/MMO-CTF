var Weapon = function(){

    var geometry = new THREE.BoxGeometry(10, 20, 80);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    THREE.Mesh.apply(this, [geometry, material]);
};

Weapon.prototype = Object.create(THREE.Mesh.prototype);
Weapon.prototype.constructor = Weapon;