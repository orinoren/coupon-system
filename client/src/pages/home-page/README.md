## `Home`

### useSelector

1. `userDetails` : holds details about the current user logged in

### Methods

1. `handleEnterAsGuestBtnClicked` : route the user to main mage.
2. `handleLoginUserBtnClicked`: route the user to login page.
3. `handleGoToWebstieBtnClicked`:
   checks whice user role is login
   and routin to the main page the relevant to him.

### useEffect

every time enter the home page disaptch `getAllCouponsAction()` to retreive the most updated coupons.
