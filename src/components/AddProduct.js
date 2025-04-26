import { useState } from 'react';
import axios from 'axios';
import "../styles/AddProduct.css"

function AddProduct ({ onProductAdded, setErrorMessage }) { //accepting props
    // state to hold form input values
    const [product, setProduct] = useState ({
        name: '',
        description: '',
        price: '',
        available: '',
    });

    //handles input field changes
    function handleChange(e) {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value, //updating specific field
        });
    }


    //handles submission
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/products', product); // sending POST request
            onProductAdded(response.data); // update the product list
            setErrorMessage(''); //Clear the error on succesful addition
            setProduct({
                name: '',
                description: '',
                price: '',
                available: '',
            });
        } catch (error) {
            console.error ("Could not add a new product", error);
            setErrorMessage("Failed to update product, try again! Notice: Name must be more than 5 char, description must be more than 20 char, the price must be positive number and the product must be available on creation!");
        }    
    }

    return (
        <div className="container-add-product">
            <h2>Add New Product</h2>
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
                <button type="submit">Add Product</button>
            </form>
        </div>
    )
}

export default AddProduct;