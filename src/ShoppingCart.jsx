import React, { Component } from "react";
import Product from "./Product";
export default class ShoppingCart extends Component {
  constructor(props) {
    //console.log("constructor - ShoppingCart");
    super(props); //calling super class's constructor

    //initialization of the state
    this.state = {
      products: [
        { id: 1, productName: "iPhone 11", price: 89000, quantity: 0 },
        { id: 2, productName: "Sony HXR-MC88", price: 45000, quantity: 0 },
        { id: 3, productName: "Samsung AU8000 TV", price: 77045, quantity: 0 },
        {
          id: 4,
          productName: "Playstation 4 Slim 1TB",
          price: 124000,
          quantity: 0,
        },
        {
          id: 5,
          productName: "Macbook Pro 2021 13 inch ",
          price: 378000,
          quantity: 0,
        },
        {
          id: 6,
          productName: "AppleiPad 9th Generation (2021)",
          price: 111000,
          quantity: 0,
        },
      ],
    };
  }

  render() {
    return (
      <div className="container-fluid">
        <h4>Shopping Cart</h4>
        <div className="row">
          {this.state.products.map((prod) => {
            return (
              <Product
                key={prod.id}
                product={prod}
                onIncrement={this.handleIncrement}
                onDecrement={this.handleDecrement}
                onDelete={this.handleDelete}
              >
                <button className="badge bg-light text-dark">Buy Now</button>
              </Product>
            );
          })}
        </div>
      </div>
    );
  }

  componentDidMount = async () => {
    //send request to server
    var response = await fetch("http://localhost:5000/products", {
      method: "GET",
    });

    //the following code executes after receiving response from server
    //converting the response body into a JS object array
    var prods = await response.json();

    //the following code executes after converting response body into JS object array
    console.log(prods);

    //updating products into component's state
    this.setState({ products: prods });

    //console.log("componentDidMount - ShoppingCart");
  };

  componentDidUpdate(prevProps, prevState) {
    console.log(
      "componentDidUpdate - ShoppingCart",
      prevProps,
      prevState,
      this.props,
      this.state
    );
    if (prevProps.x != this.props.x) {
      //   //make http call
    }
  }

  componentWillUnmount() {
    //console.log("componentWillUnmount - ShoppingCart");
  }

  handleIncrement = (product, maxValue) => {
    console.log("handleIncrement", product);
    let allProducts = [...this.state.products];
    let index = allProducts.indexOf(product);
    if (allProducts[index].quantity < maxValue) {
      allProducts[index].quantity++;
      this.setState({ products: allProducts });
    }
  };

  handleDecrement = (product, minValue) => {
    console.log("handleDecrement", product);
    let allProducts = [...this.state.products];
    let index = allProducts.indexOf(product);
    if (allProducts[index].quantity > minValue) {
      allProducts[index].quantity--;
      this.setState({ products: allProducts });
    }
  };

  handleDelete = (product) => {
    //get index of selected product
    let allProducts = [...this.state.products];
    let index = allProducts.indexOf(product);

    if (window.confirm("Are you sure to delete?")) {
      //delete product based on index
      allProducts.splice(index, 1);

      //update the state of current component (parent component)
      this.setState({ products: allProducts });
    }
  };

  componentDidCatch(error, info) {
    //console.log("componentDidCatch - ShoppingCart");
    //console.log(error, info);

    localStorage.lastError = `${error}\n${JSON.stringify(info)}`;
  }
}
