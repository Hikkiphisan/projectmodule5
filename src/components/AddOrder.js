import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddOrder = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState({
        orderId: '',
        purchaseDate: '',
        totalAmount: '',
        quantity: '',
        products: [{ productId: '', name: '', price: '', category: '' }]
    });

    useEffect(() => {
        fetch('http://localhost:5000/orders')
            .then(response => response.json())
            .then(data => setOrders(data))
            .catch(error => console.error('Lỗi khi tải đơn hàng:', error));
    }, []);

    const handleChange = (e, index, field) => {
        if (field) {
            const updatedProducts = [...order.products];
            updatedProducts[index][field] = e.target.value;
            setOrder({ ...order, products: updatedProducts });
        } else {
            setOrder({ ...order, [e.target.name]: e.target.value });
        }
    };

    const addProduct = () => {
        setOrder({
            ...order,
            products: [...order.products, { productId: '', name: '', price: '', category: '' }]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order)
            });

            if (response.ok) {
                alert('Thêm đơn hàng thành công!');
                navigate('/');
            } else {
                alert('Có lỗi xảy ra, vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Lỗi khi thêm đơn hàng:', error);
            alert('Không thể kết nối với server.');
        }
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">🛒 Danh Sách & Thêm Đơn Hàng</h2>

            <h3 className="text-xl font-bold mt-4">📋 Danh Sách Đơn Hàng</h3>
            <ul className="list-disc ml-6">
                {orders.map(order => (
                    <li key={order.orderId} className="p-2 border-b">{order.orderId} - {order.purchaseDate}</li>
                ))}
            </ul>

            <h3 className="text-xl font-bold mt-6">➕ Thêm Đơn Hàng</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="orderId" value={order.orderId} onChange={handleChange} placeholder="Mã Đơn Hàng" required className="border p-2 w-full rounded" />
                <input type="date" name="purchaseDate" value={order.purchaseDate} onChange={handleChange} required className="border p-2 w-full rounded" />
                <input type="number" name="quantity" value={order.quantity} onChange={handleChange} required placeholder="Số Lượng" className="border p-2 w-full rounded" />
                <input type="number" name="totalAmount" value={order.totalAmount} onChange={handleChange} required placeholder="Tổng Tiền" className="border p-2 w-full rounded" />

                <h3 className="text-lg font-bold">📦 Sản Phẩm</h3>
                {order.products.map((product, index) => (
                    <div key={index} className="border p-4 my-2 rounded bg-gray-100">
                        <input type="text" value={product.productId} onChange={(e) => handleChange(e, index, 'productId')} placeholder="Mã SP" className="border p-2 w-full rounded" />
                        <input type="text" value={product.name} onChange={(e) => handleChange(e, index, 'name')} placeholder="Tên SP" className="border p-2 w-full rounded" />
                        <input type="number" value={product.price} onChange={(e) => handleChange(e, index, 'price')} placeholder="Giá" className="border p-2 w-full rounded" />
                        <input type="text" value={product.category} onChange={(e) => handleChange(e, index, 'category')} placeholder="Danh Mục" className="border p-2 w-full rounded" />
                    </div>
                ))}

                <button type="button" onClick={addProduct} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">➕ Thêm Sản Phẩm</button>
                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ml-2">💾 Lưu Đơn Hàng</button>
            </form>
        </div>
    );
};

export default AddOrder;