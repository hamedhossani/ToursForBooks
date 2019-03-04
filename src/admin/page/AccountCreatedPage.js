import React from 'react';
import {Link} from 'react-router-dom';

const AccountCreatedPage = () => 
( <div className="container">
         <h1 className="content">Account created. 
          <br/>
          <Link to="/admin/login">Proceed to Dashboard</Link></h1>
    </div>
 )

export default AccountCreatedPage;