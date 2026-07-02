import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllSlugs,
  getStrategyBySlug,
  getFlagship,
} from "@/data/strategies";
import { StrategyDetail } from "@/components/strategy/StrategyDetail";

export function generateStaticParams() {
  const flagship = getFlagship().slug;
  // The flagship has a bespoke route of its own.
  return getAllSlugs()
    .filter((slug) => slug !== flagship)
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const strategy = getStrategyBySlug(slug);
  if (!strategy) return { title: "Strategy not found" };
  return {
    title: `${strategy.title} · ${strategy.status}`,
    description: strategy.oneLineThesis,
  };
}

export default async function StrategyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const strategy = getStrategyBySlug(slug);
  if (!strategy) notFound();
  return <StrategyDetail strategy={strategy} />;
}
