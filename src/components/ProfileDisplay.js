import React from 'react';
import './ProfileDisplay.css'; // CSS файл для стилей

const ProfileDisplay = ({ profileData }) => {
  const { avatar, name, lastName, jobTitle, phone, email, address, pitch, interests, visibility, links } = profileData;

  return (
    <div className="profile-display">
      <div className="avatar-section">
        <img src={avatar || 'placeholder-avatar.png'} alt="Avatar" className="avatar" />
      </div>
      <div className="profile-info">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Last Name:</strong> {lastName}</p>
        <p><strong>Job Title:</strong> {jobTitle}</p>
        <p><strong>Phone:</strong> {phone}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Address:</strong> {address}</p>
        <p><strong>Pitch:</strong> {pitch}</p>
        <p><strong>Visibility:</strong> {visibility === 'public' ? 'Public' : 'Private'}</p>
        <p><strong>Interests:</strong> {interests?.length > 0 ? interests.join(', ') : 'No interests added'}</p>
        <p><strong>Links:</strong> {links?.length > 0 ? links.join(', ') : 'No links added'}</p>
      </div>
    </div>
  );
};

export default ProfileDisplay;
