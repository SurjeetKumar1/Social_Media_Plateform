// import React from 'react'
// import styles from "./styles.module.css";
// import { useRouter } from 'next/router';
// import { useDispatch, useSelector } from 'react-redux';
// import { reset } from '@/config/redux/reducer/authReducer';

// function Navbar() {
//     const dispatch=useDispatch();
//     const router=useRouter();
//     const authState=useSelector((state)=>state.auth);
//   return (
//     <div className={styles.container}>
//       <nav className={styles.navBar}>
//         <h1 style={{cursor:"pointer"}} onClick={()=>{router.push("/logn")}}>Pro Connect</h1>
//         <div className={styles.navBarOptionContainer}>
//         {authState.profileFetched &&
//            <div style={{display:"flex", gap:"1.2rem"}}>
//              {/* <p>Hey, {authState.user.userId.name}</p> */}
//              <p 
//              onClick={()=>{
//               router.push("/profile")
//              }}
//              style={{fontWeight:"bold", cursor:"pointer"}}>Profile</p>
//              <p 
//              onClick={()=>{localStorage.removeItem("token") 
//                 router.push("/login")
//                 dispatch(reset());
//              }}
//              style={{fontWeight:"bold", cursor:"pointer"}}>Logout</p>
           
//            </div>
//             }
//             {!authState.profileFetched &&
//                <div 
//                onClick={()=>{router.push("/login")}}
//                    className={styles.btnJoin}>
//                         <p>Be a part</p>
//                    </div>
//             }
//         </div>

//       </nav>
//     </div>
//   )
// }

// export default Navbar









import React from 'react';
import styles from "./styles.module.css";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '@/config/redux/reducer/authReducer';

function Navbar() {
    const dispatch = useDispatch();
    const router = useRouter();
    const authState = useSelector((state) => state.auth);

    return (
        <div className={styles.container}>
            <nav className={styles.navBar}>
                <h1 
                    className={styles.logo}
                    onClick={() => router.push("/")}
                >
                    Pro Connect
                </h1>

                <div className={styles.navBarOptionContainer}>
                    {authState.profileFetched ? (
                        <div className={styles.menu}>
                            <p 
                                className={styles.navLink}
                                onClick={() => router.push("/profile")}
                            >
                                Profile
                            </p>
                            <p 
                                className={styles.navLink}
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    router.push("/login");
                                    dispatch(reset());
                                }}
                            >
                                Logout
                            </p>
                        </div>
                    ) : (
                        <div 
                            onClick={() => router.push("/login")}
                            className={styles.btnJoin}
                        >
                            Be a part
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
