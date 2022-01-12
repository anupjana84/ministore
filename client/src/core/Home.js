import React, {useEffect,useState,Fragment} from 'react'
import { toast } from 'react-toastify';

import Base from './Base';
import Card from './Card';
import { API } from '../backend';
//import CategoryForHome from './otherView/CategoryForHome';

 const Home=()=> {
    const [selected, setSelected] =useState(false);
  const [article, setArticle] =useState("");


     const [products, setproduct]=useState([]);
    const [errorProduct, setErrorProduct]=useState("")
     const [error, setError]=useState(false)
     const[isLoading, setLoading]=useState(true)
     const [categories, setcategories] = useState([])

     const productByCategory=(id)=>{
        // console.log(e.target.name)
       
    
      // const idone="5f6e085b13eff20258852fc1"
        fetch(`${API}/productbycategory/${id}`,{
            method:"GET",
        })
        .then(response=>{
            return response.json();
        })
        .then(data=>{
            if(data.error){
                errrorMessage(data.error)
            }else{
               
                setproduct(data)
              setLoading(false)
            } 
           // console.log(data,"pro")
        })
        .catch(err=>{
            console.log(err)
        })
    
    }

    const errrorMessage=(error)=>{
        if(error){
        toast.warning(`${error}`,{
            position: toast.POSITION.TOP_CENTER
          }, { autoClose: 3000 })
        }
        
    }



    
   const getAllGetegory=(id)=>{

        fetch(`${API}/admin/all/category`,{
            method:"GET",
        })
        .then(response=>{
            return response.json();
        })
        .then(data=>{
            if(data.error){
                setErrorProduct(data.error)
                console.log(data.error)
            }else{
                setcategories(data)
            setLoading(false)
            } 
        })
        .catch(err=>{
            console.log(err)
        })

   }

  


     const preload=()=>{
         fetch(`${API}/all/product`,{
             method:"GET",
         })
         .then(response=>{
             return response.json();
         })
         .then(data=>{
             if(data.error){
                 setError(data.error)
             }else{
                setproduct(data)
               setLoading(false)
             } 
         })
         .catch(err=>{
             console.log(err)
         })
     }
   //  const emtycart =[]
    useEffect(() => {
       // localStorage.setItem("__cart",emtycart)
      preload()
      getAllGetegory()
    }, [])
    
 const onSelectArticle = (article,id) => {
    productByCategory(id)
            setSelected(true)
            setArticle(article)
       
       }

    return (
        // articles.map((article, index)=> <ArticlePreview 
        // key={index} class={(this.state.selected && (this.state.article === article)) ? 'bkcolor': 'default'}
        //  onClick={() => this.onSelectArticle(article)} article={article}/>)
            <Base title="Home Page">
           
            {isLoading ? (<div className="d-flex justify-content-center my-5">
                            <div className="spinner-border text-light" role="status">
                                <span className="sr-only text-white">Loading...</span>
                                
                            </div>
                            <h3 className="text-white ml-3">Loading....</h3>
                            </div>
                        ):
                (

                    <div className="container-fluid">
                    <div className="row">
                    <div className="col-md-2">
                    <div style={{width:"100%", height:"100%",backgroundColor:"#ffffff"}}>
                    <p className="text-center list-group-item mb-0 font-weight-bold"
                     style={{backgroundColor:"#f5f5f5", fontSize:"20px"}} >Category</p>
                    <div className="list-group">
                       
                        {categories && categories.map((category,i)=>{
                            return(
                                <ArticlePreview key={i} class={article && (article === category.title) ? 'bkcolor': 'default'}
                                    onClick={() =>onSelectArticle(category.title,category._id )} article={category.title} />
                        
                            )
                        })}
                       
                      
                        </div>

                    </div>
                    </div>
                    <div className="col-md-10">


                    <div className="row">
                
                          { products.map((product,i)=>{
                                return(
                                    <Fragment  key={i}>
                                    <Card   product={product} />
                                    </Fragment>
                                )
                            })
                        }
                 )
            }
                        
                        </div>
                    </div>

                    
                   

                       
        </div>
    </div>
                   )}
                   
 
 
    </Base>
       
    )
}
export default Home;
const ArticlePreview = (props) => {
    return(
        
      <div style={{textAlign:"center", marginTop:"1px"}} className={props.class} onClick={props.onClick}>{props.article}
     
      </div>
    )
  }