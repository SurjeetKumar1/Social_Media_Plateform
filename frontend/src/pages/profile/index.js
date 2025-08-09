import React, { useEffect, useState } from "react";
import UserLayout from "@/layout/userLayout";
import DashBoardLayout from "@/layout/dashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAboutUser } from "@/config/redux/action/authAction";
import styles from "./index.module.css";
import clientServer, { BASE_URL } from "@/config";
import { getAllPosts } from "@/config/redux/action/postAction";
// import { headers } from 'next/headers';

function Profilepage() {
    const dispatch = useDispatch();
    const [userProfile, setUserProfile] = useState({});
    const [userPosts, setUserPost] = useState([]);
    const [isModalOpen,setIsModalOpen]=useState(false)
    const [comapanyName,setCompanyName]=useState("");
    const [inputData,setInputData]=useState({company:"",position:"",years:""});
    
    const handleWorkInputChange=(e)=>{
      const {name,value}=e.target;
      setInputData({...inputData,[name]:value})
    }

    const authState = useSelector((state) => state.auth);
    const postReducer = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(getAboutUser({ token: localStorage.getItem("token") }));
        dispatch(getAllPosts());
    }, []);
    console.log("users data", authState.user);

    useEffect(() => {
        if (authState.user) {
            setUserProfile(authState.user);
            let post = postReducer.posts.filter((post) => {
                return post.userId.username === authState.user.userId.username;
            });
            setUserPost(post);
        }
    }, [authState.user, postReducer.posts]);

    const updateProfilePicture = async (file) => {
        const formData = new FormData(); //isliye taki hum bata sake hi data is a multipart data,
        formData.append("profilePicture", file);
        formData.append("token", localStorage.getItem("token"));

        try {
            const response = await clientServer.post(
                "/update_profile_picture",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
        } catch (err) {
            console.log(err.message);
        }

        dispatch(getAboutUser({ token: localStorage.getItem("token") }));
    };

  const updateProfileData=async()=>{
    console.log("user profile",userProfile)
    const request=await clientServer.post("/user_update",{
        token:localStorage.getItem("token"),
        name:userProfile.userId.name
    })
    console.log("userprofile",userProfile)

    const response=await clientServer.post("/update_profile_data",{
        token:localStorage.getItem("token"),
        bio:userProfile.bio,
        currPost:userProfile.currPost,
        pastWork:userProfile.pastWork,
        education:userProfile.education

    })

    dispatch(getAboutUser({token:localStorage.getItem("token")}));
  }

 

    return (
        <UserLayout>
            <DashBoardLayout>
                {authState.user && userProfile.userId && (
                    <div className={styles.container}>
                        <div className={styles.backDropConatiner}>
                            <label
                                htmlFor="profilePictureUpload"
                                className={styles.barckDrop_overlay}
                            >
                                <p>Edit</p>
                            </label>
                            <input
                                onChange={(e) => updateProfilePicture(e.target.files[0])}
                                hidden
                                type="file"
                                id="profilePictureUpload"
                            />
                            <img src={`${BASE_URL}/${userProfile.userId.profilePicture}`} />
                        </div>
                        <div className={styles.profileContainer_details}>
                            <div className={styles.userProileData}
                               
                            >
                                <div className={{ flex: "0.8" }}>
                                    <div style={{ display: "flex", width: "fit-content", alignItems: "center", gap: "1.2rem" }}>
                                        <input
                                            className={styles.nameEdit}
                                            type="text"
                                            value={userProfile.userId.name}
                                            onChange={(e) =>
                                                setUserProfile({
                                                    ...userProfile,
                                                    userId: {
                                                        ...userProfile.userId,
                                                        name: e.target.value,
                                                    },
                                                })
                                            }
                                        />
                                        <p style={{ color: "grey" }}>{userProfile.userId.username}</p>
                                    </div>

                                    <div>
                                        <textarea 
                                        value={userProfile.bio}
                                        onChange={(e)=>{
                                            setUserProfile({...userProfile,bio:e.target.value});
                                        }}
                                        rows={Math.max(3,Math.ceil(userProfile.bio.length/80))}  //adjust as needed
                                        style={{width:"100%"}}
                                        />
                                    </div>
                                </div>

                                <div className={{ flex: "0.2" }}>
                                    <h3>Recent Activity</h3>
                                    {userPosts.map((post) => {
                                        return (
                                            <div key={post._id} className={styles.postCard}>
                                                <div className={styles.card}>
                                                    <div className={styles.card_profileContainer}>
                                                        {post.media !== "" ? (
                                                            <img src={`${BASE_URL}/${post.media}`} />
                                                        ) : (
                                                            <div
                                                                style={{ width: "3.4rem", height: "3.4rem" }}
                                                            ></div>
                                                        )}
                                                    </div>
                                                    <p>{post.body}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="workHistory">
                            <h4>Work History</h4>
                            <div className={styles.workHistoryConatiner}>
                                {userProfile.pastWork.map((work, index) => {
                                    return (
                                        <div key={index} className={styles.workHistoryCard}>
                                            <p
                                                style={{
                                                    fontWeight: "bold",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "0.8rem",
                                                }}
                                            >
                                                {work.company} - {work.position}
                                            </p>
                                            <p>{work.years}</p>
                                        </div>
                                    );
                                })}
                                <button 
                                onClick={()=>{
                                    setIsModalOpen(true)
                                }}
                                className={styles.addWorkButton}>Add Work</button>
                            </div>
                        </div>
                        {userProfile!=authState.user && 
                        <div
                        onClick={()=>{
                            updateProfileData();
                        }}
                        className={styles.updateProfileButton}>
                            Update Profile
                        </div>
                        }
                    </div>
                )}


{
            isModalOpen &&
            <div
              onClick={() => {
                setIsModalOpen(false)
              }}
              className={styles.commentsContainer}>
             <div
                onClick={(e) => e.stopPropagation()}
                className={styles.getAllCommentsContainer}>
        <input required onChange={handleWorkInputChange} name="company" className={styles.inputField} type='text' placeholder='Enter Comapany'/>
        <input required onChange={handleWorkInputChange} name="position" className={styles.inputField} type='text' placeholder='Enter Position'/>
        <input required onChange={handleWorkInputChange} name="years" className={styles.inputField} type='Number' placeholder='Enter Years'/>
        <div
        onClick={()=>{
            setUserProfile({...userProfile,pastWork:[...userProfile.pastWork,inputData]})
            setIsModalOpen(false);
        }}
        className={styles.updateProfileButton}>Add Work</div>
                </div>
            </div>
          }
            </DashBoardLayout>
        </UserLayout>
    );
}

export default Profilepage;
