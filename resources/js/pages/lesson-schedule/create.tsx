import AppLayout from "@/layouts/app-layout"
import { type BreadcrumbItem } from "@/types"
import LessonScheduleForm from "./lesson-schedule-form"

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
    title: "Yangi dars",
    href: "/lesson-schedule/create",
  },
]

export default function NewLessonPage() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <LessonScheduleForm weekDays={weekDays} timeSlots={timeSlots} colors={colors} />
    </AppLayout>
  )
} 