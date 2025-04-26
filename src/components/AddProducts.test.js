import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddProduct from './AddProduct';
import axios from 'axios';
import React from 'react';

//mock react-router-dom - prevent jest from braking on router internals
jest.mock('react-router-dom', () => ({
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Routes: ({ children }) => <div>{children}</div>,
    Route: ({ element }) => <div>{element}</div>,
    Link: ({ to, children }) => <a href={to}>{children}</a>,
    useParams: () => ({ id: '1' }),
}));

//mock axios globally
jest.mock('axios');

describe('AddProdict Component', () => {
    test('renders from inputs and button', () => {
        render(<AddProduct onProductAdded={() => {}} />);

        //Check if all form fields and buttons are present
        expect(screen.getByPlaceholderText('Product Name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Product Description')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Product Price')).toBeInTheDocument();
        expect(screen.getByRole('combobox')).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Yes'})).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'No'})).toBeInTheDocument();
        expect(screen.getByText('Add Product')).toBeInTheDocument();
    });

    test('submits form and calls onProductAdded with the data', async () => {
        const mockProduct = {
            id: 1,
            name: 'Test Product',
            description: 'Test description added',
            price: 125.00,
            available: true
        };

        const mockAddProduct = jest.fn();

        //Mock axios POST method response
        axios.post.mockResolvedValueOnce({ data: mockProduct });

        const mockSetErrorMessage = jest.fn();

        render(<AddProduct onProductAdded={mockAddProduct} setErrorMessage={mockSetErrorMessage} />);

        //simulation of a user filling the form
        fireEvent.change(screen.getByPlaceholderText('Product Name'), {target: {value: 'Test Product'} });
        fireEvent.change(screen.getByPlaceholderText('Product Description'), {target: {value: 'Test description added'} });
        fireEvent.change(screen.getByPlaceholderText('Product Price'), {target: {value: '125.00'} });
        fireEvent.change(screen.getByRole('combobox'), {target: {value: 'true'} });

        //submitting the form
        fireEvent.click(screen.getByText('Add Product'));

        //wait for async axios call and check if onProductAdded is called
        await waitFor(() => {
            expect(mockAddProduct).toHaveBeenCalledWith(mockProduct);
        });

        //check if the form resets 
        expect(screen.getByPlaceholderText('Product Name')).toHaveValue('');
    });
});