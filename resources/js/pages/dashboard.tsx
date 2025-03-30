import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AppLayout from "@/layouts/app-layout"
import { type BreadcrumbItem } from "@/types"
import { Head } from "@inertiajs/react"
import {
    ArrowDownRight,
    ArrowUpRight,
    BarChart3,
    BookOpen,
    Clock,
    GraduationCap,
    Sparkles,
    TrendingUp,
    Users,
} from "lucide-react"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Bosh sahifa",
    href: "/dashboard",
  },
]

export default function Dashboard() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Bosh sahifa" />
      <main className="flex-1 space-y-6 p-6 md:p-8 animate-in">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="stats-card card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jami o'quvchilar</CardTitle>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">245</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-emerald-500 flex items-center">
                  <ArrowUpRight className="mr-1 h-4 w-4" /> +12% o'tgan oyga nisbatan
                </span>
              </p>
            </CardContent>
          </Card>
          <Card className="stats-card card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jami o'qituvchilar</CardTitle>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <GraduationCap className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-emerald-500 flex items-center">
                  <ArrowUpRight className="mr-1 h-4 w-4" /> +2 o'tgan oyga nisbatan
                </span>
              </p>
            </CardContent>
          </Card>
          <Card className="stats-card card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Faol kurslar</CardTitle>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-emerald-500 flex items-center">
                  <ArrowUpRight className="mr-1 h-4 w-4" /> +3 o'tgan oyga nisbatan
                </span>
              </p>
            </CardContent>
          </Card>
          <Card className="stats-card card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Oylik daromad</CardTitle>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,450,000 so'm</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-rose-500 flex items-center">
                  <ArrowDownRight className="mr-1 h-4 w-4" /> -3% o'tgan oyga nisbatan
                </span>
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="oquvchilar" className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="oquvchilar" className="rounded-md">
              O'quvchilar
            </TabsTrigger>
            <TabsTrigger value="kurslar" className="rounded-md">
              Kurslar
            </TabsTrigger>
            <TabsTrigger value="jadval" className="rounded-md">
              Dars jadvali
            </TabsTrigger>
          </TabsList>
          <TabsContent value="oquvchilar" className="space-y-0 animate-in">
            <Card className="border-none shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Yangi qo'shilgan o'quvchilar</CardTitle>
                    <CardDescription>So'nggi 7 kun ichida qo'shilgan o'quvchilar ro'yxati</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Users className="h-4 w-4" /> Barcha o'quvchilar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Aziza Karimova", course: "Ingliz tili", date: "Bugun" },
                    { name: "Jasur Toshmatov", course: "Matematika", date: "Kecha" },
                    { name: "Malika Rahimova", course: "Rus tili", date: "2 kun oldin" },
                    { name: "Sardor Aliyev", course: "Fizika", date: "3 kun oldin" },
                    { name: "Nilufar Qodirova", course: "Kimyo", date: "5 kun oldin" },
                  ].map((student, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-medium">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.course}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-muted-foreground">{student.date}</div>
                        <div
                          className={`h-2 w-2 rounded-full ${student.date === "Bugun" ? "bg-green-500" : student.date === "Kecha" ? "bg-blue-500" : "bg-gray-300"}`}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="kurslar" className="space-y-0 animate-in">
            <Card className="border-none shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Eng mashhur kurslar</CardTitle>
                    <CardDescription>O'quvchilar soni bo'yicha eng mashhur kurslar</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <BookOpen className="h-4 w-4" /> Barcha kurslar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Ingliz tili", students: 78, teacher: "Kamola Saidova" },
                    { name: "Matematika", students: 65, teacher: "Akmal Rahimov" },
                    { name: "Rus tili", students: 52, teacher: "Olga Petrova" },
                    { name: "Kompyuter savodxonligi", students: 45, teacher: "Bobur Karimov" },
                    { name: "Fizika", students: 32, teacher: "Jahongir Azimov" },
                  ].map((course, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                    >
                      <div>
                        <p className="font-medium">{course.name}</p>
                        <p className="text-sm text-muted-foreground">O'qituvchi: {course.teacher}</p>
                      </div>
                      <div className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="font-medium text-primary">{course.students}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="jadval" className="space-y-0 animate-in">
            <Card className="border-none shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Bugungi dars jadvali</CardTitle>
                    <CardDescription>Bugun o'tkaziladigan darslar ro'yxati</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Calendar className="h-4 w-4" /> To'liq jadval
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      course: "Ingliz tili",
                      time: "09:00 - 10:30",
                      room: "1-xona",
                      teacher: "Kamola Saidova",
                      status: "Hozir",
                    },
                    {
                      course: "Matematika",
                      time: "11:00 - 12:30",
                      room: "2-xona",
                      teacher: "Akmal Rahimov",
                      status: "Kutilmoqda",
                    },
                    {
                      course: "Rus tili",
                      time: "13:00 - 14:30",
                      room: "3-xona",
                      teacher: "Olga Petrova",
                      status: "Kutilmoqda",
                    },
                    {
                      course: "Kompyuter savodxonligi",
                      time: "15:00 - 16:30",
                      room: "4-xona",
                      teacher: "Bobur Karimov",
                      status: "Kutilmoqda",
                    },
                    {
                      course: "Fizika",
                      time: "17:00 - 18:30",
                      room: "2-xona",
                      teacher: "Jahongir Azimov",
                      status: "Kutilmoqda",
                    },
                  ].map((lesson, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full ${lesson.status === "Hozir" ? "bg-green-100 text-green-700" : "bg-primary/10 text-primary"}`}
                        >
                          <Clock className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{lesson.course}</p>
                          <p className="text-sm text-muted-foreground">O'qituvchi: {lesson.teacher}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm font-medium">
                          {lesson.status === "Hozir" && (
                            <span className="text-green-600 bg-green-100 px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
                              <Sparkles className="h-3 w-3" /> Hozir
                            </span>
                          )}
                          <span>{lesson.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{lesson.room}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4 border-none shadow-md">
            <CardHeader>
              <CardTitle>To'lovlar statistikasi</CardTitle>
              <CardDescription>So'nggi 6 oy uchun to'lovlar statistikasi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-muted/30 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 text-primary mx-auto mb-2 animate-pulse-slow" />
                  <p className="text-muted-foreground">To'lovlar statistikasi grafigi</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="lg:col-span-3 border-none shadow-md">
            <CardHeader>
              <CardTitle>Yaqinlashayotgan to'lovlar</CardTitle>
              <CardDescription>Keyingi 7 kun ichida to'lanishi kerak bo'lgan to'lovlar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Aziza Karimova", course: "Ingliz tili", amount: "450,000", dueDate: "Bugun", urgent: true },
                  { name: "Jasur Toshmatov", course: "Matematika", amount: "400,000", dueDate: "Ertaga", urgent: true },
                  {
                    name: "Malika Rahimova",
                    course: "Rus tili",
                    amount: "450,000",
                    dueDate: "3 kun ichida",
                    urgent: false,
                  },
                  {
                    name: "Sardor Aliyev",
                    course: "Fizika",
                    amount: "500,000",
                    dueDate: "5 kun ichida",
                    urgent: false,
                  },
                ].map((payment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                  >
                    <div>
                      <p className="font-medium">{payment.name}</p>
                      <p className="text-sm text-muted-foreground">{payment.course}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{payment.amount} so'm</p>
                      <p className={`text-sm ${payment.urgent ? "text-red-500 font-medium" : "text-muted-foreground"}`}>
                        {payment.dueDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </AppLayout>
  )
}
