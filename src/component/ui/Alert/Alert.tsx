import React,{ReactNode} from 'react'
import  "./index.scss"
import { AlertTypes } from '../../../type/types';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


interface Iprops {
  type:AlertTypes;
  title:string;
  icon:ReactNode;
  description?:string;
  children?: ReactNode;



}
function Alert( {type , title, icon, description,children} :Iprops) {

  return (
    <div className={type}>
      <div className="alert-header">
        <div className="titel">
          {icon}
        
         <h4>{title}</h4>
        </div>
      
      <HighlightOffIcon className="close"/>
      </div>
       
      {children ? children : <p>{description}</p>}
     
        
    </div>
  )
}

export default Alert