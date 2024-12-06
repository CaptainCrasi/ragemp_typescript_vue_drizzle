type EventFunction = (...args:any[])=>void
type ProcEventFunction = (...args:any[])=>Promise<any>

class CEFEventHandler{
    private static DEBUG = true
    //[ADD]
    public ADDCEF_Event(name:string, code:EventFunction){ //PROPER WAY TO HANDLE RECEIVE[add].
        mp.events.add(name, (message:string)=>{
            let {name, args} = JSON.parse(message)
            if(CEFEventHandler.DEBUG) console.log(`[EVENT CALLED] ${name}: with arguments ${args}`)
            code(...args)
        })
    }
/**
 * THIS IS CURRENTLY DEPRECATED. Returns CEF->Client are bugged.
 * @param name name of Remote Procedure
 * @param code callback
 */
    public ADDCEF_ProcEvent(name:string, code:ProcEventFunction){
        mp.events.addProc(name, async (message:string)=>{
            let {eventName, args} = JSON.parse(message)
            eventName //error
            return await code(...args)
        })
    }

    /*public ADDCEF_ProcEvent(name:string, code:ProcEventFunction){
        mp.events.add(name, async (message:string)=>{
            let {name, isServer, args} = JSON.parse(message) //isServer:bool must be handled by callCEF on ClientEventHandler and ServerEventHandler
            let answer = await code(...args)
            if(isServer === true){
                mp.trigger("CEFS_ProcAnswer", JSON.stringify({name, answer})) //sends to serverside
            }
            else mp.trigger("CEFC_ProcAnswer", JSON.stringify({name, answer})) //sends back to clientside
        })
    }*/

    //[CALLS]
    //to client
    public CALLCEFC_Event(name:string, ...args:any[]){
        mp.trigger("ANYC_Event", JSON.stringify({name, args}))
    }

    public async CALLCEFC_ProcEvent(name:string, ...args:any[]){
        return await mp.events.callProc("ANYC_ProcEvent", JSON.stringify({name, args}))
    }

    //to server
    public CALLCEFS_Event(name:string, ...args:any[]){
        mp.trigger("ANYS_Event", JSON.stringify({name, args}))
    }

    public async CALLCEFS_ProcEvent(name:string, ...args:any[]){
        return await mp.events.callProc("ANYS_ProcEvent", JSON.stringify({name, args}))
    }
}

const cefEventHandler = new CEFEventHandler()
export default cefEventHandler