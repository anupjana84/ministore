import React from 'react';

import { Route ,Redirect} from 'react-router-dom';
import {checkout} from './index';

const CheckOutRoute=({ component:Component, ...rest })=> {
    return (
      <Route
        {...rest}
        render={(props) =>
            checkout() && checkout().length>0 ? (
            <Component {...props}/>
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
                }}
            />
          )
        }
      />
    );
  }
  
export default CheckOutRoute;