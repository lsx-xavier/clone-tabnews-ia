import { Suspense } from "react";
import { ConfettiOnLoad } from "@/components/confetti-on-load";
import { getPublishedContentCount } from "@/lib/tabnews";
import styles from "./page.module.css";

export default function Page() {
  return (
    <main className={styles.main}>
      <ConfettiOnLoad />
      <h1 className={styles.title}>Em construção</h1>
      <p className={styles.phrase}>
        Estamos neste exato momento reconstruindo o TabNews, um lugar na internet para quem
        trabalha com tecnologia e precisa consumir conteúdos com valor concreto.
      </p>
      <Suspense fallback={<p className={styles.total}>Lendo o total de conteúdos publicados…</p>}>
        <PublishedTotal />
      </Suspense>
      <a className={styles.link} href="https://www.tabnews.com.br">
        Site oficial
      </a>
    </main>
  );
}

async function PublishedTotal() {
  const total = await getPublishedContentCount().catch(() => null);
  const formattedTotal = total?.toLocaleString("pt-BR");

  return (
    <p className={styles.total}>
      {formattedTotal ? (
        <>
          <strong>{formattedTotal}</strong> conteúdos publicados no TabNews
        </>
      ) : (
        "Não foi possível ler o total de conteúdos publicados agora."
      )}
    </p>
  );
}
