import { defineStore } from "pinia";
import cefEventHandler from "../assets/CEFEventHandler";

export const useDisplayStore = defineStore('DisplayStore', {
    state: ()=>{
        return{
            display: 'Main'
        }
    },
    actions: {
        setDisplay(display:string){
            this.display = display
        }
    }
})


//change displays from client
if(window.mp){
    cefEventHandler.ADDCEF_Event('setDisplay', (display:string)=>{
        useDisplayStore().setDisplay(display)
    })
}
