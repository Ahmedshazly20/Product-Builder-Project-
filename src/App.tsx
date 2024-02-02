import { useState,ChangeEvent,FormEvent } from "react";
import { v4 as uuid } from "uuid";
import ProductCard from './component/ProductCard';
import {productList,colors} from "./data/data"
import MyModal from './component/ui/model'
import Button from "./component/ui/Button"
import {formInputsList} from "./data/data"
import Input from "./component/ui/input";
import { IProduct } from "./interfaces";
import { productValidation } from "./component/validation";
import ErrorMsg from "./component/ErrorMessage";
import Colors from "./component/ui/colors"
function App() {
    // ** Renders

    const defaultProductObj = {
      title: "",
      description: "",
      imageURL: "",
      price: "",
      colors: [],
      category: {
        name: "",
        imageURL: "",
      },
    };
  /* ------- STATE -------  */
  const [isOpen, setIsOpen] = useState(false);
  const [products,setproducts]=useState<IProduct[]>(productList)
  const [product,setproduct]= useState<IProduct>(defaultProductObj)
  const [errors, setErrors] = useState({ title: "", description: "", imageURL: "", price: "" });
  const [temparry,settemparry]=useState<string[]>([])
    const onChanghandler= (e:ChangeEvent<HTMLInputElement> )=>{
     const{value , name} = e.target;
     setproduct({
      ...product,
      [name]: value

     })
     
     setErrors({
      ...errors,
      [name]: "",
    });
      
      
  }
 console.log(temparry);
 
  /* ------- HANDLER -------  */
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const onCancel = () => {
    setproduct(defaultProductObj);
    closeModal();
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();


   const {title,description,imageURL,price}=product
   const err =  productValidation({title,description,imageURL,price})


    const hasErrorMsg =
      Object.values(err).some(value => value === "") && Object.values(err).every(value => value === "");

    if (!hasErrorMsg) {
      setErrors(err);
      return;
    }
   
    setproducts(prev=>[...prev,{...product , colors: temparry , id:uuid()}])
    setproduct(defaultProductObj)
    closeModal()
   }

  /* ------- RENDER -------  */
  const renderpeoductlist = products.map(product => <ProductCard key={product.id} Product={product}  />)
  const renderformInputsList =formInputsList.map(inpt=> 
    <div className="flex flex-col" key={inpt.id}> 
         <label htmlFor={inpt.id} className="mb-2 text-sm text-sm font-medium text-gray-700">{inpt.label}</label>
       <Input type="text"  id={inpt.id} name={inpt.name} value={product[inpt.name]} onChange={onChanghandler}/>
       <ErrorMsg msg={errors[inpt.name]}/>
    </div>
  )
const rendercolorslist =colors.map(color=> <Colors onClick={()=>{
  if(temparry.includes(color)){
     settemparry(temparry.filter((c)=> c!== color))
    return;
  }
  settemparry((prev)=>[...prev,color])}} key={color}  singlecolor={color}/>)

  return (
    <div className="container mx-auto App m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-2 rounded-md">
     
      {renderpeoductlist}
      <Button className="bg-indigo-700 hover:bg-indigo-800" onClick={openModal}>
        Add
      </Button>
      <MyModal isOpen={isOpen} closeModal={closeModal} title="ADD A NEW PRODUCT">
        <form className="space-y-3" onSubmit={submitHandler}>
        {renderformInputsList}
        <div className="flex items-center space-x-2 ">
        {rendercolorslist}
        
        </div>
        <div className="flex items-center flex-wrap space-x-1">
            {temparry.map(color => (
              <span
                key={color}
                className="p-1 mr-1 mb-1 text-xs rounded-md text-white"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>
        
        <div className="flex items-center space-x-3">
          <Button className="bg-indigo-700 hover:bg-indigo-800">Submit</Button>
          <Button className="bg-gray-300 hover:bg-gray-400" onClick={onCancel}>Cancel</Button>
        </div>
        </form>
       
      </MyModal>
    </div>
    
  );
}

export default App;
