import React, { useState } from 'react';
import OrderItem from './OrderItem';

const OrderList = ({ orders }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const filteredOrders = orders.filter(order => {
        const orderDate = new Date(order.purchaseDate);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        const matchesDate = (!start || orderDate >= start) && (!end || orderDate <= end);
        const matchesProduct = order.products.some(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return matchesDate && matchesProduct;
    });

    return (
        <div>
            {/* Thanh tìm kiếm */}
            <div className="flex gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Tìm theo sản phẩm..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="border p-2 rounded shadow-md"
                />
                <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="border p-2 rounded shadow-md"
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    className="border p-2 rounded shadow-md"
                />
            </div>

            {/* Bảng danh sách đơn hàng */}
            <table className="w-full text-left border-collapse border border-gray-400 shadow-md rounded-lg">
                <thead>
                <tr className="bg-blue-500 text-white">
                    <th className="border border-gray-300 p-4">STT</th>
                    <th className="border border-gray-300 p-4">Mã Đơn Hàng</th>
                    <th className="border border-gray-300 p-4">Tên Sản Phẩm</th>
                    <th className="border border-gray-300 p-4">Ngày Mua</th>
                    <th className="border border-gray-300 p-4">Giá</th>
                    <th className="border border-gray-300 p-4">Số Lượng</th>
                    <th className="border border-gray-300 p-4">Tổng Tiền</th>
                </tr>
                </thead>
                <tbody>
                {filteredOrders.map((order, orderIndex) => (
                    order.products.map((product, productIndex) => (
                        <OrderItem
                            key={`${order.orderId}-${product.productId}`}
                            index={orderIndex}
                            order={order}
                            product={product}
                        />
                    ))
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderList;
