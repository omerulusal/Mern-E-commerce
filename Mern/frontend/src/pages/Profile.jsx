/* eslint-disable no-unused-vars */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Profile = () => {
    const { user, isAuth } = useSelector(state => state.user)

    return (
        <div className='min-h-screen'>
            <div className="flex justify-center gap-5 my-5">
                <div className="w-40">
                    <img src={user?.user && user?.user?.avatar?.url || "https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"} alt="imgs" />
                </div>
                <div>
                    <div className="">{user?.user?.name}</div>
                    <div className="">{user?.user?.email}</div>
                </div>
            </div>
        </div>
    )
}

export default Profile