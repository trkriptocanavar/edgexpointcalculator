import Calculator from '@/components/Calculator'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          EdgeX FDV Calculator v2
        </h1>
        {/* Hesaplama bileşeni */}
        <Calculator />
      </div>
    </main>
  )
}