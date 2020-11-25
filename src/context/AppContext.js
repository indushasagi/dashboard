import React from 'react';
import axios from 'axios';
import convert from 'xml-js';

export const intialAppContext = {
    isAuthenticated: false,
    books: [],
    makeupList: [],
    addProductToCart: [],
    quantity: 1
}

export const AppContext = React.createContext(intialAppContext);

export default class AppContextProvider extends React.Component {
    state = {
        isAuthenticated: false,
        books: [],
        makeupList: [],
        addProductToCart: [],
        quantity: 1
    }
    authenticate = () => {
        this.setState({ isAuthenticated: true })
    }
    signout = () => {
        this.setState({ isAuthenticated: false })
    }

    getBooks = (event, searchParam) => {
        event.preventDefault();
        axios.get('https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search.xml?key=WxrIkPORqNnXPgTZyxjQ&q=' + encodeURIComponent(searchParam))
            .then((response) => {
                let xmlDoc = response.data;
                let result1 = convert.xml2json(xmlDoc, { compact: true, spaces: 4 });
                let pjson = JSON.parse(result1);
                let goodRes = pjson.GoodreadsResponse.search.results;
                console.log(goodRes.work)
                this.setState({ books: goodRes.work })
            }).catch((e) => {
                console.error(e);
            });
    }

    getMakeupList = (event, brand, productType) => {
        event.preventDefault();
        axios.get(`https://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}&product_type=${productType}`)
            .then((response) => {
                const modifyRes = response.data;
                modifyRes.map((data) => {
                    const splitFeature = data.description.split('Features:');
                    data.description = splitFeature[0];
                    data['features'] = splitFeature[1];
                    data['quantity'] = 1;
                    return data;
                });
                this.setState({ makeupList: modifyRes })
            }).catch((e) => {
                console.error(e);
            });
    }

    addToCart = (event, product) => {
        event.preventDefault();
        const arr = this.state.addProductToCart;
        let checkFlag = false;
        arr.forEach((data) => {
            if (data.id === product.id) {
                product['quantity'] = ++product['quantity'];
                return checkFlag = true;
            }
        });
        if (arr.length === 0 || !checkFlag) {
            arr.push(product);
        }
        this.setState({ addProductToCart: arr });
    }

    removeFromCart = (productId) => {
        const arr = this.state.addProductToCart;
        const removeId = arr.filter((data) => {
            if (data.id === productId) {
                data['quantity'] = 1;
            }
            return data.id !== productId;
        });
        this.setState({ addProductToCart: removeId });
    }

    onQuantityChange = (event, productId) => {
        const arr = this.state.addProductToCart;
        const changedQuanitity = arr.map((data) => {
            if (data.id === productId) {
                data.quantity = event.target.value
                return data;
            }
            return data;
        });
        this.setState({ addProductToCart: changedQuanitity });
    }
    render() {
        return (
            <AppContext.Provider value={{
                ...this.state,
                handleSubmit: this.handleSubmit,
                authenticate: this.authenticate,
                getMakeupList: this.getMakeupList,
                signout: this.signout,
                getBooks: this.getBooks,
                addToCart: this.addToCart,
                removeFromCart: this.removeFromCart,
                onQuantityChange: this.onQuantityChange
            }}>
                {this.props.children}
            </AppContext.Provider >
        )
    }
}