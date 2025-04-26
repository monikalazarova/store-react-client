import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import axios from 'axios';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import ProductDetails from './components/ProductDetails';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import "./App.css";

function App() {
  //local states for managing products, loading, editing and filtering 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editProductId, setEditProductId] = useState(null);
  const [availableFilter, setAvailableFilter] = useState('all');
  const [errorMessage, setErrorMessage] = useState('');

  //fetch products 
  useEffect(function () {
    async function fetchProducts() {
        try{
          const response = await axios.get ('http://localhost:4000/products');
          setProducts(response.data);
        } catch (error) {
          console.error ("Could not fetch the products", error);
        } finally {
          setLoading(false);
        }
    }
        fetchProducts();
}, []); // the effect will run once when the component mounts

//add new product to the list
function handleProductAdded(newProduct) {
  setProducts ((prevProducts) => [...prevProducts, newProduct]);
}

//update a product
function handleProductUpdated(updatedProduct) {
  setProducts((prevProducts) =>
  prevProducts.map(function(product) {
    return product.id === updatedProduct.id ? updatedProduct : product;
  }));
}

//delete product
function handleProductDeleted(deletedProductId) {
  setProducts ((prevProducts) =>
    prevProducts.filter(function(product) {
      return product.id !== deletedProductId;
    })
  );
}

//filter products
function handleFilterChange (e) {
  setAvailableFilter(e.target.value);
}

//apply the filter to the product list
const filteredProducts = products.filter (product => {
  if (availableFilter === 'available') return product.available === true;
  if (availableFilter === 'notAvailable') return product.available === false;
  return(true); //all
});

  return (
    <div className='main-container'>
      <div className='content-wrap'>
        <Router>
            <Navbar />

            <Routes>
              <Route 
                path="/"
                  element={
                    <div>


                      {/*Filter the Products Dropdown Menu*/}
                      <div className='filter-container'>
                        <h3>Filter by Availability</h3>
                        <select value={availableFilter} onChange={handleFilterChange} className='filter-option'>
                          <option value="all">All</option>
                          <option value="available">Available Products</option>
                          <option value="notAvailable">No Availability</option>
                        </select>
                      </div>


                      {loading ? <p>Loading...</p> :  <ProductList products={filteredProducts} onEdit={setEditProductId} handleProductDeleted={handleProductDeleted} setErrorMessage={setErrorMessage}/>}

                       {/*Display Error message*/}
                       {errorMessage && (
                        <div className='error-message'>
                          {errorMessage}
                        </div>
                      )}
                      
                      {/*Forms*/}
                      {editProductId && (
                      <EditProduct productId={editProductId} onProductUpdated={handleProductUpdated} onClose={() => setEditProductId(null)} setErrorMessage={setErrorMessage}/>
                      )}
                      <AddProduct onProductAdded={handleProductAdded} setErrorMessage={setErrorMessage}/>
                    </div>  
                  } 
              />
              {/*Product Details page*/}
              <Route path="/products/:id" element={<ProductDetails />} />
            </Routes>
        </Router>
      </div>
        <Footer />
    </div>

  );
}

export default App;
