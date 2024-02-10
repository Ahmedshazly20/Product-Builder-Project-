
interface Iprops {
    singlecolor: string;
    onClick? :()=>void;
}
 const Colors = ({ singlecolor,onClick }: Iprops)=>{
    return   <span className={`block  w-5 h-5 rounded-full cursor-pointer`} onClick={onClick}  style={{backgroundColor:singlecolor}} />
         
    
}

export default Colors;