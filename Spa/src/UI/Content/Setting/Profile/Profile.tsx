import * as React from 'react';
import './Profile.scss';


const Profile: React.FunctionComponent<{}> = (props: {}) => {

  const [currentProfilePicture, setProfilePicture] = React.useState(null);

  const handleImageUploadChange: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {
    const imgSrc = window.URL.createObjectURL(e.currentTarget.files[0]);
    setProfilePicture(imgSrc);
  }

  const handleRevokeObjectURLOnLoad: React.EventHandler<React.SyntheticEvent<HTMLImageElement>> = (e) => {
    window.URL.revokeObjectURL(currentProfilePicture);
  }

  return (
    <div className="profile-wrapper">
      <h2 className="profile-title">Profile Management</h2>
      <div className="profile-picture-wrapper">
        <img src={currentProfilePicture} className="profile-picture-img" onLoad={handleRevokeObjectURLOnLoad}/>
        <div className="profile-picture-input-wrapper">
          <label htmlFor="profile-picture-input" className="profile-picture-input-label">Upload New Image</label>
          <input type="file" id="profile-picture-input" accept="image/*" onChange={handleImageUploadChange} className="profile-picture-input" />
        </div>
      </div>
      <div className="profile-user-name-wrapper">
        <h3 className="profile-user-name-title">Update User Name</h3>
        <p className="profile-user-name-description">
          Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
        </p>
        <input type="text" placeholder="enter new user name..." className="input-text profile-user-name-input" />
      </div>
      <div className="profile-email-wrapper">
        <h3 className="profile-email-title">Update Email</h3>
        <p className="profile-email-description">
          Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
        </p>
        <input type="text" placeholder="enter new email..." className="input-text profile-email-input" />
      </div>
      <div className="profile-password-wrapper">
        <h3 className="profile-password-title">Update Password</h3>
        <p className="profile-password-description">
          Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
        </p>
        <input type="password" placeholder="enter new password..." className="input-text profile-password-input" />
        <input type="password" placeholder="enter new password again..." className="input-text profile-password-confirm-input" />
      </div>
      <div className="profile-btn-wrapper">
        <button type="button" className="regular-btn profile-btn-reset">Reset</button>
        <button type="button" className="regular-btn profile-btn-update">Update</button>
      </div>
    </div>
  );
}

export default Profile;


