import { useState,ChangeEvent,FormEvent } from "react";
import { v4 as uuid } from "uuid";
import ProductCard from './component/ProductCard';
import {productList,colors} from "./data/data"
import MyModal from './component/ui/model'
import Button from "./component/ui/Button"
import {formInputsList} from "./data/data"
import Input from "./component/ui/input";
import { ICategory, IProduct } from "./interfaces";
import { productValidation } from "./component/validation";
import ErrorMsg from "./component/ErrorMessage";
import Colors from "./component/ui/colors"
import Select from "./component/ui/Select";
import {categories} from './data/data'
import { ProductNameTypes } from "./types";
import toast, { Toaster } from "react-hot-toast";

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
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [errors, setErrors] = useState({ title: "", description: "", imageURL: "", price: "", });
  const [temparry,settemparry]=useState<string[]>([])
  const [selected,setselected]=useState(categories[0])
  const [productToEdit, setProductToEdit] = useState<IProduct>(defaultProductObj);
  const [productToEditindex, setProductToEditindex] = useState(0);
  const [IsOpenConfirmModal,setIsOpenConfirmModal]=useState(false);
  
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
  console.log(productToEdit);
  

 
  /* ------- HANDLER -------  */
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

   /* ------- HANDLER -------  */
   function closeEditModal() {
    setIsOpenEditModal(false);
  }

  function openEditModal() {
    setIsOpenEditModal(true);
  }
  const closeConfirmModal = () => setIsOpenConfirmModal(false);
  const openConfirmModal = () => setIsOpenConfirmModal(true);

  const onCancel = () => {
    setproduct(defaultProductObj);
    closeModal();
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();


   const {title,description,imageURL,price ,colors}=product
   const err =  productValidation({title,description,imageURL,price})


    const hasErrorMsg =
      Object.values(err).some(value => value === "") && Object.values(err).every(value => value === "");

    if (!hasErrorMsg) {
      setErrors(err);
      console.log(err);
      
      return;
    }
   
    setproducts(prev=>[...prev,{...product ,category:selected ,  colors: temparry , id:uuid()}])
    setproduct(defaultProductObj)
    closeModal()
    toast("Product has been added successfully!", {
      duration: 4000,
      position: 'top-center',
      icon: "👏",
      style: {
        backgroundColor: "#22bb33",
        color: "white",
      },
    });
   }

   const submitEditHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();


   const {title,description,imageURL,price ,colors}=productToEdit
   const err =  productValidation({title,description,imageURL,price})


    const hasErrorMsg =
      Object.values(err).some(value => value === "") && Object.values(err).every(value => value === "");

    if (!hasErrorMsg) {
      setErrors(err);
      console.log(err);
      
      return;
    }
     const updateproduct =[...products]
     updateproduct[productToEditindex]= {...productToEdit, colors:temparry.concat(productToEdit.colors)}
     setproducts(updateproduct)
     

    setProductToEdit(defaultProductObj)
    closeEditModal()
    
    
   }

   const removeProductHandler = () => {
    const filtered = products.filter(product => product.id !== productToEdit.id);

    setproducts(filtered);
    closeConfirmModal();
    toast("Product has been deleted successfully!", {
      duration: 4000,
      position: 'top-center',
      icon: "👏",
      style: {
        backgroundColor: "#c2344d",
        color: "white",
      },
    });
  };

  /* ------- RENDER -------  */
  const renderpeoductlist = products.map((product,index) =>(
     <>
     <ProductCard opendelet={openConfirmModal}
     
     key={product.id} openedit={openEditModal} setProductToEditindex={setProductToEditindex} Product={product} setProductToEdit={setProductToEdit} index={index} />
     </>
  ))
  const renderformInputsList =formInputsList.map(inpt=> 
    <div className="flex flex-col" key={inpt.id}> 
         <label htmlFor={inpt.id} className="mb-2 text-sm text-sm font-medium text-gray-700">{inpt.label}</label>
       <Input type="text"  id={inpt.id} name={inpt.name} value={product[inpt.name]} onChange={onChanghandler}/>
       <ErrorMsg msg={errors[inpt.name]}/>
    </div>
  )
const rendercolorslist =colors.map(color=> <Colors  onClick={()=>{
  if(temparry.includes(color)){
     settemparry(temparry.filter((c)=> c!== color))
    return;
  }
  settemparry((prev)=>[...prev,color])}} key={color}  singlecolor={color}/>)

  const onChangeEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const renderProductEditWithErrorMsg = (id: string, label: string, name: ProductNameTypes) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="mb-[2px] text-sm font-medium text-gray-700">
          {label}
        </label>
        <Input type="text" id={id} name={name} value={productToEdit[name]}  onChange={onChangeEditHandler} />
        {/* <ErrorMessage msg={errors[name]} /> */}
      </div>
    );
  };
  return (
    <div className="container mx-auto App m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-2 rounded-md">
     
      {renderpeoductlist}
      <Button className="bg-indigo-700 hover:bg-indigo-800" onClick={openModal}>
        Add
      </Button>
      {/* Add new product */}
      <MyModal isOpen={isOpen} closeModal={closeModal} title="ADD A NEW PRODUCT">
        <form className="space-y-3" onSubmit={submitHandler}>
        {renderformInputsList}
        <Select selected={selected} setselected={setselected} />
        {/* {errors&& <div className="block text-red-700 font-semibold text-sm">{errors.colerr}</div>} */}
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
      {/* Edit  product */}
      <MyModal isOpen={isOpenEditModal} closeModal={closeEditModal} title="EDIT PRODUCT">
        <form className="space-y-3" onSubmit={submitEditHandler}>
        {renderProductEditWithErrorMsg("title", "Product Title", "title")}
          {renderProductEditWithErrorMsg("description", "Product Description", "description")}
          {renderProductEditWithErrorMsg("imageURL", "Product Image URL", "imageURL")}
          {renderProductEditWithErrorMsg("price", "Product Price", "price")}
          <div className="flex items-center space-x-2 ">
           {rendercolorslist}
        </div>
        <Select selected={productToEdit.category} setselected={(value)=>setProductToEdit({...productToEdit, category:value})} />
        <div className="flex items-center flex-wrap space-x-1">
            {temparry.concat(productToEdit.colors).map(color => (
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
          <Button className="bg-gray-300 hover:bg-gray-400" onClick={closeEditModal}>Cancel</Button>
        </div>
        </form>
       
      </MyModal>
  {/* DELETE PRODUCT CONFIRM MODAL */}
  <MyModal
        isOpen={IsOpenConfirmModal}
        closeModal={closeConfirmModal}
        title= {`Are you sure you want to remove ${productToEdit.title} from your Store?`}
        description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action">
        <div className="flex items-center space-x-3">
          <Button className="bg-[#c2344d] hover:bg-red-800" onClick={removeProductHandler}>
            Yes, remove
          </Button>
          <Button type="button" className="bg-[#f5f5fa] hover:bg-gray-300 !text-black" onClick={closeConfirmModal}>
            Cancel
          </Button>
        </div>
      </MyModal>
      <Toaster />
      
    </div>
    
  );
}

export default App;
