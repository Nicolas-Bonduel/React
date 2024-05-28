import { useParams } from "react-router-dom"
import ProductItem from "../components/ProductItem";
import { useSelector } from "react-redux";
import ItemsByCategory from "../components/ItemsByCategory";

import '../assets/products.scss';

function Product() {

  const { id } = useParams();

  const items = useSelector((state) => state.items.items);
  const item = items.find(i => i.id == id);

  return (
    <>
      {
        items.length ?
          <>
            <div id='product-item'>
              <ProductItem id={id} />
            </div>

            <div className="related-products">
              <h2 className="category-header">You might also like</h2>
              <ItemsByCategory category={item.category} ignore={item.id} />
            </div>
          </>
          :
          <>
            <p>loading..</p>
          </>
      }

    </>
  )
}

export default Product
