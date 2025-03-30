import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import AppLayout from "@/layouts/app-layout"
import { type BreadcrumbItem } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Head, Link, router } from "@inertiajs/react"
import { ChevronLeft, Loader2, Save, X } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Kurslar",
    href: "/courses",
  },
  {
    title: "Yangi kurs",
    href: "/courses/new",
  },
]

// Form validatsiya sxemasi
const courseFormSchema = z.object({
  name: z.string().min(2, {
    message: "Kurs nomi kamida 2 ta belgidan iborat bo'lishi kerak",
  }),
  teacher: z.string().min(2, {
    message: "O'qituvchi nomi kamida 2 ta belgidan iborat bo'lishi kerak",
  }),
  description: z.string().min(10, {
    message: "Tavsif kamida 10 ta belgidan iborat bo'lishi kerak",
  }),
  duration: z.string().min(1, {
    message: "Davomiylikni kiriting",
  }),
  durationType: z.string(),
  price: z.string().min(1, {
    message: "Narxni kiriting",
  }),
  maxStudents: z.string().min(1, {
    message: "Maksimal o'quvchilar sonini kiriting",
  }),
  category: z.string().min(1, {
    message: "Kategoriyani tanlang",
  }),
  level: z.string().min(1, {
    message: "Darajani tanlang",
  }),
  color: z.string().min(1, {
    message: "Rangni tanlang",
  }),
})

type CourseFormValues = z.infer<typeof courseFormSchema>

// Standart qiymatlar
const defaultValues: Partial<CourseFormValues> = {
  name: "",
  teacher: "",
  description: "",
  duration: "",
  durationType: "oy",
  price: "",
  maxStudents: "15",
  category: "",
  level: "",
  color: "blue",
}

