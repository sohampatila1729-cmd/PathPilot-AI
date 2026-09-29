import matplotlib.pyplot as plt
import matplotlib.patches as patches

fig, ax = plt.subplots(figsize=(16, 7.5), dpi=300)
fig.patch.set_facecolor('#0F172A')
ax.set_facecolor('#0F172A')

ax.set_xlim(0, 16)
ax.set_ylim(0, 7.5)
ax.axis('off')

# Header
ax.text(8.0, 7.0, "PATHPILOT AI: FROM CLASS 10 UNCERTAINTY TO CAREER MASTERY", 
        fontsize=17, fontweight='bold', color='#FFFFFF', ha='center', va='center', fontfamily='sans-serif')
ax.text(8.0, 6.6, "Transforming Static Single-College Recommendations into an Interactive Multi-Stage Flight Simulator", 
        fontsize=10.5, color='#94A3B8', ha='center', va='center', fontfamily='sans-serif')

def draw_card(ax, x, y, w, h, bg_color, border_color, title, subtitle="", radius=0.15):
    box = patches.FancyBboxPatch((x, y), w, h, boxstyle=f"round,pad=0.08,rounding_size={radius}",
                                facecolor=bg_color, edgecolor=border_color, linewidth=1.8, zorder=2)
    ax.add_patch(box)
    if title:
        ax.text(x + w/2, y + h - 0.35, title, fontsize=11, fontweight='bold', color='#FFFFFF', 
                ha='center', va='center', zorder=3, fontfamily='sans-serif')
    if subtitle:
        ax.text(x + w/2, y + h - 0.65, subtitle, fontsize=8.8, color='#94A3B8', 
                ha='center', va='center', zorder=3, fontfamily='sans-serif')

def draw_pill(ax, x, y, w, h, bg_color, text, text_color='#FFFFFF', fontsize=8.5):
    box = patches.FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.04,rounding_size=0.08",
                                facecolor=bg_color, edgecolor='none', zorder=3)
    ax.add_patch(box)
    ax.text(x + w/2, y + h/2, text, fontsize=fontsize, fontweight='bold', color=text_color, 
            ha='center', va='center', zorder=4, fontfamily='sans-serif')

# Left Column: The Problem (Traditional Approach)
draw_card(ax, 0.6, 0.8, 4.4, 5.3, '#1E1B2E', '#EF4444', "TRADITIONAL COUNSELING (BROKEN)", "Static, Biased & Siloed Decisions")
draw_pill(ax, 0.9, 4.8, 3.8, 0.5, '#7F1D1D', "SINGLE-COLLEGE LEAD-GEN", '#FECACA', 8.5)
ax.text(2.8, 4.4, "• Pushes single coaching classes or private colleges\n• Commission-driven advertising models\n• Zero visibility into alternative low-cost routes",
        fontsize=8.5, color='#CBD5E1', ha='center', va='top', zorder=3, fontfamily='sans-serif', linespacing=1.3)

draw_pill(ax, 0.9, 2.9, 3.8, 0.5, '#7F1D1D', "HIDDEN FINANCIAL BURDEN", '#FECACA', 8.5)
ax.text(2.8, 2.5, "• Ignores total 5-year living, coaching & tuition fees\n• Families take unhedged loans with predatory terms\n• High dropout rates due to unanticipated cost spikes",
        fontsize=8.5, color='#CBD5E1', ha='center', va='top', zorder=3, fontfamily='sans-serif', linespacing=1.3)

# Middle Column: The PathPilot AI Engine
draw_card(ax, 5.5, 0.8, 5.0, 5.3, '#1E293B', '#6366F1', "PATHPILOT AI CORE ENGINE", "Mathematical Flight Simulation & Reasoning")
draw_pill(ax, 5.8, 4.8, 4.4, 0.5, '#312E81', "4 DIVERSE MULTI-STAGE TRAJECTORIES", '#A5B4FC', 8.5)
ax.text(8.0, 4.4, "• Path 1: Direct B.Tech (10+2 PCM + MHT-CET/JEE)\n• Path 2: Embedded Systems & Hardware Specialization\n• Path 3: 3-Yr Polytechnic Diploma to Direct 2nd Yr Degree\n• Path 4: Applied Data Science & Modern Computing",
        fontsize=8.3, color='#E2E8F0', ha='center', va='top', zorder=3, fontfamily='sans-serif', linespacing=1.3)

draw_pill(ax, 5.8, 2.7, 4.4, 0.5, '#312E81', "5-FACTOR MULTI-VECTOR MATRIX", '#A5B4FC', 8.5)
ax.text(8.0, 2.3, "• Academic Fit (Rigor & Subject Strengths)\n• Interest & Aptitude Alignment\n• Budget Feasibility (Buffer Ratios & Waivers)\n• Admission Odds (CET Percentile Variance)\n• Long-Term 5-Year Industry Employability",
        fontsize=8.3, color='#E2E8F0', ha='center', va='top', zorder=3, fontfamily='sans-serif', linespacing=1.3)

# Right Column: The Student & Social Impact
draw_card(ax, 11.0, 0.8, 4.4, 5.3, '#132A3E', '#10B981', "STUDENT & SOCIAL IMPACT", "Empowering Transparent Decisions")
draw_pill(ax, 11.3, 4.8, 3.8, 0.5, '#064E3B', "DEBT PROTECTION & SCHOLARSHIPS", '#A7F3D0', 8.5)
ax.text(13.2, 4.4, "• Automated MahaDBT EBC 50% tuition waiver matching\n• AICTE Pragati & Merit scholarship guidance\n• Accurate reducing-balance loan EMI calculation",
        fontsize=8.5, color='#CBD5E1', ha='center', va='top', zorder=3, fontfamily='sans-serif', linespacing=1.3)

draw_pill(ax, 11.3, 2.9, 3.8, 0.5, '#064E3B', "WHAT-IF SENSITIVITY TESTING", '#A7F3D0', 8.5)
ax.text(13.2, 2.5, "• Dynamic simulation of family budget shocks (-35%)\n• Entrance cutoff stress tests & backup guarantees\n• Zero-loss lateral polytechnic progression models",
        fontsize=8.5, color='#CBD5E1', ha='center', va='top', zorder=3, fontfamily='sans-serif', linespacing=1.3)

# Arrows
def draw_arrow(ax, x1, y1, x2, y2, color='#6366F1'):
    ax.annotate('', xy=(x2, y2), xytext=(x1, y1),
                arrowprops=dict(facecolor=color, edgecolor=color, width=2.5, headwidth=9, headlength=9, shrink=0.03),
                zorder=5)

draw_arrow(ax, 5.0, 3.5, 5.5, 3.5, '#6366F1')
draw_arrow(ax, 10.5, 3.5, 11.0, 3.5, '#10B981')

plt.tight_layout()
output_path = r"C:\Users\shree\.gemini\antigravity-ide\scratch\pathpilot-ai\solution_flow_pipeline.png"
plt.savefig(output_path, dpi=300, facecolor=fig.get_facecolor(), edgecolor='none', bbox_inches='tight')
plt.close()
print("Saved solution_flow_pipeline.png successfully!")
