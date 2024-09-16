'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CadastroAnimalComponent() {
  const router = useRouter()
  const [animal, setAnimal] = useState({
    name: '',
    type: '',
    age: '',
    image: '',
    description: '',
    ong: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAnimal({ ...animal, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (value: string) => {
    setAnimal({ ...animal, type: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a lógica para enviar os dados para sua API
    console.log('Animal cadastrado:', animal)
    // Redirecionar para a página principal após o cadastro
    router.push('/')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 text-primary">Cadastro de Animal</h1>
      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <h2 className="text-xl font-semibold">Informações do Animal</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              name="name"
              placeholder="Nome do animal"
              value={animal.name}
              onChange={handleChange}
              required
            />
            <Select onValueChange={handleSelectChange} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tipo de animal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cachorro">Cachorro</SelectItem>
                <SelectItem value="Gato">Gato</SelectItem>
                <SelectItem value="Coelho">Coelho</SelectItem>
                <SelectItem value="Outro">Outro</SelectItem>
              </SelectContent>
            </Select>
            <Input
              name="age"
              type="number"
              placeholder="Idade"
              value={animal.age}
              onChange={handleChange}
              required
            />
            <Input
              name="image"
              placeholder="URL da imagem"
              value={animal.image}
              onChange={handleChange}
              required
            />
            <Textarea
              name="description"
              placeholder="Descrição do animal"
              value={animal.description}
              onChange={handleChange}
              required
            />
            <Input
              name="ong"
              placeholder="Nome da ONG"
              value={animal.ong}
              onChange={handleChange}
              required
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Cadastrar Animal</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
