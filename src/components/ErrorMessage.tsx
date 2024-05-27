import { ReactNode } from "react"

type ErrorMessageProps = {
    children: ReactNode; // Se utiliza para renderizar elementos
}

export default function ErrorMessage({children}: ErrorMessageProps) { // Es un enfoque diferente, haciendo dinamico el componente
  return (
    <>
    <p className=" bg-red-600 p-2 text-white font-bold text-sm text-center">
        {children}
    </p>
    </>
  )
}
