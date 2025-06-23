// src/pages/user/Profile.tsx
import React from 'react';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '../../state/state';

const Profile: React.FC = () => {
  const user = useRecoilValue(userInfoAtom);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 text-white">
      <h1 className="text-3xl font-bold mb-6 font-heading">My Profile</h1>
      <div className="bg-white/10 p-6 rounded-xl space-y-4">
        <div className="flex items-center space-x-4">
          <img
            src={user.photo || '/user.png'}
            alt="avatar"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
