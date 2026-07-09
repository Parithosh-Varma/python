"use client"

import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="landing-page">
      <nav>
        <Link href="/" className="logo">
          <span className="logo-mark">Py</span> PyMaster
        </Link>
        <div className="nav-links">
          <Link href="#curriculum">Curriculum</Link>
          <Link href="#projects">Projects</Link>
          <Link href="#playground">Playground</Link>
        </div>
        <div className="nav-right">
          <Link href="/auth?mode=signin" className="nav-signin">Sign In</Link>
          <Link href="/auth?mode=signup" className="nav-signup">
            Sign Up →
          </Link>
        </div>
      </nav>

      <div className="hero-outer">
        <div className="hero">
          <div className="hero-content">
            <span className="hero-tag">
              <span className="dot" /> THE BEST FREE PYTHON PLATFORM
            </span>
            <h1>
              Master Python<br />
              <span className="accent">Zero to Expert</span>
            </h1>
            <p>
              The most comprehensive free Python learning platform. Interactive lessons,
              real projects, AI tutoring, and a complete curriculum that takes you from
              absolute beginner to professional developer.
            </p>
            <div className="hero-actions">
              <Link href="/auth?mode=signup" className="btn btn-light">
                Start Learning Free →
              </Link>
              <Link
                href="/curriculum"
                className="btn btn-outline hero-outline"
              >
                View Full Curriculum
              </Link>
            </div>
            <div className="hero-badges">
              <span>✓ No credit card</span>
              <span>✓ 300+ lessons</span>
              <span>✓ 200+ projects</span>
              <span>✓ AI tutor included</span>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <section className="section bg-grid" style={{ marginTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Results</span>
            <h2>
              The platform built for <span className="accent">results</span>
            </h2>
          </div>
          <div className="stats-row">
            <div className="stat">
              <div className="num">300+</div>
              <div className="label">Lessons</div>
              <div className="sub">From print() to asyncio</div>
            </div>
            <div className="stat">
              <div className="num">200+</div>
              <div className="label">Projects</div>
              <div className="sub">Real-world portfolio</div>
            </div>
            <div className="stat">
              <div className="num">1,000+</div>
              <div className="label">Quiz Questions</div>
              <div className="sub">Test your knowledge</div>
            </div>
            <div className="stat">
              <div className="num">100%</div>
              <div className="label">Free Forever</div>
              <div className="sub">No credit card needed</div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* FEATURES */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Everything in one place</span>
            <h2>
              Everything you need in <span className="accent">one platform</span>
            </h2>
            <p>PyMaster replaces 10 tools with one integrated experience.</p>
          </div>
          <div className="feat-grid">
            {[
              { icon: "▤", title: "Curriculum", desc: "300+ lessons organized from zero to advanced. Theory, practice, quizzes, and flashcards in every module." },
              { icon: "〈/〉", title: "Playground", desc: "Write and run Python in your browser. No setup, no config. Instant feedback with every exercise." },
              { icon: "◐", title: "AI Tutor", desc: "Get instant explanations, code reviews, and personalized guidance. Like having a senior dev beside you." },
              { icon: "▦", title: "Projects", desc: "Build 200+ real-world projects — CLI tools, APIs, data pipelines, ML models. Portfolio-ready." },
              { icon: "✦", title: "Certificates", desc: "Earn verifiable certificates. From Beginner Python to Python Master. Prove your skills to employers." },
              { icon: "▥", title: "Dashboard", desc: "Track your XP, streaks, achievements, and progress. Leaderboards and smart recommendations." },
            ].map((f) => (
              <div key={f.title} className="feat-card">
                <div className="feat-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* LEARNING PATH */}
      <section className="section bg-grid" id="curriculum">
        <div className="wrap">
          <div className="section-head" style={{ maxWidth: "100%", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "20px" }}>
            <div>
              <span className="eyebrow">Curriculum</span>
              <h2>
                From <span className="accent">zero</span> to professional
              </h2>
              <p>Every topic you need. Nothing you don&apos;t.</p>
            </div>
            <div className="tabs">
              <div className="tab active">Beginner</div>
              <div className="tab">Intermediate</div>
              <div className="tab">Advanced</div>
            </div>
          </div>

          <div className="path-grid">
            {[
              { icon: "◎", level: "Beginner", desc: "Start here, no experience needed", topics: ["Python Setup & Syntax", "Variables & Data Types", "Control Flow", "Functions", "Data Structures", "File I/O", "Error Handling"] },
              { icon: "◈", level: "Intermediate", desc: "Build on your foundation", topics: ["OOP & Classes", "Decorators & Closures", "Generators & Iterators", "Context Managers", "Regular Expressions", "Modules & Packages", "Testing with Pytest"] },
              { icon: "⬡", level: "Advanced", desc: "Expert-level mastery", topics: ["Asyncio & Concurrency", "Networking & APIs", "Databases & SQL", "Performance Profiling", "Python Internals (GIL, Bytecode)", "Metaclasses & Descriptors", "System Design"] },
            ].map((col) => (
              <div key={col.level} className="path-col">
                <div className="icon">{col.icon}</div>
                <h3>{col.level}</h3>
                <div className="desc">{col.desc}</div>
                <ul>
                  {col.topics.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "36px" }}>
            <Link href="/curriculum" className="btn btn-outline">
              View Full Curriculum →
            </Link>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* DEVICES */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Anywhere</span>
            <h2>
              Learn your way, <span className="accent">anywhere</span>
            </h2>
            <p>PyMaster works wherever you do. Same progress, same experience, on every device.</p>
          </div>
          <div className="device-grid">
            <div className="device-card">
              <h3>Desktop</h3>
              <p>Full-featured experience with the interactive code editor, side-by-side lessons, and multi-window workflow.</p>
            </div>
            <div className="device-card">
              <h3>Tablet</h3>
              <p>Optimized touch interface for reading lessons, taking quizzes, and reviewing flashcards on the go.</p>
            </div>
            <div className="device-card">
              <h3>Mobile</h3>
              <p>Quick review sessions, daily streaks, and flashcards. Never break your learning chain.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* FAQ */}
      <section className="section">
        <div className="wrap">
          <div className="section-head" style={{ maxWidth: "800px" }}>
            <span className="eyebrow">FAQ</span>
            <h2>
              Frequently asked <span className="accent">questions</span>
            </h2>
          </div>
          {[
            { q: "Is PyMaster really free?", a: "Yes. 100% free. No credit card, no trial, no hidden paid tiers. Every lesson, project, quiz, and feature is available to everyone." },
            { q: "Do I need prior programming experience?", a: "No. PyMaster is designed for absolute beginners. Start with Python installation and go step by step to advanced topics." },
            { q: "How is this different from other platforms?", a: "PyMaster combines a structured curriculum, interactive coding environment, real projects, AI tutoring, and gamification — all free. Most platforms charge for even basic features." },
            { q: "Can I earn certificates?", a: "Yes, 8 certificates ranging from Beginner Python to Python Master. Complete the required lessons and projects to earn them." },
            { q: "How long does it take to complete?", a: "Most learners complete Beginner in 2–4 weeks and reach Advanced in 4–6 months. It depends on your pace — the full curriculum has 300+ lessons and 200+ projects." },
          ].map((faq) => (
            <div key={faq.q} className="faq-item">
              <h3>{faq.q}</h3>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="wrap">
          <div className="cta">
            <h2>
              Start your journey.<br />
              <span className="accent">It&apos;s free.</span>
            </h2>
            <p>No credit card. No time limit. Just the best way to learn Python.</p>
            <div className="hero-actions">
              <Link href="/auth?mode=signup" className="btn btn-light">
                Start Learning Free →
              </Link>
              <Link href="/curriculum" className="btn btn-outline cta-outline">
                View Full Curriculum
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="footer-top">
            <Link href="/" className="logo">
              <span className="logo-mark">Py</span> PyMaster
            </Link>
            <div className="footer-cols">
              <div className="footer-col">
                <h4>Product</h4>
                <Link href="/curriculum">Curriculum</Link>
                <Link href="/projects">Projects</Link>
                <Link href="/playground">Playground</Link>
                <Link href="/certificates">Certificates</Link>
              </div>
              <div className="footer-col">
                <h4>Levels</h4>
                <Link href="/curriculum">Beginner</Link>
                <Link href="/curriculum">Intermediate</Link>
                <Link href="/curriculum">Advanced</Link>
              </div>
              <div className="footer-col">
                <h4>Company</h4>
                <a href="#">About</a>
                <a href="#">Careers</a>
                <a href="#">Contact</a>
              </div>
              <div className="footer-col">
                <h4>Legal</h4>
                <a href="#">Terms of Service</a>
                <a href="#">Privacy</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2026 PyMaster. Open source.</span>
            <span>Master Python. Zero to Expert.</span>
          </div>
        </div>
      </footer>

    </div>
  )
}
