export const saveUserInformationToLocaleStorage = (userData) => {
    localStorage.setItem('CARZELLE_USER_COMPANY_NAME', userData.companys)
    localStorage.setItem('CARZELLE_USER_HASH', userData.hash);
    localStorage.setItem('CARZELLE_USER_NAME', userData.name);
    localStorage.setItem('CARZELLE_USER_TYPE_ID', userData.userTypeId);
    localStorage.setItem('CARZELLE_PUSHER_CLUSTER', userData.pusherCluster);
    localStorage.setItem('CARZELLE_PUSHER_KEY', userData.pusherKey);
}

export const saveKeyAccountNameToLocaleStorage = (keyAccountData) => {
    localStorage.setItem('CARZELLE_KEY_ACCOUNT_NAME', keyAccountData.name);
    localStorage.setItem('CARZELLE_KEY_ACCOUNT_EMAIL', keyAccountData.email);
    localStorage.setItem('CARZELLE_KEY_ACCOUNT_PHONE', keyAccountData.phone);
    localStorage.setItem('CARZELLE_KEY_ACCOUNT_PROFILE_IMAGE_URL_THUMB', keyAccountData.profile_image_url_thumb);
    localStorage.setItem('CARZELLE_KEY_ACCOUNT_PROFILE_IMAGE_URL', keyAccountData.profile_image_url);
}

export const getUserCompanyName = () => {
    return localStorage.getItem('CARZELLE_USER_COMPANY_NAME')
}

export const getUserHash = () => {
    return localStorage.getItem('CARZELLE_USER_HASH')
}

export const getUserName = () => {
    return localStorage.getItem('CARZELLE_USER_NAME')
}

export const getUserTypeId = () => {
    return localStorage.getItem('CARZELLE_USER_TYPE_ID')
}

export const getPusherCluster = () => {
    return localStorage.getItem('CARZELLE_PUSHER_CLUSTER')
}

export const getPusherKey = () => {
    return localStorage.getItem('CARZELLE_PUSHER_KEY')
}

export const getKeyAccountName = () => {
    return localStorage.getItem('CARZELLE_KEY_ACCOUNT_NAME')
}

export const getKeyAccountEmail = () => {
    return localStorage.getItem('CARZELLE_KEY_ACCOUNT_EMAIL')
}

export const getKeyAccountPhone = () => {
    return localStorage.getItem('CARZELLE_KEY_ACCOUNT_PHONE')
}

export const getKeyAccountProfileImageThumb = () => {
    return localStorage.getItem('CARZELLE_KEY_ACCOUNT_PROFILE_IMAGE_URL_THUMB')
}

export const getKeyAccountProfileImage = () => {
    return localStorage.getItem('CARZELLE_KEY_ACCOUNT_PROFILE_IMAGE_URL')
}

export const getApiPrefix = () => {
    return process.env.REACT_APP_API_PREFIX;
}

