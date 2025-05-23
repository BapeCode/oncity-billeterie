import { Suspense } from "react";
import SuccessPage from "./SucessPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <SuccessPage />
    </Suspense>
  );
}
