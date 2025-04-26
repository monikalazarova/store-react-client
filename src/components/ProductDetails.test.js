import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductDetails from './ProductDetails';
import axios from 'axios';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

//mock axios globally
jest.mock('axios');

describe('ProductDetails Component', () => {
    test('renders loading state and then the product details', async () => {
        const mockProduct = {
            id: 1,
            name: 'Test Product',
            description: 'Test description added',
            price: 125.00,
            available: true,     
        };

        //mock get request
        axios.get.mockResolvedValueOnce({ data: mockProduct }); 

        //Render with router context (for useParams)
        render(
            <MemoryRouter initialEntries={['/products/1']} >
                <Routes>
                    <Route path="/products/:id" element={<ProductDetails />} />
                </Routes>
            </MemoryRouter>   
        );

        //check loading message
        expect(screen.getByText(/loading product details/i)).toBeInTheDocument();


        //Waiting for the product to load
        await waitFor(() => {
            expect(screen.getByText('Test Product')).toBeInTheDocument();
            const descriptionElement = screen.getByText ((content, element) =>
                element.tagName.toLowerCase() === 'p' && content.includes('Test description added')
            );
            expect(descriptionElement).toBeInTheDocument();
            expect(screen.getByText(/£125.00/)).toBeInTheDocument();
            expect(screen.getByText(/Yes/)).toBeInTheDocument(); 
         });
    });
});