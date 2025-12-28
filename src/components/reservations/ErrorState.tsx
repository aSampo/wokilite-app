import { AlertCircle } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

interface ErrorStateProps {
  error: Error | unknown;
}

export function ErrorState({ error }: ErrorStateProps) {
  const errorMessage =
    error instanceof Error ? error.message : "Error desconocido";

  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error al cargar reservas</AlertTitle>
      <AlertDescription>{errorMessage}</AlertDescription>
    </Alert>
  );
}

