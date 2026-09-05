export type Geo = {
  lat: string
  lng: string
}

export type Address = {
  street: string
  city: string
  zipcode: string
  geo: Geo
}

export type UserInput = {
  name: string
  email: string
  phone: string
  company: string
  address: Address
}

export type User = UserInput & {
  _id?: string
  id?: string
}

export const emptyUserForm: UserInput = {
  name: '',
  email: '',
  phone: '',
  company: '',
  address: {
    street: '',
    city: '',
    zipcode: '',
    geo: {
      lat: '',
      lng: '',
    },
  },
}

export function getUserId(user: User): string {
  return String(user._id ?? user.id ?? '')
}

export function toUserInput(user: User): UserInput {
  return {
    name: user.name ?? '',
    email: user.email ?? '',
    phone: user.phone ?? '',
    company: user.company ?? '',
    address: {
      street: user.address?.street ?? '',
      city: user.address?.city ?? '',
      zipcode: user.address?.zipcode ?? '',
      geo: {
        lat: user.address?.geo?.lat ?? '',
        lng: user.address?.geo?.lng ?? '',
      },
    },
  }
}
