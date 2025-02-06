import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddOrderForm = () => {
    const navigate = useNavigate();
    const [order, setOrder] = useState({
        orderId: '',
        purchaseDate: '',
        totalAmount: '',
        quantity: '',
        products: [{ productId: '', name: '', price: '', category: '' }]
    });

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

        // Kiểm tra dữ liệu nhập vào
        const today = new Date().toISOString().split('T')[0];
        if (order.purchaseDate > today) {
            alert('Ngày mua không được lớn hơn ngày hiện tại.');
            return;
        }
        if (parseInt(order.quantity) <= 0 || isNaN(parseInt(order.quantity))) {
            alert('Số lượng phải là số nguyên lớn hơn 0.');
            return;
        }
        if (order.products.some(p => !p.name || !p.price || parseInt(p.price) <= 0)) {
            alert('Thông tin sản phẩm không hợp lệ.');
            return;
        }

        // Gửi yêu cầu POST lên JSON Server
        try {
            const response = await fetch('http://localhost:5000/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order)
            });

            if (response.ok) {
                alert('Thêm đơn hàng thành công!');
                navigate('/'); // Quay về danh sách đơn hàng
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
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">🛒 Thêm Đơn Hàng Mới</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-semibold">Mã Đơn Hàng:</label>
                    <input type="text" name="orderId" value={order.orderId} onChange={handleChange} required className="border p-2 w-full rounded" />
                </div>
                <div>
                    <label className="block font-semibold">Ngày Mua:</label>
                    <input type="date" name="purchaseDate" value={order.purchaseDate} onChange={handleChange} required className="border p-2 w-full rounded" />
                </div>
                <div>
                    <label className="block font-semibold">Số Lượng:</label>
                    <input type="number" name="quantity" value={order.quantity} onChange={handleChange} required className="border p-2 w-full rounded" />
                </div>
                <div>
                    <label className="block font-semibold">Tổng Tiền:</label>
                    <input type="number" name="totalAmount" value={order.totalAmount} onChange={handleChange} required className="border p-2 w-full rounded" />
                </div>

                <h3 className="text-xl font-bold mt-4">📦 Sản Phẩm</h3>
                {order.products.map((product, index) => (
                    <div key={index} className="border p-4 my-2 rounded bg-gray-100">
                        <label className="block font-semibold">Mã Sản Phẩm:</label>
                        <input type="text" value={product.productId} onChange={(e) => handleChange(e, index, 'productId')} required className="border p-2 w-full rounded" />

                        <label className="block font-semibold">Tên Sản Phẩm:</label>
                        <input type="text" value={product.name} onChange={(e) => handleChange(e, index, 'name')} required className="border p-2 w-full rounded" />

                        <label className="block font-semibold">Giá:</label>
                        <input type="number" value={product.price} onChange={(e) => handleChange(e, index, 'price')} required className="border p-2 w-full rounded" />

                        <label className="block font-semibold">Danh Mục:</label>
                        <input type="text" value={product.category} onChange={(e) => handleChange(e, index, 'category')} required className="border p-2 w-full rounded" />
                    </div>
                ))}

                <button type="button" onClick={addProduct} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                    ➕ Thêm Sản Phẩm
                </button>
                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ml-2">
                    💾 Lưu Đơn Hàng
                </button>
            </form>
        </div>
    );
};

export default AddOrderForm;
