import { siteConfig } from '../config/site';

export interface ResourceTimingLike {
  name: string;
  initiatorType?: string;
  duration: number;
  startTime: number;
  responseEnd: number;
  transferSize?: number;
}

export interface CoreImageMetric {
  path: string;
  durationMs: number;
  responseEndMs: number;
  transferSize: number | null;
}

export function getCoreImagePaths(): string[] {
  const paths = [
    siteConfig.imagens.logoPreto,
    siteConfig.imagens.hero,
    siteConfig.imagens.camila,
    siteConfig.imagens.formacaoParede,
    ...siteConfig.servicos
      .map((servico) => servico.imagem)
      .filter((imagem): imagem is string => Boolean(imagem)),
  ];

  return Array.from(new Set(paths));
}

export function extractAssetPath(resourceUrl: string): string {
  try {
    if (resourceUrl.startsWith('/')) {
      return resourceUrl.split('?')[0];
    }
    const parsed = new URL(resourceUrl);
    return parsed.pathname;
  } catch {
    return resourceUrl.split('?')[0];
  }
}

export function formatImageLoadMetric(
  entry: ResourceTimingLike,
  corePaths: readonly string[],
): CoreImageMetric | null {
  if (entry.initiatorType && entry.initiatorType !== 'img') {
    return null;
  }

  const assetPath = extractAssetPath(entry.name);
  if (!corePaths.includes(assetPath)) {
    return null;
  }

  return {
    path: assetPath,
    durationMs: Math.round(entry.duration * 10) / 10,
    responseEndMs: Math.round(entry.responseEnd * 10) / 10,
    transferSize: typeof entry.transferSize === 'number' ? entry.transferSize : null,
  };
}

export function observeCoreImagePerformance(
  corePaths: readonly string[] = getCoreImagePaths(),
  logMetric: (message: string, metric: CoreImageMetric) => void = (message, metric) => {
    console.info(message, metric);
  },
): () => void {
  if (
    typeof window === 'undefined' ||
    typeof PerformanceObserver === 'undefined' ||
    corePaths.length === 0
  ) {
    return () => {};
  }

  const seenPaths = new Set<string>();

  const processEntries = (entries: readonly ResourceTimingLike[]) => {
    for (const entry of entries) {
      const metric = formatImageLoadMetric(entry, corePaths);
      if (!metric || seenPaths.has(metric.path)) {
        continue;
      }

      seenPaths.add(metric.path);
      logMetric(
        `[Performance] Imagem principal carregada: ${metric.path} (${metric.durationMs} ms)`,
        metric,
      );

      if (seenPaths.size >= corePaths.length) {
        observer.disconnect();
        break;
      }
    }
  };

  const observer = new PerformanceObserver((list) => {
    processEntries(list.getEntries() as unknown as ResourceTimingLike[]);
  });

  try {
    observer.observe({ type: 'resource', buffered: true });
  } catch {
    try {
      observer.observe({ entryTypes: ['resource'] });
      if (typeof performance !== 'undefined' && typeof performance.getEntriesByType === 'function') {
        processEntries(performance.getEntriesByType('resource') as unknown as ResourceTimingLike[]);
      }
    } catch {
      return () => {};
    }
  }

  return () => {
    observer.disconnect();
  };
}
