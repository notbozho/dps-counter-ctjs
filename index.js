register('messageSent', (message, event) => {
    if (message.toLowerCase().contains('!getentities')) {

        World.getAllEntities().forEach((entity) => {
            let entityName = entity.getName()
            ChatLib.chat(`ENTITY: ${entityName}`);
        });
    }
});