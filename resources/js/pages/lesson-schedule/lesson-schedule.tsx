import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import AppLayout from "@/layouts/app-layout"
import { type BreadcrumbItem } from "@/types"
import { Head, Link } from "@inertiajs/react"
import { Calendar, ChevronLeft, ChevronRight, Clock, Edit, MapPin, Plus, Trash2, User } from "lucide-react"
import { useEffect, useState } from "react"

const weekDays = [
  { id: 1, name: "Dush", fullName: "Dushanba" },
  { id: 2, name: "Sesh", fullName: "Seshanba" },
  { id: 3, name: "Chor", fullName: "Chorshanba" },
  { id: 4, name: "Pay", fullName: "Payshanba" },
  { id: 5, name: "Jum", fullName: "Juma" },
  { id: 6, name: "Shan", fullName: "Shanba" },
]

const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]

// Dastlabki dars ma'lumotlari
const initialLessons = [
  {
    id: 1,
    title: "Ingliz tili",
    teacher: "Kamola Saidova",
    day: 1, // Dushanba
    startTime: "09:00",
    endTime: "10:20",
    room: "205",
    color: "blue",
  },
  {
    id: 2,
    title: "Matematika",
    teacher: "Akmal Rahimov",
    day: 1, // Dushanba
    startTime: "11:00",
    endTime: "12:20",
    room: "301",
    color: "purple",
  },
  {
    id: 3,
    title: "Rus tili",
    teacher: "Olga Petrova",
    day: 2, // Seshanba
    startTime: "09:00",
    endTime: "10:20",
    room: "207",
    color: "red",
  },
  {
    id: 4,
    title: "Kompyuter savodxonligi",
    teacher: "Bobur Karimov",
    day: 2, // Seshanba
    startTime: "11:00",
    endTime: "12:20",
    room: "404",
    color: "green",
  },
  {
    id: 5,
    title: "Fizika",
    teacher: "Jahongir Azimov",
    day: 3, // Chorshanba
    startTime: "09:00",
    endTime: "10:20",
    room: "302",
    color: "orange",
  },
  {
    id: 6,
    title: "Kimyo",
    teacher: "Nilufar Qodirova",
    day: 3, // Chorshanba
    startTime: "11:00",
    endTime: "12:20",
    room: "305",
    color: "teal",
  },
  {
    id: 7,
    title: "Ingliz tili",
    teacher: "Kamola Saidova",
    day: 4, // Payshanba
    startTime: "09:00",
    endTime: "10:20",
    room: "205",
    color: "blue",
  },
  {
    id: 8,
    title: "Matematika",
    teacher: "Akmal Rahimov",
    day: 4, // Payshanba
    startTime: "11:00",
    endTime: "12:20",
    room: "301",
    color: "purple",
  },
  {
    id: 9,
    title: "Rus tili",
    teacher: "Olga Petrova",
    day: 5, // Juma
    startTime: "09:00",
    endTime: "10:20",
    room: "207",
    color: "red",
  },
  {
    id: 10,
    title: "Kompyuter savodxonligi",
    teacher: "Bobur Karimov",
    day: 5, // Juma
    startTime: "11:00",
    endTime: "12:20",
    room: "404",
    color: "green",
  },
  {
    id: 11,
    title: "Fizika",
    teacher: "Jahongir Azimov",
    day: 6, // Shanba
    startTime: "09:00",
    endTime: "10:20",
    room: "302",
    color: "orange",
  },
  {
    id: 12,
    title: "Kimyo",
    teacher: "Nilufar Qodirova",
    day: 6, // Shanba
    startTime: "11:00",
    endTime: "12:20",
    room: "305",
    color: "teal",
  },
  {
    id: 13,
    title: "Biologiya",
    teacher: "Sardor Qosimov",
    day: 1, // Dushanba
    startTime: "13:00",
    endTime: "14:20",
    room: "203",
    color: "emerald",
  },
  {
    id: 14,
    title: "Tarix",
    teacher: "Dilshod Kamolov",
    day: 3, // Chorshanba
    startTime: "13:00",
    endTime: "14:20",
    room: "201",
    color: "amber",
  },
]

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Dars jadvali",
    href: "/lesson-schedule",
  },
]

