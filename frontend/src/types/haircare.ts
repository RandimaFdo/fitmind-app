export type HaircutHistoryEntry = {
  id: string
  date: string
  barber: string
  style: string
  notes?: string
  salonId?: string
}

export type SalonContact = {
  phone: string
  email: string
  website?: string
}

export type Salon = {
  id: string
  name: string
  address: string
  hours: string
  services: string[]
  description: string
  contact: SalonContact
  heroImage: string
  gallery: string[]
}

export type Barber = {
  id: string
  salonId: string
  name: string
  experience: string
  specialty: string
  rating: number
  reviews: string[]
  bio: string
  photo: string
}

export type HairAppointment = {
  id: string
  salonId: string
  barberId?: string
  date: string
  time: string
  service: string
  notes?: string
}

export type SalonFormValues = {
  name: string
  address: string
  description: string
  services: string
  phone: string
  email: string
  website?: string
  heroImage?: string
  gallery?: string
  hours: string
}

export type AppointmentFormValues = {
  date: string
  time: string
  barberId?: string
  service: string
  notes?: string
}

export type HairstyleOption = {
  id: string
  name: string
  description: string
  image: string
}
