import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import Spinner from '../Spinner/Spinner'
import ProductsContext from '../../contexts/ProductsContext';

import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import { BASE_URL } from '../../const/config.js'

const ProductsTable = () => {
    const { allProducts, getAllProducts } = useContext(ProductsContext);
    const [rows, setRows] = useState([]);
    const [addingProduct, setAddingProduct] = useState(false);

    useEffect(() =>
    {setRowsFromProducts()}
    ,[allProducts]
    )

    useEffect(() =>
    {console.log('rows useEffect ', rows)}
    ,[rows]
    )

    const addRow = () => {
        setAddingProduct(true);
        let newRow = {id:rows.length, title:'New Row', price:'price', category: 'category', description:'description', image:'image',
                        isNew:true};
        setRows([...rows, newRow]);
        // console.log(addingProduct, rows)
    }

    // const findRowIndex = (productId) => (rows.findIndex((item) => item.productId === productId));

    // const updateRowsAfterPost = (postedProduct) => {     // in postNewProductFromTable
    //     let postedProductRow = {id:rows.length-1, productId:postedProduct._id, title:postedProduct.title, // id = rowId
    //                 price:postedProduct.price, category:postedProduct.category, description:postedProduct.description, image:postedProduct.image,
    //                 isNew: false, isChanged:false};
    //     let firstPart = rows.slice(0, rows.length-1);
    //     setRows([...firstPart, postedProductRow]);
    // }

    // const deleteRow = (productId) => {                   // in deleteProductFromTable
    //     let rowIndex = findRowIndex(productId);
    //     let firstPart = rows.slice(0, rowIndex)
    //     let secondPart = rows.slice(rowIndex+1)
    //     setRows([...firstPart, ...secondPart])
    // }

    const setRowsFromProducts = () => {             // updating rows from allProducts
        setRows(allProducts.map((item, index) => {
            return { id:index, productId:item._id, title:item.title, // id = rowId is needed by mui DataGrid
                    price:item.price, category:item.category, description:item.description, image:item.image,
                    isNew: false}
        }))
    }

    // setRowsFromProducts();

    const postNewProductFromTable = async (params, event) => {
        // console.log('in postProductFromTable', params, event)
        const { title, price, category, description, image } = params.row;
        let newProduct = {title: title, price: price, category: category, description: description, image: image};
        let body = JSON.stringify(newProduct);
        // console.log(body)
        try {
            let response = await fetch(BASE_URL + '/api/products/addProduct', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                },
                body: body
            });

            let responseJSON = await response.json();
            // console.log(responseJSON)

            getAllProducts();
            // useEffect for rows update
            setAddingProduct(false);

        } catch(error) {
            alert(error);
        }
    }

    const putProductFromTable = async (params, event) => {
        // console.log('in updateProductFromTable', params, event)
        let productRow = params.row;
        let productId = productRow.productId;
                                                                // checking if there are changes to put
        let productOriginal = allProducts[params.row.id];       // by index
        let fieldsToCheck = ['title', 'price', 'category', 'description', 'image'];
        let changesToPut = {};
        for (let field of fieldsToCheck) {
            if (productRow[field] !== productOriginal[field]) {
                changesToPut[field] = productRow[field];
            }
        }
        if (changesToPut === {}) {
            // console.log('no change to put');
        
        } else {
            // console.log('changes to put : ', changesToPut)
            let body = JSON.stringify(changesToPut);
            // console.log(body)
        
            try {
                await fetch(BASE_URL + '/api/products/updateProduct/' + productId, {
                    method: 'PUT',
                    mode: 'cors',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: body
                });

            getAllProducts();

            } catch(error) {
                alert(error);
            }
        }
    }

    const deleteProductFromTable = async (params, event) => {
        // console.log('in deleteProductFromTable', params, event)
        let productId = params.row.productId;
        // console.log(productId)
        try {
            await fetch(BASE_URL + '/api/products/deleteProduct/' + productId, {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                },
            });

            getAllProducts();
            // useEffect for ros update

        } catch(error) {
            alert(error);
        }
    }

    if (rows.length !== 0) {

        const columns = [
            // { field: 'id', headerName: 'rowId', width: 150 },

            { field: 'productId', headerName: 'Product Id', width: 300,
                renderCell: (params) => {
                    return (
                        <Link to={"/products/" + params.row.productId}>{params.row.productId}</Link>
                    )
            } },
        
            { field: 'title', headerName: 'Title', width: 300, editable: true },
        
            { field: 'price', headerName: 'Price', width: 150, editable:true },
        
            { field: 'actions', headerName: '', width: 500, 
                renderCell: (params) => {
                    return (
                        <div>
                            {params.row.isNew && <button onClick={(event) => postNewProductFromTable(params, event)}>Save NEW</button>}
                            {!params.row.isNew && <button onClick={(event)=> putProductFromTable(params, event)}>Save</button>}
                            <button onClick={(event) => deleteProductFromTable(params, event)}>Delete</button>
                        </div>
                    )
            }}
        ];

        return (
            <div style={{height:"100vh"}}>ProductsTable
                <button onClick={() => addRow()} disabled={addingProduct}>+</button>
                <DataGrid
                    // experimentalFeatures={{ newEditingApi: true }}
                    // loading={'loading'}
                    rows={rows}
                    columns={columns}
                    pageSize={20}
                    rowsPerPageOptions={[5]}
                    // editMode='row'
                    // checkboxSelection
                    // isCellEditable={(params) => true}
                    // onCellEditStop={(params, event)=>setTimeout(console.log('cell edit stop : ', params, params.formattedValue, event), 1000)}
                    // onCellEditCommit={(params, event)=>setTimeout(console.log('cell edit commit : ', params, params.formattedValue, event), 1000)}
                    // onCellFocusOut={(params, event)=>setTimeout(console.log('cell focus out : ', params, params.formattedValue, event), 1000)}
                    // processRowUpdate={(params)=>console.log('process row update : ', params)}
                    // onProcessRowUpdateError={(error)=>console.log('process row update error : ', error)}
                    // onStateChange
                    // onCellFocusOut={(event, params)=>handleCellFocusOut(event, params)}
                />
            </div>
        )
  
    } else {
        return (
        <div>
            <Spinner />
        </div>
        )
    }
}

export default ProductsTable