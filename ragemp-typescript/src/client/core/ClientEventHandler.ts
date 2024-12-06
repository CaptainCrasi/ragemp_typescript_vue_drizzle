import { ui } from "./init"
type EventFunction = (...args:any[])=>void
type ProcEventFunction = (...args:any[])=>Promise<any>

class ClientEventHandler{
    //structure JSON.stringify({name, args...}) MAKE SURE ServerEventHandler and CEFEventHandler handle JSON.stringify
    constructor(){
        //[HANDLERS] Handle data server<->cef TO TEST 
        
        //any to server
        mp.events.add('ANYS_Event', (message:string)=>{
            let {name, ...args} = JSON.parse(message)
            let h = 'yo yo'
            mp.events.callRemote(name, message)
        })

        mp.events.addProc('ANYS_ProcEvent', async (message:string)=>{
            let {name, ...args} = JSON.parse(message)
            return await mp.events.callRemoteProc(name, message)
        })

        //any to CEF
        mp.console.logInfo(`ANYCEF_Event init`);
        mp.events.add('ANYCEF_Event', (message:string) =>{ //as long as ClientEventHandler handles JSON
            mp.console.logInfo(`ANYCEF_Event called`);
            mp.console.logInfo(message);
            let {name, args} = JSON.parse(message)
            ui.call(name, message)
        })

        mp.events.addProc('ANYCEF_ProcEvent', async (message:string) =>{
            let {name, ...args} = JSON.parse(message)
            return await ui.callProc(name, message)
        })

        /*//[INCOMPLETE] ANYCEF_ProcEvent
        mp.events.add('ANYCEF_ProcEvent', (message:string) =>{ //only diff is isServer: {name, isServer, ...args}
            let {name, isServer, ...args} = JSON.parse(message)
            ui.call(name, message)
        })*/
        
        mp.events.add('CEFC_ProcAnswer', (message:string)=>{
            let {name, answer} = JSON.parse(message)
            mp.events.callRemote(name+'answer', JSON.stringify({name, answer}))
        })

        mp.events.add('CEFS_ProcAnswer', (message:string)=>{
            let {name, answer} = JSON.parse(message)
            mp.events.callRemote(name+'answer', JSON.stringify({name, answer}))
            //answers CALLSCEF_ProcEvent(nameofCEFProcEvent+'answer') created in ServerEventHandler
        })
    }

    //[CALLS] TO TEST
    //call to client
    public CALLCC_Event(name:string, ...args:any[]){
        mp.events.call("ANYC_Event", JSON.stringify({name, args}))
    }

    public async CALLCC_ProcEvent(name:string, ...args:any[]){
        return await mp.events.call("ANYC_ProcEvent", JSON.stringify({name, args}))
    }

    //call to server
    public CALLCS_Event(name:string, ...args:any[]) { //call server event
        mp.events.call("ANYS_Event", JSON.stringify({name, args})) //change to [name, args] if not work
    }

    public async CALLCS_ProcEvent(name:string, ...args:any[]) {
        return await ui.callProc('ANYS_ProcEvent', JSON.stringify({name, args})) //client-client proc has to be through window (ui in my case)
    }

    //call to cef
    public CALLCCEF_Event(name:string, ...args:any[]){
        mp.events.call('ANYCEF_Event', JSON.stringify({name, args}))
    }
/**
 * THIS IS CURRENTLY DEPRECATED. Returns CEF->Client are bugged.
 * @param name 
 * @param args 
 * @returns 
 */
    public async CALLCCEF_ProcEvent(name:string, ...args:any[]){
        return await ui.callProc(name, JSON.stringify({name, args}))
    }

    /*//INPROGRESS [PROTOTYPE]
    public async CALLCCEF_ProcEvent(name:string, ...args:any[]){
        let gAnswer:any = undefined

        mp.events.add(name+"answer", (message:string)=>{ //creates answer event
            let {name, answer} = JSON.parse(message)
            gAnswer = answer
        })
        
        mp.events.call("ANYCEF_Event", JSON.stringify({name, args})) //calls cef event

        let failed = true
        setTimeout(() => {                  //waits 2 seconds for answer
            failed = gAnswer===undefined
        }, 2000);

        /*if(ServerEventHandler.DEBUG){       //debugs
            console.log('SCEF_ProcEvent: received no answer')
            console.log(gAnswer)
        }*

        mp.events.remove(name+"answer") //removes answer event
    }*/
    
    //[ADD]
    public ADDC_Event(name:string, code:EventFunction){
        mp.events.add(name, (message:string)=>{
            let {eventName, args} = JSON.parse(message)
            code(...args)
        })
    }

    public ADDC_ProcEvent(name:string, code:ProcEventFunction){
        mp.events.addProc(name, async (message:string)=>{
            let {eventName, args} = JSON.parse(message)
            return await code(...args)
        })
    }
}

const clientEventHandler = new ClientEventHandler()
export default clientEventHandler