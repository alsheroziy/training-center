import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import AppLayout from "@/layouts/app-layout"
import { type BreadcrumbItem } from "@/types"
import { Link } from "@inertiajs/react"
import { Calendar, ChevronLeft, ChevronRight, Clock, Plus } from "lucide-react"
import { useEffect, useState } from "react"

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

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Dars jadvali",
    href: "/lesson-schedule",
  },
]

export default function LessonSchedulePage() {
  const { toast } = useToast()
  const [lessons, setLessons] = useState<any[]>([])
  const [currentWeek, setCurrentWeek] = useState({
    start: "31 mar",
    end: "5 apr",
  })
  const [viewMode, setViewMode] = useState<"week" | "day">("week")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLessons = localStorage.getItem("lessons")
      if (savedLessons) {
        setLessons(JSON.parse(savedLessons))
      }
    }
  }, [])

  const handleDeleteLesson = (lessonId: number) => {
    if (window.confirm("Bu darsni o'chirishni xohlaysizmi?")) {
      const updatedLessons = lessons.filter((lesson) => lesson.id !== lessonId)
      localStorage.setItem("lessons", JSON.stringify(updatedLessons))
      setLessons(updatedLessons)

      toast({
        title: "Dars o'chirildi",
        description: "Dars muvaffaqiyatli o'chirildi.",
        variant: "default",
      })
    }
  }

  const getWeekDates = () => {
    const dates = []
    const startDate = new Date(currentWeek)
    startDate.setDate(startDate.getDate() - startDate.getDay() + 1) // Dushanbadan boshlash

    for (let i = 0; i < 6; i++) {
      const date = new Date(startDate)
      date.setDate(date.getDate() + i)
      dates.push(date)
    }

    return dates
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("uz-UZ", {
      day: "numeric",
      month: "long",
    })
  }

  const getLessonsForDay = (day: number) => {
    return lessons.filter((lesson) => lesson.day === day)
  }

  const getLessonsForTimeSlot = (day: number, timeSlot: string) => {
    return lessons.filter(
      (lesson) => lesson.day === day && lesson.startTime === timeSlot
    )
  }

  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentWeek)
    newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7))
    setCurrentWeek(newDate)
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <main className="flex-1 p-6 md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Dars jadvali</h1>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateWeek("prev")}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">
                {formatDate(getWeekDates()[0])} - {formatDate(getWeekDates()[5])}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateWeek("next")}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "week" ? "default" : "outline"}
              onClick={() => setViewMode("week")}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Hafta
            </Button>
            <Button
              variant={viewMode === "day" ? "default" : "outline"}
              onClick={() => setViewMode("day")}
            >
              <Clock className="mr-2 h-4 w-4" />
              Kun
            </Button>
            <Link href="/lesson-schedule/create">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Yangi dars
              </Button>
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Dars jadvali</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border p-2 text-left">Vaqt</th>
                    {weekDays.map((day) => (
                      <th key={day.id} className="border p-2 text-left">
                        {day.fullName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((timeSlot) => (
                    <tr key={timeSlot}>
                      <td className="border p-2 text-sm text-muted-foreground">
                        {timeSlot}
                      </td>
                      {weekDays.map((day) => (
                        <td key={day.id} className="border p-2">
                          {getLessonsForTimeSlot(day.id, timeSlot).map(
                            (lesson) => (
                              <div
                                key={lesson.id}
                                className={`mb-2 rounded-md p-2 text-sm ${
                                  lesson.color === "blue"
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                                    : lesson.color === "purple"
                                      ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
                                      : lesson.color === "red"
                                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                                        : lesson.color === "green"
                                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                          : lesson.color === "orange"
                                            ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100"
                                            : lesson.color === "teal"
                                              ? "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100"
                                              : lesson.color === "emerald"
                                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100"
                                                : lesson.color === "amber"
                                                  ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
                                                  : ""
                                }`}
                              >
                                <div className="font-medium">{lesson.title}</div>
                                <div className="text-xs opacity-75">
                                  {lesson.teacher}
                                </div>
                                <div className="text-xs opacity-75">
                                  {lesson.room}
                                </div>
                                <div className="mt-2 flex gap-1">
                                  <Link
                                    href={`/lesson-schedule/${lesson.id}/edit`}
                                    className="text-xs underline hover:opacity-75"
                                  >
                                    Tahrirlash
                                  </Link>
                                  <button
                                    onClick={() => handleDeleteLesson(lesson.id)}
                                    className="text-xs text-red-600 underline hover:opacity-75"
                                  >
                                    O'chirish
                                  </button>
                                </div>
                              </div>
                            )
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </AppLayout>
  )
} 