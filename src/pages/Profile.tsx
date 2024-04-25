// import React from "react"

export const ProfilePage = () => {
    return (
        <div>
            {/* <Title>Profile</Title> */}
            <div className="menu-lateral">
                <ul>
                    <li><i className="user"></i>My Data<i className="arrow"></i></li>{/* Scroll al titulo -> Contact information */}
                    <li><i className="directions"></i>My addresses<i className="arrow"></i></li>{/* Scroll al titulo -> Address list */}
                    <li><i className="bag"></i>My orders<i className="arrow"></i></li>{/* Scroll al titulo -> My Orders */}
                </ul>
            </div>
            <div className="data">
                <div>
                    {/* <Title>Contact information</Title> */}
                    <div>
                        {/* <p>{user.name}</p>
                        <p>{user.email}</p> */}
                        <a><i className="pencil"></i>Edit</a>
                        <a><i className="pencil"></i>Edit password</a>
                    </div>
                </div>
                <div>
                    {/* <Title>Address list</Title> */}
                    <div>
                        {/* <p>{user.phone}</p>
                        <p>{user.address}</p> */}
                        <p>Default shipping address</p>{/* Boolean (aparece debajo de donde es True) */} 
                        <a><i className="pencil"></i>Edit</a>
                        <a><i className="mas"></i>Add new address</a>
                    </div>  
                    <div className="SINO TIENE DIRECCIÓN">
                        {/* <p>{user.phone}</p> */}
                        <a><i className="mas"></i>Add new address</a>
                    </div>
                </div>
                <div>
                    {/* <Title>My Orders</Title>
                    <p>{order.number}</p>
                    <p>{order.date}</p>
                    <p>{order.price}</p> */}
                    <a href="/order">See yours orders <i className="eye"></i></a>
                </div>
            </div>
            <div className="actions">
                <button><i className="off"></i>Sign off</button>
                <button><i className="trash"></i>Delete account</button>
            </div>
        </div>
    )
}