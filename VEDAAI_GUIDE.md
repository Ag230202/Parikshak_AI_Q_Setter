# VedaAI - Complete User Guide

## Overview

VedaAI is a comprehensive assignment management platform designed for teachers to create, manage, and analyze assignments with AI-powered assistance. The platform offers an intuitive interface for both desktop and mobile devices.

---

## Navigation & Access

### Desktop Navigation (Sidebar)

The left sidebar provides quick access to all main features:

- **VedaAI Logo** - Returns to home dashboard
- **+ Create Assignment** - Opens the assignment creation wizard
- **Home** - Dashboard with statistics and quick actions
- **My Groups** - Manage your teaching groups/classes
- **Assignments** - View all your created assignments
- **AI Teacher's Toolkit** - Access AI-powered tools
- **My Library** - Browse curated resources and templates
- **Settings** - Configure your account and preferences

### Mobile Navigation (Bottom Bar)

On mobile devices, use the fixed bottom navigation:

- **Home** - Dashboard with overview
- **Assignments** - List of all assignments
- **Library** - Resource library
- **AI Toolkit** - AI tools and utilities

---

## Pages & Features

### 1. HOME DASHBOARD

**URL:** `/home`

The central hub for all your teaching activities.

#### Features:

**Welcome Section**
- Personalized greeting
- Quick motivational message

**Statistics Cards** (4 metrics)
- Total Assignments - Count of all created assignments
- Active Classes - Number of teaching groups
- Pending Reviews - Assignments awaiting submission reviews
- Total Questions - Overall questions across all assignments

**Quick Action Cards** (3 sections)
- Create New Assignment - Direct link to assignment wizard
- Browse Resources - Link to library
- AI Toolkit - Link to AI tools

**Recent Assignments Widget**
- Shows 3 most recent assignments
- Displays assignment name, class, and due date
- Status indicators (Active/Needs Review)
- "View All Assignments" button for complete list

#### Mobile View:
- Stack all cards vertically
- Statistics show in single column
- Action cards display as full-width buttons
- Bottom navigation remains accessible

---

### 2. ASSIGNMENTS PAGE

**URL:** `/assignments`

Manage all your created assignments in one place.

#### Features:

**Search & Filter Bar**
- Search by assignment name, subject, or class
- Advanced filter options

**Filter Tabs** (displayed on desktop)
- All Assignments
- By Status (Active/Draft/Archived)
- By Subject

**Assignment Grid** (2 columns on desktop, 1 on mobile)
- Each card shows:
  - Assignment title (clickable to view)
  - Class/Grade level
  - Assigned date and due date
  - Action menu (View, Edit, Delete)
  - Status indicator

**Create Assignment Button**
- Floating action button on mobile
- Button in header on desktop

#### Empty State:
When no assignments exist, displays:
- Illustration with assignment/search icon
- Encouraging message
- "Create Your First Assignment" CTA button
- Explanation of VedaAI's grading capabilities

---

### 3. CREATE ASSIGNMENT (Multi-Step Wizard)

**URL:** `/create-assignment`

Step-by-step form to create comprehensive assignments.

#### Step 1: Assignment Details
- File upload (drag & drop or browse)
  - Accepts: JPEG, PNG (up to 10MB)
  - Optional: Upload reference materials
- Due date picker (DD-MM-YYYY format)

#### Step 2: Question Types Configuration
Dynamic table for setting up question structure:
- **Type Column** - Dropdown to select question type
  - Multiple Choice Questions
  - Short Questions
  - Diagram/Graph-Based Questions
  - Numerical Problems
  
- **No. of Questions** - Input with +/- controls
- **Marks** - Input with +/- controls
- **Remove** - Delete question type row

Features:
- Real-time calculation of total questions
- Real-time calculation of total marks
- "Add Question Type" button to extend types
- Example: 4 MCQs (4 questions × 1 mark = 4 marks)

