import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { thunkEditSnackQty } from '../../store/snacks';

export default function EditSnackQtyForm({snack, setTrigger}) {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(snack.quantity);

    async function handleSubmit(e) {
        e.preventDefault();

        const updatedSnackQty = {
            ...snack,
            quantity
        }

        dispatch(thunkEditSnackQty(updatedSnackQty));
        setTrigger(true);
    }

    return (
        <form className="update_snack_qty_form" onSubmit={handleSubmit}>
            <label id="qty_label">Qty:</label>
            <select id="qty_select" onChange={(e) => setQuantity(parseInt(e.target.value))}
                value={quantity}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </select>
            <button className='update_qty_btn' type="submit">Update Qty</button>
        </form>
    )

}
