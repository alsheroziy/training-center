import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import AppLayout from "@/layouts/app-layout"
import { type BreadcrumbItem } from "@/types"
import { Head, Link } from "@inertiajs/react"
import { Download, Filter, MoreHorizontal, Plus, Search, SlidersHorizontal } from "lucide-react"
import { useEffect, useState } from "react"

interface Teacher {
  id: number
  name: string
  phone: string
  subject: string
  status: string
  joinDate: string
  groups: number
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "O'qituvchilar",
    href: "/teachers",
  },
]

export default function TeachersPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    if (typeof window !== "undefined") {
      const savedTeachers = localStorage.getItem("teachers")
      const initialTeachers: Teacher[] = savedTeachers
        ? JSON.parse(savedTeachers)
        : [
            {
              id: 1,
              name: "Kamola Saidova",
              phone: "+998 90 123 45 67",
              subject: "Ingliz tili",
              status: "Faol",
              joinDate: "10.01.2022",
              groups: 3,
            },
            {
              id: 2,
              name: "Akmal Rahimov",
              phone: "+998 90 234 56 78",
              subject: "Matematika",
              status: "Faol",
              joinDate: "15.02.2022",
              groups: 2,
            },
            {
              id: 3,
              name: "Olga Petrova",
              phone: "+998 90 345 67 89",
              subject: "Rus tili",
              status: "Faol",
              joinDate: "20.03.2022",
              groups: 3,
            },
            {
              id: 4,
              name: "Bobur Karimov",
              phone: "+998 90 456 78 90",
              subject: "Kompyuter savodxonligi",
              status: "Faol",
              joinDate: "05.04.2022",
              groups: 2,
            },
            {
              id: 5,
              name: "Jahongir Azimov",
              phone: "+998 90 567 89 01",
              subject: "Fizika",
              status: "Faol",
              joinDate: "10.05.2022",
              groups: 1,
            },
            {
              id: 6,
              name: "Nilufar Qodirova",
              phone: "+998 90 678 90 12",
              subject: "Kimyo",
              status: "Faol",
              joinDate: "15.06.2022",
              groups: 1,
            },
          ]

      if (!savedTeachers) {
        localStorage.setItem("teachers", JSON.stringify(initialTeachers))
      }

      return initialTeachers
    }

    return []
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTeachers = localStorage.getItem("teachers")
      if (savedTeachers) {
        setTeachers(JSON.parse(savedTeachers))
      }
    }
  }, [])

  const handleDeleteTeacher = (id: number) => {
    const teacherToDelete = teachers.find((teacher: Teacher) => teacher.id === id)

    if (teacherToDelete) {
      const updatedTeachers = teachers.filter((teacher: Teacher) => teacher.id !== id)
      setTeachers(updatedTeachers)

      localStorage.setItem("teachers", JSON.stringify(updatedTeachers))

      toast({
        title: "O'qituvchi o'chirildi",
        description: `${teacherToDelete.name} muvaffaqiyatli o'chirildi.`,
        variant: "destructive",
      })
    }
  }

  const filteredTeachers = teachers.filter(
    (teacher: Teacher) =>
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="O'qituvchilar" />
      <main className="flex-1 space-y-4 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="O'qituvchi qidirish..."
                className="pl-8 w-[250px] md:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Link href="/teachers/new">
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Yangi o'qituvchi
              </Button>
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader className="px-6 py-4">
            <CardTitle>O'qituvchilar ro'yxati</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>F.I.SH</TableHead>
                  <TableHead>Telefon</TableHead>
                  <TableHead>Fan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Qo'shilgan sana</TableHead>
                  <TableHead>Guruhlar soni</TableHead>
                  <TableHead className="text-right">Amallar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeachers.map((teacher: Teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>{teacher.id}</TableCell>
                    <TableCell className="font-medium">{teacher.name}</TableCell>
                    <TableCell>{teacher.phone}</TableCell>
                    <TableCell>{teacher.subject}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                        {teacher.status}
                      </span>
                    </TableCell>
                    <TableCell>{teacher.joinDate}</TableCell>
                    <TableCell>{teacher.groups}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Ko'rish</DropdownMenuItem>
                          <DropdownMenuItem>Tahrirlash</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteTeacher(teacher.id)}>
                            O'chirish
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </AppLayout>
  )
}