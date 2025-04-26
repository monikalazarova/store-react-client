import DeleteProduct from "./DeleteProduct";
import { Link } from 'react-router-dom';
import "../styles/ProductList.css";

function ProductList ({ products, onEdit, handleProductDeleted, setErrorMessage }) { //accepting props

    if (!products.length) return <div>No products found</div>;

    return (
        <div className="product-list-wrapper">
            <h2 className="product-list-heading">Product List</h2>
            <ul className="product-list">
                {products.map((product) => (
                    <li key={product.id} className="product-card">
                        <h3>{product.name}</h3>
                        <p>{product.description}</p> 
                        <p>Price: £{product.price}</p> 
                        <p>Available: {product.available ? "Yes" : "No" }</p>
                        <div className="product-buttons">
                            <Link to={`/products/${product.id}`}>
                                <button>Details</button>
                             </Link>
                            {/*Delete button added*/}
                            <DeleteProduct productId={product.id} onProductDeleted={handleProductDeleted} setErrorMessage={setErrorMessage}/>
                            {/*Edit button added*/}
                            <button onClick={() => onEdit(product.id)}>Edit</button>            
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ProductList;