import { Button } from '@radix-ui/themes';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const PurchaseHistory = ({ purchaseHistory }) => {
    const [visibleItemId, setVisibleItemId] = useState(null); 
    const navigate = useNavigate()

    const formatDate = (isoString) => {
    const date = new Date(isoString);
        const options = {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };
        return date.toLocaleString('en-US', options);
    };

    const calculateTotal = (items) => {
        const taxRate = 0.04; // 4% tax
        const subtotal = items.reduce((total, item) => {
            return total + (item.collectible.price * item.quantity);
        }, 0);
    
        const taxAmount = subtotal * taxRate;
        const totalWithTax = subtotal + taxAmount;
    
        return totalWithTax;
    };

    const toggleItemDetails = (itemId) => {
        setVisibleItemId(visibleItemId === itemId ? null : itemId); // Toggle visibility
    };
    
      

    return (
        <>
            <div className="text-xl font-bold mb-3 mt-14">Purchase History</div>
            {purchaseHistory.length > 0 ? (
                purchaseHistory.map(cart => (
                    <div key={cart.id} className="mb-6" >
                        <div className="font-bold">
                            Purchase Date: {formatDate(cart.purchase_date)} <br />
                            Total: ${calculateTotal(cart.items).toFixed(2)}
                        </div>
                        <Button 
                        onClick={() => toggleItemDetails(cart.id)} 
                        >
                            View item details
                        </Button>
                        {visibleItemId === cart.id && (
                            <div className="flex flex-wrap mt-2"> 
                                {cart.items.map(item => (
                                    <div 
                                    key={item.id} 
                                    className="border p-2 mt-2 rounded-lg mr-2 cursor-pointer hover:shadow-lg transition-shadow"
                                    onClick={() => navigate(`/item/${item.collectible.id}`)} 
                                > 
                                        <div className="font-bold">{item.collectible.name}</div>
                                        <div>Price: ${item.collectible.price}</div>
                                        <img 
                                            src={item.collectible.images[0]?.img_url} 
                                            alt={item.collectible.name} 
                                            className="w-24 h-24 object-cover rounded-xl"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p className='mb-20'>You have no previous orders.</p>
            )}
        </>
    );
}