PlayerController = function(){
    var scope = this;

    //Point camera down at player

    var onMouseMove = function(event){
        if(scope.enabled === false) return;
        scope.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        scope.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    };

    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    var geometry = new THREE.BoxGeometry(100, 100, 100);
    var material = new THREE.MeshPhongMaterial({color: 0x0000ff});
    this.intersectpoint = new THREE.Mesh(geometry, material);
    scene.add(scope.intersectpoint);

    var onKeyDown =function(event){
        if(scope.enabled === false) return;

        switch ( event.keyCode ) {

            case 38: // up
            case 87: // w
                scope.moveForward = true;
                break;

            case 37: // left
            case 65: // a
                scope.moveLeft = true;
                break;

            case 40: // down
            case 83: // s
                scope.moveBackward = true;
                break;

            case 39: // right
            case 68: // d
                scope.moveRight = true;
                break;
        }
    };
    var onKeyUp = function ( event ) {
        if(scope.enabled === false) return;

        switch( event.keyCode ) {

            case 38: // up
            case 87: // w
                scope.moveForward = false;
                break;

            case 37: // left
            case 65: // a
                scope.moveLeft = false;
                break;

            case 40: // down
            case 83: // s
                scope.moveBackward = false;
                break;

            case 39: // right
            case 68: // d
                scope.moveRight = false;
                break;

        }

    };

    document.addEventListener( 'keydown', onKeyDown, false );
    document.addEventListener( 'keyup', onKeyUp, false );
    document.addEventListener( 'mousemove', onMouseMove, false);

    this.enabled = false;

    this.update = function(delta, actor){

        //If there is no control, stop moving
        if (!scope.enabled)this.moveForward = this.moveBackward = this.moveLeft = this.moveRight = false;

        //Slow down movement

        if(!(this.moveForward || this.moveBackward || this.moveLeft || this.moveRight)){
            actor.velocity.setLength(Math.max(actor.velocity.length() - (actor.acceleration*delta), 0));
        }
        //Accelerate movement

        if ( this.moveForward ) actor.velocity.x += actor.acceleration * delta;
        if ( this.moveBackward ) actor.velocity.x -= actor.acceleration * delta;

        if ( this.moveLeft ) actor.velocity.z -= actor.acceleration * delta;
        if ( this.moveRight ) actor.velocity.z += actor.acceleration * delta;

        //Cap movement at max speed

        if (actor.velocity.length() > actor.maxspeed) actor.velocity.setLength(actor.maxspeed);

        //Figure out mouse position in world
        scope.raycaster.setFromCamera(scope.mouse, camera);
        var planeY = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
        var intersect = scope.raycaster.ray.intersectPlane(planeY);
        if(intersect == null){
            console.log("intersect is null");
        } else{
            scope.intersectpoint.position.set(intersect.x, intersect.y, intersect.z);
            var dX = actor.position.x - intersect.x;
            var dZ = actor.position.z - intersect.z;
            var angle = Math.atan2(dX, dZ)+Math.PI;
            actor.rotation.set(0, angle, 0);
        }
    }
};