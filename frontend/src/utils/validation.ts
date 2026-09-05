import type { UserInput } from '../types/user.ts'

export type FormErrors = Partial<
  Record<
    | 'name'
    | 'email'
    | 'phone'
    | 'company'
    | 'address.street'
    | 'address.city'
    | 'address.zipcode'
    | 'address.geo.lat'
    | 'address.geo.lng',
    string
  >
>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateUserForm(values: UserInput): FormErrors {
  const errors: FormErrors = {}

  if (!values.name.trim()) {
    errors.name = 'Name is required'
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required'
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Enter a valid email address'
  }

  if (!values.phone.trim()) {
    errors.phone = 'Phone is required'
  }

  if (!values.company.trim()) {
    errors.company = 'Company is required'
  }

  if (!values.address.street.trim()) {
    errors['address.street'] = 'Street is required'
  }

  if (!values.address.city.trim()) {
    errors['address.city'] = 'City is required'
  }

  if (!values.address.zipcode.trim()) {
    errors['address.zipcode'] = 'Zip code is required'
  }

  const latValue = values.address.geo.lat.trim()
  const lat = Number(latValue)
  if (!latValue) {
    errors['address.geo.lat'] = 'Latitude is required'
  } else if (Number.isNaN(lat) || lat < -90 || lat > 90) {
    errors['address.geo.lat'] = 'Latitude must be a number between -90 and 90'
  }

  const lngValue = values.address.geo.lng.trim()
  const lng = Number(lngValue)
  if (!lngValue) {
    errors['address.geo.lng'] = 'Longitude is required'
  } else if (Number.isNaN(lng) || lng < -180 || lng > 180) {
    errors['address.geo.lng'] = 'Longitude must be a number between -180 and 180'
  }

  return errors
}

export function hasFormErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0
}
