import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type {
  HaircutHistoryEntry,
  Salon,
  Barber,
  HairAppointment,
  SalonFormValues,
  AppointmentFormValues,
  HairstyleOption,
} from '../types/haircare'

const generateId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

const initialHistory: HaircutHistoryEntry[] = [
  { id: 'hist-1', date: '2025-11-10', barber: 'Liam Cortez', style: 'Low fade crop', notes: 'Pre-demo clean up', salonId: 'salon-1' },
  { id: 'hist-2', date: '2025-09-02', barber: 'Ezra Quinn', style: 'Mid drop fade', salonId: 'salon-2' },
  { id: 'hist-3', date: '2025-06-20', barber: 'Noah Peiris', style: 'Classic taper', salonId: 'salon-1' },
]

const initialSalons: Salon[] = [
  {
    id: 'salon-1',
    name: 'Studio Meridian',
    address: '12 Pulse Avenue, Colombo 07',
    hours: '8:00 AM – 9:00 PM',
    services: ['Precision cut', 'Beard sculpt', 'Scalp detox'],
    description: 'High-fidelity grooming studio merging AI mapping with bespoke scissors work for founders and creatives.',
    contact: { phone: '+94 77 880 1123', email: 'hello@studiomeridian.lk', website: 'https://studiomeridian.lk' },
    heroImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    id: 'salon-2',
    name: 'Lineage Barber & Lab',
    address: '44 Beacon Street, Mount Lavinia',
    hours: '9:00 AM – 8:00 PM',
    services: ['Skin fade', 'Texture perm', 'Color tuning'],
    description: 'Boutique barber lab pairing grooming rituals with aromatic therapy and cold plunge recovery.',
    contact: { phone: '+94 76 553 1190', email: 'book@lineagebarber.co' },
    heroImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
    ],
  },
]

const initialBarbers: Barber[] = [
  {
    id: 'barber-1',
    salonId: 'salon-1',
    name: 'Liam Cortez',
    experience: '12 yrs | LA & Tokyo residencies',
    specialty: 'Fade choreography + editorial styling',
    rating: 4.9,
    reviews: ['“Liam resets my look every launch week.”', '“Obsessed with his detail work.”'],
    bio: 'Leads Studio Meridian’s technical team blending CAD-guided scissor work with intuitive fades.',
    photo: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'barber-2',
    salonId: 'salon-1',
    name: 'Noah Peiris',
    experience: '7 yrs | Colombo & Singapore',
    specialty: 'Classic tapers and texture refinement',
    rating: 4.7,
    reviews: ['“Keeps my curls disciplined without losing volume.”'],
    bio: 'Focuses on timeless silhouettes with smarter maintenance routines.',
    photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'barber-3',
    salonId: 'salon-2',
    name: 'Ezra Quinn',
    experience: '10 yrs | London fade academies',
    specialty: 'Skin fades · beard geometry · color blending',
    rating: 4.8,
    reviews: ['“Precise, quick, consistent every visit.”'],
    bio: 'Lineage Barber co-lead bringing modern European fades to Sri Lanka.',
    photo: 'https://images.unsplash.com/photo-1542596768-5d1d21f1cf98?auto=format&fit=crop&w=600&q=80',
  },
]

const hairstyleOptions: HairstyleOption[] = [
  { id: 'style-1', name: 'Fade', description: 'Clean gradient with sharp edges', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80' },
  { id: 'style-2', name: 'Buzz cut', description: 'Low maintenance uniform cut', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80' },
  { id: 'style-3', name: 'Crop cut', description: 'Textured fringe with neat fade', image: 'https://images.unsplash.com/photo-1542596768-5d1d21f1cf98?auto=format&fit=crop&w=600&q=80' },
  { id: 'style-4', name: 'Undercut', description: 'Contrast layers with volume', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80' },
  { id: 'style-5', name: 'Medium curly', description: 'Defined curls, clean sides', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80' },
  { id: 'style-6', name: 'Wavy top', description: 'Flexible length with movement', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80' },
  { id: 'style-7', name: 'Long layers', description: 'Sweeping layers for longer hair', image: 'https://images.unsplash.com/photo-1542596768-5d1d21f1cf98?auto=format&fit=crop&w=600&q=80' },
]

type HairCareContextValue = {
  history: HaircutHistoryEntry[]
  salons: Salon[]
  barbers: Barber[]
  appointments: HairAppointment[]
  styles: HairstyleOption[]
  addHaircut: (entry: Omit<HaircutHistoryEntry, 'id'>) => void
  addSalon: (values: SalonFormValues) => void
  addAppointment: (salonId: string, values: AppointmentFormValues) => void
}

const HairCareContext = createContext<HairCareContextValue | undefined>(undefined)

export function HairCareProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState(initialHistory)
  const [salons, setSalons] = useState(initialSalons)
  const [barbers] = useState(initialBarbers)
  const [appointments, setAppointments] = useState<HairAppointment[]>([])
  const [styles] = useState(hairstyleOptions)

  const addHaircut = (entry: Omit<HaircutHistoryEntry, 'id'>) => {
    setHistory((prev) => [{ id: generateId(), ...entry }, ...prev])
  }

  const addSalon = (values: SalonFormValues) => {
    const salon: Salon = {
      id: generateId(),
      name: values.name,
      address: values.address,
      description: values.description,
      services: values.services.split(',').map((item) => item.trim()).filter(Boolean),
      contact: { phone: values.phone, email: values.email, website: values.website },
      heroImage:
        values.heroImage?.trim() || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
      gallery:
        values.gallery?.split(',').map((url) => url.trim()).filter(Boolean) ?? [
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
        ],
      hours: values.hours,
    }

    setSalons((prev) => [...prev, salon])
  }

  const addAppointment = (salonId: string, values: AppointmentFormValues) => {
    const appointment: HairAppointment = {
      id: generateId(),
      salonId,
      barberId: values.barberId,
      date: values.date,
      time: values.time,
      service: values.service,
      notes: values.notes,
    }

    setAppointments((prev) => [...prev, appointment])
  }

  const value = useMemo(
    () => ({ history, salons, barbers, appointments, styles, addHaircut, addSalon, addAppointment }),
    [history, salons, barbers, appointments, styles],
  )

  return <HairCareContext.Provider value={value}>{children}</HairCareContext.Provider>
}

export function useHairCare() {
  const context = useContext(HairCareContext)
  if (!context) {
    throw new Error('useHairCare must be used within a HairCareProvider')
  }
  return context
}
