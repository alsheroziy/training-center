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
import { Calendar, ChevronLeft, Loader2, Save, X } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "O'quvchilar",
    href: "/students",
  },
  {
    title: "Yangi o'quvchi",
    href: "/students/new",
  },
]

const studentFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "Ism kamida 2 ta belgidan iborat bo'lishi kerak",
  }),
  lastName: z.string().min(2, {
    message: "Familiya kamida 2 ta belgidan iborat bo'lishi kerak",
  }),
  phone: z.string().min(9, {
    message: "Telefon raqami kamida 9 ta raqamdan iborat bo'lishi kerak",
  }),
  email: z
    .string()
    .email({
      message: "Noto'g'ri email format",
    })
    .optional()
    .or(z.literal("")),
  birthDate: z.date({
    required_error: "Tug'ilgan sanani tanlang",
  }),
  address: z.string().min(5, {
    message: "Manzil kamida 5 ta belgidan iborat bo'lishi kerak",
  }),
  course: z.string({
    required_error: "Kursni tanlang",
  }),
  gender: z.string({
    required_error: "Jinsni tanlang",
  }),
  parentName: z.string().min(2, {
    message: "Ota-ona ismi kamida 2 ta belgidan iborat bo'lishi kerak",
  }),
  parentPhone: z.string().min(9, {
    message: "Telefon raqami kamida 9 ta raqamdan iborat bo'lishi kerak",
  }),
  notes: z.string().optional(),
  sendSMS: z.boolean().default(true),
})

type StudentFormValues = z.infer<typeof studentFormSchema>

const defaultValues: Partial<StudentFormValues> = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  address: "",
  parentName: "",
  parentPhone: "",
  notes: "",
  sendSMS: true,
}

export default function NewStudentPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentFormSchema),
    defaultValues,
  })

  const handleSubmit = async (data: StudentFormValues) => {
    setIsSubmitting(true)

    try {
      router.post('/students', {
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone,
        email: data.email || null,
        birth_date: data.birthDate,
        address: data.address,
        gender: data.gender,
        parent_name: data.parentName,
        parent_phone: data.parentPhone,
        notes: data.notes || null,
        status: 'active',
      }, {
        onSuccess: () => {
          toast({
            title: "O'quvchi qo'shildi",
            description: `${data.firstName} ${data.lastName} muvaffaqiyatli qo'shildi.`,
            variant: "default",
          })
        },
        onError: (errors) => {
          toast({
            title: "Xatolik yuz berdi",
            description: "O'quvchini saqlashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
            variant: "destructive",
          })
        },
        onFinish: () => {
          setIsSubmitting(false)
        }
      })
    } catch (error) {
      toast({
        title: "Xatolik yuz berdi",
        description: error instanceof Error ? error.message : "O'quvchini saqlashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Yangi o'quvchi qo'shish" />
      <main className="flex-1 p-6 md:p-8 animate-in">
        <div className="mb-6">
          <Link href="/students">
            <Button variant="outline" className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              O'quvchilar ro'yxatiga qaytish
            </Button>
          </Link>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>O'quvchi haqida asosiy ma'lumotlar</CardTitle>
                <CardDescription>O'quvchi haqidagi asosiy ma'lumotlarni kiriting</CardDescription>
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
                          <Input placeholder="Masalan: Aziza" {...field} />
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
                          <Input placeholder="Masalan: Karimova" {...field} />
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
                        <FormLabel>Email</FormLabel>
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
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Jinsi <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Jinsni tanlang" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Erkak</SelectItem>
                            <SelectItem value="female">Ayol</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
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
                <CardTitle>Kurs ma'lumotlari</CardTitle>
                <CardDescription>O'quvchi qaysi kursga yozilayotganini tanlang</CardDescription>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Ota-ona ma'lumotlari</CardTitle>
                <CardDescription>O'quvchining ota-onasi haqida ma'lumot kiriting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="parentName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Ota-ona ismi <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Masalan: Karimov Akbar" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="parentPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Ota-ona telefon raqami <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Masalan: 901234567" {...field} />
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
                <CardTitle>Qo'shimcha ma'lumotlar</CardTitle>
                <CardDescription>O'quvchi haqida qo'shimcha ma'lumotlar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Izohlar</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="O'quvchi haqida qo'shimcha ma'lumotlar..."
                          className="resize-none min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>O'quvchi haqida qo'shimcha ma'lumotlar kiriting</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sendSMS"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">SMS xabarnomalar</FormLabel>
                        <FormDescription>
                          O'quvchiga darslar va to'lovlar haqida SMS xabarnomalar yuborish
                        </FormDescription>
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
              <Link href="/students">
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