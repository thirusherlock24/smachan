import React from "react";
import Signup from './Signup';
import { Link, Route, Routes} from 'react-router-dom';
import Signin from './Signin';
import Message from './Message';

function Navigate()
{return(
    <div>
   
    <Routes>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/" element={<Signin />} />
        <Route path="/message/:postId/:planName" element={<Message/>} />

      </Routes>
    </div>
);

}
export default Navigate;