// Rang klasslari
const getColorClass = (color: string) => {
  const colorMap: Record<string, string> = {
    blue: "border-blue-500 bg-blue-50 dark:bg-blue-950/30",
    purple: "border-purple-500 bg-purple-50 dark:bg-purple-950/30",
    red: "border-red-500 bg-red-50 dark:bg-red-950/30",
    green: "border-green-500 bg-green-50 dark:bg-green-950/30",
    orange: "border-orange-500 bg-orange-50 dark:bg-orange-950/30",
    teal: "border-teal-500 bg-teal-50 dark:bg-teal-950/30",
    emerald: "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30",
    amber: "border-amber-500 bg-amber-50 dark:bg-amber-950/30",
  }
  return colorMap[color] || "border-gray-500 bg-gray-50 dark:bg-gray-800/30"
}

export default function LessonSchedulePage() {
  const { toast } = useToast()
  const [currentWeek, setCurrentWeek] = useState({
    start: "31 mar",
    end: "5 apr",
  })

  const [viewMode, setViewMode] = useState<"hafta" | "kun">("hafta")
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [lessonToDelete, setLessonToDelete] = useState<number | null>(null)

  // LocalStorage-dan darslarni olish
  const [lessons, setLessons] = useState<typeof initialLessons>([])

  // Component mount bo'lganda localStorage-dan ma'lumotlarni olish
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLessons = localStorage.getItem("lessons")
      if (savedLessons) {
        setLessons(JSON.parse(savedLessons))
      } else {
        // Agar localStorage bo'sh bo'lsa, dastlabki ma'lumotlarni saqlash
        setLessons(initialLessons)
        localStorage.setItem("lessons", JSON.stringify(initialLessons))
      }
    }
  }, [])

  // Darsni vaqt bo'yicha joylashtirishni hisoblash
  const getLessonPosition = (startTime: string) => {
    const hour = Number.parseInt(startTime.split(":")[0])
    const minute = Number.parseInt(startTime.split(":")[1])

    // 8:00 dan boshlab necha soat o'tganini hisoblash
    const hourDiff = hour - 8
    // Minutlarni soatga aylantirish (60 minutda 1 soat)
    const minuteOffset = minute / 60

    return hourDiff + minuteOffset
  }

  // Darsning davomiyligini hisoblash
  const getLessonDuration = (startTime: string, endTime: string) => {
    const startHour = Number.parseInt(startTime.split(":")[0])
    const startMinute = Number.parseInt(startTime.split(":")[1])
    const endHour = Number.parseInt(endTime.split(":")[0])
    const endMinute = Number.parseInt(endTime.split(":")[1])

    // Soatlar farqi
    const hourDiff = endHour - startHour
    // Minutlar farqi soatga aylantirilgan
    const minuteDiff = (endMinute - startMinute) / 60

    return hourDiff + minuteDiff
  }

  // Oldingi hafta
  const prevWeek = () => {
    setCurrentWeek({
      start: "24 mar",
      end: "30 mar",
    })
  }

  // Keyingi hafta
  const nextWeek = () => {
    setCurrentWeek({
      start: "7 apr",
      end: "13 apr",
    })
  }

  // Bugungi kun
  const goToToday = () => {
    setCurrentWeek({
      start: "31 mar",
      end: "5 apr",
    })
    setSelectedDay(null)
  }

  // Darsni tahrirlash
  const handleEditLesson = (lessonId: number) => {
    window.location.href = `/lesson-schedule/${lessonId}/edit`
  }

  // Darsni o'chirish dialogini ochish
  const handleDeleteClick = (lessonId: number) => {
    setLessonToDelete(lessonId)
    setDeleteDialogOpen(true)
  }

  // Darsni o'chirish
  const handleDeleteLesson = () => {
    if (lessonToDelete) {
      const updatedLessons = lessons.filter((lesson) => lesson.id !== lessonToDelete)
      setLessons(updatedLessons)
      localStorage.setItem("lessons", JSON.stringify(updatedLessons))

      toast({
        title: "Dars o'chirildi",
        description: "Dars muvaffaqiyatli o'chirildi",
        variant: "default",
      })

      setDeleteDialogOpen(false)
      setLessonToDelete(null)
    }
  }

  // Haftalik ko'rinish
  const renderWeekView = () => {
    return (
      <div className="w-full grid grid-cols-[auto_repeat(6,1fr)] border rounded-lg overflow-hidden bg-card">
        {/* Vaqt ustuni */}
        <div className="border-r">
          <div className="h-16 border-b p-2 flex items-center justify-center bg-muted/30">
            <Clock className="h-5 w-5 text-muted-foreground" />
          </div>
          {timeSlots.map((time) => (
            <div
              key={time}
              className="h-20 border-b p-2 flex items-center justify-center text-sm font-medium text-muted-foreground"
            >
              {time}
            </div>
          ))}
        </div>

        {/* Kunlar ustunlari */}
        {weekDays.map((day) => (
          <div key={day.id} className="border-r last:border-r-0 relative">
            {/* Kun sarlavhasi */}
            <div
              className="h-16 border-b p-2 flex flex-col items-center justify-center bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => {
                setViewMode("kun")
                setSelectedDay(day.id)
              }}
            >
              <div className="text-2xl font-bold">{day.id}</div>
              <div className="text-sm text-muted-foreground">{day.name}</div>
            </div>

            {/* Vaqt kataklari */}
            {timeSlots.map((time) => (
              <div key={time} className="h-20 border-b p-1 relative">
                {/* Bo'sh kataklar */}
              </div>
            ))}

            {/* Darslar */}
            {lessons
              .filter((lesson) => lesson.day === day.id)
              .map((lesson) => {
                const top = getLessonPosition(lesson.startTime) * 80 + 64 // 80px har bir vaqt uchun, 64px sarlavha balandligi
                const height = getLessonDuration(lesson.startTime, lesson.endTime) * 80 // 80px har bir soat uchun

                return (
                  <div
                    key={lesson.id}
                    className={`absolute left-1 right-1 rounded-md border-l-4 p-2 shadow-sm ${getColorClass(lesson.color)}`}
                    style={{
                      top: `${top}px`,
                      height: `${height}px`,
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-sm truncate">{lesson.title}</div>
                        <div className="text-xs text-muted-foreground truncate">{lesson.teacher}</div>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs">
                            {lesson.startTime} - {lesson.endTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs">{lesson.room}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEditLesson(lesson.id)
                          }}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-destructive"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteClick(lesson.id)
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        ))}
      </div>
    )
  }

  // Kunlik ko'rinish
  const renderDayView = () => {
    const day = selectedDay || 1
    const dayName = weekDays.find((d) => d.id === day)?.fullName || "Dushanba"

    return (
      <Card className="border-none shadow-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">{dayName}</h2>

          <div className="space-y-4">
            {lessons
              .filter((lesson) => lesson.day === day)
              .sort((a, b) => a.startTime.localeCompare(b.startTime))
              .map((lesson) => (
                <div key={lesson.id} className={`rounded-lg border-l-4 p-4 shadow-sm ${getColorClass(lesson.color)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">{lesson.title}</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-background/80 px-2 py-1 rounded-full text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {lesson.startTime} - {lesson.endTime}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleEditLesson(lesson.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => handleDeleteClick(lesson.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <div className="bg-background/80 p-2 rounded-full">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">O'qituvchi</div>
                        <div className="font-medium">{lesson.teacher}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="bg-background/80 p-2 rounded-full">
                        <MapPin className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Xona</div>
                        <div className="font-medium">{lesson.room}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dars jadvali" />
      <main className="flex-1 p-6 md:p-8 animate-in space-y-6">
        {/* Navigatsiya */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={prevWeek}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-lg font-medium">
              {currentWeek.start} - {currentWeek.end}
            </div>
            <Button variant="outline" size="icon" onClick={nextWeek}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-muted/50 p-1 rounded-lg flex">
              <Button
                variant={viewMode === "hafta" ? "default" : "ghost"}
                size="sm"
                onClick={() => {
                  setViewMode("hafta")
                  setSelectedDay(null)
                }}
                className="rounded-md"
              >
                Hafta
              </Button>
              <Button
                variant={viewMode === "kun" ? "default" : "ghost"}
                size="sm"
                onClick={() => {
                  setViewMode("kun")
                  setSelectedDay(selectedDay || 1)
                }}
                className="rounded-md"
              >
                Kun
              </Button>
            </div>

            <Button onClick={goToToday} className="gap-1">
              <Calendar className="h-4 w-4" />
              Bugun
            </Button>

            <Link href="/lesson-schedule/new">
              <Button className="gap-1">
                <Plus className="h-4 w-4" />
                Yangi dars
              </Button>
            </Link>
          </div>
        </div>

        {/* Jadval */}
        <div className="overflow-x-auto pb-4">{viewMode === "hafta" ? renderWeekView() : renderDayView()}</div>
      </main>

      {/* Darsni o'chirish dialogi */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Darsni o'chirish</AlertDialogTitle>
            <AlertDialogDescription>
              Haqiqatan ham bu darsni o'chirmoqchimisiz? Bu amalni qaytarib bo'lmaydi.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteLesson} className="bg-destructive text-destructive-foreground">
              O'chirish
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  )
}
