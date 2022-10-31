import react from 'react'
const Alert=(props)=>{
    return(
    <div className={`alert alert-${props.alert.type}`} role="alert" style={{height:'50px'}}>
  <strong>{props.alert.type}</strong>{props.alert.message}
</div>
    )
};
export default Alert;