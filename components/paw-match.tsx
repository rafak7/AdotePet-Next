'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, X, Info, Settings } from "lucide-react" // Importar o ícone de engrenagem
import { useSwipeable } from 'react-swipeable'
import Link from 'next/link'

// Dados de exemplo (substitua por uma API real ou banco de dados)
const animals = [
  { id: 1, name: 'Buddy', type: 'Cachorro', age: 3, image: '/placeholder.svg?height=400&width=300', description: 'Buddy é um cachorro amigável e brincalhão que adora crianças.', ong: 'Amigos dos Animais' },
  { id: 2, name: 'Whiskers', type: 'Gato', age: 2, image: '/placeholder.svg?height=400&width=300', description: 'Whiskers é um gato calmo e carinhoso, perfeito para apartamentos.', ong: 'Gatinhos Felizes' },
  { id: 3, name: 'Hopper', type: 'Coelho', age: 1, image: '/placeholder.svg?height=400&width=300', description: 'Hopper é um coelho dócil e fácil de cuidar, ideal para iniciantes.', ong: 'Pequenos Amigos' },
]

export function PawMatchComponent() {
  const [currentAnimal, setCurrentAnimal] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)
  const [showInfo, setShowInfo] = useState(false)
  
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-30, 30])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])

  const motionRef = useRef<HTMLDivElement | null>(null)

  const handleSwipe = (swipeDirection: 'left' | 'right') => {
    setDirection(swipeDirection)
    setTimeout(() => {
      setCurrentAnimal((prev) => (prev + 1) % animals.length)
      setDirection(null)
      setShowInfo(false)
    }, 300)
  }

  const toggleInfo = () => {
    setShowInfo(!showInfo)
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
    preventScrollOnSwipe: true,
    trackMouse: true,
  })

  const handleDragEnd = () => {
    const xValue = x.get()
    if (xValue < -100) {
      handleSwipe('left')
    } else if (xValue > 100) {
      handleSwipe('right')
    }
    x.set(0)
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="absolute top-4 right-4">
        <Link href="/settings">
          <Button variant="secondary" size="icon" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
            <Settings className="h-6 w-6" />
          </Button>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center flex-grow p-4 md:p-8">
        <h1 className="text-4xl font-bold mb-10 text-primary">AdoteUmPet</h1>
        <div className="flex gap-8 relative">
          <AnimatePresence mode="wait">
            <motion.div
              ref={(el) => {
                if (el) {
                  motionRef.current = el
                  handlers.ref(el)
                }
              }}
              key={currentAnimal}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              style={{ x, rotate, opacity }}
              onDragEnd={handleDragEnd}
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === 'left' ? -300 : 300 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="w-[400px] h-[600px] flex flex-col">
                <CardHeader className="p-0 relative h-[50%]">
                  <img
                    src={animals[currentAnimal].image}
                    alt={animals[currentAnimal].name}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute bottom-6 right-6 rounded-full" // Alterado de top-6 para bottom-6
                    onClick={toggleInfo}
                  >
                    <Info className="h-8 w-8" />
                  </Button>
                </CardHeader>
                <CardContent className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h2 className="text-3xl font-semibold mb-4">{animals[currentAnimal].name}</h2>
                    <div className="flex items-center space-x-4 mb-4">
                      <Badge variant="secondary" className="text-lg py-1 px-2">{animals[currentAnimal].type}</Badge>
                      <Badge variant="outline" className="text-lg py-1 px-2">{animals[currentAnimal].age} anos</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between p-6">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-16 h-16"
                    onClick={() => handleSwipe('left')}
                  >
                    <X className="h-8 w-8" />
                  </Button>
                  <Button
                    variant="default"
                    size="icon"
                    className="rounded-full w-16 h-16"
                    onClick={() => handleSwipe('right')}
                  >
                    <Heart className="h-8 w-8" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </AnimatePresence>
          
          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="absolute top-0 right-0 z-10"
              >
                <Card className="w-[400px] h-[600px] p-6 bg-white shadow-lg">
                  <CardHeader className="flex justify-between items-center">
                    <h3 className="text-2xl font-semibold">Informações</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleInfo}
                      className="rounded-full"
                    >
                      <X className="h-6 w-6" />
                    </Button>
                  </CardHeader>
                  <CardContent className="overflow-y-auto">
                    <p className="text-lg mb-4">{animals[currentAnimal].description}</p>
                    <p className="text-lg font-semibold">ONG: {animals[currentAnimal].ong}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}