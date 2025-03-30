import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import AppLayout from "@/layouts/app-layout"
import { type BreadcrumbItem } from "@/types"
import { Head, Link, router } from "@inertiajs/react"
import { ChevronLeft, Edit, Loader2, Trash2, Users } from "lucide-react"
import { useEffect, useState } from "react"

interface Course {
  id: number
  name: string
  teacher: string
  description: string
  duration: string
  price: string
  students: number
  maxStudents: number
  category: string
  level: string
  color: string
  status: string
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Kurslar",
    href: "/courses",
  },
  {
    title: "Kurs ma'lumotlari",
    href: "/courses/{id}",
  },
]

export default function CourseDetailsPage({ id }: { id: number }) {
  const { toast } = useToast()
  const [course, setCourse] = useState<Course | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCourses = localStorage.getItem("courses")

      if (savedCourses) {
        const courses = JSON.parse(savedCourses)
        const foundCourse = courses.find((c: Course) => c.id === id)

        if (foundCourse) {
          setCourse(foundCourse)
        } else {
          toast({
            title: "Xatolik",
            description: "Kurs topilmadi",
            variant: "destructive",
          })
          router.visit("/courses")
        }
      }
      setIsLoading(false)
    }
  }, [id, router, toast])

  const handleDeleteCourse = () => {
    const savedCourses = localStorage.getItem("courses")

    if (savedCourses) {
      const courses = JSON.parse(savedCourses)
      const updatedCourses = courses.filter((c: Course) => c.id !== id)
      localStorage.setItem("courses", JSON.stringify(updatedCourses))

      toast({
        title: "Kurs o'chirildi",
        description: `"${course?.name}" kursi muvaffaqiyatli o'chirildi.`,
        variant: "default",
      })

      router.visit("/courses")
    }
  }

  if (isLoading) {
    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Kurs ma'lumotlari" />
        <main className="flex-1 p-6 md:p-8 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p>Ma'lumotlar yuklanmoqda...</p>
          </div>
        </main>
      </AppLayout>
    )
  }

  if (!course) {
    return null
  }

  const getColorClass = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      case "purple":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
      case "red":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      case "green":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "orange":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100"
      case "teal":
        return "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100"
      case "emerald":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100"
      case "amber":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
    }
  }

  const getIconBackgroundClass = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-500"
      case "purple":
        return "bg-purple-500"
      case "red":
        return "bg-red-500"
      case "green":
        return "bg-green-500"
      case "orange":
        return "bg-orange-500"
      case "teal":
        return "bg-teal-500"
      case "emerald":
        return "bg-emerald-500"
      case "amber":
        return "bg-amber-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Kurs ma'lumotlari" />
      <main className="flex-1 p-6 md:p-8 animate-in">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/courses">
            <Button variant="outline" className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              Kurslar ro'yxatiga qaytish
            </Button>
          </Link>

          <div className="flex items-center gap-2">
            <Link href={`/courses/${id}/edit`}>
              <Button variant="outline" className="gap-2">
                <Edit className="h-4 w-4" />
                Tahrirlash
              </Button>
            </Link>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="gap-2">
                  <Trash2 className="h-4 w-4" />
                  O'chirish
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Kursni o'chirish</AlertDialogTitle>
                  <AlertDialogDescription>
                    Siz rostdan ham bu kursni o'chirmoqchimisiz? Bu amalni qaytarib bo'lmaydi.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteCourse}>O'chirish</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-none shadow-md">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className={`rounded-lg p-3 ${getIconBackgroundClass(course.color)}`}>
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle>{course.name}</CardTitle>
                  <CardDescription>{course.teacher}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Davomiyligi</p>
                  <p className="text-lg font-semibold">{course.duration}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Narxi</p>
                  <p className="text-lg font-semibold">{course.price}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">O'quvchilar</p>
                  <p className="text-lg font-semibold">
                    {course.students} / {course.maxStudents}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Holati</p>
                  <Badge variant={course.status === "active" ? "default" : "secondary"}>
                    {course.status === "active" ? "Faol" : "Faol emas"}
                  </Badge>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">Kategoriya</p>
                <Badge variant="outline" className="mt-1">
                  {course.category === "til"
                    ? "Til kurslari"
                    : course.category === "aniq"
                    ? "Aniq fanlar"
                    : course.category === "tabiiy"
                    ? "Tabiiy fanlar"
                    : course.category === "kompyuter"
                    ? "Kompyuter kurslari"
                    : "Boshqa"}
                </Badge>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">Daraja</p>
                <Badge variant="outline" className="mt-1">
                  {course.level === "boshlangich"
                    ? "Boshlang'ich"
                    : course.level === "orta"
                    ? "O'rta"
                    : course.level === "yuqori"
                    ? "Yuqori"
                    : "Professional"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Tavsif</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{course.description}</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </AppLayout>
  )
} 