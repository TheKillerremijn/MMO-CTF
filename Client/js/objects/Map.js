var Map = function(){

    var scope = this;
    THREE.Object3D.apply(this);

    //var geometry = new THREE.PlaneGeometry(1000, 1000);
    //var material = new THREE.MeshBasicMaterial({ color: 0x999999 });
    //var floor = new THREE.Mesh(geometry, material);
    //floor.rotation.x = -Math.PI/2;
    //this.add(floor);

    var grid = new THREE.GridHelper(1000, 100);
    this.add(grid);

    //Add lighting
    var pointLight = new THREE.PointLight( 0xffffff, 1.75 );
    pointLight.position.y = 500;
    this.add( pointLight );

    //Add some walls
    this.addWall(new THREE.Vector3(150, 100, 50));
    this.addWall(new THREE.Vector3(250, 100, 150));
    this.addWall(new THREE.Vector3(350, 100, 50));
    this.addWall(new THREE.Vector3(350, 100, 150));
    this.addWall(new THREE.Vector3(350, 100, 250));
    this.addWall(new THREE.Vector3(350, 100, 350));

    var wallgeometry = new THREE.BoxGeometry(1000, 200, 80);
    var wallmaterial = new THREE.MeshBasicMaterial({color: 0x555555});
    var wallmesh = new THREE.Mesh(wallgeometry, wallmaterial);
    wallmesh.position.set(-150, 100, -400);
    wallmesh.rotation.y = Math.PI/4;
    this.add(wallmesh);
    this.collidableMeshList.push(wallmesh);

};

Map.prototype = Object.create(THREE.Object3D.prototype);
Map.prototype.constructor = Map;
Map.prototype.collidableMeshList = [];
Map.prototype.addWall = function(position){
    var wallgeometry = new THREE.BoxGeometry(80, 200, 80);
    var wallmaterial = new THREE.MeshBasicMaterial({color: 0x555555});
    var wallmesh = new THREE.Mesh(wallgeometry, wallmaterial);
    wallmesh.position.set(position.x, position.y, position.z);
    this.add(wallmesh);
    this.collidableMeshList.push(wallmesh);
};