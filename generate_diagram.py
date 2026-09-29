import matplotlib.pyplot as plt
import matplotlib.patches as patches
from PIL import Image

# Create ultra high-res figure for block diagram
fig, ax = plt.subplots(figsize=(16, 9), dpi=300)
fig.patch.set_facecolor('#0F172A') # Deep slate background
ax.set_facecolor('#0F172A')

ax.set_xlim(0, 16)
ax.set_ylim(0, 9)
ax.axis('off')

# Title / Header
ax.text(8.0, 8.52, "PATHPILOT AI — SYSTEM ARCHITECTURE & DUAL-ENGINE PIPELINE", 
        fontsize=18, fontweight='bold', color='#FFFFFF', ha='center', va='center', fontfamily='sans-serif')
ax.text(8.0, 8.16, "Decoupled Deterministic Mathematics + Generative AI Reasoning with 100% Resilient Local Fallback", 
        fontsize=11, color='#94A3B8', ha='center', va='center', fontfamily='sans-serif')

def draw_card(ax, x, y, w, h, bg_color, border_color, title, subtitle="", radius=0.15):
    box = patches.FancyBboxPatch((x, y), w, h, boxstyle=f"round,pad=0.08,rounding_size={radius}",
                                facecolor=bg_color, edgecolor=border_color, linewidth=1.8, zorder=2)
    ax.add_patch(box)
    if title:
        ax.text(x + w/2, y + h - 0.35, title, fontsize=11.5, fontweight='bold', color='#FFFFFF', 
                ha='center', va='center', zorder=3, fontfamily='sans-serif')
    if subtitle:
        ax.text(x + w/2, y + h - 0.65, subtitle, fontsize=9.0, color='#94A3B8', 
                ha='center', va='center', zorder=3, fontfamily='sans-serif')

def draw_pill(ax, x, y, w, h, bg_color, text, text_color='#FFFFFF', fontsize=8.5):
    box = patches.FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.04,rounding_size=0.08",
                                facecolor=bg_color, edgecolor='none', zorder=3)
    ax.add_patch(box)
    ax.text(x + w/2, y + h/2, text, fontsize=fontsize, fontweight='bold', color=text_color, 
            ha='center', va='center', zorder=4, fontfamily='sans-serif')

# --- 1. Client & Input Layer (Left) ---
draw_card(ax, 0.5, 1.2, 3.4, 6.4, '#1E293B', '#38BDF8', "1. CLIENT & INPUT LAYER", "Next.js 14 Responsive UI")

draw_pill(ax, 0.8, 6.35, 2.8, 0.55, '#0F172A', "STUDENT PROFILE", '#38BDF8', 9)
ax.text(2.2, 5.85, "• Class 10 Board Marks (%)\n• Strong Subjects & Aptitudes\n• Annual Family Budget (INR)\n• Preferred Location & Mode\n• Target Career Aspiration",
        fontsize=8.5, color='#E2E8F0', ha='center', va='top', zorder=3, fontfamily='sans-serif', linespacing=1.3)

draw_pill(ax, 0.8, 4.25, 2.8, 0.55, '#0F172A', "WHAT-IF CONTROLS", '#F59E0B', 9)
ax.text(2.2, 3.75, "• Budget Shock Simulation (-35%)\n• Entrance Exam Fluctuation\n• Lateral vs Direct Filter",
        fontsize=8.5, color='#E2E8F0', ha='center', va='top', zorder=3, fontfamily='sans-serif', linespacing=1.3)

draw_pill(ax, 0.8, 2.45, 2.8, 0.55, '#0F172A', "LOAN & COLLEGE TOOLS", '#10B981', 9)
ax.text(2.2, 1.95, "• Interactive Principal Loan Bar\n• Benchmark Cutoffs & Fees",
        fontsize=8.5, color='#E2E8F0', ha='center', va='top', zorder=3, fontfamily='sans-serif', linespacing=1.3)


# --- 2. Deterministic Core Engine (Center Top) ---
draw_card(ax, 4.4, 4.4, 7.0, 3.2, '#1E1B4B', '#818CF8', "2. DETERMINISTIC DECISION ENGINE (Core lib/decisionEngine.ts)", "Zero Hallucination Mathematical Computing (100% Uptime)")

draw_card(ax, 4.65, 4.65, 3.1, 2.3, '#0F172A', '#6366F1', "Pathway Generator", "4 Multi-Stage Routes")
ax.text(6.2, 6.15, "• Path 1: Direct B.Tech (PCM)\n• Path 2: Embedded & Robotics\n• Path 3: Polytechnic to Degree\n• Path 4: Applied Data Science",
        fontsize=8.2, color='#E2E8F0', ha='center', va='top', zorder=3, fontfamily='sans-serif', linespacing=1.3)

draw_card(ax, 8.05, 4.65, 3.1, 2.3, '#0F172A', '#6366F1', "5-Factor Decision Matrix", "Explainable Multi-Vector Scoring")
ax.text(9.6, 6.15, "• Academic Fit ($S_{acad}$)\n• Interest Fit ($S_{interest}$)\n• Budget Feasibility ($S_{budget}$)\n• Admission Odds ($S_{admiss}$)\n• Career Alignment ($S_{career}$)",
        fontsize=8.2, color='#E2E8F0', ha='center', va='top', zorder=3, fontfamily='sans-serif', linespacing=1.3)


