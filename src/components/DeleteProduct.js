import axios from "axios";

function DeleteProduct ({ productId, onProductDeleted, setErrorMessage }) { //accepting props
    //Handling delete button click
    async function handleDelete() {
        try{
            await axios.delete(`http://localhost:4000/products/${productId}`); // send delete request
            onProductDeleted(productId);
            setErrorMessage('');
        } catch (error) {
            console.error ("Error ocurred while deleting the product, try again", error);
            setErrorMessage("Failed to delete the product, try again!"); // show error message
        }   
    }

    return <button onClick={handleDelete}>Delete Product</button>
}

export default DeleteProduct;