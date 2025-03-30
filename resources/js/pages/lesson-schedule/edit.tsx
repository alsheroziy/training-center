import AppLayout from "@/layouts/app-layout"
import { type BreadcrumbItem } from "@/types"
import { usePage } from "@inertiajs/react"
import { useEffect, useState } from "react"
import LessonScheduleForm from "./lesson-schedule-form"

interface Lesson {
  id: number
  title: string
  teacher: string
  day: number
  startTime: string
  endTime: string
  room: string
  color: string
  notes?: string
}

// Hafta kunlari
const weekDays = [
  { id: 1, name: "Dushanba", fullName: "Dushanba" },
  { id: 2, name: "Seshanba", fullName: "Seshanba" },
  { id: 3, name: "Chorshanba", fullName: "Chorshanba" },
  { id: 4, name: "Payshanba", fullName: "Payshanba" },
  { id: 5, name: "Juma", fullName: "Juma" },
  { id: 6, name: "Shanba", fullName: "Shanba" },
]

// Vaqt oralig'lari
const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
]

// Ranglar
const colors = [
  "blue",
  "purple",
  "red",
  "green",
  "orange",
  "teal",
  "emerald",
  "amber",
]

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Dars jadvali",
    href: "/lesson-schedule",
  },
  {
    title: "Darsni tahrirlash",
    href: "/lesson-schedule/edit",
  },
]

export default function EditLessonPage() {
  const { id } = usePage().props
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== "undefined" && id) {
      const lessonId = Number(id)
      const savedLessons = localStorage.getItem("lessons")

      if (savedLessons) {
        const lessons = JSON.parse(savedLessons)
        const foundLesson = lessons.find((l: Lesson) => l.id === lessonId)

        if (foundLesson) {
          setLesson(foundLesson)
        }
      }
    }
    setIsLoading(false)
  }, [id])

  if (isLoading) {
    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <main className="flex-1 p-6 md:p-8 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p>Ma'lumotlar yuklanmoqda...</p>
          </div>
        </main>
      </AppLayout>
    )
  }

  if (!lesson) {
    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <main className="flex-1 p-6 md:p-8 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <p>Dars topilmadi</p>
          </div>
        </main>
      </AppLayout>
    )
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <LessonScheduleForm lesson={lesson} weekDays={weekDays} timeSlots={timeSlots} colors={colors} />
    </AppLayout>
  )
} 