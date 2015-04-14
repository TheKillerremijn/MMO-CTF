var CollisionHelper = {};

CollisionHelper.arrows = {};

CollisionHelper.checkCubeCollision = function(mesh, collidableMeshList){
    var originPoint = new THREE.Vector3();
    originPoint.setFromMatrixPosition(mesh.matrixWorld)
    for (var vertexIndex = 0; vertexIndex < mesh.geometry.vertices.length; vertexIndex++)
    {
        var localVertex = mesh.geometry.vertices[vertexIndex].clone();
        var globalVertex = localVertex.applyMatrix4( mesh.matrixWorld );
        var directionVector = globalVertex.sub( originPoint );



        var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );

        var arrowar = CollisionHelper.arrows[mesh.id];
        //console.log(mesh.id);
        if(arrowar === undefined){
            arrowar = [];
            CollisionHelper.arrows[mesh.id] = arrowar;
        }
        if(arrowar[vertexIndex] !== undefined){
            scene.remove(arrowar[vertexIndex]);
        }
        arrowar[vertexIndex] = new THREE.ArrowHelper(directionVector.clone().normalize(), originPoint, directionVector.length(), 0xff0000, 20, 10);
        scene.add(arrowar[vertexIndex]);

        var collisionResults = ray.intersectObjects( collidableMeshList );
        if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() )
            return collisionResults[0];
    }
    return false;
};