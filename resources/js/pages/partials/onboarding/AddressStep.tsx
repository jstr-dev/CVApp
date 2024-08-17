import AddressForm from '@/forms/AddressForm';
import React from 'react';

export default function AddressStep() {
    return (
        <div className="w-full">
            <AddressForm onSubmit={() => { console.log('submit!') }} />
        </div>
    )
}
