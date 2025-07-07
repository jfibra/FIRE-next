import { Layout } from "@/components/layout"

export default function ExamplePage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">Your Page Content</h1>
        <p>This page now uses the shared navigation and footer components.</p>
      </div>
    </Layout>
  )
}
