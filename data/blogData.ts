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
  | 'product-feature';

export const categoryLabels: Record<BlogCategory, string> = {
  'resume-optimization': 'Resume Optimization',
  'career-development': 'Career Development',
  'hr-insights': 'HR Insights',
  'market-signaling': 'Market Signaling',
  'product-feature': 'Product Feature',
};

export const categoryColors: Record<BlogCategory, string> = {
  'resume-optimization': 'bg-blue-50 text-blue-700 border-blue-200',
  'career-development': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'hr-insights': 'bg-purple-50 text-purple-700 border-purple-200',
  'market-signaling': 'bg-amber-50 text-amber-700 border-amber-200',
  'product-feature': 'bg-indigo-50 text-indigo-700 border-indigo-200',
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
  },
  {
    "slug": "how-to-read-visual-analysis",
    "title": "How to Read Your CV Visual Analysis Results",
    "description": "A quick guide to interpreting CViviD's visual analysis. Learn what each layer shows, why photos matter, and how to optimize your CV layout.",
    "category": "product-feature",
    "tags": ["visual analysis", "eye-tracking", "CV layout", "how-to"],
    "content": "<h2>Understanding Your Visual Analysis</h2>\n\n<p>CViviD's visual analysis simulates how recruiters scan your CV. This guide helps you interpret the results and take action.</p>\n\n<hr />\n\n<h3>Enable All Layers First</h3>\n\n<p>Your analysis includes multiple filter layers: attention heatmap, text density, focal points, and reading flow.</p>\n\n<p><strong>Rule:</strong> Always enable all layers simultaneously. The intersection of layers reveals which content receives focused attention versus scattered glances.</p>\n\n<ul>\n  <li>If a skill appears in a <em>high-attention zone</em> across multiple layers → it's being noticed</li>\n  <li>If important content falls in a <em>low-attention zone</em> → reposition it</li>\n  <li>If layers conflict (high density but low attention) → reduce clutter in that area</li>\n</ul>\n\n<hr />\n\n<h3>The Photo Problem</h3>\n\n<p>Photos attract disproportionate attention. This isn't always good.</p>\n\n<p><strong>If your heatmap shows the photo as the strongest focal point</strong> → your face is competing with your qualifications.</p>\n\n<p><strong>Action:</strong></p>\n<ul>\n  <li>If the role requires a photo (some EU countries) → keep it small, positioned in a corner</li>\n  <li>If the role doesn't require a photo → remove it entirely</li>\n  <li>If your experience section receives less attention than your photo → remove the photo</li>\n</ul>\n\n<hr />\n\n<h3>What Goes Where</h3>\n\n<p>Recruiters scan in an F-pattern: top-left first, then across, then down the left edge.</p>\n\n<p><strong>Top third of page (highest attention):</strong></p>\n<ul>\n  <li>Your name and target job title</li>\n  <li>A 2-3 line professional summary with measurable achievements</li>\n  <li>Your most relevant current/recent role</li>\n</ul>\n\n<p><strong>Middle section:</strong></p>\n<ul>\n  <li>Work experience with quantified results</li>\n  <li>Key skills (if technical role)</li>\n</ul>\n\n<p><strong>Bottom of page (lowest attention):</strong></p>\n<ul>\n  <li>Contact information (email, phone, LinkedIn)</li>\n  <li>Education (unless you're a recent graduate)</li>\n  <li>References or \"available upon request\"</li>\n</ul>\n\n<p><strong>Why contact info goes last:</strong> Recruiters only need it <em>after</em> deciding to contact you. Placing it at the top wastes prime visual real estate.</p>\n\n<hr />\n\n<h3>Color and Contrast</h3>\n\n<p>Color choices directly affect readability and attention.</p>\n\n<p><strong>If your analysis shows low readability scores:</strong></p>\n<ul>\n  <li>Light text on light background → increase contrast</li>\n  <li>Too many colors → limit to 2-3 maximum</li>\n  <li>Colored backgrounds behind text → switch to white/light gray</li>\n</ul>\n\n<p><strong>If attention is scattered across decorative elements:</strong></p>\n<ul>\n  <li>Bright accent colors → mute them or remove</li>\n  <li>Icons competing with text → simplify or eliminate icons</li>\n  <li>Borders and lines → reduce visual noise</li>\n</ul>\n\n<p><strong>Safe defaults:</strong> Black text (#1a1a1a) on white background. One accent color for headings only.</p>\n\n<hr />\n\n<h3>Quick Decision Guide</h3>\n\n<table>\n  <tr>\n    <th>If you see...</th>\n    <th>Then do this</th>\n  </tr>\n  <tr>\n    <td>Photo dominates heatmap</td>\n    <td>Remove photo or shrink significantly</td>\n  </tr>\n  <tr>\n    <td>Skills section ignored</td>\n    <td>Move it higher or make it more scannable</td>\n  </tr>\n  <tr>\n    <td>Experience section has cold spots</td>\n    <td>Add bullet points, reduce paragraph density</td>\n  </tr>\n  <tr>\n    <td>Contact info attracts high attention</td>\n    <td>Move to footer, reduce font size</td>\n  </tr>\n  <tr>\n    <td>Low overall readability</td>\n    <td>Increase font size, add whitespace, simplify colors</td>\n  </tr>\n</table>\n\n<hr />\n\n<p><strong>Next step:</strong> Re-upload your revised CV and compare the before/after analysis to confirm improvements.</p>"
  },
  {
    "slug": "understanding-layout-engine-scores",
    "title": "Understanding Your Visual Layout Engine Scores",
    "description": "Learn what each Visual Layout Engine metric means and exactly how to improve scores for Visual Fixation, Whitespace, Typography, Hierarchy, and Color Harmony.",
    "category": "product-feature",
    "tags": ["layout scores", "CV design", "typography", "whitespace", "how-to"],
    "content": "<h2>Your Visual Layout Engine Scores Explained</h2>\n\n<p>The Visual Layout Engine analyzes five key aspects of your CV design. Each score ranges from 0-100. Here's how to read them and what to do.</p>\n\n<hr />\n\n<h3>Visual Fixation (Target: 80+)</h3>\n\n<p>Measures how effectively your CV guides the eye to important content. High scores mean recruiters land on the right information.</p>\n\n<p><strong>Score interpretation:</strong></p>\n<ul>\n  <li><strong>90-100:</strong> Excellent. Key content captures attention immediately.</li>\n  <li><strong>75-89:</strong> Good. Minor adjustments needed.</li>\n  <li><strong>60-74:</strong> Weak. Important content is being missed.</li>\n  <li><strong>Below 60:</strong> Poor. Recruiters don't know where to look.</li>\n</ul>\n\n<p><strong>If your score is below 75:</strong></p>\n<ul>\n  <li>Make your name and job title larger and bolder</li>\n  <li>Add more contrast between headings and body text</li>\n  <li>Remove competing visual elements (icons, graphics, borders)</li>\n  <li>Use bold text sparingly to highlight key achievements only</li>\n</ul>\n\n<hr />\n\n<h3>Whitespace (Target: 75+)</h3>\n\n<p>Measures breathing room between elements. Too little whitespace creates visual overload. Too much wastes space.</p>\n\n<p><strong>Score interpretation:</strong></p>\n<ul>\n  <li><strong>90-100:</strong> Generous spacing. May indicate underused space.</li>\n  <li><strong>75-89:</strong> Optimal balance. Easy to scan.</li>\n  <li><strong>60-74:</strong> Tight. Content feels cramped.</li>\n  <li><strong>Below 60:</strong> Cluttered. Overwhelming to read.</li>\n</ul>\n\n<p><strong>If your score is below 70:</strong></p>\n<ul>\n  <li>Increase line spacing to 1.3-1.5</li>\n  <li>Add margins between sections (at least 12-16px)</li>\n  <li>Break long paragraphs into bullet points</li>\n  <li>Remove content that doesn't directly support your application</li>\n</ul>\n\n<p><strong>If your score is above 90:</strong></p>\n<ul>\n  <li>Consider if you're underutilizing available space</li>\n  <li>Add more detail to thin sections</li>\n  <li>You may be able to reduce to one page</li>\n</ul>\n\n<hr />\n\n<h3>Typography (Target: 80+)</h3>\n\n<p>Measures font choices, sizes, and readability. Good typography is invisible—it just works.</p>\n\n<p><strong>Score interpretation:</strong></p>\n<ul>\n  <li><strong>90-100:</strong> Professional, highly readable fonts and sizing.</li>\n  <li><strong>80-89:</strong> Good readability with minor issues.</li>\n  <li><strong>65-79:</strong> Readable but not optimal.</li>\n  <li><strong>Below 65:</strong> Font choices hurt readability.</li>\n</ul>\n\n<p><strong>If your score is below 80:</strong></p>\n<ul>\n  <li>Switch to a professional font: Arial, Calibri, Helvetica, or Georgia</li>\n  <li>Set body text to 10-12pt minimum</li>\n  <li>Limit yourself to 2 fonts maximum (one for headings, one for body)</li>\n  <li>Avoid decorative or script fonts entirely</li>\n  <li>Ensure consistent font sizes across similar elements</li>\n</ul>\n\n<hr />\n\n<h3>Hierarchy (Target: 85+)</h3>\n\n<p>Measures how clearly your CV signals what's most important. Strong hierarchy creates a visual roadmap.</p>\n\n<p><strong>Score interpretation:</strong></p>\n<ul>\n  <li><strong>90-100:</strong> Clear levels of importance. Scannable in seconds.</li>\n  <li><strong>80-89:</strong> Good structure with room for refinement.</li>\n  <li><strong>65-79:</strong> Flat structure. Everything looks equally important.</li>\n  <li><strong>Below 65:</strong> No clear structure. Confusing to navigate.</li>\n</ul>\n\n<p><strong>If your score is below 80:</strong></p>\n<ul>\n  <li>Create 3-4 distinct text sizes (name → section headers → job titles → body)</li>\n  <li>Use bold for job titles and company names, regular weight for descriptions</li>\n  <li>Add visual separators between major sections (lines or extra spacing)</li>\n  <li>Align dates consistently (right-aligned works well)</li>\n  <li>Make section headers stand out with size or color</li>\n</ul>\n\n<hr />\n\n<h3>Color Harmony (Target: 75+)</h3>\n\n<p>Measures whether colors work together and support readability rather than distract.</p>\n\n<p><strong>Score interpretation:</strong></p>\n<ul>\n  <li><strong>90-100:</strong> Colors enhance without distracting.</li>\n  <li><strong>75-89:</strong> Acceptable palette with minor clashes.</li>\n  <li><strong>60-74:</strong> Colors compete for attention or reduce contrast.</li>\n  <li><strong>Below 60:</strong> Color choices actively hurt readability.</li>\n</ul>\n\n<p><strong>If your score is below 75:</strong></p>\n<ul>\n  <li>Reduce to maximum 2-3 colors total</li>\n  <li>Use color for accents only (headings, lines), not large areas</li>\n  <li>Ensure text-to-background contrast ratio of at least 4.5:1</li>\n  <li>Avoid bright colors (neon, saturated primaries)</li>\n  <li>When in doubt: black text, white background, one muted accent</li>\n</ul>\n\n<hr />\n\n<h3>Quick Reference Table</h3>\n\n<table>\n  <tr>\n    <th>Metric</th>\n    <th>Below Target</th>\n    <th>Quick Fix</th>\n  </tr>\n  <tr>\n    <td>Visual Fixation &lt;75</td>\n    <td>Eye wanders aimlessly</td>\n    <td>Increase heading contrast, remove clutter</td>\n  </tr>\n  <tr>\n    <td>Whitespace &lt;70</td>\n    <td>Page feels cramped</td>\n    <td>Add line spacing, increase margins</td>\n  </tr>\n  <tr>\n    <td>Typography &lt;80</td>\n    <td>Hard to read</td>\n    <td>Switch to standard fonts, fix sizing</td>\n  </tr>\n  <tr>\n    <td>Hierarchy &lt;80</td>\n    <td>Everything looks same</td>\n    <td>Create 3-4 distinct text levels</td>\n  </tr>\n  <tr>\n    <td>Color Harmony &lt;75</td>\n    <td>Colors distract</td>\n    <td>Reduce to 2-3 colors, increase contrast</td>\n  </tr>\n</table>\n\n<hr />\n\n<h3>Overall Score Priority</h3>\n\n<p>If multiple scores are low, fix them in this order:</p>\n<ol>\n  <li><strong>Typography</strong> — if text isn't readable, nothing else matters</li>\n  <li><strong>Hierarchy</strong> — structure helps recruiters navigate</li>\n  <li><strong>Whitespace</strong> — breathing room reduces cognitive load</li>\n  <li><strong>Color Harmony</strong> — colors should support, not distract</li>\n  <li><strong>Visual Fixation</strong> — fine-tune attention flow last</li>\n</ol>\n\n<p><strong>Next step:</strong> Make changes to your lowest-scoring area first, then re-analyze to measure improvement.</p>"
  },
  {
    "slug": "understanding-forms-of-capital",
    "title": "Understanding Your Forms of Capital Analysis",
    "description": "Learn how to interpret your Bourdieu Capital scores, why balance matters more than maximizing one type, and what to do when you lack Material Capital evidence.",
    "category": "product-feature",
    "tags": ["career capital", "Bourdieu", "resume strategy", "how-to"],
    "content": "<h2>Your Forms of Capital Results Explained</h2>\n\n<p>CViviD analyzes your CV through the lens of sociological capital theory. You don't need a PhD to use these insights—just follow the recommendations below.</p>\n\n<p>The analysis identifies five types of professional capital and shows evidence for each. Here's how to interpret your results and take action.</p>\n\n<hr />\n\n<h3>The Five Capital Types</h3>\n\n<p><strong>Cultural Capital</strong> — Your knowledge credentials: degrees, certifications, courses, specialized training.</p>\n\n<p><strong>Social Capital</strong> — Your network signals: prestigious employers, known clients, industry affiliations, collaborations.</p>\n\n<p><strong>Symbolic Capital</strong> — Your recognition markers: awards, publications, speaking engagements, leadership titles.</p>\n\n<p><strong>Technological Capital</strong> — Your technical competencies: tools, platforms, methodologies, systems expertise.</p>\n\n<p><strong>Material Capital</strong> — Your tangible impact: budgets managed, revenue generated, team sizes, measurable outcomes.</p>\n\n<hr />\n\n<h3>Reading the Capital Balance</h3>\n\n<p>Your analysis shows a radar chart with five axes. The shape matters more than individual scores.</p>\n\n<p><strong>Balanced shape (pentagon):</strong> Your CV signals competence across multiple dimensions. This is the goal.</p>\n\n<p><strong>Spiked shape (one axis dominates):</strong> You're over-relying on one capital type. This is risky.</p>\n\n<p><strong>Flat shape (all scores low):</strong> Your CV lacks concrete evidence. Add specific proof points.</p>\n\n<hr />\n\n<h3>What If One Capital Dominates?</h3>\n\n<p>Having one strong capital isn't bad—but relying on it alone is dangerous.</p>\n\n<p><strong>If Cultural Capital dominates:</strong></p>\n<ul>\n  <li>You look \"academic\" but untested in practice</li>\n  <li>Action: Add project outcomes, tools used, team collaboration examples</li>\n</ul>\n\n<p><strong>If Social Capital dominates:</strong></p>\n<ul>\n  <li>You look \"well-connected\" but personally unproven</li>\n  <li>Action: Add your individual contributions, not just who you worked with</li>\n</ul>\n\n<p><strong>If Symbolic Capital dominates:</strong></p>\n<ul>\n  <li>You look \"decorated\" but what did you actually do?</li>\n  <li>Action: Connect awards to specific achievements and impact</li>\n</ul>\n\n<p><strong>If Technological Capital dominates:</strong></p>\n<ul>\n  <li>You look like a \"tool operator\" not a problem solver</li>\n  <li>Action: Show how you applied tools to create business value</li>\n</ul>\n\n<p><strong>If Material Capital dominates:</strong></p>\n<ul>\n  <li>You look \"transactional\" without depth or growth trajectory</li>\n  <li>Action: Add credentials, recognition, and collaborative achievements</li>\n</ul>\n\n<hr />\n\n<h3>The Material Capital Question</h3>\n\n<p>HR professionals often look for Material Capital first: \"Managed $1M budget,\" \"Led team of 15,\" \"Increased revenue 40%.\"</p>\n\n<p><strong>This is normal.</strong> Numbers create instant credibility.</p>\n\n<p><strong>But not having Material Capital is also normal.</strong> Many excellent candidates—especially early-career, career-changers, or specialists—don't have big budget numbers.</p>\n\n<p><strong>If your Material Capital is low, use these strategies:</strong></p>\n\n<ol>\n  <li><strong>Quantify what you can</strong> — Even small numbers work: \"Trained 5 team members,\" \"Reduced errors by 30%,\" \"Processed 200+ requests monthly\"</li>\n  <li><strong>Emphasize Technological Capital</strong> — Specific tools and methodologies show capability without budget proof</li>\n  <li><strong>Leverage Cultural Capital</strong> — Relevant certifications signal competence when experience is limited</li>\n  <li><strong>Build Social Capital evidence</strong> — Cross-functional projects and client-facing work show trust</li>\n  <li><strong>Highlight Symbolic Capital</strong> — Any recognition, even internal awards, signals that others validated your work</li>\n</ol>\n\n<hr />\n\n<h3>The Danger of Single-Capital Strategy</h3>\n\n<p>Betting everything on one capital type can backfire:</p>\n\n<table>\n  <tr>\n    <th>If you only show...</th>\n    <th>Recruiter might think...</th>\n  </tr>\n  <tr>\n    <td>Degrees and certifications</td>\n    <td>\"Can they actually do the job?\"</td>\n  </tr>\n  <tr>\n    <td>Big company names</td>\n    <td>\"Were they a small cog in a big machine?\"</td>\n  </tr>\n  <tr>\n    <td>Awards and titles</td>\n    <td>\"What was their real contribution?\"</td>\n  </tr>\n  <tr>\n    <td>Tool lists</td>\n    <td>\"Do they understand business context?\"</td>\n  </tr>\n  <tr>\n    <td>Budget numbers</td>\n    <td>\"Are they just chasing money?\"</td>\n  </tr>\n</table>\n\n<p><strong>The fix:</strong> Each capital type should support the others. Numbers need context. Credentials need application. Names need your personal contribution.</p>\n\n<hr />\n\n<h3>Combining Capitals for Success</h3>\n\n<p>Strong CVs weave multiple capitals together. Here's how:</p>\n\n<p><strong>Pattern 1: Cultural + Technological + Material</strong></p>\n<ul>\n  <li>\"AWS Certified Solutions Architect who designed infrastructure reducing costs by 35%\"</li>\n  <li>Shows: credential → tool → outcome</li>\n</ul>\n\n<p><strong>Pattern 2: Social + Symbolic + Material</strong></p>\n<ul>\n  <li>\"Led cross-functional team at [Known Company], recognized with Excellence Award for launching product generating $2M revenue\"</li>\n  <li>Shows: collaboration → recognition → impact</li>\n</ul>\n\n<p><strong>Pattern 3: Technological + Cultural + Symbolic</strong></p>\n<ul>\n  <li>\"Python developer with Stanford ML certification, published research on NLP optimization\"</li>\n  <li>Shows: skill → credential → recognition</li>\n</ul>\n\n<p><strong>Rule:</strong> Each bullet point should ideally touch 2-3 capital types.</p>\n\n<hr />\n\n<h3>Using the Evidence List</h3>\n\n<p>Your analysis includes \"Forms of Capital Evidence\"—specific phrases detected in your CV.</p>\n\n<p><strong>If a capital type shows few or no evidence items:</strong></p>\n<ul>\n  <li>That capital is invisible to recruiters</li>\n  <li>Add explicit proof: certifications, metrics, company names, awards</li>\n</ul>\n\n<p><strong>If evidence items are vague:</strong></p>\n<ul>\n  <li>\"Worked with clients\" → weak Social Capital</li>\n  <li>\"Worked with Fortune 500 clients including [Name]\" → strong Social Capital</li>\n</ul>\n\n<p><strong>If evidence is concentrated in one area:</strong></p>\n<ul>\n  <li>Your CV is unbalanced</li>\n  <li>Add evidence for your weakest 2-3 capital types</li>\n</ul>\n\n<hr />\n\n<h3>Quick Decision Guide</h3>\n\n<table>\n  <tr>\n    <th>If your analysis shows...</th>\n    <th>Then do this</th>\n  </tr>\n  <tr>\n    <td>One capital far above others</td>\n    <td>Add evidence for your 2 weakest capitals</td>\n  </tr>\n  <tr>\n    <td>Material Capital is lowest</td>\n    <td>Quantify anything possible, boost other capitals</td>\n  </tr>\n  <tr>\n    <td>All capitals are low</td>\n    <td>Your CV lacks specifics—add concrete proof everywhere</td>\n  </tr>\n  <tr>\n    <td>Balanced but all medium</td>\n    <td>Good foundation—now strengthen your top 2 capitals</td>\n  </tr>\n  <tr>\n    <td>Evidence list has vague items</td>\n    <td>Make each item more specific with names, numbers, outcomes</td>\n  </tr>\n</table>\n\n<hr />\n\n<h3>Let the Science Work for You</h3>\n\n<p>You don't need to understand Bourdieu's sociology. The analysis does that work.</p>\n\n<p>Your job is simple:</p>\n<ol>\n  <li>Check which capitals are weak</li>\n  <li>Add evidence for those areas</li>\n  <li>Combine multiple capitals in each achievement</li>\n  <li>Re-analyze to confirm improvement</li>\n</ol>\n\n<p><strong>Next step:</strong> Look at your weakest capital type and add 2-3 specific evidence items for it.</p>"
  },
  {
    "slug": "understanding-skills-distribution",
    "title": "Understanding Your Skills Distribution Analysis",
    "description": "Learn how to interpret your Semantic Content Distribution and Top Detected Skills. Discover the right balance of Hard Skills, Soft Skills, Impact, and Education for your profession.",
    "category": "product-feature",
    "tags": ["skills analysis", "hard skills", "soft skills", "resume optimization", "how-to"],
    "content": "<h2>Your Skills Distribution Explained</h2>\n\n<p>CViviD analyzes what types of content dominate your CV. The Semantic Content Distribution shows how your resume is weighted across four categories: Hard Skills, Soft Skills, Impact Statements, and Education.</p>\n\n<p>There is no universal \"correct\" distribution. Different roles require different balances.</p>\n\n<hr />\n\n<h3>The Four Content Categories</h3>\n\n<p><strong>Hard Skills</strong> — Technical abilities, tools, platforms, languages, methodologies. Things you can demonstrate or test.</p>\n\n<p><strong>Soft Skills</strong> — Interpersonal abilities: communication, leadership, collaboration, problem-solving, adaptability.</p>\n\n<p><strong>Impact Statements</strong> — Results and outcomes: percentages, metrics, achievements, business value delivered.</p>\n\n<p><strong>Education</strong> — Formal credentials: degrees, certifications, courses, training programs.</p>\n\n<hr />\n\n<h3>Reading Your Distribution Chart</h3>\n\n<p>Your analysis shows a percentage breakdown. Here's how to interpret it:</p>\n\n<p><strong>If Hard Skills dominate (50%+):</strong></p>\n<ul>\n  <li>Your CV reads like a technical specification</li>\n  <li>Risk: You may appear as a \"tool operator\" without business context</li>\n</ul>\n\n<p><strong>If Soft Skills dominate (40%+):</strong></p>\n<ul>\n  <li>Your CV reads like a personality description</li>\n  <li>Risk: Recruiters may question your concrete capabilities</li>\n</ul>\n\n<p><strong>If Impact dominates (50%+):</strong></p>\n<ul>\n  <li>Your CV reads like a results report</li>\n  <li>Risk: How did you achieve these results? What skills were used?</li>\n</ul>\n\n<p><strong>If Education dominates (40%+):</strong></p>\n<ul>\n  <li>Your CV reads like an academic transcript</li>\n  <li>Risk: Can you apply this knowledge in practice?</li>\n</ul>\n\n<hr />\n\n<h3>Different Roles, Different Distributions</h3>\n\n<p>There is no one-size-fits-all formula. Here are target distributions by profession type:</p>\n\n<p><strong>Technical Roles (Developer, Engineer, Data Scientist):</strong></p>\n<ul>\n  <li>Hard Skills: 40-50%</li>\n  <li>Impact: 25-35%</li>\n  <li>Soft Skills: 15-20%</li>\n  <li>Education: 10-15%</li>\n</ul>\n\n<p><strong>Management Roles (Project Manager, Team Lead, Director):</strong></p>\n<ul>\n  <li>Impact: 35-45%</li>\n  <li>Soft Skills: 25-35%</li>\n  <li>Hard Skills: 15-25%</li>\n  <li>Education: 10-15%</li>\n</ul>\n\n<p><strong>Creative Roles (Designer, Writer, Marketing):</strong></p>\n<ul>\n  <li>Hard Skills: 30-40%</li>\n  <li>Impact: 30-35%</li>\n  <li>Soft Skills: 20-25%</li>\n  <li>Education: 10-15%</li>\n</ul>\n\n<p><strong>Entry-Level / Career Changers:</strong></p>\n<ul>\n  <li>Education: 25-35%</li>\n  <li>Hard Skills: 30-40%</li>\n  <li>Soft Skills: 20-25%</li>\n  <li>Impact: 15-20%</li>\n</ul>\n\n<p><strong>Consulting / Client-Facing Roles:</strong></p>\n<ul>\n  <li>Impact: 30-40%</li>\n  <li>Soft Skills: 30-35%</li>\n  <li>Hard Skills: 20-25%</li>\n  <li>Education: 10-15%</li>\n</ul>\n\n<hr />\n\n<h3>Strategies by Profession Type</h3>\n\n<p><strong>For Technical Professionals:</strong></p>\n<ul>\n  <li>Lead with specific technologies and versions (\"Python 3.11\", \"React 18\")</li>\n  <li>Connect each tool to a business outcome</li>\n  <li>Group skills by category (Languages, Frameworks, Cloud, DevOps)</li>\n  <li>Include certifications that validate technical depth</li>\n</ul>\n\n<p><strong>For Managers and Leaders:</strong></p>\n<ul>\n  <li>Lead with team size and scope (\"Led 12-person cross-functional team\")</li>\n  <li>Quantify business impact before listing methods</li>\n  <li>Show progression in responsibility</li>\n  <li>Balance people skills with strategic thinking</li>\n</ul>\n\n<p><strong>For Creative Professionals:</strong></p>\n<ul>\n  <li>Lead with tools and deliverables (\"Designed 50+ brand assets in Figma\")</li>\n  <li>Include measurable outcomes (engagement, conversions, reach)</li>\n  <li>Show collaboration with stakeholders</li>\n  <li>List both creative tools and business tools</li>\n</ul>\n\n<p><strong>For Entry-Level Candidates:</strong></p>\n<ul>\n  <li>Lead with relevant coursework and projects</li>\n  <li>Highlight internship and project outcomes</li>\n  <li>Show eagerness through certifications and self-learning</li>\n  <li>Emphasize transferable soft skills from any experience</li>\n</ul>\n\n<hr />\n\n<h3>The Soft Skills Rule</h3>\n\n<p><strong>Even the most technical role requires soft skills.</strong></p>\n\n<p>Why? Because people work with other people. Code reviews need communication. Sprints need collaboration. Debugging needs problem-solving with teammates.</p>\n\n<p><strong>If your Soft Skills percentage is below 10%:</strong></p>\n<ul>\n  <li>Your CV may appear robotic or antisocial</li>\n  <li>Add: collaboration examples, mentoring, cross-team work, stakeholder communication</li>\n</ul>\n\n<p><strong>If your Soft Skills percentage is above 40%:</strong></p>\n<ul>\n  <li>Your CV may appear fluffy or lacking substance</li>\n  <li>Replace generic claims with specific examples tied to outcomes</li>\n</ul>\n\n<p><strong>Soft skills work best when embedded in achievements:</strong></p>\n<ul>\n  <li>Weak: \"Strong communication skills\"</li>\n  <li>Strong: \"Presented technical findings to C-suite, securing $500K budget approval\"</li>\n</ul>\n\n<hr />\n\n<h3>Using the Top Detected Skills List</h3>\n\n<p>Your analysis shows specific skills detected in your CV. Review this list carefully:</p>\n\n<p><strong>If important skills are missing:</strong></p>\n<ul>\n  <li>The skill isn't mentioned explicitly enough</li>\n  <li>Add it by name in context: \"Used [Skill] to achieve [Result]\"</li>\n</ul>\n\n<p><strong>If irrelevant skills appear:</strong></p>\n<ul>\n  <li>Your CV may be targeting too broadly</li>\n  <li>Remove or de-emphasize skills not relevant to target role</li>\n</ul>\n\n<p><strong>If skills appear but rank low:</strong></p>\n<ul>\n  <li>They're mentioned but not emphasized</li>\n  <li>Add more instances or move them higher in the document</li>\n</ul>\n\n<hr />\n\n<h3>Combining Skills for Maximum Impact</h3>\n\n<p>The strongest bullet points combine multiple skill types:</p>\n\n<p><strong>Pattern 1: Hard Skill + Impact</strong></p>\n<ul>\n  <li>\"Built automated testing pipeline in Jenkins, reducing deployment errors by 60%\"</li>\n</ul>\n\n<p><strong>Pattern 2: Soft Skill + Hard Skill + Impact</strong></p>\n<ul>\n  <li>\"Collaborated with design team to implement React component library, accelerating feature delivery by 3 weeks\"</li>\n</ul>\n\n<p><strong>Pattern 3: Education + Hard Skill + Impact</strong></p>\n<ul>\n  <li>\"Applied machine learning techniques from Stanford certification to build recommendation engine increasing engagement 25%\"</li>\n</ul>\n\n<p><strong>Rule:</strong> Never list a skill without showing application. Never show impact without explaining how.</p>\n\n<hr />\n\n<h3>Quick Decision Guide</h3>\n\n<table>\n  <tr>\n    <th>If your analysis shows...</th>\n    <th>Then do this</th>\n  </tr>\n  <tr>\n    <td>Hard Skills &gt;55%</td>\n    <td>Add impact statements and outcomes to each skill</td>\n  </tr>\n  <tr>\n    <td>Soft Skills &lt;10%</td>\n    <td>Add collaboration, communication, leadership examples</td>\n  </tr>\n  <tr>\n    <td>Soft Skills &gt;40%</td>\n    <td>Replace generic claims with specific, measurable examples</td>\n  </tr>\n  <tr>\n    <td>Impact &lt;15%</td>\n    <td>Add numbers, percentages, and business outcomes everywhere</td>\n  </tr>\n  <tr>\n    <td>Education &gt;35% (non-entry level)</td>\n    <td>Shift focus to experience and reduce credential emphasis</td>\n  </tr>\n  <tr>\n    <td>Key skill missing from detected list</td>\n    <td>Add explicit mentions with context and results</td>\n  </tr>\n</table>\n\n<hr />\n\n<h3>Balancing Your Distribution</h3>\n\n<p>To adjust your distribution:</p>\n\n<ol>\n  <li><strong>Identify your target role type</strong> from the list above</li>\n  <li><strong>Compare your current distribution</strong> to the target</li>\n  <li><strong>Add content to underrepresented categories</strong></li>\n  <li><strong>Trim or consolidate overrepresented categories</strong></li>\n  <li><strong>Re-analyze</strong> to verify improvement</li>\n</ol>\n\n<p><strong>Next step:</strong> Compare your distribution to your target role type and adjust the category that's furthest from target.</p>"
  },
  {
    "slug": "understanding-market-impact-scores",
    "title": "Understanding Your Market Impact Scores",
    "description": "Learn how to interpret Market Signaling and ATS Friendliness scores. Understand how machines and humans read your CV differently—and how to satisfy both using proven economics principles.",
    "category": "product-feature",
    "tags": ["market signaling", "ATS", "resume optimization", "Spence", "economics", "how-to"],
    "content": "<h2>Your Market Impact Analysis Explained</h2>\n\n<p>Your CV faces two very different readers: automated systems (ATS) and human recruiters. CViviD's Market Impact analysis measures how well you communicate to both.</p>\n\n<p>This guide explains what each score means and how to optimize for machines and humans simultaneously—grounded in Nobel Prize-winning economics research.</p>\n\n<hr />\n\n<h3>The Economics of Hiring: Spence's Signaling Theory</h3>\n\n<p>In 1973, economist Michael Spence published research that earned him the Nobel Prize: <strong>Job Market Signaling</strong>.</p>\n\n<p>His core insight: Hiring is a decision made under <strong>information asymmetry</strong>. You know your true abilities. Employers don't. They can only observe signals.</p>\n\n<p><strong>The problem:</strong> Anyone can claim to be \"hardworking\" or \"skilled.\" Words are cheap. How can employers distinguish high-quality candidates from low-quality ones making the same claims?</p>\n\n<p><strong>Spence's answer:</strong> Credible signals must be <em>costly</em>—difficult or expensive to fake. A degree from a rigorous university signals ability because only capable people can obtain it. A track record of promotions signals competence because companies don't promote randomly.</p>\n\n<p>Your CV is a collection of signals. The question is: are they costly (credible) or cheap (ignorable)?</p>\n\n<hr />\n\n<h3>Costly Signals vs. Cheap Talk</h3>\n\n<p>In economics, <strong>cheap talk</strong> refers to claims that cost nothing to make. <strong>Costly signals</strong> require investment that only qualified candidates can realistically provide.</p>\n\n<p><strong>Cheap talk (low credibility):</strong></p>\n<ul>\n  <li>\"Excellent communication skills\"</li>\n  <li>\"Results-driven professional\"</li>\n  <li>\"Passionate about innovation\"</li>\n  <li>\"Strong work ethic\"</li>\n</ul>\n\n<p><strong>Costly signals (high credibility):</strong></p>\n<ul>\n  <li>\"Led team that increased revenue 40% YoY\" — requires actual achievement</li>\n  <li>\"AWS Solutions Architect certification\" — requires passing rigorous exam</li>\n  <li>\"Promoted twice in 3 years at Google\" — requires external validation</li>\n  <li>\"Published in peer-reviewed journal\" — requires expert acceptance</li>\n</ul>\n\n<p><strong>The rule:</strong> If a claim costs nothing to make, it signals nothing to employers.</p>\n\n<hr />\n\n<h3>Information Asymmetry and the Hiring Problem</h3>\n\n<p>Employers face what economists call <strong>adverse selection</strong>: without reliable signals, they cannot distinguish good candidates from bad ones making identical claims.</p>\n\n<p>This creates a market failure:</p>\n<ul>\n  <li>Good candidates who only use cheap talk look identical to weak candidates</li>\n  <li>Employers discount all claims equally</li>\n  <li>Good candidates are undervalued; weak candidates are overvalued</li>\n</ul>\n\n<p><strong>Your goal:</strong> Break out of this pooling equilibrium by providing signals that weak candidates cannot easily replicate.</p>\n\n<p><strong>If your CV contains mostly cheap talk:</strong></p>\n<ul>\n  <li>You're pooled with every other candidate making the same claims</li>\n  <li>Employers have no way to verify your quality</li>\n  <li>You rely entirely on luck or connections</li>\n</ul>\n\n<p><strong>If your CV contains costly signals:</strong></p>\n<ul>\n  <li>You separate yourself from the pool</li>\n  <li>Employers can rationally infer your quality</li>\n  <li>You compete on merit, not chance</li>\n</ul>\n\n<hr />\n\n<h3>Two Scores, Two Audiences</h3>\n\n<p><strong>Market Signaling Score</strong> — How effectively your CV communicates your professional value to human readers. This measures the strength and credibility of your costly signals.</p>\n\n<p><strong>ATS Friendliness Score</strong> — How easily automated systems can parse, categorize, and match your CV to job requirements. This measures technical compatibility and keyword optimization.</p>\n\n<p><strong>The goal:</strong> High scores in both. They are not mutually exclusive.</p>\n\n<hr />\n\n<h3>How Machines Read Your CV</h3>\n\n<p>Applicant Tracking Systems (ATS) are software that filter applications before humans see them. They don't evaluate signal quality—they match patterns.</p>\n\n<p><strong>What ATS looks for:</strong></p>\n<ul>\n  <li>Exact keyword matches from job descriptions</li>\n  <li>Standard section headers (Experience, Education, Skills)</li>\n  <li>Parseable text format (not images or complex tables)</li>\n  <li>Consistent date formats</li>\n  <li>Recognized job titles and company names</li>\n</ul>\n\n<p><strong>What ATS ignores:</strong></p>\n<ul>\n  <li>Context and nuance</li>\n  <li>Signal credibility</li>\n  <li>Visual design and formatting</li>\n  <li>Narrative flow</li>\n</ul>\n\n<p><strong>Economics insight:</strong> ATS is a screening mechanism, not a signaling interpreter. It filters for baseline qualifications but cannot assess signal quality. That's why you need both scores.</p>\n\n<hr />\n\n<h3>How Humans Read Your CV</h3>\n\n<p>Recruiters spend 6-10 seconds on initial scan. Unlike ATS, they evaluate signal credibility intuitively.</p>\n\n<p><strong>What humans notice (costly signals):</strong></p>\n<ul>\n  <li>Career progression and trajectory (hard to fake)</li>\n  <li>Quantified achievements (verifiable)</li>\n  <li>Prestigious employers or clients (external validation)</li>\n  <li>Specific credentials (require investment)</li>\n</ul>\n\n<p><strong>What humans discount (cheap talk):</strong></p>\n<ul>\n  <li>Generic self-descriptions</li>\n  <li>Responsibilities without outcomes</li>\n  <li>Buzzwords without evidence</li>\n</ul>\n\n<p><strong>Economics insight:</strong> Recruiters are rationally skeptical. They've seen thousands of CVs claiming \"excellent communication skills.\" Only costly signals break through their skepticism.</p>\n\n<hr />\n\n<h3>Building Your Signaling Strategy</h3>\n\n<p>Think of your CV as an economics problem: How do I credibly communicate my quality to someone who cannot directly observe it?</p>\n\n<p><strong>Step 1: Audit your signals</strong></p>\n<ul>\n  <li>List every claim in your CV</li>\n  <li>Ask: \"Could a less qualified person make this same claim?\"</li>\n  <li>If yes, it's cheap talk. Convert it or remove it.</li>\n</ul>\n\n<p><strong>Step 2: Convert cheap talk to costly signals</strong></p>\n<ul>\n  <li>\"Strong leader\" → \"Promoted to manage 12-person team after 18 months\"</li>\n  <li>\"Data-driven\" → \"Built analytics dashboard that informed $2M budget allocation\"</li>\n  <li>\"Fast learner\" → \"Obtained AWS certification within 3 months of joining cloud team\"</li>\n</ul>\n\n<p><strong>Step 3: Stack multiple signal types</strong></p>\n<ul>\n  <li>Credentials (education, certifications) — investment signal</li>\n  <li>Track record (promotions, tenure) — performance signal</li>\n  <li>Outcomes (metrics, achievements) — impact signal</li>\n  <li>Recognition (awards, publications) — external validation signal</li>\n</ul>\n\n<hr />\n\n<h3>Creating a Unified Narrative (Signal Consistency)</h3>\n\n<p>In economics, <strong>consistent signaling</strong> increases credibility. Inconsistent signals create noise and confusion.</p>\n\n<p>Your CV has many sections: Summary, Experience, Skills, Education. But they must tell one coherent story. Each section should reinforce the same signal.</p>\n\n<p><strong>The logic that unites sections:</strong></p>\n<ul>\n  <li>Summary introduces your positioning → Experience proves it → Skills support it → Education validates it</li>\n  <li>Each section reinforces the same core message</li>\n  <li>No section contradicts another</li>\n</ul>\n\n<p><strong>Signal consistency principle:</strong> If your summary claims \"data engineering expertise\" but your experience shows mostly project management, the signals conflict. Conflicting signals are worse than weak signals—they suggest either confusion or deception.</p>\n\n<p><strong>If your sections feel disconnected:</strong></p>\n<ul>\n  <li>Define your core positioning in one sentence</li>\n  <li>Review each section: does it support this positioning?</li>\n  <li>Remove or reframe content that doesn't fit</li>\n</ul>\n\n<p><strong>Example of unified signal strategy:</strong></p>\n<ul>\n  <li>Position: \"Data engineer who builds scalable pipelines for fintech\"</li>\n  <li>Summary: establishes the signal (data + fintech)</li>\n  <li>Experience: proves the signal (pipeline projects in financial services)</li>\n  <li>Skills: supports the signal (Spark, Airflow, SQL)</li>\n  <li>Education: validates the signal (AWS, data engineering certs)</li>\n</ul>\n\n<p>Every section amplifies the same costly signal. No noise. No contradiction.</p>\n\n<hr />\n\n<h3>Balancing Keywords and Readability</h3>\n\n<p>ATS needs keywords. Humans need readability. Here's how to achieve both:</p>\n\n<p><strong>Keyword rules:</strong></p>\n<ul>\n  <li>Include exact terms from target job descriptions</li>\n  <li>Use both acronyms and full forms (\"SEO\" and \"Search Engine Optimization\")</li>\n  <li>Repeat important keywords 2-3 times naturally</li>\n  <li>Place critical keywords in first half of CV</li>\n</ul>\n\n<p><strong>Readability rules:</strong></p>\n<ul>\n  <li>Never stuff keywords unnaturally</li>\n  <li>Keywords must appear in meaningful context</li>\n  <li>Each keyword mention should add information</li>\n</ul>\n\n<p><strong>Good keyword integration:</strong></p>\n<ul>\n  <li>\"Led Agile transformation for 3 product teams, implementing Scrum ceremonies and Agile metrics tracking\"</li>\n  <li>Keywords (Agile, Scrum) appear naturally with context</li>\n</ul>\n\n<p><strong>Bad keyword stuffing:</strong></p>\n<ul>\n  <li>\"Agile Scrum Agile methodology Scrum Master Agile environment\"</li>\n  <li>ATS may accept it, but humans will reject it</li>\n</ul>\n\n<hr />\n\n<h3>Reading Your Market Signaling Score</h3>\n\n<p><strong>Score interpretation:</strong></p>\n<ul>\n  <li><strong>85-100:</strong> Strong signals. Your value proposition is clear and credible.</li>\n  <li><strong>70-84:</strong> Good foundation. Some signals need strengthening.</li>\n  <li><strong>55-69:</strong> Mixed signals. Key messages are unclear or unproven.</li>\n  <li><strong>Below 55:</strong> Weak signals. CV fails to communicate professional value.</li>\n</ul>\n\n<p><strong>If your score is below 70:</strong></p>\n<ul>\n  <li>Add quantified achievements to every role</li>\n  <li>Replace generic claims with specific evidence</li>\n  <li>Ensure career progression is visible</li>\n  <li>Include recognizable credentials or employers</li>\n</ul>\n\n<hr />\n\n<h3>Reading Your ATS Friendliness Score</h3>\n\n<p><strong>Score interpretation:</strong></p>\n<ul>\n  <li><strong>85-100:</strong> Highly parseable. ATS will extract your information accurately.</li>\n  <li><strong>70-84:</strong> Good compatibility. Minor parsing issues possible.</li>\n  <li><strong>55-69:</strong> Risky. Some content may not be extracted correctly.</li>\n  <li><strong>Below 55:</strong> Poor compatibility. High chance of being filtered out.</li>\n</ul>\n\n<p><strong>If your score is below 70:</strong></p>\n<ul>\n  <li>Use standard section headers (not creative alternatives)</li>\n  <li>Remove text embedded in images or graphics</li>\n  <li>Simplify complex tables or columns</li>\n  <li>Use standard fonts and avoid text boxes</li>\n  <li>Check that dates follow consistent format</li>\n</ul>\n\n<hr />\n\n<h3>Quick Decision Guide</h3>\n\n<table>\n  <tr>\n    <th>If your analysis shows...</th>\n    <th>Then do this</th>\n  </tr>\n  <tr>\n    <td>High Signaling, Low ATS</td>\n    <td>Simplify formatting, add exact keywords from job descriptions</td>\n  </tr>\n  <tr>\n    <td>High ATS, Low Signaling</td>\n    <td>Add context to keywords, quantify achievements, strengthen narrative</td>\n  </tr>\n  <tr>\n    <td>Both scores below 70</td>\n    <td>Start with ATS fixes (format), then add signaling (content)</td>\n  </tr>\n  <tr>\n    <td>Both scores above 80</td>\n    <td>Good foundation. Fine-tune for specific target roles.</td>\n  </tr>\n  <tr>\n    <td>Sections feel disconnected</td>\n    <td>Define one core positioning and align all sections to it</td>\n  </tr>\n  <tr>\n    <td>Keywords present but low ATS</td>\n    <td>Check formatting issues: tables, images, non-standard headers</td>\n  </tr>\n</table>\n\n<hr />\n\n<h3>The Integration Formula</h3>\n\n<p>To satisfy both machines and humans, follow this structure for each achievement:</p>\n\n<p><strong>[Action Verb] + [Keyword/Skill] + [Context] + [Quantified Result]</strong></p>\n\n<p><strong>Examples:</strong></p>\n<ul>\n  <li>\"Implemented <em>Python</em> automation scripts for <em>data pipeline</em>, reducing processing time by 65%\"</li>\n  <li>\"Led <em>cross-functional team</em> of 8 to deliver <em>product launch</em>, achieving 150% of revenue target\"</li>\n  <li>\"Designed <em>responsive UI</em> using <em>React</em> and <em>TypeScript</em>, improving user engagement by 40%\"</li>\n</ul>\n\n<p>Keywords appear naturally. Context adds meaning. Results add credibility.</p>\n\n<hr />\n\n<h3>Section-by-Section Checklist</h3>\n\n<p><strong>Summary section:</strong></p>\n<ul>\n  <li>Contains 3-5 critical keywords</li>\n  <li>States clear value proposition</li>\n  <li>Aligns with target role</li>\n</ul>\n\n<p><strong>Experience section:</strong></p>\n<ul>\n  <li>Each role has quantified achievements</li>\n  <li>Keywords appear in context of accomplishments</li>\n  <li>Progression is visible</li>\n</ul>\n\n<p><strong>Skills section:</strong></p>\n<ul>\n  <li>Lists exact terms from job descriptions</li>\n  <li>Grouped logically (Technical, Tools, Methods)</li>\n  <li>No orphan skills without experience backup</li>\n</ul>\n\n<p><strong>Education section:</strong></p>\n<ul>\n  <li>Relevant certifications included</li>\n  <li>Supports positioning established in Summary</li>\n</ul>\n\n<hr />\n\n<h3>The Separating Equilibrium: Standing Out</h3>\n\n<p>Spence's model describes two outcomes in job markets:</p>\n\n<p><strong>Pooling equilibrium:</strong> All candidates look the same. Employers cannot distinguish quality. Hiring becomes random.</p>\n\n<p><strong>Separating equilibrium:</strong> High-quality candidates invest in costly signals that low-quality candidates cannot match. Employers can identify quality. Merit wins.</p>\n\n<p><strong>Your goal is separating equilibrium.</strong> You achieve this by:</p>\n<ul>\n  <li>Providing signals with real cost (time, effort, achievement)</li>\n  <li>Making your quality visible and verifiable</li>\n  <li>Creating distance between you and candidates who only use cheap talk</li>\n</ul>\n\n<p><strong>The economics logic:</strong> If getting a certification takes 200 hours and passing rate is 40%, that certification signals something. If writing \"detail-oriented\" takes 2 seconds, it signals nothing.</p>\n\n<hr />\n\n<h3>Final Check: The Economics Test</h3>\n\n<p>Before submitting, apply Spence's signaling test:</p>\n<ol>\n  <li><strong>ATS gate:</strong> Can machines extract my information correctly?</li>\n  <li><strong>Costly signal test:</strong> Could a less qualified candidate make these same claims? If yes, convert to verifiable evidence.</li>\n  <li><strong>Consistency test:</strong> Do all sections reinforce the same professional signal?</li>\n  <li><strong>Separation test:</strong> Does this CV distinguish me from the pool of generic applicants?</li>\n</ol>\n\n<p><strong>Remember:</strong> Hiring is a problem of information asymmetry. Your CV solves this problem by providing costly, credible, consistent signals that communicate your true quality.</p>\n\n<p><strong>Next step:</strong> If your ATS score is lowest, fix formatting first. If your Signaling score is lowest, audit your CV for cheap talk and convert every claim to a costly signal.</p>"
  },
  {
    "slug": "understanding-tone-style-profile",
    "title": "Understanding Your Tone & Style Profile",
    "description": "Learn how to interpret your CV's tone analysis. Discover why writing style matters, how different industries expect different tones, and how to calibrate your professional voice.",
    "category": "product-feature",
    "tags": ["tone analysis", "writing style", "professional voice", "CV optimization", "how-to"],
    "content": "<h2>Your Tone & Style Profile Explained</h2>\n\n<p>Your CV isn't just <em>what</em> you say—it's <em>how</em> you say it. The Tone & Style Profile analyzes your writing voice and measures whether it matches professional expectations.</p>\n\n<p>This guide explains what each metric means and how to calibrate your tone for maximum impact.</p>\n\n<hr />\n\n<h3>Why Tone Matters</h3>\n\n<p>Recruiters form impressions within seconds. Before they evaluate your experience, they sense your tone.</p>\n\n<p><strong>Tone signals:</strong></p>\n<ul>\n  <li>Professionalism and maturity</li>\n  <li>Cultural fit with the organization</li>\n  <li>Communication skills</li>\n  <li>Confidence level</li>\n  <li>Attention to detail</li>\n</ul>\n\n<p>A CV with perfect qualifications but wrong tone creates cognitive dissonance. The recruiter feels \"something is off\" even if they can't articulate why.</p>\n\n<hr />\n\n<h3>The Core Tone Dimensions</h3>\n\n<p>Your analysis measures several tone dimensions:</p>\n\n<p><strong>Formality</strong> — How formal vs. casual your language is.</p>\n<ul>\n  <li>High formality: \"Spearheaded cross-functional initiative\"</li>\n  <li>Low formality: \"Helped the team figure out a better way\"</li>\n</ul>\n\n<p><strong>Confidence</strong> — How assertive vs. tentative your claims are.</p>\n<ul>\n  <li>High confidence: \"Delivered 40% revenue increase\"</li>\n  <li>Low confidence: \"Helped contribute to improved results\"</li>\n</ul>\n\n<p><strong>Action Orientation</strong> — How dynamic vs. passive your descriptions are.</p>\n<ul>\n  <li>Action-oriented: \"Built, launched, transformed, drove\"</li>\n  <li>Passive: \"Was responsible for, was involved in, assisted with\"</li>\n</ul>\n\n<p><strong>Specificity</strong> — How concrete vs. vague your language is.</p>\n<ul>\n  <li>Specific: \"Reduced deployment time from 4 hours to 15 minutes\"</li>\n  <li>Vague: \"Improved efficiency significantly\"</li>\n</ul>\n\n<p><strong>Conciseness</strong> — How efficient vs. wordy your writing is.</p>\n<ul>\n  <li>Concise: \"Led 12-person team to $2M target\"</li>\n  <li>Wordy: \"Was given the responsibility of leading a team of twelve people toward achieving a target of two million dollars\"</li>\n</ul>\n\n<hr />\n\n<h3>Reading Your Tone Scores</h3>\n\n<p><strong>Score interpretation (for each dimension):</strong></p>\n<ul>\n  <li><strong>85-100:</strong> Strong. Your tone is calibrated well for professional contexts.</li>\n  <li><strong>70-84:</strong> Good. Minor adjustments would strengthen your voice.</li>\n  <li><strong>55-69:</strong> Mixed. Tone inconsistencies may distract readers.</li>\n  <li><strong>Below 55:</strong> Needs work. Tone actively undermines your content.</li>\n</ul>\n\n<hr />\n\n<h3>Different Industries, Different Expectations</h3>\n\n<p>There is no universal \"correct\" tone. Industries have different norms:</p>\n\n<p><strong>Finance, Law, Consulting:</strong></p>\n<ul>\n  <li>High formality expected</li>\n  <li>Conservative language</li>\n  <li>Emphasis on precision and credibility</li>\n  <li>Avoid casual phrases entirely</li>\n</ul>\n\n<p><strong>Tech, Startups, Creative:</strong></p>\n<ul>\n  <li>Moderate formality acceptable</li>\n  <li>Action-oriented language valued</li>\n  <li>Some personality permitted</li>\n  <li>Avoid stuffiness</li>\n</ul>\n\n<p><strong>Marketing, Media, Design:</strong></p>\n<ul>\n  <li>Lower formality often acceptable</li>\n  <li>Creative expression valued</li>\n  <li>Personality is a plus</li>\n  <li>Avoid being too corporate</li>\n</ul>\n\n<p><strong>Healthcare, Academia, Government:</strong></p>\n<ul>\n  <li>High formality expected</li>\n  <li>Precise, measured language</li>\n  <li>Credentials emphasized</li>\n  <li>Conservative tone throughout</li>\n</ul>\n\n<hr />\n\n<h3>Common Tone Problems</h3>\n\n<p><strong>Problem: Too passive</strong></p>\n<ul>\n  <li>Symptom: \"Was responsible for,\" \"Was involved in,\" \"Assisted with\"</li>\n  <li>Impact: You sound like a bystander, not a driver</li>\n  <li>Fix: Replace with active verbs: \"Led,\" \"Built,\" \"Delivered,\" \"Transformed\"</li>\n</ul>\n\n<p><strong>Problem: Too vague</strong></p>\n<ul>\n  <li>Symptom: \"Improved processes,\" \"Enhanced efficiency,\" \"Various projects\"</li>\n  <li>Impact: Claims feel empty and unverifiable</li>\n  <li>Fix: Add specifics: numbers, names, timeframes, outcomes</li>\n</ul>\n\n<p><strong>Problem: Too casual</strong></p>\n<ul>\n  <li>Symptom: Contractions, slang, first person \"I\" overuse</li>\n  <li>Impact: Appears unprofessional for formal industries</li>\n  <li>Fix: Remove contractions, use third-person perspective, formal vocabulary</li>\n</ul>\n\n<p><strong>Problem: Too arrogant</strong></p>\n<ul>\n  <li>Symptom: \"Single-handedly,\" \"I alone,\" excessive superlatives</li>\n  <li>Impact: Appears boastful, triggers skepticism</li>\n  <li>Fix: Let achievements speak; acknowledge team context</li>\n</ul>\n\n<p><strong>Problem: Too humble</strong></p>\n<ul>\n  <li>Symptom: \"Helped with,\" \"Contributed to,\" \"Supported\"</li>\n  <li>Impact: Your actual contribution is invisible</li>\n  <li>Fix: Own your work. \"Led\" not \"helped lead.\" \"Built\" not \"helped build.\"</li>\n</ul>\n\n<p><strong>Problem: Inconsistent tone</strong></p>\n<ul>\n  <li>Symptom: Formal in one section, casual in another</li>\n  <li>Impact: Creates confusion, suggests carelessness</li>\n  <li>Fix: Choose one tone level and maintain throughout</li>\n</ul>\n\n<hr />\n\n<h3>The Power Verb Strategy</h3>\n\n<p>Your verb choices define your tone. Here's how to upgrade:</p>\n\n<p><strong>Weak → Strong verb conversions:</strong></p>\n<ul>\n  <li>\"Helped\" → \"Enabled,\" \"Facilitated,\" \"Supported\"</li>\n  <li>\"Worked on\" → \"Developed,\" \"Executed,\" \"Delivered\"</li>\n  <li>\"Was responsible for\" → \"Managed,\" \"Directed,\" \"Oversaw\"</li>\n  <li>\"Made\" → \"Created,\" \"Designed,\" \"Engineered\"</li>\n  <li>\"Did\" → \"Executed,\" \"Implemented,\" \"Accomplished\"</li>\n  <li>\"Improved\" → \"Optimized,\" \"Enhanced,\" \"Transformed\"</li>\n</ul>\n\n<p><strong>Verbs by impact level:</strong></p>\n<ul>\n  <li><strong>Leadership:</strong> Directed, Spearheaded, Championed, Orchestrated</li>\n  <li><strong>Achievement:</strong> Delivered, Achieved, Exceeded, Accomplished</li>\n  <li><strong>Creation:</strong> Built, Designed, Developed, Launched</li>\n  <li><strong>Improvement:</strong> Optimized, Streamlined, Transformed, Modernized</li>\n  <li><strong>Analysis:</strong> Identified, Assessed, Evaluated, Diagnosed</li>\n</ul>\n\n<hr />\n\n<h3>Calibrating Confidence</h3>\n\n<p>Confidence is tricky. Too little and you're invisible. Too much and you're unbelievable.</p>\n\n<p><strong>Under-confident (fix this):</strong></p>\n<ul>\n  <li>\"I think I contributed to...\"</li>\n  <li>\"Helped the team achieve...\"</li>\n  <li>\"Was part of a group that...\"</li>\n</ul>\n\n<p><strong>Calibrated confidence (target this):</strong></p>\n<ul>\n  <li>\"Led initiative that delivered...\"</li>\n  <li>\"Built system that reduced...\"</li>\n  <li>\"Drove strategy resulting in...\"</li>\n</ul>\n\n<p><strong>Over-confident (avoid this):</strong></p>\n<ul>\n  <li>\"Single-handedly transformed...\"</li>\n  <li>\"Was the sole reason for...\"</li>\n  <li>\"Revolutionized the entire...\"</li>\n</ul>\n\n<p><strong>The rule:</strong> State what you did factually. Let the results demonstrate impact. Don't editorialize.</p>\n\n<hr />\n\n<h3>Quick Decision Guide</h3>\n\n<table>\n  <tr>\n    <th>If your analysis shows...</th>\n    <th>Then do this</th>\n  </tr>\n  <tr>\n    <td>Low formality score</td>\n    <td>Remove contractions, casual phrases; use professional vocabulary</td>\n  </tr>\n  <tr>\n    <td>Low confidence score</td>\n    <td>Replace \"helped\" and \"assisted\" with ownership verbs</td>\n  </tr>\n  <tr>\n    <td>Low action orientation</td>\n    <td>Start every bullet with a strong action verb</td>\n  </tr>\n  <tr>\n    <td>Low specificity score</td>\n    <td>Add numbers, names, timeframes to every claim</td>\n  </tr>\n  <tr>\n    <td>Low conciseness score</td>\n    <td>Cut filler words; aim for 1-2 lines per bullet point</td>\n  </tr>\n  <tr>\n    <td>Inconsistent tone flagged</td>\n    <td>Read CV aloud; ensure uniform voice throughout</td>\n  </tr>\n  <tr>\n    <td>Tone mismatch for industry</td>\n    <td>Research target company voice; calibrate accordingly</td>\n  </tr>\n</table>\n\n<hr />\n\n<h3>The Consistency Test</h3>\n\n<p>Read your entire CV aloud. Ask yourself:</p>\n<ul>\n  <li>Does it sound like one person wrote it?</li>\n  <li>Is the energy level consistent throughout?</li>\n  <li>Would the Summary writer recognize the Experience section?</li>\n</ul>\n\n<p>If sections feel like different authors wrote them, your tone is inconsistent. Recruiters notice this—even subconsciously.</p>\n\n<hr />\n\n<h3>Industry-Specific Calibration</h3>\n\n<p><strong>If applying to traditional industries (Finance, Law, Healthcare):</strong></p>\n<ul>\n  <li>Increase formality to 85+</li>\n  <li>Use conservative vocabulary</li>\n  <li>Emphasize credentials and precision</li>\n  <li>Minimize personality flourishes</li>\n</ul>\n\n<p><strong>If applying to modern industries (Tech, Startups, Creative):</strong></p>\n<ul>\n  <li>Formality can be 70-85</li>\n  <li>Action orientation should be high (85+)</li>\n  <li>Some personality acceptable</li>\n  <li>Impact and results emphasized</li>\n</ul>\n\n<p><strong>If unsure about industry norms:</strong></p>\n<ul>\n  <li>Default to professional but not stiff</li>\n  <li>Formality 75-85 is safe middle ground</li>\n  <li>Strong action verbs always work</li>\n  <li>Specificity is universally valued</li>\n</ul>\n\n<hr />\n\n<h3>Final Check: The Voice Test</h3>\n\n<p>Before submitting, verify your tone:</p>\n<ol>\n  <li><strong>Professional:</strong> Would a senior leader in my target industry find this appropriate?</li>\n  <li><strong>Confident:</strong> Do I own my achievements without hedging?</li>\n  <li><strong>Active:</strong> Does every bullet start with a strong verb?</li>\n  <li><strong>Specific:</strong> Can claims be verified with numbers and names?</li>\n  <li><strong>Consistent:</strong> Does it sound like one coherent voice throughout?</li>\n</ol>\n\n<p><strong>Next step:</strong> Identify your lowest tone dimension score and rewrite affected sections using the guidance above.</p>"
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
