const hostname = window.location.hostname;

export const railsApiUrl = 
    hostname === 'localhost' || hostname === '127.0.0.1'
        ? 'http://localhost:4000/products'
        : 'http://52.49.227.2:4000/products'; //EC2 backend api url