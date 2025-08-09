// import clientServer, { BASE_URL } from "@/config";
// import DashBoardLayout from "@/layout/dashboardLayout";
// import { useSearchParams } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import UserLayout from "@/layout/userLayout";
// import styles from "./index.module.css";
// import { useRouter } from "next/router";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllPosts } from "@/config/redux/action/postAction";
// import {
//   acceptConnection,
//   getConnectionRequest,
//   getMyconnectionRequest,
//   sendConnectionRequest,
// } from "@/config/redux/action/authAction";
// import { connection } from "next/server";

// function ViewProfilePage({ userProfile }) {
//   const router = useRouter();
//   const postReducer = useSelector((state) => state.posts);
//   const dispatch = useDispatch();
//   const authState = useSelector((state) => state.auth);
//   const [userPosts, setUserPost] = useState([]);
//   const [isConnetUserInConnection, setIsCurrentUserInConnection] =
//     useState(false);
//   const [isConnectionNull, setIsConnectionNull] = useState(true);

//   const getUserPost = async () => {
//     await dispatch(getAllPosts());
//     dispatch(getConnectionRequest({ token: localStorage.getItem("token") }));
//     dispatch(getMyconnectionRequest({ token: localStorage.getItem("token") }));
//   };

//   useEffect(() => {
//     let post = postReducer.posts.filter((post) => {
//       return post.userId.username === router.query.username;
//     });
//     setUserPost(post);
//   }, [postReducer.posts]);

//   //hamare pass jitne bhi connections hai uske under jitne bhi users hai usmain se koi bhi user.yadi usne kahi bhi neha ko request bheja hai toh meation kar do ye hamare conne ction main hai

//   useEffect(() => {
//     const isConnected = authState.connections.some((user) => {
//       return user.connectionId === userProfile.userId._id;
//     });
//     if (isConnected) {
//       setIsCurrentUserInConnection(true);

//       const checkStatus = authState.connections.find(
//         (user) => user.connectionId === userProfile.userId._id
//       );

//       if (checkStatus?.status_Accepted === true) {
//         setIsConnectionNull(false);
//       }
//     }

//     const connectionRequest = authState.connectionRequests.some((user) => {
//       return user.userId === userProfile.userId._id;
//     });
//     if (connectionRequest) {
//       setIsCurrentUserInConnection(true);

//       const checkStatus = authState.connections.find(
//         (user) => user.userId === userProfile.userId._id
//       );

//       if (checkStatus?.status_Accepted === true) {
//         setIsConnectionNull(false);
//       }
//     }

//     // const connectionRequest = authState.connectionRequests.some((user) => {
//     //   return user.connectionId === userProfile.userId._id;
//     // });
//     // if (connectionRequest) {
//     //   setIsConnectionNull(false);
//     // }
//   }, [authState.connections,authState.connectionRequests]);

//   useEffect(() => {
//     getUserPost();
//   }, []);

//   return (
//     <UserLayout>
//       <DashBoardLayout>
//         <div className={styles.container}>
//           <div className={styles.backDropConatiner}>
//             <img
//               className={styles.backDrop}
//               src={`${BASE_URL}/${userProfile.userId.profilePicture}`}
//             />
//           </div>
//           <div className={styles.profileContainer_details}>
//             <div
//               className={styles.profileContainer_flex}
//             >
//               <div className={{ flex: "0.8" }}>
//                 <div
//                   style={{
//                     display: "flex",
//                     width: "fit-content",
//                     alignItems: "center",
//                     gap: "1.2rem",
//                   }}
//                 >
//                   <h2>{userProfile.userId.name}</h2>
//                   <p style={{ color: "gray" }}>
//                     @{userProfile.userId.username}
//                   </p>

//                 </div>

//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "1.2rem",
//                   }}
//                 >
//                   {isConnetUserInConnection ? (
//                     <button className={styles.connectedBtn}>
//                       {isConnectionNull ? "Pending" : "Connected"}
//                     </button>
//                   ) : (
//                     <button
//                       onClick={(e) => {
//                         dispatch(
//                           sendConnectionRequest({
//                             token: localStorage.getItem("token"),
//                             user_id: userProfile.userId,
//                           })
//                         );
//                       }}
//                       className={styles.connectBtn}
//                     >
//                       {" "}
//                       Connect
//                     </button>
//                   )}
//                   <div
//                     onClick={async () => {
//                       const response = await clientServer.get(
//                         `/user/download_resume?id=${userProfile.userId._id}`
//                       );
//                       window.open(
//                         `${BASE_URL}/${response.data.Message}`,
//                         "_blank"
//                       );
//                     }}
//                     style={{ cursor: "pointer" }}
//                   >
//                     <svg
//                       style={{ width: "1.2em" }}
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth={1.5}
//                       stroke="currentColor"
//                       className="size-6"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//                 <div>
//                   <p style={{marginTop:"1.2rem"}}>{userProfile.bio}</p>
//                 </div>
//               </div>

