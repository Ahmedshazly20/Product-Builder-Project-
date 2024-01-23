import React from 'react';
import ProductCard from './component/ProductCard';
import {productList} from "./data/data"

function App() {
  const renderpeoductlist = productList.map(product => <ProductCard key={product.id} Product={product}  />)


  return (
    <div className="App m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-2 rounded-md">
      {renderpeoductlist}
    </div>
  );
}

export default App;
