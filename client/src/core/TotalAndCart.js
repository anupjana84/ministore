import React from 'react'
import { total} from 'cart-localstorage'
const TotalAndCart = () => {
    return (
        <div   style={{position:"fixed", top:"135px", right:"30px",left:"1100px"}}>
  <ul className="list-group mb-3">
    <li className="list-group-item d-flex justify-content-between lh-condensed bg-info">
      <div>
        <h6 className="my-0">Product Details</h6>
      
      </div>
      <span className="text-muted"></span>
    </li>
    <li className="list-group-item d-flex justify-content-between lh-condensed">
      <div>
        <h6 className="my-0">Price({JSON.parse(localStorage.getItem("__cart")).length} items)</h6>
       
      </div>
      <span className="text-muted">{total()}</span>
    </li>
    <li className="list-group-item d-flex justify-content-between lh-condensed">
      <div>
        <h6 className="my-0">Delivery Charges</h6>
      
      </div>
      <span className="text-muted">Free</span>
    </li>
    <li className="list-group-item d-flex justify-content-between bg-light">
      <div className="text-success">
        <h6 className="my-0">Total Payable</h6>
        
      </div>
      <span className="text-danger"><i className="fa fa-inr" aria-hidden="true"></i><span className="ml-1">{total()}</span></span>
    </li>
    
  </ul>
  </div>
    )
}

export default TotalAndCart
