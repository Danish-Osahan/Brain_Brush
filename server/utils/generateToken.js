import jwt from 'jsonwebtoken'

 const generateToken=(id)=>{
   jwt.sign({id},"danish3042002",{expiresIn:"2h"})
 }

 export default generateToken;
 