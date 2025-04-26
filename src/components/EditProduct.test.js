import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditProduct from './EditProduct';
import axios from 'axios';
import React from 'react';

//mock axios globally
jest.mock('axios');

describe('EditProduct Component', () => {
    const mockProduct = {
        id: 1,
        name: 'Test Product',
        description: 'Test description added',
        price: 125.00,
        available: true,     
    };

    const mockOnProductUpdated = jest.fn();
    const mockOnClose = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    //testing rendering the component and fetching the product
    test('renders from with pre-filled data', async () => {
        axios.get.mockResolvedValueOnce({ data: mockProduct }); // mock GET product

        render(<EditProduct productId={1} onProductUpdated={mockOnProductUpdated} onClose={mockOnClose} />)

        //Waiting for the product to load
        expect(await screen.findByDisplayValue('Test Product')).toBeInTheDocument();
        const textarea = screen.getByPlaceholderText ('Product Description');
        expect(textarea.value).toBe('Test description added');
        expect(screen.getByDisplayValue('125')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Yes')).toBeInTheDocument();  
    });
});