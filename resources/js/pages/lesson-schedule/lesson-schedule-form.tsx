import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "@inertiajs/react"
import { ChevronLeft, Clock, Loader2, Save, X } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

// Form validatsiya sxemasi
const lessonFormSchema = z.object({
  course: z.string({
    required_error: "Kursni tanlang",
  }),
  teacher: z.string({
    required_error: "O'qituvchini tanlang",
  }),
  day: z.string({
    required_error: "Kunni tanlang",
  }),
  startTime: z.string({
    required_error: "Boshlanish vaqtini kiriting",
  }),
  endTime: z.string({
    required_error: "Tugash vaqtini kiriting",
  }),
  room: z.string().min(1, {
    message: "Xona raqamini kiriting",
  }),
  color: z.string().min(1, {
    message: "Rangni tanlang",
  }),
  notes: z.string().optional(),
})

type LessonFormValues = z.infer<typeof lessonFormSchema>

interface LessonFormProps {
  lesson?: {
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
  weekDays: Array<{ id: number; name: string; fullName: string }>
  timeSlots: string[]
  colors: string[]
}

export default function LessonScheduleForm({ lesson, weekDays, timeSlots, colors }: LessonFormProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form uchun standart qiymatlar
  const defaultValues: Partial<LessonFormValues> = {
    startTime: "09:00",
    endTime: "10:30",
    room: "",
    color: "blue",
    notes: "",
  }

  const form = useForm<LessonFormValues>({
    resolver: zodResolver(lessonFormSchema),
    defaultValues: lesson
      ? {
          course: lesson.title.toLowerCase().replace(" ", ""),
          teacher: lesson.teacher.toLowerCase().replace(" ", ""),
          day: lesson.day.toString(),
          startTime: lesson.startTime,
          endTime: lesson.endTime,
          room: lesson.room,
          color: lesson.color,
          notes: lesson.notes || "",
        }
      : defaultValues,
  })

  const handleSubmit = async (data: LessonFormValues) => {
    setIsSubmitting(true)

    try {
      // Yangi dars obyektini yaratish
      const lessonData = {
        id: lesson?.id || Math.floor(Math.random() * 1000) + 100,
        title:
          data.course === "ingliz"
            ? "Ingliz tili"
            : data.course === "matematika"
              ? "Matematika"
              : data.course === "rus"
                ? "Rus tili"
                : data.course === "kompyuter"
                  ? "Kompyuter savodxonligi"
                  : data.course === "fizika"
                    ? "Fizika"
                    : data.course === "kimyo"
                      ? "Kimyo"
                      : data.course === "biologiya"
                        ? "Biologiya"
                        : data.course === "tarix"
                          ? "Tarix"
                          : data.course,
        teacher:
          data.teacher === "kamola"
            ? "Kamola Saidova"
            : data.teacher === "akmal"
              ? "Akmal Rahimov"
              : data.teacher === "olga"
                ? "Olga Petrova"
                : data.teacher === "bobur"
                  ? "Bobur Karimov"
                  : data.teacher === "jahongir"
                    ? "Jahongir Azimov"
                    : data.teacher === "nilufar"
                      ? "Nilufar Qodirova"
                      : data.teacher === "sardor"
                        ? "Sardor Qosimov"
                        : data.teacher === "dilshod"
                          ? "Dilshod Kamolov"
                          : data.teacher,
        day: Number.parseInt(data.day),
        startTime: data.startTime,
        endTime: data.endTime,
        room: data.room,
        color: data.color,
        notes: data.notes || "",
      }

      // LocalStorage-ga saqlash
      const existingLessons = JSON.parse(localStorage.getItem("lessons") || "[]")
      if (lesson) {
        // Darsni yangilash
        const updatedLessons = existingLessons.map((l: any) =>
          l.id === lesson.id ? lessonData : l
        )
        localStorage.setItem("lessons", JSON.stringify(updatedLessons))
      } else {
        // Yangi dars qo'shish
        localStorage.setItem("lessons", JSON.stringify([...existingLessons, lessonData]))
      }

      toast({
        title: lesson ? "Dars yangilandi" : "Dars qo'shildi",
        description: `${lessonData.title} darsi muvaffaqiyatli ${lesson ? "yangilandi" : "qo'shildi"}.`,
        variant: "default",
      })

      window.location.href = "/lesson-schedule"
    } catch (error) {
      toast({
        title: "Xatolik yuz berdi",
        description: `Darsni ${lesson ? "yangilashda" : "saqlashda"} xatolik yuz berdi. Iltimos, qayta urinib ko'ring.`,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-6 md:p-8 animate-in">
        <div className="mb-6">
          <Link href="/lesson-schedule">
            <Button variant="outline" className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              Jadvalga qaytish
            </Button>
          </Link>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>{lesson ? "Darsni tahrirlash" : "Yangi dars"}</CardTitle>
                <CardDescription>Dars haqidagi asosiy ma'lumotlarni kiriting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
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
                            <SelectItem value="biologiya">Biologiya</SelectItem>
                            <SelectItem value="tarix">Tarix</SelectItem>
                          </SelectContent>
                        </Select>
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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="O'qituvchini tanlang" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="kamola">Kamola Saidova</SelectItem>
                            <SelectItem value="akmal">Akmal Rahimov</SelectItem>
                            <SelectItem value="olga">Olga Petrova</SelectItem>
                            <SelectItem value="bobur">Bobur Karimov</SelectItem>
                            <SelectItem value="jahongir">Jahongir Azimov</SelectItem>
                            <SelectItem value="nilufar">Nilufar Qodirova</SelectItem>
                            <SelectItem value="sardor">Sardor Qosimov</SelectItem>
                            <SelectItem value="dilshod">Dilshod Kamolov</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="day"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Hafta kuni <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Kunni tanlang" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {weekDays.map((day) => (
                              <SelectItem key={day.id} value={day.id.toString()}>
                                {day.fullName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="room"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Xona raqami <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Masalan: 205" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>
                            Boshlanish vaqti <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input {...field} placeholder="09:00" />
                              <Clock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            </div>
                          </FormControl>
                          <FormDescription>24 soatlik formatda (HH:MM)</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="endTime"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>
                            Tugash vaqti <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input {...field} placeholder="10:30" />
                              <Clock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            </div>
                          </FormControl>
                          <FormDescription>24 soatlik formatda (HH:MM)</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Qo'shimcha ma'lumotlar</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Dars haqida qo'shimcha ma'lumotlar..."
                            className="resize-none min-h-[100px]"
                            {...field}
                          />
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
                <CardTitle>Dars ko'rinishi</CardTitle>
                <CardDescription>Darsning ko'rinishini sozlang</CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Dars rangi <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-2 md:grid-cols-4 gap-4"
                        >
                          {colors.map((color) => (
                            <div key={color}>
                              <RadioGroupItem value={color} id={`color-${color}`} className="sr-only" />
                              <Label
                                htmlFor={`color-${color}`}
                                className={`flex h-10 w-full cursor-pointer items-center justify-center rounded-md border-2 ${
                                  field.value === color ? `border-${color}-500` : "border-transparent"
                                } bg-${color}-100 text-${color}-800 dark:bg-${color}-900 dark:text-${color}-100 hover:bg-${color}-200 dark:hover:bg-${color}-800`}
                              >
                                {color === "blue"
                                  ? "Ko'k"
                                  : color === "purple"
                                    ? "Binafsha"
                                    : color === "red"
                                      ? "Qizil"
                                      : color === "green"
                                        ? "Yashil"
                                        : color === "orange"
                                          ? "To'q sariq"
                                          : color === "teal"
                                            ? "Moviy"
                                            : color === "emerald"
                                              ? "Zumrad"
                                              : color === "amber"
                                                ? "Qahrabo"
                                                : color}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Link href="/lesson-schedule">
                <Button type="button" variant="outline" disabled={isSubmitting} className="gap-2">
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
    </div>
  )
} 