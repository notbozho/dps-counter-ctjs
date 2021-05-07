const ArmourStandClass = Java.type("net.minecraft.entity.item.EntityArmorStand")

register('command', (arg, event) => {

        World.getAllEntitiesOfType(ArmourStandClass.class).forEach((entity) => {
            let entityName = entity.getName();
            let entityClassName = entity.getClassName();
            ChatLib.chat(`ENTITY: ${entityClassName} - ${entityName}`);
        });
}).setName("ttee");