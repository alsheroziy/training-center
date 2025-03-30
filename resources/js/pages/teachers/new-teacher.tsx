import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import AppLayout from "@/layouts/app-layout"
import { type BreadcrumbItem } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Head, Link, router } from "@inertiajs/react"
import { format } from "date-fns"
import { Calendar, ChevronLeft, Loader2, Save, Upload, X } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "O'qituvchilar",
    href: "/teachers",
  },
  {
    title: "Yangi o'qituvchi",
    href: "/teachers/new",
  },
]

// Form validatsiya sxemasi
const teacherFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "Ism kamida 2 ta belgidan iborat bo'lishi kerak",
  }),
  lastName: z.string().min(2, {
    message: "Familiya kamida 2 ta belgidan iborat bo'lishi kerak",
  }),
  phone: z.string().min(9, {
    message: "Telefon raqami kamida 9 ta raqamdan iborat bo'lishi kerak",
  }),
  email: z.string().email({
    message: "Noto'g'ri email format",
  }),
  birthDate: z.date({
    required_error: "Tug'ilgan sanani tanlang",
  }),
  address: z.string().min(5, {
    message: "Manzil kamida 5 ta belgidan iborat bo'lishi kerak",
  }),
  subject: z.string({
    required_error: "Fanni tanlang",
  }),
  education: z.string({
    required_error: "Ma'lumotni tanlang",
  }),
  experience: z.string().min(1, {
    message: "Tajribani kiriting",
  }),
  salary: z.string().min(1, {
    message: "Maoshni kiriting",
  }),
  bio: z.string().min(10, {
    message: "Biografiya kamida 10 ta belgidan iborat bo'lishi kerak",
  }),
  joinDate: z.date({
    required_error: "Ishga kirgan sanani tanlang",
  }),
  isActive: z.boolean().default(true),
})

type TeacherFormValues = z.infer<typeof teacherFormSchema>

// Standart qiymatlar
const defaultValues: Partial<TeacherFormValues> = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  address: "",
  experience: "",
  salary: "",
  bio: "",
  isActive: true,
}

export default function NewTeacherPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<TeacherFormValues>({
    resolver: zodResolver(teacherFormSchema),
    defaultValues,
  })

  const handleSubmit = async (data: TeacherFormValues) => {
    setIsSubmitting(true)

    try {
      // Simulyatsiya qilingan yuborish jarayoni
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Yangi o'qituvchi obyektini yaratish
      const newTeacher = {
        id: Math.floor(Math.random() * 1000) + 100, // Random ID yaratish
        name: `${data.firstName} ${data.lastName}`,
        phone: `+998 ${data.phone.substring(0, 2)} ${data.phone.substring(2, 5)} ${data.phone.substring(5, 7)} ${data.phone.substring(7, 9)}`,
        subject:
          data.subject === "ingliz"
            ? "Ingliz tili"
            : data.subject === "matematika"
              ? "Matematika"
              : data.subject === "rus"
                ? "Rus tili"
                : data.subject === "kompyuter"
                  ? "Kompyuter savodxonligi"
                  : data.subject === "fizika"
                    ? "Fizika"
                    : data.subject === "kimyo"
                      ? "Kimyo"
                      : data.subject,
        status: data.isActive ? "Faol" : "Nofaol",
        joinDate: data.joinDate.toLocaleDateString("ru-RU").replace(/\./g, "."),
        groups: 0,
        email: data.email,
        address: data.address,
        education: data.education,
        experience: data.experience,
        salary: data.salary,
        bio: data.bio,
      }

      // LocalStorage-ga saqlash
      const existingTeachers = JSON.parse(localStorage.getItem("teachers") || "[]")
      localStorage.setItem("teachers", JSON.stringify([...existingTeachers, newTeacher]))

      // Muvaffaqiyatli saqlangandan so'ng o'qituvchilar ro'yxatiga qaytish
      toast({
        title: "O'qituvchi qo'shildi",
        description: `${data.firstName} ${data.lastName} muvaffaqiyatli qo'shildi.`,
        variant: "default",
      })

      router.visit("/teachers")
    } catch (error) {
      toast({
        title: "Xatolik yuz berdi",
        description: error instanceof Error ? error.message : "O'qituvchini saqlashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Yangi o'qituvchi qo'shish" />
      <main className="flex-1 p-6 md:p-8 animate-in">
        <div className="mb-6">
          <Link href="/teachers">
            <Button variant="outline" className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              O'qituvchilar ro'yxatiga qaytish
            </Button>
          </Link>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>O'qituvchi haqida asosiy ma'lumotlar</CardTitle>
                <CardDescription>O'qituvchi haqidagi asosiy ma'lumotlarni kiriting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Ism <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Masalan: Kamola" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Familiya <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Masalan: Saidova" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Telefon raqami <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Masalan: 901234567" {...field} />
                        </FormControl>
                        <FormDescription>Faqat raqamlarni kiriting</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Email <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Masalan: example@mail.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>
                          Tug'ilgan sana <span className="text-red-500">*</span>
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
                              disabled={(date) => date > new Date() || date < new Date("1950-01-01")}
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
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Manzil <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Masalan: Toshkent sh., Chilonzor tumani, 19-mavze" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Kasbiy ma'lumotlar</CardTitle>
                <CardDescription>O'qituvchining kasbiy ma'lumotlarini kiriting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Fan <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Fanni tanlang" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ingliz">Ingliz tili</SelectItem>
                            <SelectItem value="matematika">Matematika</SelectItem>
                            <SelectItem value="rus">Rus tili</SelectItem>
                            <SelectItem value="kompyuter">Kompyuter savodxonligi</SelectItem>
                            <SelectItem value="fizika">Fizika</SelectItem>
                            <SelectItem value="kimyo">Kimyo</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="education"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Ma'lumoti <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Ma'lumotni tanlang" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="oliy">Oliy</SelectItem>
                            <SelectItem value="orta">O'rta maxsus</SelectItem>
                            <SelectItem value="magistr">Magistratura</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Tajribasi (yil) <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input type="number" min="0" placeholder="Masalan: 5" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Maoshi <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Masalan: 3000000" {...field} />
                        </FormControl>
                        <FormDescription>Maoshni so'mda kiriting</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="joinDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>
                          Ishga kirgan sana <span className="text-red-500">*</span>
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
                              disabled={(date) => date > new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="h-20 w-20 rounded-lg bg-muted flex items-center justify-center">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Rasm yuklash</h4>
                      <p className="text-sm text-muted-foreground mb-2">JPG, PNG yoki GIF, 2MB gacha</p>
                      <Button type="button" size="sm" variant="outline">
                        Tanlash
                      </Button>
                    </div>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Biografiya <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="O'qituvchi haqida qisqacha ma'lumot..."
                          className="resize-none min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>O'qituvchi haqida qisqacha ma'lumot kiriting</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Faol holati</FormLabel>
                        <FormDescription>O'qituvchi hozirda faol holatdami?</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Link href="/teachers">
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