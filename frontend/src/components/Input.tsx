
interface Inputprops {
    placeholder: string,
    /* eslint-disable @typescript-eslint/no-explicit-any */
    reference?:any
}
export const Input = ({placeholder, reference }:Inputprops)=>{

    return <div>
        <input ref={reference} type="text" className="px-4 py-2 m-2 border rounded " placeholder={placeholder} ></input>
    </div>
 }