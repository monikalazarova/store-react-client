import { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/EditProduct.css";
import { railsApiUrl } from './api';

function EditProduct({ productId, onProductUpdated, onClose, setErrorMessage }) { // accept props
    //state for the product being edited
    const [product, setProduct] = useState(null);

    //fetch product data
    useEffect(function() {
        async function fetchProduct() {
            try{
                const response = await axios.get (`${railsApiUrl}/${productId}`); // get request to fetch product details
                setProduct(response.data);
            } catch (error) {
                console.error ("Error fetching a product", error);
                setErrorMessage("Failed to fetch a product, try again!");
            } 
        }
            fetchProduct();
    }, [productId]);

    //handling input field changes
    function handleChange(e) {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value, // updating the filed with corresponding data
        });
    }

    // hadling the submission 
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.patch(`${railsApiUrl}/${productId}`, { // Patch request to update the product
                product: {
                    ...product,
                    available: product.available === true // ensure that is boolean
                }
            });
            onProductUpdated(response.data); // update the product list
            setErrorMessage(''); //Clear the error on succesful addition
            onClose(); // hide edit form
        } catch (error) {
            console.error ("Could not update the product", error)
            setErrorMessage("Failed to update product, try again! Notice: Name must be more than 5 char, description must be more than 20 char, the price must be positive number!");
        }    
    }

    if (!product) return<div>Loading...</div>

    return(
        <div className="container-edit-product">
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='name'
                    value={product.name}
                    onChange={handleChange}
                    placeholder='Product Name'
                    required
                />
                <textarea
                    name='description'
                    value={product.description}
                    onChange={handleChange}
                    placeholder='Product Description'
                    required
                />
                <input
                    type='number'
                    step= '0.01'
                    name='price'
                    value={product.price}
                    onChange={handleChange}
                    placeholder='Product Price'
                    required
                />
                <select
                    name='available'
                    value={product.available ? "true" : "false"}
                    onChange={(e) =>
                        setProduct({ ...product, available: e.target.value === "true" })
                    }
                    required
                >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
                <button type="submit">Update Product</button>
            </form>
            <button type="button" onClick={onClose}>Close</button>
        </div>
    )


}

export default EditProduct;