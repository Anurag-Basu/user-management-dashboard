export type UserPayload = {
  name: string
  email: string
  phone: string
  company: string
  address: {
    street: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
}

export type ValidationErrors = Record<string, string>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function asRecord(value: unknown): Record<string, unknown> | null {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>
  }

  return null
}

function readString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

export function validateUserPayload(
  body: unknown,
): { value: UserPayload; errors: null } | { value: null; errors: ValidationErrors } {
  const source = asRecord(body)
  const errors: ValidationErrors = {}

  if (!source) {
    return { value: null, errors: { body: 'Request body must be an object' } }
  }

  const name = readString(source.name)
  const email = readString(source.email).toLowerCase()
  const phone = readString(source.phone)
  const company = readString(source.company)
  const addressSource = asRecord(source.address)
  const geoSource = asRecord(addressSource?.geo)

  if (!name) errors.name = 'Name is required'
  if (!email) {
    errors.email = 'Email is required'
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Enter a valid email address'
  }
  if (!phone) errors.phone = 'Phone is required'
  if (!company) errors.company = 'Company is required'

  const street = readString(addressSource?.street)
  const city = readString(addressSource?.city)
  const zipcode = readString(addressSource?.zipcode)
  const latValue = readString(geoSource?.lat)
  const lngValue = readString(geoSource?.lng)

  if (!street) errors['address.street'] = 'Street is required'
  if (!city) errors['address.city'] = 'City is required'
  if (!zipcode) errors['address.zipcode'] = 'Zip code is required'

  const lat = Number(latValue)
  if (!latValue) {
    errors['address.geo.lat'] = 'Latitude is required'
  } else if (Number.isNaN(lat) || lat < -90 || lat > 90) {
    errors['address.geo.lat'] = 'Latitude must be a number between -90 and 90'
  }

  const lng = Number(lngValue)
  if (!lngValue) {
    errors['address.geo.lng'] = 'Longitude is required'
  } else if (Number.isNaN(lng) || lng < -180 || lng > 180) {
    errors['address.geo.lng'] = 'Longitude must be a number between -180 and 180'
  }

  if (Object.keys(errors).length > 0) {
    return { value: null, errors }
  }

  return {
    value: {
      name,
      email,
      phone,
      company,
      address: {
        street,
        city,
        zipcode,
        geo: {
          lat: latValue,
          lng: lngValue,
        },
      },
    },
    errors: null,
  }
}
