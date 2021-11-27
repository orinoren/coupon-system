## `CouponCardFunctions`

`getCouponCardFotterFunc`:

1. Checks whice current user role is logged in.

- if its company return an edit button and delete button for the coupon .
- if admin return the company name.
- if show customer coupons mode is on return a see details div.
- if nither checks if `showAddToCartControlles` state
  - if true return `<CouponControllers>`.
  - if false return add to cart div.

`handleEditBtnClicked`:

1. Stop propagation to not trigger parent componet when clicked.
2. checks if company is on add coupon mode

- if true `dispatch(companyCouponResetAddModeAction())` to close the add mode.

3.  `dispatch(companyCouponUpdateModeAction(props))`
    to start the update mode with the props of the relavent coupon

`handleDeleteBtnClicked`:

1. Stop propagation to not trigger parent componet when clicked.
2. `dispatch(companyDeleteCouponAction(props.id))` with the coupon id to continue delete action .

`hanldeAddToCartClicked`:

1. checks if `showAddToCartControlles` state

- if true set `showAddToCartControlles` to false to close the controller
- if false set `showAddToCartControlles` to true
  to open the controller
