import { useState, type FormEvent } from 'react'
import type { UserInput } from '../types/user.ts'
import { emptyUserForm } from '../types/user.ts'
import { getErrorMessage } from '../utils/errors.ts'
import { createRandomUser } from '../utils/randomUser.ts'
import { hasFormErrors, validateUserForm, type FormErrors } from '../utils/validation.ts'

type UserFormProps = {
  initialValues?: UserInput
  submitLabel: string
  onSubmit: (values: UserInput) => Promise<void>
  onCancel: () => void
}

type FieldName =
  | 'name'
  | 'email'
  | 'phone'
  | 'company'
  | 'address.street'
  | 'address.city'
  | 'address.zipcode'
  | 'address.geo.lat'
  | 'address.geo.lng'

function setFieldValue(values: UserInput, name: FieldName, value: string): UserInput {
  switch (name) {
    case 'name':
    case 'email':
    case 'phone':
    case 'company':
      return { ...values, [name]: value }
    case 'address.street':
      return { ...values, address: { ...values.address, street: value } }
    case 'address.city':
      return { ...values, address: { ...values.address, city: value } }
    case 'address.zipcode':
      return { ...values, address: { ...values.address, zipcode: value } }
    case 'address.geo.lat':
      return {
        ...values,
        address: { ...values.address, geo: { ...values.address.geo, lat: value } },
      }
    case 'address.geo.lng':
      return {
        ...values,
        address: { ...values.address, geo: { ...values.address.geo, lng: value } },
      }
  }
}

function Field({
  id,
  label,
  name,
  value,
  error,
  type = 'text',
  placeholder,
  onChange,
}: {
  id: string
  label: string
  name: FieldName
  value: string
  error?: string
  type?: string
  placeholder?: string
  onChange: (name: FieldName, value: string) => void
}) {
  return (
    <div className="form-field">
      <label htmlFor={id}>
        {label} <span className="required">*</span>
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(name, event.target.value)}
      />
      {error ? (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      ) : null}
    </div>
  )
}

function UserForm({ initialValues, submitLabel, onSubmit, onCancel }: UserFormProps) {
  const [values, setValues] = useState<UserInput>(initialValues ?? emptyUserForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  function handleChange(name: FieldName, value: string) {
    setValues((current) => setFieldValue(current, name, value))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  function handleFillRandom() {
    setValues(createRandomUser())
    setErrors({})
    setSubmitError(null)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateUserForm(values)
    setErrors(nextErrors)
    setSubmitError(null)

    if (hasFormErrors(nextErrors)) {
      return
    }

    setSubmitting(true)
    try {
      await onSubmit(values)
    } catch (error) {
      setSubmitError(getErrorMessage(error))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="user-form" onSubmit={handleSubmit} noValidate>
      {submitError ? <p className="status-banner error">{submitError}</p> : null}

      <fieldset>
        <legend>Contact</legend>
        <div className="form-grid">
          <Field
            id="name"
            label="Name"
            name="name"
            value={values.name}
            error={errors.name}
            placeholder="Jane Doe"
            onChange={handleChange}
          />
          <Field
            id="email"
            label="Email"
            name="email"
            type="email"
            value={values.email}
            error={errors.email}
            placeholder="jane@example.com"
            onChange={handleChange}
          />
          <Field
            id="phone"
            label="Phone"
            name="phone"
            type="tel"
            value={values.phone}
            error={errors.phone}
            placeholder="9876543210"
            onChange={handleChange}
          />
          <Field
            id="company"
            label="Company"
            name="company"
            value={values.company}
            error={errors.company}
            placeholder="Acme Inc."
            onChange={handleChange}
          />
        </div>
      </fieldset>

      <fieldset>
        <legend>Address</legend>
        <div className="form-grid">
          <Field
            id="street"
            label="Street"
            name="address.street"
            value={values.address.street}
            error={errors['address.street']}
            placeholder="221B Baker Street"
            onChange={handleChange}
          />
          <Field
            id="city"
            label="City"
            name="address.city"
            value={values.address.city}
            error={errors['address.city']}
            placeholder="London"
            onChange={handleChange}
          />
          <Field
            id="zipcode"
            label="Zip code"
            name="address.zipcode"
            value={values.address.zipcode}
            error={errors['address.zipcode']}
            placeholder="NW1 6XE"
            onChange={handleChange}
          />
          <Field
            id="lat"
            label="Latitude"
            name="address.geo.lat"
            value={values.address.geo.lat}
            error={errors['address.geo.lat']}
            placeholder="51.5238"
            onChange={handleChange}
          />
          <Field
            id="lng"
            label="Longitude"
            name="address.geo.lng"
            value={values.address.geo.lng}
            error={errors['address.geo.lng']}
            placeholder="-0.1586"
            onChange={handleChange}
          />
        </div>
      </fieldset>

      <div className="form-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleFillRandom}
          disabled={submitting}
        >
          Fill randomly
        </button>
        <div className="form-actions-end">
          <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={submitting}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Saving...' : submitLabel}
          </button>
        </div>
      </div>
    </form>
  )
}

export default UserForm