#### Step 3: Additional Information
- Large text area for context
- Placeholder: "e.g. Generate a question paper for 3 hour exam duration..."
- Help text explaining AI usage

#### Step 4: Review & Confirmation
- Summary of all settings
- Preview of configuration
- "Previous" button to go back
- "Create" button to finalize

#### Navigation:
- Progress bar shows current step (1/4)
- "Previous" and "Next" buttons at bottom
- Form validation prevents progress with incomplete data

#### Mobile Optimization:
- Single-column layout
- Full-width inputs
- Optimized touch targets
- Bottom-fixed navigation buttons

---

### 4. RESOURCE LIBRARY

**URL:** `/library`

Browse and use curated question banks, templates, and resources.

#### Search & Filter:
- Search bar with autocomplete (subject, grade, title)
- Advanced filters dropdown
- Filter tabs:
  - All Resources
  - Saved (starred items)
  - Templates
  - Question Banks
  - MCQ Sets

#### Resource Cards (3 columns on desktop, 1 on mobile):
Each card displays:
- **Thumbnail** - Emoji/icon representing subject
- **Title** - Resource name (clickable)
- **Metadata Tags** - Grade level and resource type
- **Statistics**:
  - Number of questions
  - Download count
  - Star rating (⭐ out of 5)
- **Save Button** - Star icon to save for later
- **Action Buttons**:
  - "Use" - Apply to current assignment
  - "Download" - Download for offline use

#### Resource Types:
1. **Question Banks** - Complete sets (25+ questions)
2. **Templates** - Reusable structures
3. **MCQ Sets** - Multiple choice focused
4. **Curriculum Maps** - Subject alignment
5. **Sample Papers** - Full exam papers

#### Example Resources:
- CBSE Grade 8 Science - Electricity Basics (⚡)
- English Literature Analysis Questions (📚)
- Mathematics - Algebra Problem Set (🧮)
- Physics - Motion & Force MCQs (🔬)
- Chemistry - Periodic Table Basics (⚗️)
- History - Ancient India Timeline (📜)

#### Mobile View:
- Single column layout
- Full-width cards
- Horizontal scroll for filter tabs
- Search bar spans full width

---

### 5. AI TEACHER'S TOOLKIT

**URL:** `/ai-toolkit`

Access AI-powered tools to enhance teaching and reduce workload.

#### Hero Section:
- Gradient background with orange accent
- Title: "AI Teacher's Toolkit"
- Subtitle: Feature explanation
- CTA: "Get Started with AI" button

#### Usage Statistics (4 cards):
- Questions Generated - 2,456 (+12%)
- Papers Analyzed - 184 (+8%)
- Evaluations Done - 3,821 (+25%)
- Time Saved - 145 hrs (+40%)

#### Available AI Tools (Grid: 3 columns on desktop, 1 on mobile):

**1. AI Question Generator** 🪄
- Generate custom questions based on topics
- Features: Custom topics, Difficulty control, Multiple formats
- Status: Active
- Color: Orange gradient

**2. Paper Analyzer** 📄
- Analyze papers for difficulty and coverage
- Features: Difficulty analysis, Coverage mapping, Curriculum alignment
- Status: Active
- Color: Blue gradient

**3. Answer Evaluation** ✅
- AI-powered student answer evaluation
- Features: Rubric creation, Bulk evaluation, Feedback generation
- Status: Active
- Color: Green gradient

**4. Performance Analytics** 📊
- Track and visualize student performance
- Features: Performance tracking, Trend analysis, Personalized recommendations
- Status: Active
- Color: Purple gradient

**5. Content Suggestion** ✨
- AI suggests relevant teaching content
- Features: Smart suggestions, Resource linking, Curriculum mapping
- Status: Active
- Color: Pink gradient

**6. Plagiarism Detector** 🔍
- Detect plagiarism in student submissions
- Features: Document comparison, Source detection, Detailed reports
- Status: Active
- Color: Indigo gradient

