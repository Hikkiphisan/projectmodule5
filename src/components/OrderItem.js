import React from 'react';

const OrderItem = ({ index, order, product }) => {
    return (
        <tr className="hover:bg-gray-100">
            <td className="border border-gray-300 p-4">{index + 1}</td>
            <td className="border border-gray-300 p-4">{order.orderId}</td>
            <td className="border border-gray-300 p-4">{product.name}</td>
            <td className="border border-gray-300 p-4">{order.purchaseDate}</td>
            <td className="border border-gray-300 p-4">{product.price.toLocaleString()} VND</td>
            <td className="border border-gray-300 p-4">{order.quantity}</td>
            <td className="border border-gray-300 p-4">{order.totalAmount.toLocaleString()} VND</td>
        </tr>
    );
};

export default OrderItem;