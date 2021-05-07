const ArmourStandClass = Java.type("net.minecraft.entity.item.EntityArmorStand").class

register('command', (arg, event) => {

    setTimeout(() => {
        
        World.getAllEntitiesOfType(ArmourStandClass).forEach((entity) => {
            if (getDistanceFromPlayerEfficent(entity.getX(), entity.getY(), entity.getZ()) <= 300) {
                let entityName = ChatLib.removeFormatting(entity.getName());
                ChatLib.chat(`${entityName}, valid: ${isValid(entityName)}`);
            }
        });

    }, 500);

}).setName("ttee");

register('command', (arg, event) => {
    let slicedString = '2382a2';
    ChatLib.chat(/^[0-9]+$/.test(slicedString))
}).setName('te');

function isValid(string) {
    if(string.includes("✧")) { 
        let slicedString = string.slice(1,-1); 
        return /^[0-9]+$/.test(slicedString);
    } else {
        return /^[0-9]+$/.test(string);
    }
}

function getDistanceFromPlayerEfficent(posX, posY, posZ) {
    let deltaX = posX - Player.getX();
    let deltaY = posY - Player.getY();
    let deltaZ = posZ - Player.getZ();
    return (deltaX * deltaX) + (deltaY * deltaY) + (deltaZ * deltaZ)
}