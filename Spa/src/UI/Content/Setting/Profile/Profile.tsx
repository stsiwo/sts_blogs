import FetchStatus from 'Components/ApiFetch/FetchStatus';
import ImageInput from 'Components/Input/ImageInput';
import Input from 'Components/Input/Input';
import ManageYourBlogs from 'Components/ManageYourBlogs/ManageYourBlogs';
import { useAuthContext } from 'Contexts/AuthContext/AuthContext';
import { UserType } from 'domain/user/UserType';
import { useRequest } from 'Hooks/Request/useRequest';
import { useProfileValidation } from 'Hooks/Validation/Profile/useProfileValidation';
import * as React from 'react';
import { RequestMethodEnum, ResponseResultStatusEnum, ResponseResultType, UserResponseDataType } from 'requests/types';
import './Profile.scss';
var debug = require('debug')('ui:Profile')


const Profile: React.FunctionComponent<{}> = (props: {}) => {
  /** update user profile **/

  /** state **/
  const { auth } = useAuthContext() 
  debug(auth)
  const [currentUser, setUser] = React.useState<UserType>(auth.user)
  debug('before useValidation')
  debug(currentUser)
  const { currentValidationError, touch, validate } = useProfileValidation({ domain: currentUser })

  const path: string = '/users/' + currentUser.id
  const method: RequestMethodEnum = RequestMethodEnum.PUT

  const { currentRequestStatus: currentUpdateRequestStatus, setRequestStatus: setUpdateRequestStatus, sendRequest: sendUpdateRequest } = useRequest({})
  const { currentRequestStatus: currentUserFetchStatus, setRequestStatus: setUserFetchStatus, sendRequest: fetchUser } = useRequest({})

  /** lifecycle **/

  const mapStateToFormData = (state: UserType): FormData => {
    const formData = new FormData()
    formData.set('name', state.name)
    formData.set('email', state.email)
    formData.set('password', state.password)
    if (state.avatarImage) formData.set('avatarImage', state.avatarImage)
    return formData
  }

  React.useEffect(() => {
    debug('initial fetch for user data')
    fetchUser({
      path: path,
      method: RequestMethodEnum.GET,
    })
      // call from previous 'catch' and 'then' of 'fetchUser'
      // since resolve promise in the 'catch'
      .then((result: ResponseResultType<UserResponseDataType>) => {
        debug('then func of fetchUser func')
        if (result.status === ResponseResultStatusEnum.SUCCESS) setUser(result.data.user)
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

  const handleImageRemoveClick: React.EventHandler<React.MouseEvent<HTMLButtonElement>> = (e) => {
    setUser({
      ...currentUser,
      avatarImage: null,
      avatarUrl: null,
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

  if (currentUserFetchStatus.status === ResponseResultStatusEnum.FETCHING) return (<p>fetching your data</p>)

  if (currentUserFetchStatus.status === ResponseResultStatusEnum.FAILURE) return (<p>sorry.. your data is not available now</p>)

  /**
   * IMPORTANT NOTE: input name and user state key must be matched otherwise, validation won't work
   *  - esp cause error of 'useEffect' 2nd argument inconsistency array element 
   **/
  return (currentUserFetchStatus.status === ResponseResultStatusEnum.SUCCESS &&
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
          <ImageInput
            handleImageUploadChange={handleImageUploadChange}
            handleImageRemoveClick={handleImageRemoveClick}
            handleRevokeObjectURLOnLoad={handleRevokeObjectURLOnLoad}
            id={"profile-picture-input"}
            imgStyle={"profile-picture-img"}
            inputStyle={"grid-picture-input"}
            inputValue={null}
            label={"Select New Image"}
            labelStyle={"btn grid-picture-label"}
            labelWrapperStyle={"grid-picture-input-wrapper"}
            name={"avatarImage"}
            onInputFocus={handleInitialFocusEvent}
            placeholder={"enter blog image..."}
            src={currentUser.avatarUrl}
            wrapperStyle={"grid-picture-wrapper"}
          />
          <Input
            id={"name"}
            inputStyle={"black-input grid-input"}
            inputValue={currentUser.name}
            label={"New User Name"}
            labelStyle={"grid-input-label"}
            name={"name"}
            onInputChange={handleNameChangeEvent}
            onInputFocus={handleInitialFocusEvent}
            placeholder={"enter new user name..."}
            wrapperStyle={'grid-input-wrapper'}
            errorMsg={currentValidationError.name}
          />
          <Input
            id={"email"}
            inputStyle={"black-input grid-input"}
            inputValue={currentUser.email}
            label={"New Email"}
            labelStyle={"grid-input-label"}
            name={"email"}
            onInputChange={handleEmailChangeEvent}
            onInputFocus={handleInitialFocusEvent}
            placeholder={"enter new email..."}
            wrapperStyle={'grid-input-wrapper'}
            errorMsg={currentValidationError.email}
          />
          <Input
            id={"password"}
            inputType={"password"}
            inputStyle={"black-input grid-input"}
            inputValue={currentUser.password}
            label={"New Password"}
            labelStyle={"grid-input-label"}
            name={"password"}
            onInputChange={handlePasswordChangeEvent}
            onInputFocus={handleInitialFocusEvent}
            placeholder={"enter new password..."}
            wrapperStyle={'grid-input-wrapper'}
            errorMsg={currentValidationError.password}
          />
          <Input
            id={"confirm"}
            inputType={"password"}
            inputStyle={"black-input grid-input"}
            inputValue={currentUser.confirm}
            label={"Password Confirm"}
            labelStyle={"grid-input-label"}
            name={"confirm"}
            onInputChange={handleConfirmChangeEvent}
            onInputFocus={handleInitialFocusEvent}
            placeholder={"enter new password again..."}
            wrapperStyle={'grid-input-wrapper'}
            errorMsg={currentValidationError.confirm}
          />
          <div className="grid-input-wrapper">
            <button type="button" className="btn" onClick={handleSaveUserClickEvent}>Update</button>
          </div>
        </div>
      </div>
      <div className="aside-wrapper">
        <ManageYourBlogs />
      </div>
    </div>
  );
}

export default Profile;


