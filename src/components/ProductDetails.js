import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/ProductDetails.css";
import { railsApiUrl } from "./api";

function ProductDetails() {
    const { id } = useParams(); // getting the product id from the url
    const [product, setProduct] = useState(null); // state to store the fetched products
    const [loading, setLoading] = useState(true); // state to track loading status

    // fetch product details when components renders or the id changes
    useEffect(function() {
        async function fetchProduct() {
            try{
                const response = await axios.get (`${railsApiUrl}/${id}`); // GET request
                setProduct(response.data);
            } catch (error) {
                console.error ("Error fetching a product", error);
            } finally {
                setLoading(false);
            }
        }
            fetchProduct();
    }, [id]); // dependency - id - re-run if changed

    //loading and error handling
    if (loading) return <div>Loading product details...</div>
    if (!product) return <div>Product cannot be found.</div>

    return (
        <div className="product-details-wrapper">
            <div className="product-details-card">
                <h2>Product Details</h2>
                <p><strong>Name:</strong>{product.name}</p>
                <p><strong>Description:</strong>{product.description}</p>
                <p><strong>Price:</strong>£{parseFloat(product.price).toFixed(2)}</p>
                <p><strong>Available:</strong>{product.available ? 'Yes' : 'No' }</p>

                <div className="product-details-button">
                <Link to="/">
                    <button>Back to the Product List</button>
                </Link>
                </div>
            </div>
        </div>    
    )
}

export default ProductDetails;