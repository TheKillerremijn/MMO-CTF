var Actor = function(controller, color){

    this.controller = controller;
    var scope = this;

    //Load asset
    var loader = new THREE.ColladaLoader();
    loader.load("assets/Soldier.dae", function(collada){
        console.log("Model loaded");
        var dae = collada.scene;

        dae.scale.x = dae.scale.y = dae.scale.z = 1;
        scope.add(dae);
    });

    THREE.Object3D.apply(this);
    console.log("Applying temp object");

    var axisHelper = new THREE.AxisHelper( 200 );
    this.add(axisHelper);

    //Add collision mesh
    var cmeshg = new THREE.BoxGeometry(80, 180, 80);
    var cmeshm = new THREE.MeshBasicMaterial({color: 0x001100, wireframe: true});
    this.collisionMesh = new THREE.Mesh(cmeshg, cmeshm);
    this.collisionMesh.position.y = 90;
    this.add(this.collisionMesh);

    //Add weapon
    this.weapon = new Weapon();
    this.add(this.weapon);
    this.weapon.position.set(-20, 160, 40);

};

Actor.prototype = Object.create(THREE.Mesh.prototype);
Actor.prototype.constructor = Actor;

//----CONSTANTS----
Actor.prototype.maxspeed = 900;
Actor.prototype.acceleration = 17000;

Actor.prototype.update = function(delta){
    this.controller.update(delta, this);

    //Update position

    var oldpos = this.position.clone();
    var velchange = new THREE.Vector3(this.velocity.x * delta, this.velocity.y * delta, this.velocity.z * delta)

    this.position.x = (this.position.x + this.velocity.x * delta );
    this.position.z = (this.position.z + this.velocity.z * delta );

    var collision = CollisionHelper.checkCubeCollision(this.collisionMesh, map.collidableMeshList);
    //console.log(collision);
    if(collision != false){
        //Slide along the wall in a natural way
        //this.velocity.set(0, 0, 0);
        //this.position.set(oldpos.x, oldpos.y, oldpos.z);
        this.position.set(oldpos.x, oldpos.y, oldpos.z);
        var invNormal = collision.face.normal.clone().negate(); //Inverted Normal of the face hit
        invNormal = invNormal.multiplyScalar(velchange.clone().multiply(collision.face.normal).length());
        var wallDir = velchange.clone().sub(invNormal);
        var newPos = oldpos + wallDir;
        this.position.x = (this.position.x + this.velocity.x * delta );
        this.position.z = (this.position.z + this.velocity.z * delta );
    }

};

Actor.prototype.velocity = new THREE.Vector3();