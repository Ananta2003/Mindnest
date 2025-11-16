export function randomHash (len:number){
    let seq = "abcdefghijklmnopqrstuvwxyz1234567890";
    let length = seq.length
    let arr = ""
    for(let i=0 ; i<len ;i++){
        arr+= seq[Math.floor(Math.random()*length)]
        
    }
    return arr
}