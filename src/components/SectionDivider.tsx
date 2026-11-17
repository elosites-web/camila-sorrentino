export type SectionDividerTone = 'warm-to-light' | 'light-to-warm' | 'light' | 'warm';

interface SectionDividerProps {
  tone?: SectionDividerTone;
  className?: string;
}

const TONE_CLASS_MAP: Record<SectionDividerTone, string> = {
  'warm-to-light': 'bg-gradient-to-b from-[#F4EDE6] to-[#FAF7F4]',
  'light-to-warm': 'bg-gradient-to-b from-[#FAF7F4] to-[#F4EDE6]',
  light: 'bg-[#FAF7F4]',
  warm: 'bg-[#F4EDE6]',
};

export function SectionDivider({
  tone = 'light',
  className = '',
}: SectionDividerProps) {
  return (
    <div
      aria-hidden="true"
      data-testid="section-divider"
      className={`${TONE_CLASS_MAP[tone]} py-4 sm:py-5 ${className}`.trim()}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#DDD0C4] to-[#CDB89E]" />
          <span className="mx-3.5 inline-flex shrink-0 items-center justify-center sm:mx-4">
            <span className="h-2 w-2 rotate-45 border border-[#C4A276]/90 bg-[#C4A276]/20" />
          </span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#DDD0C4] to-[#CDB89E]" />
        </div>
      </div>
    </div>
  );
}
