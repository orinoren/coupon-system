const addMode = {
  addCompanyMode: false,
  addCustomerMode: false,
};

export const adminAddModeOpReducer = (state = addMode, action) => {
  switch (action.type) {
    case "ADMIN-COMPANY-ADD-MODE":
      return {
        ...state,
        addCompanyMode: true,
        addCustomerMode: false,
      };
    case "ADMIN-CUSTOMER-ADD-MODE":
      return {
        ...state,
        addCustomerMode: true,
        addCompanyMode: false,
      };
    case "ADMIN-RESET-ADD-MODE":
      return {
        ...state,
        addCustomerMode: false,
        addCompanyMode: false,
      };
    default:
      return state;
  }
};

//---------------------
const updateMode = {
  updateCompanyMode: false,
  updateCustomerMode: false,
};

export const adminUpdateModeOpReducer = (state = updateMode, action) => {
  switch (action.type) {
    case "ADMIN-COMPANY-UPDATE-MODE":
      return {
        ...state,
        updateCompanyMode: true,
        updateCustomerMode: false,
      };
    case "ADMIN-CUSTOMER-UPDATE-MODE":
      return {
        ...state,
        updateCustomerMode: true,
        updateCompanyMode: false,
      };
    case "ADMIN-RESET-UPDATE-MODE":
      return {
        ...state,
        updateCustomerMode: false,
        updateCompanyMode: false,
      };
    default:
      return state;
  }
};

//-----------------------------------------------
const submitCoupon = {
  companySubmitCoupon: false,
};

export const companySubmitCouponReducer = (state = submitCoupon, action) => {
  switch (action.type) {
    case "COMPANY-SUBMIT-COUPON":
      return {
        ...state,
        companySubmitCoupon: true,
      };
    case "COMPANY-RESET-SUBMIT-COUPON":
      return {
        ...state,
        companySubmitCoupon: false,
      };

    default:
      return state;
  }
};
//---------------------------------------------------------

const updateCouponMode = {
  updateMode: false,
  couponObj: {},
};

export const companyUpdateCouponModeReducer = (
  state = updateCouponMode,
  action
) => {
  switch (action.type) {
    case "COMPANY-COUPON-UPDATE-MODE":
      return {
        ...state,
        updateMode: true,
        couponObj: action.payload,
      };
    case "COMPANY-COUPON-RESET-UPDATE-MODE":
      return {
        ...state,
        updateMode: false,
        couponObj: {},
      };

    default:
      return state;
  }
};
//---------------------------------------------------------------------
const addCouponMode = {
  addMode: false,
};

export const companyAddCouponModeReducer = (state = addCouponMode, action) => {
  switch (action.type) {
    case "COMPANY-COUPON-ADD-MODE":
      return {
        ...state,
        addMode: true,
      };
    case "COMPANY-COUPON-RESET-ADD-MODE":
      return {
        ...state,
        addMode: false,
      };

    default:
      return state;
  }
};
//---------------------------------------------------------------------
const globalMode = {
  guestOrCustomerMode: false,
  companyMode: false,
};

export const globalModeReducer = (state = globalMode, action) => {
  switch (action.type) {
    case "COMPANY-MODE":
      return {
        ...state,
        guestOrCustomerMode: false,
        companyMode: true,
      };
    case "GUEST-OR-CUSTOMER-MODE":
      return {
        ...state,
        companyMode: false,
        guestOrCustomerMode: true,
      };
    case "RESET-USER-MODE":
      return {
        ...state,
        companyMode: false,
        guestOrCustomerMode: false,
      };

    default:
      return state;
  }
};
//---------------------------------------------------------------------
const cartProperties = {
  cartNotification: 0,
  cartSummery: 0,
};

export const cartPropertisReducer = (state = cartProperties, action) => {
  switch (action.type) {
    case "INCREMENT-CART-NOTIFICATION":
      return {
        ...state,
        cartNotification: state.cartNotification + 1,
        cartSummery: state.cartSummery + action.payload.price,
      };
    case "DECREMENT-CART-NOTIFICATION":
      return {
        ...state,
        cartNotification: state.cartNotification - 1,
        cartSummery: state.cartSummery - action.payload.price,
      };
    case "RESET-CART-NOTIFICATION":
      return {
        ...state,
        cartNotification: 0,
        cartSummery: 0,
      };

    default:
      return state;
  }
};
//---------------------------------------------------------------------
const cartArr = [];
let notFound = true;

export const cartArrReducer = (state = cartArr, action) => {
  notFound = true;
  switch (action.type) {
    case "ADD-TO-CART":
      for (let i = 0; i < state.length && notFound; i++) {
        if (action.payload.id === state[i].id) {
          notFound = false;
          state[i].couponCartAmount++;
          return [...state];
        }
      }
      return [...state, action.payload];

    case "REMOVE-FROM-CART":
      const index = state.findIndex(
        (coupon) => coupon.id === action.payload.id
      );
      state[index].couponCartAmount--;
      if (state[index].couponCartAmount === 0) {
        return [...state.slice(0, index), ...state.slice(index + 1)];
      }
      return [...state];
    case "RESET-CART":
      return [];
    default:
      return state;
  }
};
//----------------------------------------------------------------
const showCart = {
  showCartMode: false,
};

