import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DeleteProduct from './DeleteProduct';
import axios from 'axios';
import React from 'react';

//mock axios globally
jest.mock('axios');

describe('DeleteProduct Component', () => {
    const mockOnProductDeleted = jest.fn();
    const mockSetErrorMessage = jest.fn(); // mock setErrorMessage

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders delete button', () => {
        render(<DeleteProduct productId={1} onProductDeleted={mockOnProductDeleted} setErrorMessage={mockSetErrorMessage} />);
        expect(screen.getByText('Delete Product')).toBeInTheDocument();
    });

    test('calls axios.delete and onProductDeleted on button click', async () => {
        axios.delete.mockResolvedValueOnce({}); // mock successful deletion

        render(<DeleteProduct productId={1} onProductDeleted={mockOnProductDeleted} setErrorMessage={mockSetErrorMessage}/>);

        await fireEvent.click(screen.getByText('Delete Product')); // simulation of the click action

        //wait for axios call
        await waitFor(() => {
            expect(axios.delete).toHaveBeenCalledWith('http://localhost:4000/products/1');
            //wait for callback
            expect(mockOnProductDeleted).toHaveBeenCalledWith(1);            
        });

    });
});