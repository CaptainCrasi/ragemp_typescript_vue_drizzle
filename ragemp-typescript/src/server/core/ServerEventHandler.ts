type EventFunction = (player:PlayerMp, ...args:any[])=>void
type ProcEventFunction = (player:PlayerMp, ...args:any[])=>Promise<any>

class ServerEventHandler{
    private static DEBUG = true

    //[CALLS] WORK (should)
    //to client
    public CALLSC_Event(player:PlayerMp, name:string, ...args:any[]){
        player.call(name, [JSON.stringify({name, args})])
    }

    public async CALLSC_ProcEvent(player:PlayerMp, name:string, ...args:any[]){
        return await player.callProc(name, [JSON.stringify({name, args})])
    }

    //to cef
    public CALLSCEF_Event(player:PlayerMp, name:string, ...args:any[]){ //CORRECT WAY FOR SEND[call] ARGS FORMATTING
        console.log(name, args)
        player.call("ANYCEF_Event", [JSON.stringify({name, args})])
    }
    /**
     * DO NOT USE. DEPRECATED. CEF->Client bugged
     * @param player 
     * @param name 
     * @param args 
     * @returns 
     */
    public async CALLSCEF_ProcEvent(player:PlayerMp, name:string, ...args:any[]){
        return await player.callProc("ANYCEF_ProcEvent", [JSON.stringify({name, args})])
    }
    /*// [PROTOTYPE] MAY NOT WORK
    public async CALLSCEF_ProcEvent(player:PlayerMp, name:string, ...args:any[]){
        let gAnswer:any = undefined

        mp.events.add(name+"answer", (player:PlayerMp, message:string)=>{ //creates answer event
            let {name, answer} = JSON.parse(message)
            gAnswer = answer
        })
        
        player.call("ANYCEF_Event", [JSON.stringify({name, args})]) //calls cef event

        let failed = true
        setTimeout(() => {                  //waits 2 seconds for answer
            failed = gAnswer===undefined
        }, 2000);

        if(ServerEventHandler.DEBUG){       //debugs
            console.log('SCEF_ProcEvent: received no answer')
            console.log(gAnswer)
        }

        mp.events.remove(name+"answer") //removes answer event
    }*/

    //[ADD] TO TEST
    //Add Event
    public ADDS_Event(eventName:string, code:EventFunction){
        mp.events.add(eventName, (player:PlayerMp, message:string)=>{
            let {name, args} = JSON.parse(message) //JSON handler
            code(player, ...args)
        })
    }

    //Add ProcEvent
    public ADDS_ProcEvent(eventName:string, code:ProcEventFunction){ //code refers to whatever you want event to execute. Ex: (player, target)=>{return target.resolution}
        mp.events.addProc(eventName, async (player:PlayerMp, message:string)=>{
            let {name, args} = JSON.parse(message) //JSON handler



            console.log(args) //test
            
            
            
            
            try{
                return await code(player, ...args)
            }catch(e){
                if(ServerEventHandler.DEBUG){
                    console.log(e)
                }
            }
        })
    }
}

const serverEventHandler = new ServerEventHandler()
export default serverEventHandler