import { useEffect, useRef, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const moveCursor = (event: MouseEvent) => setCursor({ x: event.clientX, y: event.clientY });
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12 },
    );
    document.querySelectorAll('.reveal').forEach((element) => observerRef.current?.observe(element));
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('scroll', updateProgress);
      observerRef.current?.disconnect();
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const handleHover = (hovering: boolean) => setCursorHover(hovering);

  return (
    <div className={`site-shell grain ${menuOpen ? 'menu-open' : ''}`}>
      <div className="cursor-dot" style={{ left: cursor.x, top: cursor.y }} />
      <div className={`cursor-ring ${cursorHover ? 'is-hovering' : ''}`} style={{ left: cursor.x, top: cursor.y }} />
      <div className="fixed left-0 top-0 z-50 h-0.5 bg-[#d95b2b] transition-[width] duration-150" style={{ width: `${scrollProgress * 100}%` }} />

      <header className="absolute left-0 right-0 top-0 z-30 px-5 py-5 text-[#eae6dd] mix-blend-difference md:px-10 md:py-7">
        <div className="flex items-center justify-between">
          <a href="#top" onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)} className="mono flex items-center gap-3 no-underline" data-testid="link-logo">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-current text-[9px]">T/</span>
            <span>Didi / 01</span>
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
            className="mono flex items-center gap-3 border-0 bg-transparent text-inherit"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            data-testid="button-menu"
          >
            {menuOpen ? <X size={18} strokeWidth={1.2} /> : <Menu size={18} strokeWidth={1.2} />}
            <span className="hidden sm:inline">{menuOpen ? 'Close' : 'Index'}</span>
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-20 flex flex-col justify-end bg-[#d95b2b] p-6 pb-10 text-[#201e1a] md:p-12 md:pb-16">
          <div className="mono mb-8">Navigate / select a chapter</div>
          <nav className="flex flex-col gap-1" aria-label="Main navigation">
            {['About', 'Journey', 'Skills', 'Contact'].map((item, index) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu} onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)} className="display text-[clamp(3.6rem,12vw,9rem)] leading-[.8] no-underline transition-opacity hover:opacity-55" data-testid={`link-menu-${item.toLowerCase()}`}>
                <span className="mr-4 align-top font-mono text-[10px] tracking-normal">0{index + 1}</span>{item}
              </a>
            ))}
          </nav>
           <div className="mono mt-16 flex justify-between border-t border-[#201e1a]/30 pt-4">
             <span>Tuban / ITS</span><span>Open to meaningful work</span>
          </div>
        </div>
      )}

      <main>
        <section id="top" className="relative min-h-[100dvh] overflow-hidden bg-[#201e1a] text-[#eae6dd]">
          <div className="hero-grid absolute inset-0 opacity-20" />
          <div className="absolute bottom-[10%] right-[7%] h-[42vw] w-[42vw] max-h-[610px] max-w-[610px] rounded-full border border-[#eae6dd]/20" />
          <div className="hero-orbit absolute bottom-[15%] right-[12%] h-[30vw] w-[30vw] max-h-[430px] max-w-[430px] rounded-full border border-[#d95b2b]/70" />
          <div className="absolute bottom-[18%] right-[17%] h-3 w-3 rounded-full bg-[#d95b2b] md:h-5 md:w-5" />
          <div className="relative mx-auto flex min-h-[100dvh] max-w-[1500px] flex-col justify-end px-5 pb-10 pt-32 md:px-10 md:pb-14">
            <div className="reveal mb-10 flex items-start justify-between">
               <p className="mono max-w-[210px] text-[#eae6dd]/65">A personal archive of ideas, experiments, and the things I am learning.</p>
               <p className="mono text-right text-[#eae6dd]/65">Scroll to meet<br />the person</p>
            </div>
            <h1 className="display reveal max-w-[1050px] text-[clamp(5rem,15.3vw,14rem)]">
               <span className="line-reveal"><span>I build</span></span>
               <span className="line-reveal pl-[11vw] text-[#d95b2b]"><span>with</span></span>
               <span className="line-reveal"><span>curiosity.</span></span>
            </h1>
            <div className="reveal mt-12 flex items-end justify-between gap-6 border-t border-[#eae6dd]/25 pt-4 md:mt-16">
               <div className="mono max-w-[320px] text-[#eae6dd]/65">Hi, I’m Didi — an Informatics Engineering student who enjoys understanding how things work and making them easier to use.</div>
              <a href="#about" className="group hidden items-center gap-3 no-underline md:flex" data-testid="link-scroll-about">
                <span className="mono">Begin here</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#eae6dd]/40 transition-colors group-hover:border-[#d95b2b] group-hover:bg-[#d95b2b]"><ArrowDown size={15} strokeWidth={1.2} /></span>
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="bg-[#eae6dd] px-5 py-24 text-[#201e1a] md:px-10 md:py-40">
          <div className="mx-auto grid max-w-[1500px] gap-16 md:grid-cols-[1fr_2.2fr] md:gap-24">
            <div className="reveal flex justify-between border-t border-[#201e1a]/30 pt-3">
               <span className="mono">01 / About me</span><span className="mono hidden md:block">The person behind the work</span>
            </div>
            <div>
               <h2 className="display reveal max-w-[950px] text-[clamp(3.6rem,8vw,8rem)]">Nice to<br /><span className="text-[#d95b2b]">meet you.</span></h2>
              <div className="mt-16 grid gap-10 border-t border-[#201e1a]/30 pt-5 md:grid-cols-2 md:gap-20">
                 <p className="reveal text-base leading-[1.5]">I’m Muhammad Adinata Parikesit — usually called Didi or Adi — a curious person from Tuban who is drawn to technology, thoughtful design, and the stories behind the things people build.</p>
                <div className="reveal space-y-8">
                   <p className="text-base leading-relaxed text-[#201e1a]/65">Right now, I’m studying Informatics Engineering at Institut Teknologi Sepuluh Nopember (ITS). I’m learning by building small projects, asking better questions, and paying attention to how real people use the things I make.</p>
                   <p className="text-base leading-relaxed text-[#201e1a]/65">When I’m away from the screen, coffee, music, and long conversations help me slow down and return to the work with a clearer point of view.</p>
                  <a href="#contact" className="group inline-flex items-center gap-3 border-b border-[#201e1a] pb-2 no-underline" data-testid="link-about-contact">
                     <span className="mono">Continue reading</span><ArrowUpRight size={16} strokeWidth={1.3} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

         <section id="journey" className="bg-[#201e1a] px-5 py-24 text-[#eae6dd] md:px-10 md:py-40">
          <div className="mx-auto max-w-[1500px]">
            <div className="reveal mb-20 flex items-start justify-between border-t border-[#eae6dd]/25 pt-3">
               <span className="mono">02 / My journey</span><span className="mono text-[#eae6dd]/55">A few chapters so far</span>
            </div>
             <div className="relative ml-0 border-l border-[#eae6dd]/25 md:ml-[16.5%]">
               {[
                 ['01', 'SMA', 'SMA Thursina IIBS / Malang', 'This was where my curiosity about computers began. I started with small experiments, discovered programming, and realized I enjoyed learning by making things.'],
                 ['02', 'Now', 'Institut Teknologi Sepuluh Nopember / Informatics Engineering', 'I’m currently studying Informatics Engineering at ITS, building a stronger foundation in technology, and finding the areas that I want to explore more deeply.'],
                 ['03', 'Focus', 'Computer networks / Learning in public', 'Right now I’m focused on learning computer networks. I’m open to collaborations, thoughtful feedback, and projects that let me keep growing.'],
               ].map(([number, year, title, description]) => (
                 <article key={number} className="reveal group relative border-b border-[#eae6dd]/20 px-6 py-10 transition-colors hover:bg-[#eae6dd]/[.06] md:px-12 md:py-14">
                   <span className="absolute -left-[5px] top-12 h-2 w-2 rounded-full bg-[#d95b2b] transition-transform group-hover:scale-150" />
                   <div className="grid gap-6 md:grid-cols-[.7fr_1.4fr_1fr] md:items-start md:gap-10">
                     <span className="mono text-[#eae6dd]/55">{number} / {year}</span>
                     <h3 className="display text-[clamp(2.8rem,5vw,5.5rem)] leading-[.9]">{title}</h3>
                     <p className="max-w-[320px] text-base leading-relaxed text-[#eae6dd]/65">{description}</p>
                   </div>
                 </article>
               ))}
            </div>
          </div>
        </section>

         <section id="skills" className="bg-[#ded8cc] px-5 py-24 text-[#201e1a] md:px-10 md:py-40">
          <div className="mx-auto max-w-[1500px]">
            <div className="reveal mb-20 flex items-start justify-between border-t border-[#201e1a]/30 pt-3">
               <span className="mono">03 / Skills &amp; strengths</span><span className="mono hidden text-right md:block">What I bring with me</span>
            </div>
            <div className="grid gap-16 md:grid-cols-[1.15fr_1fr] md:gap-32">
              <div>
                 <h2 className="display reveal max-w-[650px] text-[clamp(4rem,9vw,9rem)]">What I<br />bring to <span className="text-[#d95b2b]">the table.</span></h2>
                 <p className="reveal mt-14 max-w-[390px] text-base leading-relaxed text-[#201e1a]/70">I’m still growing, but these are the qualities and skills I rely on whenever I take on something new.</p>
              </div>
              <div className="reveal space-y-8 md:pt-12">
                {[
                   ['Technical foundation', 'Programming, web development, hardware, and the patience to understand how things work.', '78%'],
                   ['Creative problem solving', 'I turn an unclear brief into smaller questions, then work through them one step at a time.', '86%'],
                   ['Communication', 'I like sharing progress clearly, listening carefully, and making space for other points of view.', '84%'],
                   ['Self-learning', 'I’m comfortable being a beginner and consistent enough to keep going until the idea becomes clearer.', '92%'],
                ].map(([label, copy, value]) => (
                  <div key={label} className="border-t border-[#201e1a]/30 pt-4">
                     <div className="mb-5 flex items-start justify-between gap-4"><span className="mono text-[11px]">{label}</span></div>
                     <p className="max-w-[390px] text-base leading-relaxed text-[#201e1a]/65">{copy}</p>
                    <div className="mt-5 h-px bg-[#201e1a]/15"><div className="progress-fill h-px bg-[#d95b2b]" style={{ width: value }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-[#d95b2b] py-5 text-[#201e1a]">
          <div className="marquee-track" aria-label="A reminder to slow down">
             {Array.from({ length: 4 }).map((_, index) => <span className="display whitespace-nowrap px-6 text-[clamp(3.5rem,8vw,8rem)]" key={index}>Still learning. Still building. <span className="font-sans text-3xl align-middle">·</span></span>)}
          </div>
        </section>

        <section id="contact" className="bg-[#eae6dd] px-5 py-24 text-[#201e1a] md:px-10 md:py-40">
          <div className="mx-auto max-w-[1500px]">
            <div className="reveal flex items-start justify-between border-t border-[#201e1a]/30 pt-3">
               <span className="mono">04 / Contact</span><span className="mono">Let’s start a conversation</span>
            </div>
            <div className="relative mt-20 md:mt-32">
               <h2 className="display reveal max-w-[1100px] text-[clamp(4.5rem,13.3vw,13rem)]">Want to<br /><span className="text-[#d95b2b]">know more?</span></h2>
              <div className="reveal mt-16 flex flex-col justify-between gap-10 border-t border-[#201e1a]/30 pt-5 md:flex-row md:items-end">
                 <p className="max-w-[380px] text-base leading-relaxed text-[#201e1a]/70">If you want to talk about a project, an opportunity, or simply exchange ideas, I’d be happy to hear from you.</p>
                 <a href="mailto:hello@example.com" onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)} className="group flex items-center gap-6 no-underline" data-testid="link-email">
                  <span className="display text-[clamp(2.6rem,6vw,6rem)]">Say hello</span>
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#201e1a] text-[#eae6dd] transition-transform group-hover:rotate-45"><ArrowUpRight size={21} strokeWidth={1.3} /></span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#201e1a] px-5 py-8 text-[#eae6dd] md:px-10 md:py-10">
        <div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
             <div className="display text-4xl">Muhammad Adinata Parikesit<span className="text-[#d95b2b]">.</span></div>
             <div className="mono mt-3 text-[#eae6dd]/55">Didi / Adi / Informatics Engineering</div>
          </div>
          <div className="flex items-end justify-between gap-8 md:gap-16">
            <div className="flex gap-5">
               <a href="mailto:hello@example.com" aria-label="Email" data-testid="link-footer-email"><Mail size={18} strokeWidth={1.2} /></a>
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" data-testid="link-github"><Github size={18} strokeWidth={1.2} /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" data-testid="link-linkedin"><Linkedin size={18} strokeWidth={1.2} /></a>
              <a href="#top" aria-label="Back to top" data-testid="link-back-to-top"><ArrowUpRight size={18} strokeWidth={1.2} className="-rotate-45" /></a>
            </div>
             <div className="mono text-right text-[#eae6dd]/55">© 2026 / Made with<br />attention</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ProjectCard({ number, title, type, description, tone, reversed = false }: { number: string; title: string; type: string; description: string; tone: 'rust' | 'olive' | 'stone'; reversed?: boolean }) {
  const tones = { rust: 'bg-[#a54329]', olive: 'bg-[#46534a]', stone: 'bg-[#6f6b60]' };
  return (
    <article className={`project-card reveal grid gap-8 md:grid-cols-[1fr_1.35fr] md:items-center md:gap-20 ${reversed ? 'md:[&>div:first-child]:order-2' : ''}`}>
      <div className="order-1">
        <div className="mb-7 flex items-center justify-between border-t border-[#eae6dd]/25 pt-3">
          <span className="mono text-[#eae6dd]/55">{number}</span><span className="mono text-[#eae6dd]/55">{type}</span>
        </div>
        <h3 className="display text-[clamp(3.8rem,7vw,7.6rem)]">{title}</h3>
         <p className="mt-7 max-w-[360px] text-base leading-relaxed text-[#eae6dd]/65">{description}</p>
        <a href="#contact" className="group mt-10 inline-flex items-center gap-3 border-b border-[#eae6dd]/40 pb-2 no-underline" data-testid={`link-project-${number}`}>
          <span className="mono">View case notes</span><ArrowUpRight size={15} strokeWidth={1.2} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </div>
      <div className={`relative aspect-[1.22] overflow-hidden ${tones[tone]}`}>
        <img src="/ritual-still-life.jpg" alt="" className="project-image absolute inset-0 h-full w-full object-cover opacity-35 mix-blend-screen" />
        <div className="absolute inset-0 flex items-center justify-center">
          {tone === 'rust' ? <div className="h-[55%] w-[38%] rounded-[50%] border border-[#eae6dd]/55 shadow-[inset_0_0_0_18px_rgba(32,30,26,.18)]" /> : tone === 'olive' ? <div className="h-[48%] w-[48%] rotate-45 border border-[#eae6dd]/60" /> : <div className="h-[60%] w-[60%] rounded-full border border-[#eae6dd]/50"><div className="m-[18%] h-[64%] rounded-full border border-[#eae6dd]/30" /></div>}
        </div>
        <span className="mono absolute bottom-4 left-4 text-[#eae6dd]/65">Scroll / hover / notice</span>
      </div>
    </article>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;