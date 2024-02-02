import { IProduct } from "../interfaces";
import Image from "./Image";
import Button from "./ui/Button";
import {txtclise} from "../utils/Function"
import Colors from "./ui/colors";

interface IProps {
  Product :IProduct;
}

const ProductCard = ({Product}: IProps) => {
  const { title ,category,price,id,description,colors ,imageURL }= Product;
  
  const rendercolorslist =colors.map(color=> <Colors  key={color}  singlecolor={color}/>)
  return (
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col space-y-3">
      <Image
        imageURL={imageURL}
        alt={"Product Name"}
        className="rounded-md h-52 w-full lg:object-cover"
      />

      <h3>{title}</h3>
      <p>
       {txtclise(description) }
      </p>
      <div className="flex items-center space-x-2 ">{rendercolorslist}</div>
     

      <div className="flex items-center justify-between">
        <span>{price}</span>
        <Image
          imageURL={imageURL}
          alt={"Product Name"}
          className="w-10 h-10 rounded-full object-bottom"
        />
        
      </div>
      <div className="flex items-center justify-between space-x-2 mt-5">
        <Button className="bg-indigo-700">EDIT</Button>
        <Button className="bg-red-700">DELETE</Button>
      </div>
    </div>
  );
};

export default ProductCard;