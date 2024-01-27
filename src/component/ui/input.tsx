
import React,{InputHTMLAttributes} from 'react'

interface Iprop extends InputHTMLAttributes<HTMLInputElement>{

}

const Input =({...rest}:Iprop)=> {
  return ( <input type={"inpt.type"} name={"inpt.name"} className="border-[1px] border-gray-300 shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1.5 focus:ring-indigo-500 rounded-lg px-3 py-3 text-md" {...rest}/>)
}

export default Input;