export default function NewCoursePage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues,
  })

  const handleSubmit = async (data: CourseFormValues) => {
    setIsSubmitting(true)

    try {
      const savedCourses = localStorage.getItem("courses")
      const courses = savedCourses ? JSON.parse(savedCourses) : []
      const newCourse = {
        id: courses.length + 1,
        name: data.name,
        teacher: data.teacher,
        description: data.description,
        duration: `${data.duration} ${data.durationType}`,
        price: `${data.price} so'm`,
        students: 0,
        maxStudents: parseInt(data.maxStudents),
        category: data.category,
        level: data.level,
        color: data.color,
        status: "active",
      }

      courses.push(newCourse)
      localStorage.setItem("courses", JSON.stringify(courses))

      toast({
        title: "Kurs qo'shildi",
        description: `"${data.name}" kursi muvaffaqiyatli qo'shildi.`,
        variant: "default",
      })

      router.visit("/courses")
    } catch (error) {
      toast({
        title: "Xatolik yuz berdi",
        description: "Kursni qo'shishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Yangi kurs" />
      <main className="flex-1 p-6 md:p-8 animate-in">
        <div className="mb-6">
          <Link href="/courses">
            <Button variant="outline" className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              Kurslar ro'yxatiga qaytish
            </Button>
          </Link>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Kurs haqida asosiy ma'lumotlar</CardTitle>
                <CardDescription>Kurs haqidagi asosiy ma'lumotlarni kiriting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Kurs nomi <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Masalan: Ingliz tili" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="teacher"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          O'qituvchi <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Masalan: Kamola Saidova" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Kategoriya <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Kategoriyani tanlang" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="til">Til kurslari</SelectItem>
                            <SelectItem value="aniq">Aniq fanlar</SelectItem>
                            <SelectItem value="tabiiy">Tabiiy fanlar</SelectItem>
                            <SelectItem value="kompyuter">Kompyuter kurslari</SelectItem>
                            <SelectItem value="boshqa">Boshqa</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Daraja <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Darajani tanlang" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="boshlangich">Boshlang'ich</SelectItem>
                            <SelectItem value="orta">O'rta</SelectItem>
                            <SelectItem value="yuqori">Yuqori</SelectItem>
                            <SelectItem value="professional">Professional</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="maxStudents"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Maksimal o'quvchilar soni <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input type="number" min="1" placeholder="Masalan: 15" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>
                            Davomiyligi <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input type="number" min="1" placeholder="Masalan: 3" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="durationType"
                      render={({ field }) => (
                        <FormItem className="w-[120px] pt-8">
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Birlik" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="hafta">Hafta</SelectItem>
                              <SelectItem value="oy">Oy</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Narxi <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Masalan: 450000" {...field} />
                        </FormControl>
                        <FormDescription>Narxni so'mda kiriting</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>
                          Tavsif <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Kurs haqida qisqacha ma'lumot..."
                            className="resize-none min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Kurs haqida qisqacha ma'lumot kiriting</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Kurs ko'rinishi</CardTitle>
                <CardDescription>Kursning ko'rinishini sozlang</CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Kurs rangi <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-2 md:grid-cols-4 gap-4"
                        >
                          <div>
                            <RadioGroupItem value="blue" id="color-blue" className="sr-only" />
                            <Label
                              htmlFor="color-blue"
                              className={`flex h-10 w-full cursor-pointer items-center justify-center rounded-md border-2 ${
                                field.value === "blue" ? "border-blue-500" : "border-transparent"
                              } bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-800`}
                            >
                              Ko'k
                            </Label>
                          </div>

                          <div>
                            <RadioGroupItem value="purple" id="color-purple" className="sr-only" />
                            <Label
                              htmlFor="color-purple"
                              className={`flex h-10 w-full cursor-pointer items-center justify-center rounded-md border-2 ${
                                field.value === "purple" ? "border-purple-500" : "border-transparent"
                              } bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100 hover:bg-purple-200 dark:hover:bg-purple-800`}
                            >
                              Binafsha
                            </Label>
                          </div>

                          <div>
                            <RadioGroupItem value="red" id="color-red" className="sr-only" />
                            <Label
                              htmlFor="color-red"
                              className={`flex h-10 w-full cursor-pointer items-center justify-center rounded-md border-2 ${
                                field.value === "red" ? "border-red-500" : "border-transparent"
                              } bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 hover:bg-red-200 dark:hover:bg-red-800`}
                            >
                              Qizil
                            </Label>
                          </div>

                          <div>
                            <RadioGroupItem value="green" id="color-green" className="sr-only" />
                            <Label
                              htmlFor="color-green"
                              className={`flex h-10 w-full cursor-pointer items-center justify-center rounded-md border-2 ${
                                field.value === "green" ? "border-green-500" : "border-transparent"
                              } bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 hover:bg-green-200 dark:hover:bg-green-800`}
                            >
                              Yashil
                            </Label>
                          </div>

                          <div>
                            <RadioGroupItem value="orange" id="color-orange" className="sr-only" />
                            <Label
                              htmlFor="color-orange"
                              className={`flex h-10 w-full cursor-pointer items-center justify-center rounded-md border-2 ${
                                field.value === "orange" ? "border-orange-500" : "border-transparent"
                              } bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100 hover:bg-orange-200 dark:hover:bg-orange-800`}
                            >
                              To'q sariq
                            </Label>
                          </div>

                          <div>
                            <RadioGroupItem value="teal" id="color-teal" className="sr-only" />
                            <Label
                              htmlFor="color-teal"
                              className={`flex h-10 w-full cursor-pointer items-center justify-center rounded-md border-2 ${
                                field.value === "teal" ? "border-teal-500" : "border-transparent"
                              } bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100 hover:bg-teal-200 dark:hover:bg-teal-800`}
                            >
                              Moviy
                            </Label>
                          </div>

                          <div>
                            <RadioGroupItem value="emerald" id="color-emerald" className="sr-only" />
                            <Label
                              htmlFor="color-emerald"
                              className={`flex h-10 w-full cursor-pointer items-center justify-center rounded-md border-2 ${
                                field.value === "emerald" ? "border-emerald-500" : "border-transparent"
                              } bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100 hover:bg-emerald-200 dark:hover:bg-emerald-800`}
                            >
                              Zumrad
                            </Label>
                          </div>

                          <div>
                            <RadioGroupItem value="amber" id="color-amber" className="sr-only" />
                            <Label
                              htmlFor="color-amber"
                              className={`flex h-10 w-full cursor-pointer items-center justify-center rounded-md border-2 ${
                                field.value === "amber" ? "border-amber-500" : "border-transparent"
                              } bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100 hover:bg-amber-200 dark:hover:bg-amber-800`}
                            >
                              Qahrabo
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Link href="/courses">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isSubmitting}
                  className="gap-2"
                >
                  <X className="h-4 w-4" />
                  Bekor qilish
                </Button>
              </Link>
              <Button type="submit" disabled={isSubmitting} className="gap-2">
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saqlanmoqda...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Saqlash
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </AppLayout>
  )
} 