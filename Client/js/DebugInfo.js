var DebugInfo = function(){

    var debugwindow = document.getElementById("sidebar");

    this.update = function(){
        var debuginfo = "";

        debuginfo += "VelocityX: " + Math.round(actor.velocity.x) + "</br>";
        debuginfo += "VelocityY: " + Math.round(actor.velocity.y) + "</br>";
        debuginfo += "VelocityZ: " + Math.round(actor.velocity.z) + "</br>";
        debuginfo += "VelocityLength: " + Math.round(actor.velocity.length()) + "</br>";
        debuginfo += "Rotation: " + Math.round(actor.rotation.y*100 )/100+ "</br>";

        debuginfo += "MoveForward: " + Math.round(actor.controller.moveForward) + "</br>";
        debuginfo += "MoveBackward: " + Math.round(actor.controller.moveBackward) + "</br>";
        debuginfo += "MoveLeft: " + Math.round(actor.controller.moveLeft) + "</br>";
        debuginfo += "MoveRight: " + Math.round(actor.controller.moveRight) + "</br></br>";

        debuginfo += "IntersectX: " + Math.round(actor.controller.intersectpoint.position.x) + "</br>";
        debuginfo += "IntersectY: " + Math.round(actor.controller.intersectpoint.position.y) + "</br>";
        debuginfo += "IntersectZ: " + Math.round(actor.controller.intersectpoint.position.z) + "</br>";

        debugwindow.innerHTML = debuginfo;

    }
};