#### How It Works (3-step process):
1. **Select Tool** - Choose the AI tool you need
2. **Configure Settings** - Customize parameters and criteria
3. **Get Results** - Instantly receive AI-generated content

#### Getting Started Section:
- Explanation of VedaAI AI access
- List of capabilities:
  - Generate unlimited custom questions
  - Analyze papers and alignment
  - Automate grading process
  - Track student performance
- "Explore All Tools" button

#### Mobile View:
- Full-width hero section
- Single-column tool cards
- Stacked statistics
- Touch-optimized buttons

---

## How to Access Each Section

### From Desktop:

1. **Home** - Click "Home" in sidebar or navigate to `/home`
2. **Assignments** - Click "Assignments" in sidebar or navigate to `/assignments`
3. **Create Assignment** - Click "+ Create Assignment" button at top of sidebar
4. **Library** - Click "My Library" in sidebar or navigate to `/library`
5. **AI Toolkit** - Click "AI Teacher's Toolkit" in sidebar or navigate to `/ai-toolkit`

### From Mobile:

1. **Home** - Tap "Home" icon in bottom navigation (house icon)
2. **Assignments** - Tap "Assignments" icon in bottom navigation (folder icon)
3. **Create Assignment** - Tap "+" floating button or sidebar menu
4. **Library** - Tap "Library" icon in bottom navigation (clock icon)
5. **AI Toolkit** - Tap "AI Toolkit" icon in bottom navigation (spark icon)

---

## Key Features & Workflows

### Creating an Assignment (Step-by-Step):

1. Click "+ Create Assignment" button (sidebar or mobile)
2. **Step 1**: Upload reference material (optional) and set due date
3. **Step 2**: Configure question types and marks
4. **Step 3**: Add context for AI generation
5. **Step 4**: Review and create
6. Assignment appears in Assignments list and dashboard

### Finding & Using Resources:

1. Navigate to "My Library"
2. Search by subject, grade, or title
3. Filter by resource type (Templates, Question Banks, etc.)
4. Click "Use" to apply to current assignment
5. Click "Download" to save locally

### Using AI Tools:

1. Navigate to "AI Teacher's Toolkit"
2. Click "Launch Tool" on desired tool card
3. Configure parameters as needed
4. Submit and wait for AI-generated results
5. Download or apply results to assignments

---

## Design & Layout

### Color Scheme:
- **Primary Accent**: Orange (#F97316) - for CTAs and highlights
- **Background**: Light gray (#F3F4F6)
- **Text**: Dark gray/black for main content
- **Secondary Colors**: Blue, Green, Purple for statistics and categorization

### Typography:
- **Headings**: Bold sans-serif
- **Body**: Clean sans-serif (system default)
- **Sizes**: Responsive scaling for mobile/desktop

### Responsive Breakpoints:
- **Mobile**: < 768px - Single column, bottom navigation
- **Tablet**: 768px - 1024px - 2-column layouts
- **Desktop**: > 1024px - Full sidebar + multi-column grids

---

## Tips & Best Practices

### Assignment Creation:
- Upload clear reference materials for better AI analysis
- Set realistic due dates and time allowances
- Mix question types for comprehensive assessment
- Use descriptive titles for easy identification

### Using the Library:
- Save frequently used templates by clicking the star
- Filter by subject to find relevant resources quickly
- Check ratings before using new question banks
- Download for offline access

### AI Toolkit Usage:
- Use question generator for supplementary questions
- Run paper analyzer before finalizing assignments
- Leverage performance analytics for personalized teaching
- Use plagiarism detector on all submissions

---

## Support & Help

For additional support:
- Check Settings for account preferences
- Contact school admin for group management
- Report issues or suggestions through the platform
- Visit VedaAI documentation for detailed guides

---

**VedaAI v1.0** - Making Teaching Smarter with AI
