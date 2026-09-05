import type { User, UserInput } from '../types/user.ts'
import { api } from './api.ts'

function unwrapUser(data: User | { user: User }): User {
  if ('user' in data) {
    return data.user
  }

  return data
}

export async function fetchUsers(): Promise<User[]> {
  const { data } = await api.get<User[] | { users: User[] }>('/users')
  return Array.isArray(data) ? data : data.users
}

export async function fetchUser(id: string): Promise<User> {
  const { data } = await api.get<User | { user: User }>(`/users/${id}`)
  return unwrapUser(data)
}

export async function createUser(payload: UserInput): Promise<User> {
  const { data } = await api.post<User | { user: User }>('/users', payload)
  return unwrapUser(data)
}

export async function updateUser(id: string, payload: UserInput): Promise<User> {
  const { data } = await api.put<User | { user: User }>(`/users/${id}`, payload)
  return unwrapUser(data)
}

export async function deleteUser(id: string): Promise<void> {
  await api.delete(`/users/${id}`)
}
