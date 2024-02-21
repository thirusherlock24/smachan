import React from "react";
import Signup from './components/SigninSignup/Signup';
import { Link, Route, Routes} from 'react-router-dom';
import Signin from './components/SigninSignup/Signin';
import Message from './components/Plan/Message';

function Navigate()
{return(
    <div>
   
    <Routes>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/" element={<Signin />} />
        <Route path="/message/:postId/:planName/:status" element={<Message/>} />

      </Routes>
    </div>
);

}
export default Navigate;