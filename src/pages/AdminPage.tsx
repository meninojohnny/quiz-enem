import { TopBar } from '@/components/broadcast/TopBar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DataTab } from './admin/DataTab'
import { QuestionsTab } from './admin/QuestionsTab'
import { SubjectsTab } from './admin/SubjectsTab'

export function AdminPage() {
  return (
    <div className="min-h-dvh pb-16">
      <TopBar />

      <main className="mx-auto flex max-w-4xl flex-col gap-8 px-4 pt-8 sm:px-6 lg:pt-12">
        <h1 className="font-broadcast text-5xl uppercase leading-none sm:text-6xl">Perguntas</h1>

        <Tabs defaultValue="questions">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="questions" className="flex-1 sm:flex-none sm:px-5">
              Perguntas
            </TabsTrigger>
            <TabsTrigger value="subjects" className="flex-1 sm:flex-none sm:px-5">
              Assuntos
            </TabsTrigger>
            <TabsTrigger value="data" className="flex-1 sm:flex-none sm:px-5">
              Importar e backup
            </TabsTrigger>
          </TabsList>

          <TabsContent value="questions" className="mt-6">
            <QuestionsTab />
          </TabsContent>
          <TabsContent value="subjects" className="mt-6">
            <SubjectsTab />
          </TabsContent>
          <TabsContent value="data" className="mt-6">
            <DataTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