# --- 3. Hybrid AI Reasoning Layer (Center Bottom) ---
draw_card(ax, 4.4, 1.2, 7.0, 2.85, '#132A3E', '#2DD4BF', "3. HYBRID AI REASONING LAYER (app/api/explain)", "Secure Server-Side AI + Resilient Fallback Architecture")

draw_card(ax, 4.65, 1.45, 3.1, 2.0, '#0F172A', '#0EA5E9', "Google Gemini 1.5 Flash", "Generative Reasoning & Insights")
ax.text(6.2, 2.75, "• Structured JSON Schema\n• Discovers hidden bottlenecks\n• Personalized strategic advice\n• Secure Server API Key Isolation",
        fontsize=8.0, color='#E2E8F0', ha='center', va='top', zorder=3, fontfamily='sans-serif', linespacing=1.3)

draw_card(ax, 8.05, 1.45, 3.1, 2.0, '#0F172A', '#10B981', "Deterministic Fallback", "100% Offline Demo Protection")
ax.text(9.6, 2.75, "• 7-Second Abort Controller\n• Triggers if Quota/Net Fails\n• Heuristic strategic matrix\n• Zero UI freeze or errors",
        fontsize=8.0, color='#E2E8F0', ha='center', va='top', zorder=3, fontfamily='sans-serif', linespacing=1.3)


# --- 4. Presentation & Analytics Layer (Right) ---
draw_card(ax, 11.9, 1.2, 3.6, 6.4, '#1E293B', '#C084FC', "4. DECISION SUPPORT & VIZ", "Actionable Student Dashboard")

draw_pill(ax, 12.2, 6.35, 3.0, 0.55, '#0F172A', "RADAR & BAR MATRIX", '#C084FC', 9)
ax.text(13.7, 5.85, "• Recharts Multi-Vector Radar\n• Live Score Comparison\n• Trade-Off Overlays",
        fontsize=8.5, color='#E2E8F0', ha='center', va='top', zorder=3, fontfamily='sans-serif', linespacing=1.3)

draw_pill(ax, 12.2, 4.25, 3.0, 0.55, '#0F172A', "MULTI-STAGE ROADMAPS", '#38BDF8', 9)
ax.text(13.7, 3.75, "• 10th -> 12th/Dip -> UG -> Career\n• Real Tuition + Exam Timelines\n• Career Exit Roles & Salaried",
        fontsize=8.5, color='#E2E8F0', ha='center', va='top', zorder=3, fontfamily='sans-serif', linespacing=1.3)

draw_pill(ax, 12.2, 2.2, 3.0, 0.55, '#0F172A', "STRATEGIC AI INSIGHTS", '#34D399', 9)
ax.text(13.7, 1.7, "• Actionable Next Steps\n• MahaDBT / AICTE Matching\n• Loan Amortization Plans",
        fontsize=8.5, color='#E2E8F0', ha='center', va='top', zorder=3, fontfamily='sans-serif', linespacing=1.3)


# --- Connections ---
def draw_arrow(ax, x1, y1, x2, y2, color='#6366F1', text=''):
    ax.annotate('', xy=(x2, y2), xytext=(x1, y1),
                arrowprops=dict(facecolor=color, edgecolor=color, width=2.2, headwidth=8, headlength=8, shrink=0.04),
                zorder=5)
    if text:
        ax.text((x1+x2)/2, (y1+y2)/2 + 0.18, text, fontsize=8, fontweight='bold', color=color,
                ha='center', va='center', zorder=6, fontfamily='sans-serif',
                bbox=dict(boxstyle="round,pad=0.15", facecolor='#0F172A', edgecolor=color, linewidth=0.8))

# Client -> Engine
draw_arrow(ax, 3.9, 5.8, 4.4, 5.8, '#38BDF8', 'Student Data')
# Client -> AI Layer
draw_arrow(ax, 3.9, 2.5, 4.4, 2.5, '#2DD4BF', 'User Context')

# Engine -> AI Layer
draw_arrow(ax, 6.2, 4.4, 6.2, 3.45, '#818CF8', 'Metrics & Scores')
# Fallback connection
draw_arrow(ax, 9.6, 3.45, 9.6, 4.4, '#10B981', 'Fallback Guard')

# Engine -> Viz
draw_arrow(ax, 11.4, 5.8, 11.9, 5.8, '#C084FC', 'Math Scores')
# AI Layer -> Viz
draw_arrow(ax, 11.4, 2.5, 11.9, 2.5, '#34D399', 'AI Insights')

plt.tight_layout()
output_path = r"C:\Users\shree\.gemini\antigravity-ide\scratch\pathpilot-ai\system_architecture_diagram.png"
plt.savefig(output_path, dpi=300, facecolor=fig.get_facecolor(), edgecolor='none', bbox_inches='tight')
plt.close()
print("Saved system_architecture_diagram.png successfully without glyph warnings!")
