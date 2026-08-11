"use client"

import { supabase } from '@/lib/supabaseClient'
import { EcguysLogoSmall } from '@/components/ecguys-logo'
import { User, Mail, Phone, Tag, MessageSquare, Calendar, Database } from 'lucide-react'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) {
        setData(data)
      }

      setLoading(false)
    }

    init()
  }, [])

  const safeData = data || []

  const stats = [
    { label: 'Total Leads', value: safeData.length, icon: Database },
    { label: 'Students', value: safeData.filter(d => d.category === 'student').length, icon: User },
    { label: 'Businesses', value: safeData.filter(d => d.category === 'business').length, icon: Tag },
    { label: 'Career', value: safeData.filter(d => d.category === 'career').length, icon: User },
  ]

  if (loading) {
    return <div className="p-10">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Background Pattern */}
      <div className="fixed inset-0 grid-pattern opacity-50 pointer-events-none" />
      
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <EcguysLogoSmall />
            <div className="h-6 w-px bg-border" />
            <span className="text-sm font-medium text-muted-foreground">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              Last updated: {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Lead Management</h1>
          <p className="text-muted-foreground">View and manage all incoming leads from the contact form.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="glass rounded-xl p-5 border border-border/50 hover-lift"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="glass rounded-2xl border border-border/50 overflow-hidden">
          <div className="p-5 border-b border-border/50">
            <h2 className="text-lg font-semibold">Recent Leads</h2>
            <p className="text-sm text-muted-foreground">All contact form submissions</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/20 border-b border-border/50">
                  <th className="text-left p-4 font-medium text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Name
                    </div>
                  </th>
                  <th className="text-left p-4 font-medium text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </div>
                  </th>
                  <th className="text-left p-4 font-medium text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone
                    </div>
                  </th>
                  <th className="text-left p-4 font-medium text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Category
                    </div>
                  </th>
                  <th className="text-left p-4 font-medium text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Message
                    </div>
                  </th>
                  <th className="text-left p-4 font-medium text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Date
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-muted/30 flex items-center justify-center">
                          <Database className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground">No leads yet</p>
                        <p className="text-sm text-muted-foreground/70">Leads will appear here when users submit the contact form.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  data?.map((item, index) => (
                    <tr 
                      key={item.id} 
                      className={`border-b border-border/30 hover:bg-muted/10 transition-colors ${
                        index % 2 === 0 ? 'bg-transparent' : 'bg-muted/5'
                      }`}
                    >
                      <td className="p-4">
                        <span className="font-medium text-foreground">{item.name}</span>
                      </td>
                      <td className="p-4">
                        <a 
                          href={`mailto:${item.email}`} 
                          className="text-primary hover:underline transition-colors"
                        >
                          {item.email}
                        </a>
                      </td>
                      <td className="p-4 text-muted-foreground">{item.phone || '-'}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          item.category === 'student' 
                            ? 'bg-primary/10 text-primary' 
                            : item.category === 'business'
                            ? 'bg-accent/10 text-accent'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {item.category}
                        </span>
                      </td>
                      <td className="p-4 max-w-xs">
                        <p className="truncate text-muted-foreground" title={item.message}>
                          {item.message || '-'}
                        </p>
                      </td>
                      <td className="p-4 text-muted-foreground text-sm">
                        {new Date(item.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <EcguysLogoSmall className="opacity-50" />
          <p className="text-xs text-muted-foreground">
            Admin Dashboard - Internal Use Only
          </p>
        </div>
      </footer>
    </div>
  )
}