//               <div className={{ flex: "0.2" }}>
//                 <h3>Recent Activity</h3>
//                 {userPosts.map((post) => {
//                   return (
//                     <div key={post._id} className={styles.postCard}>
//                       <div className={styles.card}>
//                         <div className={styles.card_profileContainer}>
//                           {post.media !== "" ? (
//                             <img src={`${BASE_URL}/${post.media}`} />
//                           ) : (
//                             <div
//                               style={{ width: "3.4rem", height: "3.4rem" }}
//                             ></div>
//                           )}
//                         </div>
//                         <p>{post.body}</p>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           <div className="workHistory">
//             <h4>Work History</h4>
//             <div className={styles.workHistoryConatiner}>
//               {userProfile.pastWork.map((work, index) => {
//                 return (
//                   <div key={index} className={styles.workHistoryCard}>
//                     <p
//                       style={{
//                         fontWeight: "bold",
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "0.8rem",
//                       }}
//                     >
//                       {work.company} - {work.position}
//                     </p>
//                     <p>{work.years}</p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </DashBoardLayout>
//     </UserLayout>
//   );
// }

// export default ViewProfilePage;

// export async function getServerSideProps(context) {
//   console.log("render in fet");
//   console.log(context.query.username);

//   const request = await clientServer.get("/user/get_user_based_on_username", {
//     params: {
//       username: context.query.username,
//     },
//   });
//   const response = await request.data;
//   console.log(response);
//   return { props: { userProfile: request.data.Profile } };
// }







import clientServer, { BASE_URL } from "@/config";
import DashBoardLayout from "@/layout/dashboardLayout";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "@/config/redux/action/postAction";
import {
  getConnectionRequest,
  getMyconnectionRequest,
  sendConnectionRequest
} from "@/config/redux/action/authAction";
import UserLayout from "@/layout/userLayout";
import React, { useEffect, useState } from "react";
import styles from "./index.module.css";

function ViewProfilePage({ userProfile }) {
  const router = useRouter();
  const postReducer = useSelector((state) => state.posts);
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [userPosts, setUserPost] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getConnectionRequest({ token: localStorage.getItem("token") }));
    dispatch(getMyconnectionRequest({ token: localStorage.getItem("token") }));
  }, []);

  useEffect(() => {
    const posts = postReducer.posts.filter(
      (post) => post.userId.username === router.query.username
    );
    setUserPost(posts);
  }, [postReducer.posts]);

  useEffect(() => {
    const isInConnections = authState.connections.some(
      (user) => user.connectionId === userProfile.userId._id
    );
    if (isInConnections) {
      setIsConnected(true);
      const status = authState.connections.find(
        (u) => u.connectionId === userProfile.userId._id
      );
      if (status?.status_Accepted) setIsPending(false);
    }
  }, [authState.connections, authState.connectionRequests]);

  return (
    <UserLayout>
      <DashBoardLayout>
        <div className={styles.profileWrapper}>
          {/* Banner + Avatar */}
          <div className={styles.banner}>
            <img
              className={styles.avatar}
              src={`${BASE_URL}/${userProfile.userId.profilePicture}`}
              alt="Profile"
            />
          </div>

          {/* Profile Info */}
          <div className={styles.profileInfo}>
            <div className={styles.nameSection}>
              <h2>{userProfile.userId.name}</h2>
              <span>@{userProfile.userId.username}</span>
            </div>

            <div className={styles.actions}>
              {isConnected ? (
                <button className={styles.connectedBtn}>
                  {isPending ? "Pending" : "Connected"}
                </button>
              ) : (
                <button
                  className={styles.connectBtn}
                  onClick={() =>
                    dispatch(
                      sendConnectionRequest({
                        token: localStorage.getItem("token"),
                        user_id: userProfile.userId,
                      })
                    )
                  }
                >
                  Connect
                </button>
              )}

              <button
                className={styles.downloadBtn}
                onClick={async () => {
                  const res = await clientServer.get(
                    `/user/download_resume?id=${userProfile.userId._id}`
                  );
                  window.open(`${BASE_URL}/${res.data.Message}`, "_blank");
                }}
              >
                Download Resume
              </button>
            </div>

            <p className={styles.bio}>{userProfile.bio}</p>
          </div>

          {/* Recent Activity */}
          <div className={styles.activitySection}>
            <h3>Recent Activity</h3>
            <div className={styles.postList}>
              {userPosts.map((post) => (
                <div key={post._id} className={styles.postCard}>
                  {post.media && (
                    <img
                      className={styles.postImage}
                      src={`${BASE_URL}/${post.media}`}
                      alt="Post"
                    />
                  )}
                  <p>{post.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Work History */}
          <div className={styles.workHistory}>
            <h4>Work History</h4>
            <div className={styles.workList}>
              {userProfile.pastWork.map((work, i) => (
                <div key={i} className={styles.workCard}>
                  <strong>
                    {work.company} - {work.position}
                  </strong>
                  <span>{work.years}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DashBoardLayout>
    </UserLayout>
  );
}

export default ViewProfilePage;

export async function getServerSideProps(context) {
  const request = await clientServer.get("/user/get_user_based_on_username", {
    params: { username: context.query.username },
  });
  return { props: { userProfile: request.data.Profile } };
}
