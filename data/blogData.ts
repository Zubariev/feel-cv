// Blog post type definition
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: BlogCategory;
  tags: string[];
  image?: string;
  content: string; // HTML or markdown content
}

export type BlogCategory =
  | 'resume-optimization'
  | 'career-development'
  | 'hr-insights'
  | 'market-signaling'
  | 'product-updates';

export const categoryLabels: Record<BlogCategory, string> = {
  'resume-optimization': 'Resume Optimization',
  'career-development': 'Career Development',
  'hr-insights': 'HR Insights',
  'market-signaling': 'Market Signaling',
  'product-updates': 'Product Updates',
};

export const categoryColors: Record<BlogCategory, string> = {
  'resume-optimization': 'bg-blue-50 text-blue-700 border-blue-200',
  'career-development': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'hr-insights': 'bg-purple-50 text-purple-700 border-purple-200',
  'market-signaling': 'bg-amber-50 text-amber-700 border-amber-200',
  'product-updates': 'bg-indigo-50 text-indigo-700 border-indigo-200',
};

// Blog posts array - posts will be added here
export const blogPosts: BlogPost[] = [
  {
    "slug": "how-ats-systems-work-2026",
    "title": "How ATS Systems Actually Work in 2026",
    "description": "A clear explanation of how ATS systems screen resumes today — and what really matters if you want your CV to pass.",
    "category": "resume-optimization",
    "tags": ["ATS", "resume", "hiring", "AI", "job search"],
    "content": `
    <article>
      <h1>How ATS Systems Actually Work in 2026</h1>
  
      <p>If your CV gets rejected without a reply, an ATS (Applicant Tracking System) is often blamed. But most people misunderstand what ATS systems actually do — and what they don’t.</p>
  
      <p>Let’s break it down.</p>
  
      <h2>What an ATS Really Is</h2>
  
      <p>An ATS is not a robot deciding your fate. It’s a database system that helps companies manage applications.</p>
  
      <p>At its core, an ATS does three things:</p>
      <ul>
        <li>Stores resumes</li>
        <li>Extracts structured data (name, skills, experience, education)</li>
        <li>Helps recruiters search and filter candidates</li>
      </ul>
  
      <p>The ATS doesn’t hire you. People do.</p>
  
      <h2>What Happens When You Upload a CV</h2>
  
      <p>When you submit your CV, the ATS tries to convert it into structured text.</p>
  
      <p>This process is called <strong>parsing</strong>.</p>
  
      <p>The system looks for:</p>
      <ul>
        <li>Clear section headers (Experience, Education, Skills)</li>
        <li>Readable text (not images or tables)</li>
        <li>Standard date formats</li>
        <li>Recognizable job titles and skills</li>
      </ul>
  
      <p>If parsing fails, your CV becomes hard to search — even if your experience is strong.</p>
  
      <h2>Do ATS Systems Automatically Reject CVs?</h2>
  
      <p>In most cases: <strong>no</strong>.</p>
  
      <p>ATS systems rarely auto-reject candidates. What they do instead is rank, filter, and surface profiles.</p>
  
      <p>Typical filters include:</p>
      <ul>
        <li>Keywords (skills, tools, job titles)</li>
        <li>Location</li>
        <li>Years of experience</li>
        <li>Education level</li>
      </ul>
  
      <p>If your CV doesn’t appear in the first search results, it may never be seen — but it wasn’t rejected by a machine.</p>
  
      <h2>Where AI Comes In (2026 Reality)</h2>
  
      <p>Modern ATS platforms increasingly use AI to assist recruiters.</p>
  
      <p>AI may:</p>
      <ul>
        <li>Suggest best-matching candidates</li>
        <li>Group similar profiles</li>
        <li>Highlight gaps or strengths</li>
        <li>Score relevance to a job description</li>
      </ul>
  
      <p>But AI does not replace human judgment. It supports it.</p>
  
      <h2>The Real Reason CVs Fail ATS Screening</h2>
  
      <p>Most CVs fail not because of missing keywords — but because of poor structure and unclear signaling.</p>
  
      <p>Common issues:</p>
      <ul>
        <li>Design-heavy layouts that break parsing</li>
        <li>Unclear job titles</li>
        <li>Vague descriptions without outcomes</li>
        <li>Skills hidden inside paragraphs</li>
        <li>No clear hierarchy of information</li>
      </ul>
  
      <h2>ATS vs Human Recruiters</h2>
  
      <p>Passing ATS is only half the job.</p>
  
      <p>Once a recruiter opens your CV, a different filter applies: <strong>attention</strong>.</p>
  
      <p>Recruiters spend seconds scanning:</p>
      <ul>
        <li>Job titles</li>
        <li>Company names</li>
        <li>Dates</li>
        <li>Visual hierarchy</li>
      </ul>
  
      <p>This is where many ATS-optimized CVs still fail.</p>
  
      <h2>The Balance That Actually Works</h2>
  
      <p>The best CVs in 2026 are:</p>
      <ul>
        <li>Easy for ATS to parse</li>
        <li>Easy for humans to scan</li>
        <li>Clear in what they signal</li>
      </ul>
  
      <p>It’s not about gaming the system. It’s about clarity.</p>
  
      <h2>Final Thought</h2>
  
      <p>An ATS is not your enemy. Confusion is.</p>
  
      <p>If your CV clearly communicates who you are, what you’ve done, and why it matters — both ATS systems and recruiters will find you.</p>
  
      <p><em>That’s exactly what CViviD is built to analyze.</em></p>
    </article>
    `
  },
  {
    "slug": "resume-eye-tracking-science",
    "title": "The Science Behind Eye-Tracking and Resume Design",
    "description": "How recruiters actually look at CVs, what eye-tracking studies reveal, and how resume design affects attention in the first seconds.",
    "category": "resume-optimization",
    "tags": ["resume design", "eye tracking", "recruiter attention", "CV layout"],
    "content": `
    <article>
      <h1>The Science Behind Eye-Tracking and Resume Design</h1>
  
      <p>Recruiters don’t read CVs. They scan them.</p>
  
      <p>This isn’t a metaphor. It’s a measurable behavior studied through eye-tracking technology — the same technology used in UX research, psychology, and advertising.</p>
  
      <p>Understanding how eyes move across a CV explains why many strong candidates are overlooked.</p>
  
      <h2>What Is Eye-Tracking?</h2>
  
      <p>Eye-tracking measures where a person looks, for how long, and in what order.</p>
  
      <p>In recruitment studies, eye-tracking shows:</p>
      <ul>
        <li>Which parts of a CV get attention</li>
        <li>Which sections are ignored</li>
        <li>How long a recruiter spends before deciding</li>
      </ul>
  
      <p>On average, the first scan lasts between <strong>6 and 10 seconds</strong>.</p>
  
      <h2>The F-Pattern of Resume Reading</h2>
  
      <p>Most recruiters follow a predictable pattern:</p>
  
      <ul>
        <li>Top-left corner first</li>
        <li>Then horizontally across headings</li>
        <li>Then quickly down the left side</li>
      </ul>
  
      <p>This creates an “F-shaped” scan path.</p>
  
      <p>If your key information isn’t visible in this path, it may never be seen.</p>
  
      <h2>What Recruiters Fixate On</h2>
  
      <p>Eye-tracking studies consistently show high fixation on:</p>
      <ul>
        <li>Job titles</li>
        <li>Company names</li>
        <li>Dates and timelines</li>
        <li>Degree titles</li>
      </ul>
  
      <p>Long paragraphs, decorative elements, and dense blocks of text receive very little attention.</p>
  
      <h2>Why Design Matters More Than People Think</h2>
  
      <p>Design is not decoration. It’s guidance.</p>
  
      <p>A well-designed CV tells the reader where to look next.</p>
  
      <p>Good visual hierarchy uses:</p>
      <ul>
        <li>Spacing to separate ideas</li>
        <li>Font weight to signal importance</li>
        <li>Alignment to create rhythm</li>
      </ul>
  
      <p>When design is poor, the recruiter has to work harder — and usually won’t.</p>
  
      <h2>Color and Attention</h2>
  
      <p>Color can help, but only when used carefully.</p>
  
      <p>Eye-tracking shows that:</p>
      <ul>
        <li>High contrast improves fixation</li>
        <li>Too many colors increase cognitive load</li>
        <li>Muted accents work better than bright highlights</li>
      </ul>
  
      <p>Color should support structure, not compete with content.</p>
  
      <h2>Why Two Similar CVs Get Different Results</h2>
  
      <p>Two candidates can have the same skills and experience — and very different outcomes.</p>
  
      <p>Often, the difference is not competence, but visibility.</p>
  
      <p>If one CV clearly surfaces relevant signals during the first scan, it advances. The other doesn’t.</p>
  
      <h2>Eye-Tracking and ATS Are Connected</h2>
  
      <p>Interestingly, what helps recruiters often helps ATS systems too.</p>
  
      <p>Clear structure, consistent headings, and readable layouts improve both machine parsing and human scanning.</p>
  
      <h2>Final Thought</h2>
  
      <p>Your CV is not judged line by line. It’s judged by what stands out.</p>
  
      <p>Eye-tracking shows us a simple truth: attention is limited, and design decides how it’s spent.</p>
  
      <p><em>CViviD uses eye-tracking simulation to show you exactly what recruiters see — and what they miss.</em></p>
    </article>
    `
  }, 
  {
    "slug": "why-two-cvs-get-different-results",
    "title": "Why Two CVs With the Same Skills Get Very Different Results",
    "description": "If two candidates have similar skills, why does one get interviews and the other gets rejected? The answer is market signaling.",
    "category": "market-signaling",
    "tags": ["CV market signaling", "resume psychology", "recruiter behavior", "career capital"],
    "content": `
    <article>
      <h1>Why Two CVs With the Same Skills Get Very Different Results</h1>
  
      <p>This is one of the most frustrating experiences in job searching.</p>
  
      <p>You compare your CV with someone else’s. Same degree. Same tools. Similar experience. Yet they get interviews — and you don’t.</p>
  
      <p>The difference is rarely skill.</p>
  
      <p>The difference is <strong>what the CV signals</strong>.</p>
  
      <h2>Recruiters Don’t Measure Skills Directly</h2>
  
      <p>Recruiters don’t have access to your real abilities.</p>
  
      <p>They don’t know how good you actually are at Python, research, marketing, or design.</p>
  
      <p>All they see is a document.</p>
  
      <p>So they rely on signals.</p>
  
      <h2>What Is Market Signaling?</h2>
  
      <p>Market signaling comes from economics and sociology.</p>
  
      <p>In simple terms, a signal is anything that helps others estimate your value when they cannot observe it directly.</p>
  
      <p>In job applications, your CV is a bundle of signals.</p>
  
      <h2>Examples of Strong and Weak Signals</h2>
  
      <p>These two lines may describe similar work:</p>
  
      <ul>
        <li>“Worked on data analysis tasks”</li>
        <li>“Built automated data pipelines used by 3 teams, reducing reporting time by 40%”</li>
      </ul>
  
      <p>Same skill. Very different signal.</p>
  
      <p>The second signals impact, ownership, and relevance.</p>
  
      <h2>Signals Are Not Just Text</h2>
  
      <p>Signals are everywhere in a CV:</p>
  
      <ul>
        <li>Job titles and how specific they are</li>
        <li>Company names and context</li>
        <li>Order of sections</li>
        <li>Dates and continuity</li>
        <li>Design and structure</li>
      </ul>
  
      <p>Even layout sends a message: clarity, care, professionalism.</p>
  
      <h2>Bourdieu’s Forms of Capital in a CV</h2>
  
      <p>Sociologist Pierre Bourdieu described different forms of capital that shape social outcomes.</p>
  
      <p>They map surprisingly well to resumes.</p>
  
      <ul>
        <li><strong>Cultural capital</strong>: education, certifications, knowledge</li>
        <li><strong>Social capital</strong>: institutions, networks, affiliations</li>
        <li><strong>Symbolic capital</strong>: titles, reputation, progression</li>
        <li><strong>Technological capital</strong>: tools, systems, methods</li>
        <li><strong>Material capital</strong>: seniority, stability, market value</li>
      </ul>
  
      <p>Two CVs can list the same skills, but signal very different levels of these capitals.</p>
  
      <h2>Why Recruiters Rely on Signals</h2>
  
      <p>Because they have to.</p>
  
      <p>Recruiters scan dozens or hundreds of CVs under time pressure.</p>
  
      <p>Signals help them reduce uncertainty quickly.</p>
  
      <p>They are not looking for perfection. They are looking for reassurance.</p>
  
      <h2>The Hidden Cost of Weak Signaling</h2>
  
      <p>Weak signaling doesn’t mean rejection.</p>
  
      <p>It means invisibility.</p>
  
      <p>Your CV may never trigger enough interest to be discussed, even if you are qualified.</p>
  
      <h2>How to Improve Your Signals</h2>
  
      <p>Improving signaling is not about exaggeration.</p>
  
      <p>It’s about clarity.</p>
  
      <ul>
        <li>Make outcomes visible</li>
        <li>Surface relevant experience early</li>
        <li>Reduce ambiguity</li>
        <li>Align structure with expectations</li>
      </ul>
  
      <h2>Final Thought</h2>
      <p>Hiring decisions are made under uncertainty.</p>
      <p>Your CV doesn’t prove your value. It signals it.</p>
      <p>The better your signals, the easier it is for others to believe in you.</p>
      <p><em>CViviD exists to make those signals visible — and actionable.</em></p>
    </article>
    `
  },
  {
    "slug": "market-signaling-theory-resumes",
    "title": "The Hidden Science of Hiring: How Market Signaling Theory Gets You Hired",
    "description": "Ever wonder why two resumes with identical skills get different results? Discover how Market Signaling Theory influences recruiters and how to use 'costly signals' to stand out.",
    "category": "market-signaling",
    "tags": ["career-strategy", "psychology", "resume-tips", "hiring-trends"],
    "content": "<h2>Why Your Skills Aren’t Enough (And What to Do About It)</h2>\n\n<p>You have the experience. You have the degrees. You’ve even used the right keywords. Yet, the interview invites aren't rolling in. Most job seekers think of a resume as a simple list of facts, but in the eyes of an economist, it’s something much more complex: a <strong>Market Signal</strong>.</p>\n\n<p>Hiring is essentially an \"investment under uncertainty.\" A recruiter doesn't know if you'll be a superstar or a bad hire until <em>after</em> they pay you. To bridge this gap, they look for signals. Understanding <strong>Market Signaling Theory</strong>—a concept that earned Michael Spence a Nobel Prize—is the secret to moving from 'rejected' to 'hired.'</p>\n\n<hr />\n\n<h3>The Logic of the 'Costly Signal'</h3>\n\n<p>In signaling theory, not all information is equal. Recruiters are trained (often subconsciously) to look for <strong>costly signals</strong>. A signal is only credible if it is difficult or 'expensive' to obtain. If anyone can do it, the signal is weak.</p>\n\n<ul>\n  <li><strong>Weak Signal:</strong> Writing \"Hard worker\" or \"Team player\" in your summary. (Cost: $0. Anyone can type these words).</li>\n  <li><strong>Strong Signal:</strong> An industry-recognized certification or a link to a complex GitHub project. (Cost: High. It requires months of effort and discipline).</li>\n</ul>\n\n<p>When a recruiter sees a strong signal, they don't just see the achievement; they see the <em>traits</em> required to get it: persistence, intelligence, and reliability.</p>\n\n<h3>3 Ways to Use Signaling on Your CV Today</h3>\n\n<table>\n  <tr>\n    <th>The Signal Type</th>\n    <th>What it Actually Says</th>\n    <th>How to Apply It</th>\n  </tr>\n  <tr>\n    <td><strong>Quantified Impact</strong></td>\n    <td>\"I understand business value.\"</td>\n    <td>Don't say \"Managed a team.\" Say \"Managed 12 people to exceed targets by 20%.\"</td>\n  </tr>\n  <tr>\n    <td><strong>Prestigious Associations</strong></td>\n    <td>\"I have been vetted by others.\"</td>\n    <td>Mention selective programs, well-known clients, or awards that only top-tier talent receives.</td>\n  </tr>\n  <tr>\n    <td><strong>Design Consistency</strong></td>\n    <td>\"I am meticulous and professional.\"</td>\n    <td>Clean formatting signals attention to detail. A messy CV signals a messy work style.</td>\n  </tr>\n</table>\n\n<h3>The 'Sheepskin Effect' in 2026</h3>\n\n<p>Economists call the value of a degree the \"sheepskin effect.\" In the modern market, your 'sheepskin' isn't just a diploma anymore. It’s your digital footprint. In 2026, AI-driven hiring tools are looking for signals of <strong>continuous learning</strong>. If your CV hasn't been updated with a new skill or project in two years, you are signaling stagnation.</p>\n\n<blockquote>\n  <p><strong>CViviD Tip:</strong> Think of your resume as a collection of proofs, not just a list of tasks. Every bullet point should answer the question: \"What does this prove about me that a low-performer couldn't fake?\"</p>\n</blockquote>\n\n<h3>Final Thought</h3>\n\n<p>You are a high-quality candidate, but the recruiter doesn't know that yet. They only know what you signal. By focusing on high-cost, high-value evidence of your skills, you stop being a 'risky investment' and become the obvious choice.</p>\n\n<p><strong>Want to see what your resume is actually signaling?</strong> Try our AI analyzer to see how your 'costly signals' stack up against the competition.</p>"
  },
  {
    "slug": "why-cv-rejected-6-seconds",
    "title": "The 6-Second Rule: What Recruiters Actually See in the First Glance",
    "description": "Research shows recruiters spend only 6 seconds on the initial CV screen. Learn the 'F-Pattern' of reading and how to pass the eye-tracking test.",
    "category": "hr-insights",
    "tags": ["eye-tracking", "resume-design", "hiring-psychology", "recruiting"],
    "content": "<h2>The Brutal Reality of the Initial Screen</h2>\n\n<p>It’s a famous (and terrifying) statistic in HR: the average recruiter spends about <strong>6 to 7 seconds</strong> looking at a resume before deciding if it belongs in the 'Yes' pile or the trash. </p>\n\n<p>In 2026, even with AI doing the heavy lifting, the final gatekeeper is still a human with a very short attention span. If you want to survive the 6-second cull, you need to understand the <strong>visual hierarchy</strong> of a high-performing CV.</p>\n\n\n\n<hr />\n\n<h3>The 'F-Pattern' of Reading</h3>\n\n<p>Eye-tracking studies show that when recruiters look at a new document, they don't read every word. Instead, their eyes follow an <strong>'F' or 'E' pattern</strong>:</p>\n\n<ul>\n  <li><strong>Horizontal Move:</strong> They start at the top (Contact info, Title, Summary).</li>\n  <li><strong>Second Horizontal Move:</strong> They jump down to look at your most recent Job Title and Company.</li>\n  <li><strong>Vertical Scan:</strong> They scan the left side of the page for bullet points and keywords.</li>\n</ul>\n\n<p>If they don't find a match for their mental checklist during this quick scan, they move on. They aren't being mean; they are managing a high volume of data.</p>\n\n<h3>How to 'Hack' the 6-Second Glance</h3>\n\n<table>\n  <tr>\n    <th>Critical Zone</th>\n    <th>What to Include</th>\n    <th>The Goal</th>\n  </tr>\n  <tr>\n    <td><strong>The Top 1/3</strong></td>\n    <td>A clear target job title and a 3-line 'impact' summary.</td>\n    <td>Instant context. They should know what you do in 1 second.</td>\n  </tr>\n  <tr>\n    <td><strong>Section Headers</strong></td>\n    <td>Standard labels like \"Work Experience\" and \"Education.\"</td>\n    <td>Navigation. Don't get creative with titles like \"My Journey.\"</td>\n  </tr>\n  <tr>\n    <td><strong>White Space</strong></td>\n    <td>Generous margins and line spacing.</td>\n    <td>Readability. A wall of text is an automatic skip.</td>\n  </tr>\n</table>\n\n<h3>The 'Above the Fold' Rule</h3>\n\n<p>In web design, \"above the fold\" refers to the content you see without scrolling. On a CV, this is the top half of the first page. If your most impressive achievement—your 'Market Signal'—is on page two or at the bottom of the page, <strong>80% of recruiters will never see it.</strong></p>\n\n<blockquote>\n  <p><strong>CViviD Insight:</strong> Use bolding strategically within your bullet points. Bold the <strong>Result</strong> (e.g., \"Increased revenue by 15%\") rather than the task, so the recruiter's eye is naturally drawn to your value.</p>\n</blockquote>\n\n<h3>Is Your Resume 'Skimmable'?</h3>\n\n<p>To test this, pull up your CV on your screen, look away, then look back for exactly 6 seconds. Did you see your current title? Did you see a number or a percentage? If the answer is no, it's time to redesign.</p>\n\n<p><strong>Ready to pass the test?</strong> Our heat-mapping tool simulates a recruiter’s eye-tracking to show you exactly where your CV is winning—and where it's losing attention.</p>"
  },
  {
    "slug": "bourdieu-capital-theory-resume",
    "title": "Beyond Experience: Using Bourdieu’s Capital Theory to Audit Your CV",
    "description": "Learn how Social, Cultural, and Symbolic capital act as 'hidden currencies' on your resume and how to leverage them for high-level career moves.",
    "category": "market-signaling",
    "tags": ["career-capital", "sociology", "resume-strategy", "job-market"],
    "content": "<h2>The 'Hidden Currency' of the Job Market</h2>\n\n<p>Most career advice tells you to focus on <strong>Human Capital</strong>—your technical skills, your degrees, and your work history. But have you ever noticed that sometimes the most 'qualified' person doesn't get the job, while someone else glides in effortlessly?</p>\n\n<p>To understand why, we have to look at the work of sociologist Pierre Bourdieu. He argued that success isn't just about what you know, but about the different types of <strong>Capital</strong> you bring to the table. On a resume, these act as silent indicators of your 'fit' for elite roles.</p>\n\n<hr />\n\n<h3>The Three Capitals of a Great Resume</h3>\n\n<p>If you want to move into senior management or switch to a high-prestige industry, you need to audit your CV for more than just task descriptions.</p>\n\n<h4>1. Cultural Capital (The 'Vibe' Check)</h4>\n<p>This is your knowledge of the industry's unwritten rules. It’s signaled through your vocabulary, the professional organizations you belong to, and even the way you format your CV. \n<br><strong>On your CV:</strong> Using industry-specific 'insider' terminology correctly signals that you are already part of the 'club.'</p>\n\n\n\n<h4>2. Social Capital (The 'Network' Signal)</h4>\n<p>Social capital is the value derived from your professional relationships. While a resume is a solo document, you can signal social capital by mentioning high-profile collaborations, well-known mentors, or 'Blue Chip' clients.\n<br><strong>On your CV:</strong> Mentioning that you \"Led a joint project with [Fortune 500 Company]\" signals that a major player already trusts you.</p>\n\n<h4>3. Symbolic Capital (The 'Prestige' Factor)</h4>\n<p>This is the recognition and institutional honor you've received. It’s the most powerful form of capital because it’s a shortcut for quality. \n<br><strong>On your CV:</strong> Awards, scholarships, or being a keynote speaker at a major conference. These don't just show you did a job; they show you were <em>honored</em> for it.</p>\n\n<hr />\n\n<h3>How to Audit Your 'Career Capital'</h3>\n\n<p>Ask yourself these three questions when reviewing your current draft:</p>\n\n<ul>\n  <li><strong>The Language Test:</strong> Am I using 'generic' words, or am I using the high-level vocabulary used by leaders in this specific field? (Cultural Capital)</li>\n  <li><strong>The Association Test:</strong> Who are the 'validators' on my page? Have I mentioned the high-status brands or people I’ve worked with? (Social Capital)</li>\n  <li><strong>The Excellence Test:</strong> Is there anything on this page that proves I was in the top 1% of my peer group? (Symbolic Capital)</li>\n</ul>\n\n<blockquote>\n  <p><strong>The Strategy:</strong> High-level hiring is less about 'Can you do the job?' and more about 'Are you one of us?' Use Bourdieu’s framework to prove you belong in the room before you even walk through the door.</p>\n</blockquote>\n\n<h3>Build Your Capital with CViviD</h3>\n\n<p>Our platform doesn't just check your spelling; it analyzes your <strong>Market Signaling</strong>. We help you identify where you're 'low' on symbolic capital and how to rephrase your experience to sound like an industry insider.</p>\n\n<p><strong>Ready to level up?</strong> Let’s see what your resume is really saying about your professional worth.</p>"
  },
  {
    "slug": "career-plateau-signals-2026",
    "title": "Is Your Resume Stuck in 2023? How to Signal Career Growth in 2026",
    "description": "A career plateau isn't just a feeling—it's a signal on your CV. Learn how to refresh your professional narrative to show upward momentum.",
    "category": "career-development",
    "tags": ["career-growth", "professional-branding", "resume-refresh", "upward-mobility"],
    "content": "<h2>The 'Quiet Plateau' Problem</h2>\n\n<p>In the fast-moving market of 2026, staying still is the same as moving backward. Many professionals think that because they are doing their jobs well, their CV reflects growth. But to a recruiter, five years in the same role without a change in <strong>responsibility or scope</strong> can signal a plateau.</p>\n\n<p>Career development isn't just about getting a promotion; it's about how you document your evolution. Here is how to turn a 'steady' resume into a 'growing' one.</p>\n\n<hr />\n\n<h3>1. The Shift from Tasks to Ownership</h3>\n\n<p>Early-career resumes focus on <em>what you did</em>. Mid-to-late career resumes must focus on <em>what you owned</em>. If your bullet points still start with \"Responsible for...\" or \"Assisted with...\", you are signaling that you are still a doer, not a leader.</p>\n\n<p><strong>The Fix:</strong> Use high-growth verbs like <em>Architected, Spearheaded, Transformed,</em> or <em>Negotiated.</em></p>\n\n\n\n<h3>2. Documenting 'Lateral Growth'</h3>\n\n<p>If your job title hasn't changed, you must show growth through <strong>scope expansion</strong>. Did you start by managing a $10k budget and now manage $50k? Did you go from supporting one department to supporting three? </p>\n\n<p><strong>How to list it:</strong> Use sub-headers under a single job entry to show different phases of your tenure. \n<br><em>Example:</em>\n<br><strong>Senior Project Manager | 2022 – Present</strong>\n<br>• <em>Phase 2 (2024–Present):</em> Strategic Lead for Global Expansion\n<br>• <em>Phase 1 (2022–2024):</em> Regional Operations Management</p>\n\n<h3>3. The 'Skill Velocity' Signal</h3>\n\n<p>In 2026, the half-life of technical skills is shorter than ever. A CV that looks identical to your 2024 version—just with a longer dates section—signals a lack of <strong>Skill Velocity</strong>. Recruiters look for evidence that you are learning at the speed of the industry.</p>\n\n<table>\n  <tr>\n    <th>The Old Way (Static)</th>\n    <th>The 2026 Way (Dynamic)</th>\n  </tr>\n  <tr>\n    <td>Listing \"Python\" in a skills cloud.</td>\n    <td>Listing a recent AI-integration project using Python.</td>\n  </tr>\n  <tr>\n    <td>Monthly performance reviews.</td>\n    <td>Certifications in emerging workflows (Agile 2.0, AI Prompt Engineering).</td>\n  </tr>\n  <tr>\n    <td>Waiting for a title change.</td>\n    <td>Highlighting 'Acting Lead' or 'Cross-functional Liaison' roles.</td>\n  </tr>\n</table>\n\n<h3>Audit Your Growth Narrative</h3>\n\n<p>Take a look at your CV and ask: <strong>\"Does this person look like they are ready for their next challenge, or are they just comfortable in their current one?\"</strong></p>\n\n<blockquote>\n  <p><strong>Pro Tip:</strong> Your CV should always be written for the job you want next, not the one you have now. If you want to be a Director, your current Manager role should be described through the lens of strategy and mentorship.</p>\n</blockquote>\n\n<h3>Is Your Growth Visible?</h3>\n\n<p>Don't let your hard work go unnoticed because of a static resume. CViviD helps you identify \"growth gaps\" in your profile and suggests ways to reframe your current experience to signal readiness for the next level.</p>\n\n<p><strong>Want a career path audit?</strong> Upload your CV today and see where you can inject more 'upward signals' into your story.</p>"
  }   
];

// Helper functions
export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getPostsByCategory = (category: BlogCategory): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};

export const getAllCategories = (): BlogCategory[] => {
  const categories = new Set(blogPosts.map(post => post.category));
  return Array.from(categories);
};

export const searchPosts = (query: string): BlogPost[] => {
  const lowerQuery = query.toLowerCase();
  return blogPosts.filter(post =>
    post.title.toLowerCase().includes(lowerQuery) ||
    post.description.toLowerCase().includes(lowerQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};
