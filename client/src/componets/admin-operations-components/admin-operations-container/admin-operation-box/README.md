# `Admin operations box`

## `AdminInputToAdd`

this componet is one input on the add box
with a label of the props.label(name , email ,password etc.) that determine
in the `<AdminCompanyBox/>` or `<AdminCustomerBox/>`,
and a space for error messege with unique id of the current input
details

## useSelectors

1. `showOperationsFor` :
   determine of which operations to show for customers or companies and let us know on whice mode administrator is in .

## Methods

1. `handleOnFocusInput`:

- checking if showOperationsFor is for company or customer .
- if there is an error messege after adding is company/customer failed , when the admin wants to make a changes and focus on one input all the error messeges are removed

## `AdminInputToUpdate`

this componet is one input on the update box
with a label of the props.label(name , email ,password etc.) that determine
in the `<AdminCompanyBox/>` or `<AdminCustomerBox/>`,
and a space for error messege with unique id
**which consists of a combination of the input details (idPrefix) and id of the company or customer(idSuffix)**

## useSelectors

1. `showOperationsFor` :
   determine of which operations to show for customers or companies and let us know on whice mode administrator is in .

## Methods

1. `handleOnFocusInput`:

- checking if showOperationsFor is for company or customer .
- if there is an error messege after adding is company/customer failed , when the admin wants to make a changes and focus on one input all the error messeges are removed
