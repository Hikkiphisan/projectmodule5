/* src/components/AddOrderForm.js */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import orderData from '../data/db.json';
import axios from 'axios';

const AddOrderForm = () => {
    const navigate = useNavigate();
    const [order, setOrder] = useState({
        orderId: '',
        purchaseDate: '',
        totalAmount: 0,
        quantity: 1,
        products: []
    });
    const [product, setProduct] = useState({ productId: '', name: '', price: 0, category: '' });

    const handleChange = (e) => {
        setOrder({ ...order, [e.target.name]: e.target.value });
    };

    const handleProductChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const addProduct = () => {
        setOrder({
            ...order,
            products: [...order.products, product],
            totalAmount: order.totalAmount + parseInt(product.price),
            quantity: order.quantity + 1
        });
        setProduct({ productId: '', name: '', price: 0, category: '' });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/orders', order);
            alert(`Order "${response.data.orderId}" added successfully!`);
            navigate('/');
        } catch (error) {
            console.error("Error while adding order:", error);
            alert("There was an error adding the order. Please try again later.");
        }
    };


    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Thêm Đơn Hàng</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="orderId" placeholder="Mã Đơn Hàng" onChange={handleChange} required />
                <input type="date" name="purchaseDate" onChange={handleChange} required />
                <div>
                    <h3>Thêm Sản Phẩm</h3>
                    <input type="text" name="productId" placeholder="Mã Sản Phẩm" onChange={handleProductChange} required />
                    <input type="text" name="name" placeholder="Tên Sản Phẩm" onChange={handleProductChange} required />
                    <input type="number" name="price" placeholder="Giá" onChange={handleProductChange} required />
                    <input type="text" name="category" placeholder="Danh Mục" onChange={handleProductChange} required />
                    <button type="button" onClick={addProduct}>Thêm Sản Phẩm</button>
                </div>
                <button type="submit">Thêm Đơn Hàng</button>
            </form>
        </div>
    );
};

export default AddOrderForm;