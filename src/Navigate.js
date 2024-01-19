import React from "react";
import Signup from './Signup';
import { Link, Route, Routes} from 'react-router-dom';
import Signin from './Signin';
function Navigate()
{return(
    <div>
   
    <Routes>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/" element={<Signin />} />
      </Routes>
    </div>
);

}
export default Navigate;