export const showCartModeReducer = (state = showCart, action) => {
  switch (action.type) {
    case "SHOW-CART-MODE":
      return {
        ...state,
        showCartMode: true,
      };
    case "RESET-SHOW-CART-MODE":
      return {
        ...state,
        showCartMode: false,
      };
    default:
      return state;
  }
};
//----------------------------------------------------------------
const searchModeInit = {
  searchMode: false,
};

export const searchModeReducer = (state = searchModeInit, action) => {
  switch (action.type) {
    case "SEARCH-MODE":
      return {
        ...state,
        searchMode: true,
      };
    case "RESET-SEARCH-MODE":
      return {
        ...state,
        searchMode: false,
      };
    default:
      return state;
  }
};
//----------------------------------------------------------------
const searchResultCouponList = {
  couponList: [],
};

export const searchResultCouponListReducer = (
  state = searchResultCouponList,
  action
) => {
  switch (action.type) {
    case "SEARCH-RESULT-COUPON-LIST":
      return {
        ...state,
        couponList: action.payload,
      };
    case "RESET-SEARCH-RESULT-COUPON-LIST":
      return {
        ...state,
        couponList: [],
      };
    default:
      return state;
  }
};
//----------------------------------------------------------------
const searchResultCustomerList = {
  customerList: [],
};

export const searchResultCustomerListReducer = (
  state = searchResultCustomerList,
  action
) => {
  switch (action.type) {
    case "SEARCH-RESULT-CUSTOMER-LIST":
      return {
        ...state,
        customerList: action.payload,
      };
    case "DELETE-FROM-SEARCH-RESULT-CUSTOMER-LIST":
      const index = state.customerList.findIndex(
        (customer) => customer.id === action.payload.id
      );

      return [
        ...state.customerList.slice(0, index),
        ...state.customerList.slice(index + 1),
      ];

    case "UPDATE-FROM-SEARCH-RESULT-CUSTOMER-LIST":
      const indexUpdate = state.customerList.findIndex(
        (customer) => action.payload.customerObj.id === customer.id
      );
      state.customerList[indexUpdate] = action.payload.customerObj;
      return state;

    case "RESET-SEARCH-RESULT-CUSTOMER-LIST":
      return {
        ...state,
        customerList: [],
      };
    default:
      return state;
  }
};
//----------------------------------------------------------------
const searchResultCompanyList = {
  companyList: [],
};

export const searchResultCompanyListReducer = (
  state = searchResultCompanyList,
  action
) => {
  switch (action.type) {
    case "SEARCH-RESULT-COMAPNY-LIST":
      return {
        ...state,
        companyList: action.payload,
      };
    case "DELETE-FROM-SEARCH-RESULT-COMPANY-LIST":
      const index = state.companyList.findIndex(
        (company) => company.id === action.payload.id
      );
      return [
        ...state.companyList.slice(0, index),
        ...state.companyList.slice(index + 1),
      ];
    case "UPDATE-FROM-SEARCH-RESULT-COMPANY-LIST":
      const indexUpdate = state.companyList.findIndex(
        (company) => action.payload.companyObj.company_id === company.company_id
      );
      state.companyList[indexUpdate] = action.payload.companyObj;
      return state;

    case "RESET-SEARCH-RESULT-COMPANY-LIST":
      return {
        ...state,
        companyList: [],
      };
    default:
      return state;
  }
};
//----------------------------------------------------------------
const showOpForAdmin = {
  companyOp: false,
  customerOp: false,
};

export const showOpForAdminReducer = (state = showOpForAdmin, action) => {
  switch (action.type) {
    case "SHOW-COMPANY-OP":
      return {
        ...state,
        companyOp: true,
        customerOp: false,
      };
    case "SHOW-CUSTOMER-OP":
      return {
        ...state,
        companyOp: false,
        customerOp: true,
      };
    case "RESET-SHOW-OP":
      return {
        ...state,
        companyOp: false,
        customerOp: false,
      };
    default:
      return state;
  }
};

//----------------------------------------------------------------
const showCustomerCoupons = {
  showCustomerCoupons: false,
};

export const showCustomerCouponsReducer = (
  state = showCustomerCoupons,
  action
) => {
  switch (action.type) {
    case "SHOW-CUSTOMER-COUPONS":
      return {
        ...state,
        showCustomerCoupons: true,
      };
    case "RESET-SHOW-CUSTOMER-COUPONS":
      return {
        ...state,
        showCustomerCoupons: false,
      };

    default:
      return state;
  }
};
