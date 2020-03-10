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
import { generateFileWithUuidv4 } from 'src/utils';
import { logger } from 'configs/logger';
const log = logger("Profile");


const Profile: React.FunctionComponent<{}> = (props: {}) => {
  /** update user profile **/

  /** state **/
  const { auth } = useAuthContext()
  log(auth)
  const [currentUser, setUser] = React.useState<UserType>(auth.user)
  log('before useValidation')
  log(currentUser)
  const { currentValidationError, touch, validate, validationSummaryCheck, currentTouch } = useProfileValidation({ domain: {
    id: currentUser.id,
    name: currentUser.name,
    email: currentUser.email,
    password: currentUser.password,
    confirm: currentUser.confirm
  } })

  const path: string = '/users/' + currentUser.id
  const method: RequestMethodEnum = RequestMethodEnum.PUT

  const { currentRequestStatus: currentUpdateRequestStatus, setRequestStatus: setUpdateRequestStatus, sendRequest: sendUpdateRequest } = useRequest({})
  const { currentRequestStatus: currentUserFetchStatus, setRequestStatus: setUserFetchStatus, sendRequest: fetchUser } = useRequest({})
  const [currentAvatarDeleteFlag, setAvatarDeleteFlag] = React.useState<boolean>(false)

  /** lifecycle **/

  const mapStateToFormData = (state: UserType): FormData => {
    const formData = new FormData()
    formData.set('name', state.name)
    formData.set('email', state.email)
    if (currentAvatarDeleteFlag) formData.set('avatarDeleteFlag', 'delete')
    if (state.password) formData.set('password', state.password)
    if (state.avatarImage) formData.set('avatarImage', state.avatarImage)
    return formData
  }

  React.useEffect(() => {
    log('initial fetch for user data')
    fetchUser({
      path: path,
      method: RequestMethodEnum.GET,
      useCache: false,
      allowCache: false
    })
      // call from previous 'catch' and 'then' of 'fetchUser'
      // since resolve promise in the 'catch'
      .then((result: ResponseResultType<UserResponseDataType>) => {
        log('then func of fetchUser func')
        if (result.status === ResponseResultStatusEnum.SUCCESS) setUser(result.data.user)
      })
  }, []);


  const handleImageUploadChange: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {
    setAvatarDeleteFlag(false)
    let imgFile: File = e.currentTarget.files[0]
    imgFile = generateFileWithUuidv4(imgFile)
    const imgSrc: string = window.URL.createObjectURL(imgFile);
    setUser({
      ...currentUser,
      avatarImage: imgFile,
      avatarUrl: imgSrc,
    })
  }

  const handleImageRemoveClick: React.EventHandler<React.MouseEvent<HTMLButtonElement>> = (e) => {
    setAvatarDeleteFlag(true)
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
    log('handling name change event')
    log(e.currentTarget.value)
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
    log('clicked update butuon')
    // final check validation ...
    if (validationSummaryCheck()) {
      log('validation passed at save button event handler')
      sendUpdateRequest({
        path: path,
        method: method,
        headers: { 'content-type': 'multipart/form-data' },
        data: mapStateToFormData(currentUser)
      })
    } 
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
        <h2 className="page-title">Profile Management</h2>
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
            errorMsg={currentTouch.name ? currentValidationError.name : null}
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
            errorMsg={currentTouch.email ? currentValidationError.email : null}
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
            errorMsg={currentTouch.password ? currentValidationError.password : null}
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
            errorMsg={currentTouch.confirm ? currentValidationError.confirm : null}
          />
          <div className="grid-input-wrapper">
            <button type="button" className="btn" onClick={handleSaveUserClickEvent} role="update-btn">Update</button>
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


