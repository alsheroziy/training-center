import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import AppLayout from "@/layouts/app-layout"
import { type BreadcrumbItem } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Head, Link, router } from "@inertiajs/react"
import { format } from "date-fns"
import { Calendar, ChevronLeft, Loader2, Save, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const paymentFormSchema = z.object({
  student: z.string({
    required_error: "O'quvchini tanlang",
  }),
  course: z.string({
    required_error: "Kursni tanlang",
  }),
  amount: z.string().min(1, {
    message: "To'lov miqdorini kiriting",
  }),
  method: z.string({
    required_error: "To'lov usulini tanlang",
  }),
  date: z.date({
    required_error: "To'lov sanasini tanlang",
  }),
  status: z.string({
    required_error: "To'lov statusini tanlang",
  }),
  notes: z.string().optional(),
})

type PaymentFormValues = z.infer<typeof paymentFormSchema>

const defaultValues: Partial<PaymentFormValues> = {
  amount: "",
  method: "naqd",
  status: "tolangan",
  date: new Date(),
  notes: "",
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "To'lovlar",
    href: "/payments",
  },
  {
    title: "Yangi to'lov",
    href: "/payments/new",
  },
]

export default function NewPaymentPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [students, setStudents] = useState<any[]>([])
  const [courses, setCourses] = useState<any[]>([])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedStudents = localStorage.getItem("students")
      if (savedStudents) {
        try {
          const parsedStudents = JSON.parse(savedStudents)
          setStudents(parsedStudents)
        } catch (error) {
          console.error("O'quvchilar ma'lumotlarini o'qishda xatolik:", error)
          setStudents([])
        }
      } else {
        setStudents([
          { id: 1, name: "Aziza Karimova" },
          { id: 2, name: "Jasur Toshmatov" },
          { id: 3, name: "Malika Rahimova" },
          { id: 4, name: "Sardor Aliyev" },
          { id: 5, name: "Nilufar Qodirova" },
          { id: 6, name: "Akmal Salimov" },
          { id: 7, name: "Dilnoza Karimova" },
        ])
      }

      const savedCourses = localStorage.getItem("courses")
      if (savedCourses) {
        try {
          const parsedCourses = JSON.parse(savedCourses)
          setCourses(parsedCourses)
        } catch (error) {
          console.error("Kurslar ma'lumotlarini o'qishda xatolik:", error)
          setCourses([])
        }
      } else {
        setCourses([
          { id: 1, name: "Ingliz tili" },
          { id: 2, name: "Matematika" },
          { id: 3, name: "Rus tili" },
          { id: 4, name: "Kompyuter savodxonligi" },
          { id: 5, name: "Fizika" },
          { id: 6, name: "Kimyo" },
        ])
      }
    }
  }, [])

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues,
  })

  const handleSubmit = async (data: PaymentFormValues) => {
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const selectedStudent = students.find((student) => student.id.toString() === data.student)
      const selectedCourse = courses.find((course) => course.id.toString() === data.course)

      const newPayment = {
        id: Math.floor(Math.random() * 1000) + 100,
        student: selectedStudent ? selectedStudent.name : "Noma'lum o'quvchi",
        course: selectedCourse ? selectedCourse.name : "Noma'lum kurs",
        amount: `${data.amount} so'm`,
        date: format(data.date, "dd.MM.yyyy"),
        method: data.method === "naqd" ? "Naqd" : data.method === "karta" ? "Karta" : "Bank o'tkazmasi",
        status: data.status === "tolangan" ? "To'langan" : "To'lanmagan",
        notes: data.notes || "",
      }

      const existingPayments = JSON.parse(localStorage.getItem("payments") || "[]")
      localStorage.setItem("payments", JSON.stringify([...existingPayments, newPayment]))

      toast({
        title: "To'lov qo'shildi",
        description: `${newPayment.student} uchun ${newPayment.amount} to'lov muvaffaqiyatli qo'shildi.`,
        variant: "default",
      })

      router.visit("/payments")
    } catch (error) {
      toast({
        title: "Xatolik yuz berdi",
        description: error instanceof Error ? error.message : "To'lovni saqlashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Yangi to'lov" />
      <main className="flex-1 p-6 md:p-8 animate-in">
        <div className="mb-6">
          <Link href="/payments">
            <Button variant="outline" className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              To'lovlar ro'yxatiga qaytish
            </Button>
          </Link>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>To'lov ma'lumotlari</CardTitle>
                <CardDescription>To'lov haqidagi asosiy ma'lumotlarni kiriting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="student"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          O'quvchi <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="O'quvchini tanlang" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {students.length > 0 ? (
                              students.map((student) => (
                                <SelectItem key={student.id} value={student.id.toString()}>
                                  {student.name}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="no-students" disabled>
                                O'quvchilar mavjud emas
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="course"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Kurs <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Kursni tanlang" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {courses.length > 0 ? (
                              courses.map((course) => (
                                <SelectItem key={course.id} value={course.id.toString()}>
                                  {course.name}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="no-courses" disabled>
                                Kurslar mavjud emas
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          To'lov miqdori <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Masalan: 450000" {...field} />
                        </FormControl>
                        <FormDescription>To'lov miqdorini so'mda kiriting</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>
                          To'lov sanasi <span className="text-red-500">*</span>
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                              >
                                {field.value ? format(field.value, "dd.MM.yyyy") : <span>Sanani tanlang</span>}
                                <Calendar className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="method"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>
                          To'lov usuli <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="naqd" id="naqd" />
                              <Label htmlFor="naqd">Naqd</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="karta" id="karta" />
                              <Label htmlFor="karta">Karta</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="bank" id="bank" />
                              <Label htmlFor="bank">Bank o'tkazmasi</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>
                          To'lov statusi <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="tolangan" id="tolangan" />
                              <Label htmlFor="tolangan">To'langan</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="tolanmagan" id="tolanmagan" />
                              <Label htmlFor="tolanmagan">To'lanmagan</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Izohlar</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="To'lov haqida qo'shimcha ma'lumotlar..."
                            className="resize-none min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>To'lov haqida qo'shimcha ma'lumotlar kiriting</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Link href="/payments">
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