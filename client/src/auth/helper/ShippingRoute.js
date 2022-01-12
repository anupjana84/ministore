import React from 'react';

import { Route ,Redirect} from 'react-router-dom';
import { isAutheticated ,checkout} from './index';

const ShippingRoute=({ component:Component, ...rest })=> {
    return (
      <Route
        {...rest}
        render={(props) =>
            isAutheticated() &&  checkout() && checkout().length>0 ? (
            <Component {...props}/>
          ) : (
            <Redirect
              to={{
                pathname: "/checkout",
                state: { from: props.location }
                }}
            />
          )
        }
      />
    );
  }
  
export default ShippingRoute;