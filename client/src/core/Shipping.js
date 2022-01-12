import React,{useEffect, useState} from 'react'
import Base from './Base'
import { ToastContainer } from 'react-toastify';
import { API } from '../backend';
import { isAutheticated } from '../auth/helper';
import {useHistory} from 'react-router-dom'
import CartListHelper from './CartListHelper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import TotalAndCart from './TotalAndCart'

import Button from '@material-ui/core/Button';
import { errorMessage,successMessage } from '../utility';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const Shipping=({
    title="Login Page",
   
})=> {



	const {user}=isAutheticated();
	//const userId =user._id
	const history = useHistory()

	const [isData, setIsData] = useState(false)

    const [values, setValues] = useState({
        shrink:null,
        name: "",
        mobile:"",
        pincode:"",
        landmark:"",
        district:"",
        alternatemobile:"",
        city:"",
		state:"",
		userid:"",
        error: "",
        success: false,
        loading: false,
		didRedirect: false,
		
	  });
	  
	  const { name,mobile,pincode,landmark,city,state,district,alternatemobile,shrink} = values;

	  const getShippingAddress=()=>{
		  const data={
			  userid:user._id
		  }
		  fetch(`${API}/get/shipping/address`,{
			  method:"Post",
			  headers:{
				  Accept:"application/json",
				  "Content-Type":"application/json"
			  },
			  body:JSON.stringify(data)
		  })
		  .then(address=>{
			  return address.json()
		  })
		  .then(result=>{
			 // console.log(result)
			  if (result.error) {
				setValues({error:result.error})
				localStorage.removeItem('address')
			  }else{
				  setIsData({
					  isData:true
				  })
				 setValues({
					 name:result.name,
					 pincode:result.pincode,
					 mobile:result.mobile,
					 landmark:result.landmark,
					 city:result.city,
					 state:result.state,
					 district:result.district,
					 alternatemobile:result.alternatemobile,
				 })
			  }
			  //console.log(result)
		  })
		  .catch(err=>console.log(err))
	  }
useEffect(() => {
	
	getShippingAddress()

}, [])
     
      const handelChange=(e)=>{
        setValues({
            ...values,
			[e.target.name]:e.target.value,
			shrink:true
        })
          
      }

     

      const shippiAddressSave=(e)=>{
          e.preventDefault();
          setValues({
            ...values,
            error:false, success:false
          })
          const datafrom ={
            name:name,
            pincode:pincode,
            landmark:landmark,
            city:city,
            state:state,
            mobile:mobile,
            district:district,
			alternatemobile:alternatemobile,
			userid:user._id
          }
         // console.log(datafrom)
          fetch(`${API}/shipping/address/create`,{
              method:"POST",
              headers:{
                  Accept:"application/json",
                  "content-Type":"application/json"
              },
              body:JSON.stringify(datafrom)
          })
          .then(result=>{
              return result.json()
          })
          .then(data=>{
		//  console.log(data)sole.log(JSON.stringify(data.user))
              if(data.error){
                setValues({
                    ...values,
                    error:data.error,
					success:false,
                })
                errorMessage(data.error)
               // console.log(data.error)
              }else{
				localStorage.setItem("address", data.message.userid);
                  setValues({
					  ...values,
                      error:false,
                     // didRedirect:true,
					  success:true,
					  name:"",
					  mobile:"",
					  pincode:"",
					  landmark:"",
					  city:"",
					  state:"",
					  district:"",
					  alternatemobile:""
				  })
				  successMessage("Address Save Successfully")
				  gottopament()
              }
          })
          .catch(err=>{console.log(err)})
	  }
	  
    //   const performRedirect = () => {
    //     if (didRedirect) {
    //       if (user && user.role ===1) {
    //         return <Redirect to="/admin/dashboard"/>
    //       } else {
    //         if(JSON.parse(localStorage.getItem("__cart")).length>0){
    //           return <Redirect to="/cart"/>
    //         }else{
    //           return <Redirect to="/user/dashboard"/>
    //         }
    //       }
    //     }
    //     if (isAutheticated()) {
    //       return <Redirect to="/" />;
    //     }
    //   };
	
	  


      const gottopament=()=>{
		  setTimeout(() => {
			history.push("/payment")
		  }, 4000);
	  }
   const updateAddress=()=>{
	   const updateData={
		name:name,
		pincode:pincode,
		landmark:landmark,
		city:city,
		state:state,
		mobile:mobile,
		district:district,
		alternatemobile:alternatemobile,
		userid:user._id
	   }
	   fetch((`${API}/update/address`),{
		   method:"Post",
			   headers:{
				   Accept:"application/json",
				   "Content-Type":"application/json"
			   },
			   body:JSON.stringify(updateData)
	   })
	   .then(result=>{
		   return result.json()
	   })
	   .then(data=>{
		   if(data.error){
			    console.log(data.error)
		   }else{
			localStorage.setItem("address", data.message);
			  // console.log(data.message)
			  // console.log(data.success)
			   successMessage(data.success)
			   gottopament()
		   }
	   })
	   .catch(err=>console.log(err))
   }
	  
    const gotoPaymentNotEdite=()=>{
		localStorage.setItem("address", user._id)
		history.push("/payment")
	}
      


const cheoutRedirect=()=>{
    return (
      <div className="container">
        <ToastContainer limit={1}/>
      <div className="row">
		  <div className="col-md-9">
		  <div><CartListHelper/></div>
		  
		  </div>
		  <div className="col-md-3">
			  <TotalAndCart/>
		  </div>
	  </div>   
       {isData ? (<div className="row">
			<div className="col-md-9">
				<div style={{width:"100%,", backgroundColor:"white"}}>
					<h6 className="text-white p-3 d-flex justify-content-between"  data-toggle="collapse" aria-expanded="false" data-target="#demo" 
					style={{backgroundColor:"#2874f0"}}>
					<span>Delivery Address</span>
						<Button variant="contained" color="secondary" onClick={gotoPaymentNotEdite}>
						Not Edit Go to payment
						</Button>
					</h6>
					<form className={classes.root} noValidate autoComplete="off">
						<div className="row mx-0 w-100" style={{display:"flex", justifyContent:"space-between"}}>
							<div className="col-md-6">
								<TextField id="standard-basic"
									label="Name" 
									fullWidth
									variant="outlined"
									name="name"
									color="secondary"
									value={name}
									onChange={e=>handelChange(e)}
									textFieldProps={{
											label: "Label",
											nputLabelProps:shrink?{shrink:true}:{} //Modified line
									}}
								/>
							</div>
							<div className="col-md-6">
								<TextField
									label="Mobile Number"
									variant="outlined"
									color="secondary"
									fullWidth
                  					name="mobile"
                  					value={mobile}
									onChange={e=>handelChange(e)}
									textFieldProps={{
										label: "Label",
										nputLabelProps:shrink?{shrink:true}:{} //Modified line
									}}
										
								/>
							</div>
						</div>
						<div className="row mx-0 w-100" style={{display:"flex", justifyContent:"space-between"}}>
							<div className="col-md-6">
								<TextField id="standard-basic"
									label="Pin Code" 
									fullWidth
									name="pincode"
									color="secondary"
									variant="outlined"
									value={pincode}
									onChange={e=>handelChange(e)}
									textFieldProps={{
										label: "Label",
										nputLabelProps:shrink?{shrink:true}:{} //Modified line
									}}
								/>
							</div>
							<div className="col-md-6">
								<TextField
									id="standard-basic"
									label="State"
									variant="outlined"
									color="secondary"
									fullWidth
                 				    name="state"
                  					value={state}
									onChange={e=>handelChange(e)}
									textFieldProps={{
										label: "Label",
										nputLabelProps:shrink?{shrink:true}:{} //Modified line
									}}	
								/>
							</div>
						</div>
						<div className="row mx-0 w-100" style={{display:"flex", justifyContent:"space-between"}}>
							<div className="col-md-6">
								<TextField id="standard-basic"
									label="District" 
									fullWidth
									name="district"
									color="secondary"
									variant="outlined"
									value={district}
									onChange={e=>handelChange(e)}
									textFieldProps={{
										label: "Label",
										nputLabelProps:shrink?{shrink:true}:{} //Modified line
									}}
								/>
							</div>
							<div className="col-md-6">
								<TextField
									id="standard-basic"
									label="Alternate Mobile"
									variant="outlined"
									color="secondary"
									fullWidth
                  					name="alternatemobile"
                  					value={alternatemobile}
									onChange={e=>handelChange(e)}
									textFieldProps={{
										label: "Label",
										nputLabelProps:shrink?{shrink:true}:{} //Modified line
									}}	
								/>
							</div>
						</div>
						<div className="row mx-0  w-100" style={{display:"flex", justifyContent:"space-between"}}>
							<div className="col-md-6">
								<TextField id="standard-basic"
									label="City" 
									fullWidth
									name="city"
									variant="outlined"
									value={city}
									color="secondary"
									onChange={e=>handelChange(e)}
									textFieldProps={{
										label: "Label",
										nputLabelProps:shrink?{shrink:true}:{} //Modified line
									}}
								/>
							</div>
							<div className="col-md-6">
								<TextField
									id="standard-basic"
									label="landmark"
									variant="outlined"
									color="secondary"
									fullWidth
                  					name="landmark"
                  					value={landmark}
                  					onChange={e=>handelChange(e)}
									textFieldProps={{
										label: "Label",
										nputLabelProps:shrink?{shrink:true}:{} //Modified line
									}}		
								/>
							</div>
							<div className="col-md-12 my-3  d-flex justify-content-center">
							<Button variant="contained" onClick={updateAddress} color="secondary">
								 Edit Address 
							</Button>
							</div>
						</div>
					</form>
				</div>
			</div>
			
        </div>):(



        <div className="row">
			<div className="col-md-9">
				<div style={{width:"100%,", backgroundColor:"white"}}>
					<h6 className="text-white p-3 d-flex justify-content-between"  data-toggle="collapse" aria-expanded="false" data-target="#demo" 
					style={{backgroundColor:"#2874f0"}}>
					<span>Delivery Address</span>
						<Button variant="contained" color="secondary">
							No
						</Button>
					
					</h6>
				
					<form className={classes.root} noValidate autoComplete="off">
						<div className="row mx-0 w-100" style={{display:"flex", justifyContent:"space-between"}}>
							<div className="col-md-6">
								<TextField id="standard-basic"
									label="Name" 
									fullWidth
									variant="outlined"
									name="name"
									color="secondary"
									value={name}
									onChange={e=>handelChange(e)}
									textFieldProps={{
											label: "Label",
											nputLabelProps:shrink?{shrink:true}:{} //Modified line
									}}
								/>
							</div>
							<div className="col-md-6">
								<TextField
									
									label="Mobile Number"
									variant="outlined"
									color="secondary"
									fullWidth
                  					name="mobile"
                  					value={mobile}
									onChange={e=>handelChange(e)}
									textFieldProps={{
										label: "Label",
										nputLabelProps:shrink?{shrink:true}:{} //Modified line
									}}		
								/>
							</div>
						</div>
						<div className="row mx-0 w-100" style={{display:"flex", justifyContent:"space-between"}}>
							<div className="col-md-6">
								<TextField id="standard-basic"
									label="Pin Code" 
									fullWidth
									name="pincode"
									color="secondary"
									variant="outlined"
									value={pincode}
									onChange={e=>handelChange(e)}
									textFieldProps={{
										label: "Label",
										nputLabelProps:shrink?{shrink:true}:{} //Modified line
									}}
								/>
							</div>
							<div className="col-md-6">
								<TextField
									id="standard-basic"
									label="State"
									variant="outlined"
									color="secondary"
									fullWidth
                 				    name="state"
                  					value={state}
									onChange={e=>handelChange(e)}
									textFieldProps={{
										label: "Label",
										nputLabelProps:shrink?{shrink:true}:{} //Modified line
									}}	
								/>
							</div>
						</div>
						<div className="row mx-0 w-100" style={{display:"flex", justifyContent:"space-between"}}>
							<div className="col-md-6">
								<TextField id="standard-basic"
									label="District" 
									fullWidth
									name="district"
									color="secondary"
									variant="outlined"
									value={district}
									onChange={e=>handelChange(e)}
									textFieldProps={{
										label: "Label",
										nputLabelProps:shrink?{shrink:true}:{} //Modified line
									}}
								/>
							</div>
							<div className="col-md-6">
								<TextField
									id="standard-basic"
									label="Alternate Mobile"
									variant="outlined"
									color="secondary"
									fullWidth
                  					name="alternatemobile"
                  					value={alternatemobile}
									onChange={e=>handelChange(e)}
									textFieldProps={{
										label: "Label",
										nputLabelProps:shrink?{shrink:true}:{} //Modified line
									}}	
								/>
							</div>
						</div>
						<div className="row mx-0  w-100" style={{display:"flex", justifyContent:"space-between"}}>
							<div className="col-md-6">
								<TextField id="standard-basic"
									label="City" 
									fullWidth
									name="city"
									variant="outlined"
									value={city}
									color="secondary"
									onChange={e=>handelChange(e)}
									textFieldProps={{
										label: "Label",
										nputLabelProps:shrink?{shrink:true}:{} //Modified line
									}}
								/>
							</div>
							<div className="col-md-6">
								<TextField
									id="standard-basic"
									label="landmark"
									variant="outlined"
									color="secondary"
									fullWidth
                  					name="landmark"
                  					value={landmark}
                  					onChange={e=>handelChange(e)}
									textFieldProps={{
										label: "Label",
										nputLabelProps:shrink?{shrink:true}:{} //Modified line
									}}	
								/>
							</div>
							<div className="col-md-12 my-3  d-flex justify-content-center">
							<Button variant="contained" onClick={shippiAddressSave} color="secondary">
								Address Save
							</Button>
							</div>
						</div>
					</form>
				</div>
			</div>
			
        </div>

		)}



        <div className="row ">
        <div className="col-md-9 ">
        <div style={{width:"100%,", backgroundColor:"white"}}>
        
          </div>
        </div>
        </div>
          {/* {ErrorMessage()} */}
          
           {/* {performRedirect()} */}
           
        </div>
     
    )
  }
  const classes = useStyles();

    return (
        <Base title=" Shipping ">
        {cheoutRedirect()}
		
        </Base>
    )
}
export default Shipping;