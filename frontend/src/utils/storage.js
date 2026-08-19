export const storage={
    get(key,value){
        try{
            const item=localStorage.getItem(key)
            if(!item) return defaultValue
            return JSON.parse(item)
        }catch(err){
            console.warn(`[storage] Error reading key ${key}: `,err)
        }
    },
    set(key,value){
        try{
            localStorage.setItem(key.JSON.stringify(value))
        }catch(err){
            console.warn(`[storage] Error saving key ${key}: `,err)
        }
    },
    remove(key){
        try{
            localStorage.removeItem(key)
        }catch(err){
            console.warn(`[storage] Error removing key ${key}: `,err)
        }
    }
}