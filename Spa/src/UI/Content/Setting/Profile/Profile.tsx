import * as React from 'react';
import * as yup from 'yup';
import { initialUserState, UserType } from '../../../../domain/user/UserType';
import { initialUserInputTouchedState, initialUserValidationState, UserInputTouchedType, UserValidationType } from '../../../../domain/user/UserValidationType';
import { request } from '../../../../requests/request';
import { RequestMethodEnum, ResponseResultStatusEnum, ResponseResultType, UserResponseDataType } from '../../../../requests/types';
import './Profile.scss';
import { useAuthContext } from '../../../Base/Context/AuthContext/AuthContext';
import { useApiFetch } from '../../../Base/Components/ApiFetch/useApiFetch';
import { useRequest } from '../../../Base/Hooks/Request/useRequest';


const Profile: React.FunctionComponent<{}> = (props: {}) => {
  /** update user profile **/

  /** state **/
  const [currentUser, setUser] = React.useState<UserType>(initialUserState)
  const [currentValidationError, setValidationError] = React.useState<UserValidationType>(initialUserValidationState)
  const [currentInputTouched, setInputTouched] = React.useState<UserInputTouchedType>(initialUserInputTouchedState)

  const path: string = '/users/' + currentUser.id
  const method: RequestMethodEnum = RequestMethodEnum.PUT

  const { currentRequestStatus, setRequestStatus, sendRequest } = useRequest({})

  let schema = yup.object().shape<UserType>({
    id: yup.string(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirm: yup.string().required().oneOf([yup.ref('password'), null], 'passwords must match')
  });

  /** lifecycle **/
  React.useEffect(() => {
    function validateFormInput() {
      schema
        .validate(currentUser, {
          abortEarly: false
        })
        .then(() => {
          console.log('validation passed')
          setValidationError({
            ...initialUserValidationState
          })
        })
        .catch((error: yup.ValidationError) => {
          console.log('validation error detected')
          console.log(error)
          // clear all of error message first
          for (let key in currentValidationError) delete currentValidationError[key as keyof UserValidationType]
          // assign new error message 
          error.inner.forEach((eachError: yup.ValidationError) => {
            if (currentInputTouched[eachError.path as keyof UserInputTouchedType])
              currentValidationError[eachError.path as keyof UserValidationType] = eachError.message
          })
          setValidationError({
            ...currentValidationError
          })
        })
    }
    console.log('validating input.... should be called only mount and when input is updated')
    validateFormInput()
    return () => {
    };
  }, [
      currentUser.name,
      currentUser.email,
      currentUser.password,
      currentUser.confirm,
      ...Object.keys(currentInputTouched).map(key => currentInputTouched[key as keyof UserInputTouchedType]) // for update when input focus
    ]);

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

  const { currentFetchStatus, setFetchStatus } = useApiFetch({
    path: path,
    method: RequestMethodEnum.GET,
    callback: (data: UserResponseDataType) => {
      console.log('api fetch callback start')
      if (data) {
        console.log('data is available')
        console.log(data)
        setUser({
          ...data.user
        })
      }
    }
  })

  const handleImageUploadChange: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {
    const imgFile: File = e.currentTarget.files[0]
    const imgSrc: string = window.URL.createObjectURL(imgFile);
    setUser({
      ...currentUser,
      avatarImage: imgFile,
      avatarUrl: imgSrc,
    })
  }

  const handleInitialFocusEvent: React.EventHandler<React.FocusEvent<HTMLInputElement>> = (e) => {
    currentInputTouched[e.currentTarget.name as keyof UserValidationType] = true
    setInputTouched({
      ...currentInputTouched
    })
  }

  const handleRevokeObjectURLOnLoad: React.EventHandler<React.SyntheticEvent<HTMLImageElement>> = (e) => {
    window.URL.revokeObjectURL(currentUser.avatarUrl);
  }

  const handleNameChangeEvent: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {
    console.log('handling name change event')
    console.log(e.currentTarget.value)
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
    console.log('clicked update butuon')
    // final check validation ...
    schema.validate(currentUser, {
      abortEarly: false
    })
      .then(async () => {
        console.log('validation passed')

        sendRequest({
          path: path,
          method: method,
          headers: { 'content-type': 'multipart/form-data' },
          data: mapStateToFormData(currentUser)
        })
      })
      .catch((error: yup.ValidationError) => {
        console.log('validation failed')
        console.log(error)
        error.inner.forEach((eachError: yup.ValidationError) => {
          currentValidationError[eachError.path as keyof UserValidationType] = eachError.message
        })
        setValidationError({
          ...currentValidationError
        })
        return false
      })
  }

  console.log(currentValidationError)

  if (currentFetchStatus.status === ResponseResultStatusEnum.FETCHING) return (<p>fetching your data</p>)

  if (currentFetchStatus.status === ResponseResultStatusEnum.FAILURE) return (<p>sorry.. your data is not available now</p>)

  /**
   * IMPORTANT NOTE: input name and user state key must be matched otherwise, validation won't work
   *  - esp cause error of 'useEffect' 2nd argument inconsistency array element 
   **/
  return (currentFetchStatus.status === ResponseResultStatusEnum.SUCCESS &&
    <div className="profile-wrapper">
      <h2 className="profile-title">Profile Management</h2>
      {(currentRequestStatus.status === ResponseResultStatusEnum.FETCHING && <p>updating user profile ...</p>)}
      {(currentRequestStatus.status === ResponseResultStatusEnum.SUCCESS && <p>updating user profile success</p>)}
      {(currentRequestStatus.status === ResponseResultStatusEnum.FAILURE && <p>updating user profile failed</p>)}
      <div className="profile-picture-wrapper">
        <img src={currentUser.avatarUrl} className="profile-picture-img" onLoad={handleRevokeObjectURLOnLoad} width={150} height={150} />
        <div className="profile-picture-input-wrapper">
          <label htmlFor="profile-picture-input" className="profile-picture-input-label">Select New Image</label>
          <input type="file" id="profile-picture-input" name="avatarImage" accept="image/*" onChange={handleImageUploadChange} className="profile-picture-input" />
        </div>
      </div>
      <div className="profile-user-name-wrapper">
        <h3 className="profile-user-name-title">Update User Name</h3>
        <p className="profile-user-name-description">
          Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
        </p>
        <label htmlFor="name" className="profile-user-name-label ">
          Name: <input type="text" id="name" name="name" placeholder="enter new user name..." className="input-text profile-user-name-input" value={currentUser.name} onChange={handleNameChangeEvent} onFocus={handleInitialFocusEvent} />
        </label>
        {(currentValidationError.name && <div className="input-error">{currentValidationError.name}</div>)}
      </div>
      <div className="profile-email-wrapper">
        <h3 className="profile-email-title">Update Email</h3>
        <p className="profile-email-description">
          Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
        </p>
        <label htmlFor="email" className="profile-user-email-label ">
          Email: <input type="text" id="email" name="email" placeholder="enter new email..." className="input-text profile-email-input" value={currentUser.email} onChange={handleEmailChangeEvent} onFocus={handleInitialFocusEvent} />
        </label>
        {(currentValidationError.email && <div className="input-error">{currentValidationError.email}</div>)}
      </div>
      <div className="profile-password-wrapper">
        <h3 className="profile-password-title">Update Password</h3>
        <p className="profile-password-description">
          Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
        </p>
        <label htmlFor="password" className="profile-user-password-label ">
          Password: <input type="password" id="password" name="password" placeholder="enter new password..." className="input-text profile-password-input" value={currentUser.password} onChange={handlePasswordChangeEvent} onFocus={handleInitialFocusEvent} />
        </label>
        <label htmlFor="confirm" className="profile-user-confirm-label ">
          Confirm: <input type="password" id="confirm" name="confirm" placeholder="enter new password again..." className="input-text profile-password-confirm-input" value={currentUser.confirm} onChange={handleConfirmChangeEvent} onFocus={handleInitialFocusEvent} />
        </label>
        {(currentValidationError.password && <div className="input-error">{currentValidationError.password}</div>)}
        {(currentValidationError.confirm && <div className="input-error">{currentValidationError.confirm}</div>)}
      </div>
      <div className="profile-btn-wrapper">
        <button type="button" className="regular-btn profile-btn-update" onClick={handleSaveUserClickEvent}>Update</button>
      </div>
    </div>
  );
}

export default Profile;


