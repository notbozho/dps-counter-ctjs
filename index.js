const ArmourStandClass = Java.type("net.minecraft.entity.item.EntityArmorStand").class

let count = 0;
let usedUUID = [];

//damage in second
let total = 0;
let dis = 0;
let totalSeconds = 0;
let now;
let secondLater;
let maxDate;
let toggled = false;

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

register('command', (arg, e) => {
    count += 1050030;
    
let now = new Date().getTime();
    let future = new Date(now + 1000);
    let result;
    if(now != future) result = false;
    else result = true;
    ChatLib.chat(result);
    
}).setName("testdps")

register('command', (arg, e) => {
    if(arg == "" || arg == null || !arg.length) ChatLib.chat("Missing Argument! Please provide how long should be the DPS Check in seconds.");
    else if(isNaN(arg)) ChatLib.chat("Invalid Argument");
    else {
        ChatLib.chat(`DPS Check will start in 1 second and it will last ${arg} seconds.`)
        setTimeout(() => {
            usedUUID = [];
            totalSeconds = 0;
            dis = 0;
            now = new Date().getTime();
            secondLater = new Date(now + 1000).getTime();
            maxDate = new Date(now + (arg * 1000)).getTime();
            toggled = true;
        }, 1000);
    }
}).setName("startdps")

register("tick", (tick) => {
    // if(tick % 10 == 0) {
        // ChatLib.chat(tick);
        if(toggled) {

        World.getAllEntitiesOfType(ArmourStandClass).forEach((entity) => {
            if (getDistanceFromPlayerEfficent(entity.getX(), entity.getY(), entity.getZ()) <= 400) {
                let entityName = ChatLib.removeFormatting(entity.getName());
                let entityUUID = entity.getUUID();
                
                if(!usedUUID.includes(entityUUID)) {
                    if(isValid(entityName) && entityName.includes("✧")) {
                        let slicedString = entityName.slice(1,-1); 
                        ChatLib.chat(`slicedString: ${slicedString}`)
                        usedUUID.push(entityUUID);
                        dis += parseInt(slicedString);
                    } else if(isValid(entityName) && !entityName.includes("✧")) {
                        ChatLib.chat(`String: ${entityName}`)
                        usedUUID.push(entityUUID);
                        dis += parseInt(entityName);
                    }
                }

            }
        });
        now = new Date().getTime();
        if(now > secondLater) {
            totalSeconds++;
            secondLater = new Date(now + 1000).getTime();
            total += dis;
            count = total / totalSeconds;
        } else if(now > maxDate) {
            toggled = false;
            ChatLib.chat("dps check finished...")
        }

        }

    // }
})

register("renderOverlay", myRenderOverlay);

function myRenderOverlay() {
    let finalDPS = "DPS: " + numberWithCommas(count);
    let finalTotal = "TOTAL: " + numberWithCommas(total);
    Renderer.drawStringWithShadow(finalDPS , 10, 180)
    Renderer.drawStringWithShadow(finalTotal , 10, 220)
}

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

function numberWithCommas(n) {
    var parts=n.toString().split(".");
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
}