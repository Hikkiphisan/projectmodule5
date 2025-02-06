import React from 'react';
import OrderItem from './OrderItem';

const OrderList = ({ orders }) => {
    return (
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
            {orders.map((order, orderIndex) => (
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
    );
};
export default OrderList;