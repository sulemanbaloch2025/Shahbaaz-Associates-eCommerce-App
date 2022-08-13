import React, { Component } from "react";

export default class Product extends Component {
  state = {
    product: this.props.product,
  };

  render() {
    return (
      <div className="col-lg-6">
        <div className="card m-2">
          <div className="card-body">
            <div className="text-muted">#{this.state.product.id}</div>
            <span
              className="pull-right hand-icon"
              onClick={() => {
                this.props.onDelete(this.state.product);
              }}
            >
              <i className="fa fa-times"></i>
            </span>
            <h5 className="pt-2 border-top">
              {this.state.product.productName}
            </h5>
            <div>PKR {this.state.product.price}</div>
          </div>
          {/*card body enters here */}
          <div className="card-footer">
            <div className="float-left">
              <span>{this.state.product.quantity}</span>
              <div className="btn-group">
                <button
                  className="btn btn-outline-success"
                  onClick={() => {
                    this.props.onIncrement(this.state.product, 10);
                  }}
                >
                  +
                </button>
                <button
                  className="btn btn-outline-success"
                  onClick={() => {
                    this.props.onDecrement(this.state.product, 0);
                  }}
                >
                  -
                </button>
              </div>
            </div>

            {/*Float left ends here */}

            <div className="text-end me-2">{this.props.children}</div>
          </div>
          {/*card footer ends here */}
        </div>
      </div>
    );
  }
  //render ends here
}
// Product #{this.props.id}
