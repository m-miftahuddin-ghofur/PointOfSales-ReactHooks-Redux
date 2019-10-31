import Axios from "axios"


export const getProducts = () => {
    return {
        type : 'GET_PRODUCT',
        payload : Axios.get('http://localhost:5000/product')
    };
};

export const postProducts = (data) => {
    return {
        type : 'POST_PRODUCT',
        payload : Axios.post('http://localhost:5000/product', data)
    };
};


export const deleteProduct = (selectedRow) => {
    return {
        type : 'DELETE_PRODUCT',
        payload : Axios.delete(`http://localhost:5000/product/${selectedRow.id}`)
    };
};

export const updateProducts = (selectedRow) => {
    return {
        type : 'UPDATE_PRODUCT',
        payload : Axios.put(`http://localhost:5000/product/${selectedRow.id}`, selectedRow)
    };
};