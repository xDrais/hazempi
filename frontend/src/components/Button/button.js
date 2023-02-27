import "./button.css"
function Button (props)
{
    return(
   
    
<div className="container1">

<a href="#" className="button">
  <div className="button__line"></div>
  <div className="button__line"></div>
  <span className="button__text">{props.name}</span>
  <div className="button__drow1"></div>
  <div className="button__drow2"></div>
</a>

</div>    
   
    
    
  )
}
export default Button;