import {CommandRegistry} from '../scripts/improved-commands/index'

type CommandFunction = (player:PlayerMp, ...args:string[])=>void

//custom addCommand function
async function addCommand(name:string, adminLevel:number, code:CommandFunction, options?:{
    numArgs?:number, //sets expected number of arguments
    usage?:string, //usage print if wrong number of args
    aliases?:string[] //aliases for command
}){
    CommandRegistry.add({
        name: name,
        aliases: options? options.aliases : [],
        beforeRun: function(player:PlayerMp, fullText:any, ...args: any[]){
            //automatically rejects wrong admin level
            let success = player.adminLevel >= adminLevel
            if(player.adminLevel < adminLevel) player.outputChatBox("!{red}[SYSTEM]!{white}:Unauthorized")
            // checks if number of arguments is specified
            else if(options && options.numArgs !== undefined){
                success = options.numArgs === args.length
                if(options.usage && success===false) player.outputChatBox(options.usage) //shows usage if wrong #args
            }
            return success
        },
        run: function(player:PlayerMp, fullText:any, ...args:any){
            code(player, ...args)
        }
    })
}

export {addCommand}