import * as React from 'react';
import * as yup from 'yup';
import { initialUserState, UserType } from '../../../../domain/user/UserType';
import { initialUserInputTouchedState, initialUserValidationState, UserInputTouchedType, UserValidationType } from '../../../../domain/user/UserValidationType';
import { request } from '../../../../requests/request';
import { RequestMethodEnum, ResponseResultStatusEnum, ResponseResultType } from '../../../../requests/types';
import './Profile.scss';


const Profile: React.FunctionComponent<{}> = (props: {}) => {
  /** update user profile **/

  /** state **/
  const [currentUser, setUser] = React.useState<UserType>(initialUserState)
  const [currentValidationError, setValidationError] = React.useState<UserValidationType>(initialUserValidationState)
  const [currentInputTouched, setInputTouched] = React.useState<UserInputTouchedType>(initialUserInputTouchedState)
  const [currentGetFetchStatus, setGetFetchStatus] = React.useState<ResponseResultType>({
    status: ResponseResultStatusEnum.INITIAL
  })
  const [currentPutRequestStatus, setPutRequestStatus] = React.useState<ResponseResultType>({
    status: ResponseResultStatusEnum.INITIAL
  })

  const userId = 1 // need to get from somewhere

  const path: string = '/users/' + userId
  const method: RequestMethodEnum = RequestMethodEnum.PUT

  let schema = yup.object().shape<UserType>({
    id: yup.string(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirm: yup.string().oneOf([yup.ref('password'), null], 'passwords must match')
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
          for (let key in currentValidationError) delete currentValidationError[key as keyof UserType]
          // assign new error message 
          error.inner.forEach((eachError: yup.ValidationError) => {
            if (currentInputTouched[eachError.path as keyof UserType])
              currentValidationError[eachError.path as keyof UserType] = eachError.message
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
      ...Object.keys(currentUser).map(key => currentUser[key as keyof UserType]),
      ...Object.keys(currentInputTouched).map(key => currentInputTouched[key as keyof UserInputTouchedType]) // for update when input focus
    ]);

  React.useEffect(() => {
    async function fetchUserData() {
      setGetFetchStatus({
        status: ResponseResultStatusEnum.FETCHING
      })
      await request({
        url: '/users/' + userId,
        method: RequestMethodEnum.GET
      })
        .then((responseResult: ResponseResultType) => {
          setGetFetchStatus({
            status: responseResult.status,
            data: responseResult.data,
          })
          setUser(responseResult.data.user)
        })
        .catch((responseResult: ResponseResultType) => {
          setGetFetchStatus({
            status: responseResult.status,
            errorMsg: responseResult.errorMsg,
          })
        })
    }
    fetchUserData()
    return () => {
    };
  }, []);

  const mapStateToFormData = (state: UserType): FormData => {
    const formData = new FormData()
    if (state.id) formData.append('id', state.id)
    formData.set('name', state.name)
    formData.set('email', state.email)
    formData.set('password', state.password)
    formData.set('avatarImage', state.avatarImage)
    return formData
  }

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
        // initialize FormData and map state to items of FormDate
        const formData: FormData = mapStateToFormData(currentUser)

        // set headers (multipart/form-data)
        const headers: {} = { 'content-type': 'multipart/form-data' }

        setPutRequestStatus({
          status: ResponseResultStatusEnum.FETCHING
        })
        // send request
        await request({
          url: path,
          method: method,
          headers: headers,
          data: formData
        })
          .then((responseResult: ResponseResultType) => {
            setPutRequestStatus({
              status: responseResult.status
            })
          })
          .catch((responseResult: ResponseResultType) => {
            setPutRequestStatus({
              status: responseResult.status,
              errorMsg: responseResult.errorMsg
            })
          })
      })
      .catch((error: yup.ValidationError) => {
        console.log('validation failed')
        console.log(error)
        error.inner.forEach((eachError: yup.ValidationError) => {
          currentValidationError[eachError.path as keyof UserType] = eachError.message
        })
        setValidationError({
          ...currentValidationError
        })
        return false
      })
  }

  return (
    <div className="profile-wrapper">
      <h2 className="profile-title">Profile Management</h2>
      {(currentPutRequestStatus.status === ResponseResultStatusEnum.FETCHING && <p>updating user profile ...</p>)}
      {(currentPutRequestStatus.status === ResponseResultStatusEnum.SUCCESS && <p>updating user profile success</p>)}
      {(currentPutRequestStatus.status === ResponseResultStatusEnum.FAILURE && <p>updating user profile failed</p>)}
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
        <input type="text" name="name" placeholder="enter new user name..." className="input-text profile-user-name-input" value={currentUser.name} onChange={handleNameChangeEvent} onFocus={handleInitialFocusEvent} />
        {(currentValidationError.name && <div className="input-error">{currentValidationError.name}</div>)}
      </div>
      <div className="profile-email-wrapper">
        <h3 className="profile-email-title">Update Email</h3>
        <p className="profile-email-description">
          Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
        </p>
        <input type="text" name="email" placeholder="enter new email..." className="input-text profile-email-input" value={currentUser.email} onChange={handleEmailChangeEvent} onFocus={handleInitialFocusEvent} />
        {(currentValidationError.email && <div className="input-error">{currentValidationError.email}</div>)}
      </div>
      <div className="profile-password-wrapper">
        <h3 className="profile-password-title">Update Password</h3>
        <p className="profile-password-description">
          Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
        </p>
        <input type="password" name="password" placeholder="enter new password..." className="input-text profile-password-input" value={currentUser.password} onChange={handlePasswordChangeEvent} onFocus={handleInitialFocusEvent} />
        <input type="password" name="confirm" placeholder="enter new password again..." className="input-text profile-password-confirm-input" value={currentUser.confirm} onChange={handleConfirmChangeEvent} onFocus={handleInitialFocusEvent} />
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


