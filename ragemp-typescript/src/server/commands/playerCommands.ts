import { ADMIN_LEVELS } from "@shared/constants";
import { addCommand } from "./base";
import serverEventHandler from "@/core/ServerEventHandler";

addCommand('info', ADMIN_LEVELS.adminNone, (player)=>{
    player.outputChatBox(`Social Club: ${player.socialClub} ID ${player.rgscId}`)
    player.outputChatBox(`IP: ${player.ip}`)
    player.outputChatBox(`HWID: ${player.serial}`)
    player.outputChatBox(`Position: ${player.position}`)
    player.outputChatBox(`Heading: ${player.heading}`)
    player.outputChatBox(`Health: ${player.health}`)

    console.log(`Social Club: ${player.socialClub} ID ${player.rgscId}`)
    console.log(`IP: ${player.ip}`)
    console.log(`HWID: ${player.serial}`)
    console.log(`Position: ${player.position}`)
    console.log(`Heading: ${player.heading}`)
    console.log(`Health: ${player.health}`)

},{
    numArgs: 0,
    usage: '/info'
})

addCommand('SpawnVehicle', ADMIN_LEVELS.adminModerator, (player, name)=>{
    mp.vehicles.new(mp.joaat(name), player.position.add(1),{
        numberPlate: "ADMIN",
        color: [[0,0,0], [0,0,0]],
        dimension: player.dimension
    })
}, {
    aliases: ['v', 'sv'],
    usage: '/SpawnVehicle [vehicleName]'
})

//test
addCommand('setDisplay', ADMIN_LEVELS.adminNone, (player, display)=>{
    serverEventHandler.CALLSCEF_Event(player, "setDisplay", display)
})

//db test
import {db, schema} from '@db'
addCommand('acc', ADMIN_LEVELS.adminOwner, async (player, username, email, password)=>{
    await db.insert(schema.accounts).values({
        email: email,
        username: username,
        password: password,
        hwid: player.serial,
        ip: player.ip,
        socialClub: player.socialClub,
        rockstarId: player.rgscId
    })
    console.log('user added')
},{
    numArgs: 3,
    usage: "/acc username email password"
})