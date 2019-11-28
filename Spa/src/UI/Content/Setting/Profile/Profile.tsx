import { initialUserState, UserType } from 'domain/user/UserType';
import { initialUserInputTouchedState, initialUserValidationState, UserInputTouchedType, UserValidationType } from 'domain/user/UserValidationType';
import * as React from 'react';
import { RequestMethodEnum, ResponseResultStatusEnum, UserResponseDataType } from 'requests/types';
import { useRequest } from 'Hooks/Request/useRequest';
import * as yup from 'yup';
import './Profile.scss';
import { useProfileValidation } from 'Hooks/Validation/Profile/useProfileValidation';
import FetchStatus from 'Components/ApiFetch/FetchStatus';
var debug = require('debug')('ui:Profile')


const Profile: React.FunctionComponent<{}> = (props: {}) => {
  /** update user profile **/

  /** state **/
  const [currentUser, setUser] = React.useState<UserType>(initialUserState)
  const { currentValidationError, touch, validate } = useProfileValidation({ domain: currentUser })

  const path: string = '/users/' + currentUser.id
  const method: RequestMethodEnum = RequestMethodEnum.PUT

  const { currentRequestStatus: currentUpdateRequestStatus, setRequestStatus: setUpdateRequestStatus, sendRequest: sendUpdateRequest } = useRequest({})
  const { currentRequestStatus: currentBlogFetchStatus, setRequestStatus: setBlogFetchStatus, sendRequest: fetchBlog } = useRequest({})

  /** lifecycle **/

  const mapStateToFormData = (state: UserType): FormData => {
    const formData = new FormData()
    if (state.id) formData.append('id', state.id)
    formData.set('name', state.name)
    formData.set('email', state.email)
    formData.set('password', state.password)
    formData.set('confirm', state.confirm)
    formData.set('avatarImage', state.avatarImage)
    return formData
  }

  React.useEffect(() => {
    debug('initial fetch at useEffect')
    fetchBlog({
      path: path,
      method: RequestMethodEnum.GET,
    })
      // call from previous 'catch' and 'then' of 'fetchBlog'
      // since resolve promise in the 'catch'
      .then((data: UserResponseDataType) => {
        debug('then func of fetchBlog func')
        if (data) setUser(data.user)
      })
  }, []);


  const handleImageUploadChange: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {
    const imgFile: File = e.currentTarget.files[0]
    const imgSrc: string = window.URL.createObjectURL(imgFile);
    setUser({
      ...currentUser,
      avatarImage: imgFile,
      avatarUrl: imgSrc,
    })
  }

  const handleRevokeObjectURLOnLoad: React.EventHandler<React.SyntheticEvent<HTMLImageElement>> = (e) => {
    window.URL.revokeObjectURL(currentUser.avatarUrl);
  }

  const handleNameChangeEvent: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {
    debug('handling name change event')
    debug(e.currentTarget.value)
    setUser({
      ...currentUser,
      name: e.currentTarget.value
    })
  }

  const handleEmailChangeEvent: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {
    setUser({
      ...currentUser,
      email: e.currentTarget.value
    })
  }

  const handlePasswordChangeEvent: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {
    setUser({
      ...currentUser,
      password: e.currentTarget.value
    })
  }

  const handleConfirmChangeEvent: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {
    setUser({
      ...currentUser,
      confirm: e.currentTarget.value
    })
  }

  const handleSaveUserClickEvent: React.EventHandler<React.MouseEvent<HTMLInputElement>> = async (e) => {
    debug('clicked update butuon')
    // final check validation ...
    validate()
      .then(() => {
        debug('validation passed at save button event handler')
        sendUpdateRequest({
          path: path,
          method: method,
          headers: { 'content-type': 'multipart/form-data' },
          data: mapStateToFormData(currentUser)
        })
      }, () => {
        debug('validation failed at save button event handler')
      })
  }

  const handleInitialFocusEvent: React.EventHandler<React.FocusEvent<HTMLInputElement>> = (e) => {
    touch(e.currentTarget.name)
  }

  //if (currentBlogFetchStatus.status === ResponseResultStatusEnum.FETCHING) return (<p>fetching your data</p>)

  //if (currentBlogFetchStatus.status === ResponseResultStatusEnum.FAILURE) return (<p>sorry.. your data is not available now</p>)

  /**
   * IMPORTANT NOTE: input name and user state key must be matched otherwise, validation won't work
   *  - esp cause error of 'useEffect' 2nd argument inconsistency array element 
   **/
  return (//currentBlogFetchStatus.status === ResponseResultStatusEnum.SUCCESS &&
    <div className="context-wrapper">
      <div className="main-wrapper">
        <h2 className="profile-title">Profile Management</h2>
        <FetchStatus
          currentFetchStatus={currentUpdateRequestStatus}
          setFetchStatus={setUpdateRequestStatus}
          fetchingMsg={'updating user profile ...'}
          successMsg={'updating user profile success'}
          failureMsg={'updating user profile failed'}
        />
        <div className="grid-content-wrapper">
          <div className="grid-picture-wrapper">
            <img src={currentUser.avatarUrl} className="profile-picture-img" onLoad={handleRevokeObjectURLOnLoad} width={150} height={150} />
            <div className="grid-picture-input-wrapper">
              <label htmlFor="grid-picture-input" className="btn grid-picture-label">
                Select New Image
              </label>
              <input type="file" id="profile-picture-input" name="avatarImage" accept="image/*" onChange={handleImageUploadChange} className="grid-picture-input" />
            </div>
          </div>
          <div className="grid-input-wrapper">
            <label htmlFor="name" className="grid-input-label">
              New User Name
          </label>
            <input type="text" id="name" name="name" placeholder="enter new user name..." className="black-input grid-input" value={currentUser.name} onChange={handleNameChangeEvent} onFocus={handleInitialFocusEvent} />

            {(currentValidationError.name && <div className="input-error">{currentValidationError.name}</div>)}
          </div>
          <div className="grid-input-wrapper">
            <label htmlFor="email" className="grid-input-label">
              New Email
            </label>
            <input type="text" id="email" name="email" placeholder="enter new email..." className="black-input grid-input" value={currentUser.email} onChange={handleEmailChangeEvent} onFocus={handleInitialFocusEvent} />
            {(currentValidationError.email && <div className="input-error">{currentValidationError.email}</div>)}
          </div>
          <div className="grid-input-wrapper">
            <label htmlFor="password" className="grid-input-label">
              New Password
          </label>
            <input type="password" id="password" name="password" placeholder="enter new password..." className="black-input grid-input" value={currentUser.password} onChange={handlePasswordChangeEvent} onFocus={handleInitialFocusEvent} />
            {(currentValidationError.password && <div className="input-error">{currentValidationError.password}</div>)}
          </div>
          <div className="grid-input-wrapper">
            <label htmlFor="confirm" className="grid-input-label">
              Password Confirm
          </label>
            <input type="password" id="confirm" name="confirm" placeholder="enter new password again..." className="black-input grid-input" value={currentUser.confirm} onChange={handleConfirmChangeEvent} onFocus={handleInitialFocusEvent} />
            {(currentValidationError.confirm && <div className="input-error">{currentValidationError.confirm}</div>)}
          </div>
          <div className="grid-input-wrapper">
            <button type="button" className="btn" onClick={handleSaveUserClickEvent}>Update</button>
          </div>
        </div>
      </div>
      <div className="aside-wrapper">
      </div>
    </div>
  );
}

export default Profile;


