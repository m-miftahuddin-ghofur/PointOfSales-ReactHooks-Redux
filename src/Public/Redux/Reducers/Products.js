const initialState = {
    productList: [],
    isLoading: false,
    isRejected:false,
    isFulfilled:false,
};

const Products = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PRODUCT_PENDING':
            return{
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            };
        case 'GET_PRODUCT_REJECTED' :
             return{
                ...state,
                isLoading: false,
                isRejected: true,
                isFulfilled: false,
            };
        case 'GET_PRODUCT_FULFILLED' :
            return{
                ...state,
                isLoading: false,
                isRejected: false,
                isFulfilled: true,
                productList: action.payload.data.result
            }
        // =============================================== //
        case 'POST_PRODUCT_PENDING':
            return{
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            };
        case 'POST_PRODUCT_REJECTED' :
             return{
                ...state,
                isLoading: false,
                isRejected: true,
                isFulfilled: false,
            };
        case 'POST_PRODUCT_FULFILLED' :
            const productList = state.productList.slice(0)
            productList.push(action.payload.data.result[0]);
            return{
                ...state,
                isLoading: false,
                isRejected: false,
                isFulfilled: true,
                productList: productList
            }
        //===========================================================//
        case 'DELETE_PRODUCT_PENDING':
            return{
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            };
        case 'DELETE_PRODUCT_REJECTED' :
             return{
                ...state,
                isLoading: false,
                isRejected: true,
                isFulfilled: false,
            };
        case 'DELETE_PRODUCT_FULFILLED' :
            const afterDelete = state.productList.filter(
                product => product.id !== action.payload.data.result.id
            )
            return{
                ...state,
                isLoading: false,
                isRejected: false,
                isFulfilled: true,
                productList: afterDelete
            }
            // =============================================== //
        case 'UPDATE_PRODUCT_PENDING':
            return{
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            };
        case 'UPDATE_PRODUCT_REJECTED' :
             return{
                ...state,
                isLoading: false,
                isRejected: true,
                isFulfilled: false,
            };
        case 'UPDATE_PRODUCT_FULFILLED' :
            
            const afterUpdate = state.productList.map(product => {
                if(product.id === action.payload.data.result[0].id){
                    return action.payload.data.result[0];
                }
                return product;
            })
            return{
                ...state,
                isLoading: false,
                isRejected: false,
                isFulfilled: true,
                productList: afterUpdate
            }
    
        default:
            return state;
    }
}


export default Products;