export type UserCategory = "student" | "business" | "career"

export interface Lead {
  id?: string
  name: string
  institution: string
  email: string
  phone: string
  category: UserCategory
  message: string
  newsletter: boolean
  created_at?: string
  updated_at?: string
  is_active?: boolean
}

export interface Service {
  title: string
  description: string
  icon: string
}

export interface Testimonial {
  name: string
  role: string
  company: string
  content: string
  avatar: string
}
