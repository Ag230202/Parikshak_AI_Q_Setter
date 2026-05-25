import { QuestionType } from './assignments';

const PHYSICS_QUESTIONS: Record<string, { question: string }[]> = {
  'multiple-choice': [
    { question: "Which of the following represents the first law of thermodynamics?\n(a) dQ = dU + dW\n(b) dQ = dU - dW\n(c) dQ = dW - dU\n(d) dQ = -dU - dW" },
    { question: "What is the SI unit of thermodynamic temperature?\n(a) Celsius\n(b) Fahrenheit\n(c) Kelvin\n(d) Rankine" },
    { question: "What happens to the temperature of an ideal gas during an isothermal expansion?\n(a) Increases\n(b) Decreases\n(c) Remains constant\n(d) Triples" },
    { question: "The entropy of a closed system always:\n(a) Decreases\n(b) Increases\n(c) Remains constant\n(d) Becomes zero" },
    { question: "Which thermodynamic process occurs at constant volume?\n(a) Isobaric\n(b) Isochoric\n(c) Isothermal\n(d) Adiabatic" }
  ],
  'short-answer': [
    { question: "State the Second Law of Thermodynamics in terms of entropy." },
    { question: "Distinguish between isothermal and adiabatic thermodynamic processes." },
    { question: "Explain the significance of the Carnot cycle efficiency limit." },
    { question: "What is absolute zero temperature and how does it relate to molecular motion?" },
    { question: "Define entropy and explain its thermodynamic significance in closed systems." }
  ],
  'numerical': [
    { question: "A heat engine absorbs 500 J of heat from a hot reservoir and does 150 J of work. Calculate its thermal efficiency." },
    { question: "An ideal gas expands from 1 L to 3 L at a constant pressure of 2 atm. Calculate the work done by the gas in Joules." },
    { question: "Find the change in internal energy when 200 J of heat is added to a system and the system does 80 J of work." }
  ],
  'diagram': [
    { question: "Draw a labeled P-V diagram illustrating a complete Carnot cycle. Label all isotherms and adiabats." },
    { question: "Draw the phase diagram of water and clearly label the triple point, critical point, and phases." }
  ]
};

const CHEMISTRY_QUESTIONS: Record<string, { question: string }[]> = {
  'multiple-choice': [
    { question: "Which element has the highest electronegativity?\n(a) Fluorine\n(b) Chlorine\n(c) Oxygen\n(d) Nitrogen" },
    { question: "What is the molecular geometry of water (H2O)?\n(a) Linear\n(b) Bent\n(c) Tetrahedral\n(d) Trigonal planar" },
    { question: "What type of bond is formed by the sharing of electron pairs?\n(a) Ionic\n(b) Covalent\n(c) Metallic\n(d) Hydrogen" },
    { question: "Which of the following is a strong acid?\n(a) Hydrochloric acid (HCl)\n(b) Acetic acid (CH3COOH)\n(c) Carbonic acid (H2CO3)\n(d) Ammonia (NH3)" }
  ],
  'short-answer': [
    { question: "Explain the concept of hybridization in carbon atoms." },
    { question: "What is Le Chatelier's Principle and how does it apply to chemical equilibrium?" },
    { question: "Explain why water has a relatively high boiling point compared to hydrogen sulfide." },
    { question: "Describe the periodic trend of atomic radius across a period and down a group." }
  ],
  'numerical': [
    { question: "Calculate the pH of a 0.01 M hydrochloric acid (HCl) solution." },
    { question: "Find the number of moles present in 36 grams of pure water (H2O)." },
    { question: "Determine the molarity of a solution prepared by dissolving 5.85 g of NaCl in 500 mL of water." }
  ],
  'diagram': [
    { question: "Sketch a diagram of a galvanic/electrochemical cell and label the anode, cathode, and salt bridge." },
    { question: "Draw the Lewis dot structure for carbon dioxide (CO2) showing all bonding and lone pairs." }
  ]
};

const CALCULUS_QUESTIONS: Record<string, { question: string }[]> = {
  'multiple-choice': [
    { question: "What is the derivative of sin(x) with respect to x?\n(a) cos(x)\n(b) -cos(x)\n(c) sin(x)\n(d) -sin(x)" },
    { question: "Evaluate the limit as x approaches 2 of (x^2 - 4) / (x - 2):\n(a) 0\n(b) 2\n(c) 4\n(d) Undefined" },
    { question: "What is the integral of 1/x dx?\n(a) ln|x| + C\n(b) e^x + C\n(c) x^2/2 + C\n(d) -1/x^2 + C" },
    { question: "Find the derivative of e^(2x) with respect to x:\n(a) e^(2x)\n(b) 2e^(2x)\n(c) 2x e^(2x-1)\n(d) 1/2 e^(2x)" },
    { question: "What is the derivative of a constant c?\n(a) c\n(b) 1\n(c) 0\n(d) x" }
  ],
  'short-answer': [
    { question: "Explain the geometric interpretation of the derivative of a function at a point." },
    { question: "State the Fundamental Theorem of Calculus." },
    { question: "Define what it means for a function to be continuous at a point x = c." },
    { question: "Define the limit of a function at a point using the epsilon-delta formulation." },
    { question: "Explain the difference between a local maximum and a global maximum on a closed interval." }
  ],
  'numerical': [
    { question: "Find the equation of the tangent line to the curve y = x^3 at the point (1, 1)." },
    { question: "Evaluate the definite integral of (2x + 3) dx from x = 1 to x = 3." },
    { question: "Find the limit as x approaches infinity of (3x^2 + 5x) / (2x^2 - 7)." }
  ],
  'diagram': [
    { question: "Sketch the graph of a function that is continuous but not differentiable at x = 0." },
    { question: "Draw a curve and illustrate the concept of Riemann sums under the curve for n = 4 subintervals." }
  ]
};

const ALGEBRA_QUESTIONS: Record<string, { question: string }[]> = {
  'multiple-choice': [
    { question: "If 2x + 5 = 15, what is the value of x?\n(a) 5\n(b) 10\n(c) 15\n(d) 20" },
    { question: "What is the value of log(1)?\n(a) 0\n(b) 1\n(c) e\n(d) 10" },
    { question: "Which of the following is a factor of x^2 - 5x + 6?\n(a) (x - 2)\n(b) (x + 2)\n(c) (x - 1)\n(d) (x + 3)" },
    { question: "What is the degree of the polynomial 4x^3 - 5x^2 + 2x - 1?\n(a) 1\n(b) 2\n(c) 3\n(d) 4" }
  ],
  'short-answer': [
    { question: "Explain the difference between a relation and a function." },
    { question: "Describe the steps required to solve a system of quadratic equations." },
    { question: "Explain the concept of matrices and how they are used to solve linear systems." },
    { question: "State the Remainder Theorem in algebra." }
  ],
  'numerical': [
    { question: "Solve the quadratic equation: x^2 - 5x + 6 = 0." },
    { question: "Find the 10th term of the arithmetic progression: 3, 7, 11, 15, ..." },
    { question: "Solve the system of equations: x + y = 10 and x - y = 4." }
  ],
  'diagram': [
    { question: "Draw a coordinate grid and plot the linear equation y = 2x - 3." },
    { question: "Sketch the parabolic graph of the function y = x^2 - 4, labeling the vertex and intercepts." }
  ]
};

const GEOMETRY_QUESTIONS: Record<string, { question: string }[]> = {
  'multiple-choice': [
    { question: "What is the sum of the interior angles of a regular hexagon?\n(a) 180°\n(b) 360°\n(c) 540°\n(d) 720°" },
    { question: "What is the area of a circle with radius 7 cm? (Take π = 22/7)\n(a) 44 cm²\n(b) 154 cm²\n(c) 308 cm²\n(d) 616 cm²" },
    { question: "In a right-angled triangle, if base = 3 cm and height = 4 cm, what is the hypotenuse?\n(a) 5 cm\n(b) 6 cm\n(c) 7 cm\n(d) 8 cm" },
    { question: "What is the value of sin(90°)?\n(a) 0\n(b) 0.5\n(c) 1\n(d) Undefined" }
  ],
  'short-answer': [
    { question: "State and prove the Pythagorean theorem." },
    { question: "Define similar triangles and explain the criteria for similarity." },
    { question: "Explain the difference between supplementary and complementary angles." },
    { question: "What is the relationship between the angle subtended by an arc at the center and at any point on the circle?" }
  ],
  'numerical': [
    { question: "Find the volume of a cylinder with radius 3 cm and height 7 cm. (Take π = 22/7)" },
    { question: "In triangle ABC, angle B = 90°, AB = 5 cm, and BC = 12 cm. Find sin(A)." },
    { question: "Find the area of a triangle with sides 5 cm, 12 cm, and 13 cm." }
  ],
  'diagram': [
    { question: "Draw a right-angled triangle and illustrate the trigonometric ratios sin(θ), cos(θ), and tan(θ)." },
    { question: "Sketch a circle, draw a tangent line at a point, and show the radius connecting to that point." }
  ]
};

const MATHS_QUESTIONS: Record<string, { question: string }[]> = {
  'multiple-choice': [
    { question: "What is the derivative of x^2 with respect to x?\n(a) x\n(b) 2x\n(c) 2\n(d) x/2" },
    { question: "What is the value of log(1)?\n(a) 0\n(b) 1\n(c) e\n(d) 10" },
    { question: "If 2x + 5 = 15, what is the value of x?\n(a) 5\n(b) 10\n(c) 15\n(d) 20" },
    { question: "What is the sum of the interior angles of a regular hexagon?\n(a) 180°\n(b) 360°\n(c) 540°\n(d) 720°" }
  ],
  'short-answer': [
    { question: "State and prove the Pythagorean theorem." },
    { question: "Explain the difference between a relation and a function." },
    { question: "Describe the steps required to solve a system of quadratic equations." },
    { question: "Define the limit of a function at a point." }
  ],
  'numerical': [
    { question: "Solve the quadratic equation: x^2 - 5x + 6 = 0." },
    { question: "Evaluate the definite integral of 3x^2 dx from x=0 to x=2." },
    { question: "Find the 10th term of the arithmetic progression: 3, 7, 11, 15, ..." }
  ],
  'diagram': [
    { question: "Sketch the graph of y = sin(x) for the interval [0, 2π], marking the intercepts and extrema." },
    { question: "Draw a right-angled triangle and illustrate the trigonometric ratios sin(θ), cos(θ), and tan(θ)." }
  ]
};

const GENERAL_QUESTIONS: Record<string, { question: string }[]> = {
  'multiple-choice': [
    { question: "Who proposed the theory of general relativity?\n(a) Isaac Newton\n(b) Albert Einstein\n(c) Galileo Galilei\n(d) Nikola Tesla" },
    { question: "Which planet is known as the Red Planet?\n(a) Venus\n(b) Mars\n(c) Jupiter\n(d) Saturn" },
    { question: "What is the main source of energy for Earth's ecosystem?\n(a) The Moon\n(b) The Sun\n(c) Wind energy\n(d) Geothermal heat" },
    { question: "Which gas is most abundant in Earth's atmosphere?\n(a) Oxygen\n(b) Nitrogen\n(c) Carbon dioxide\n(d) Argon" }
  ],
  'short-answer': [
    { question: "Explain the process of photosynthesis in green plants." },
    { question: "Describe the water cycle and its key components." },
    { question: "What is the significance of the scientific method?" },
    { question: "Discuss the main differences between plant and animal cells." }
  ],
  'numerical': [
    { question: "A car travels 150 km in 3 hours. Calculate its average speed." },
    { question: "A force of 10 N is applied to a mass of 2 kg. Find the acceleration." },
    { question: "Calculate the density of an object with a mass of 500 g and a volume of 250 cm³." }
  ],
  'diagram': [
    { question: "Sketch a labeled diagram showing the layers of Earth's atmosphere." },
    { question: "Draw and label a simple electric circuit containing a battery, a switch, and a bulb." }
  ]
};

export function generateMockPaper(subject: string, title: string, questionTypes: QuestionType[]) {
  const normSubject = subject.toLowerCase() + ' ' + title.toLowerCase();
  let questionBank = GENERAL_QUESTIONS;

  if (normSubject.includes('physics') || normSubject.includes('thermo') || normSubject.includes('mechanic') || normSubject.includes('motion')) {
    questionBank = PHYSICS_QUESTIONS;
  } else if (normSubject.includes('chemistry') || normSubject.includes('acid') || normSubject.includes('bond') || normSubject.includes('organic')) {
    questionBank = CHEMISTRY_QUESTIONS;
  } else if (normSubject.includes('calculus') || normSubject.includes('derivative') || normSubject.includes('integral') || normSubject.includes('limit') || normSubject.includes('differentiat')) {
    questionBank = CALCULUS_QUESTIONS;
  } else if (normSubject.includes('algebra') || normSubject.includes('equation') || normSubject.includes('matrix') || normSubject.includes('quadratic')) {
    questionBank = ALGEBRA_QUESTIONS;
  } else if (normSubject.includes('geometry') || normSubject.includes('trig') || normSubject.includes('triangle') || normSubject.includes('angle')) {
    questionBank = GEOMETRY_QUESTIONS;
  } else if (normSubject.includes('math') || normSubject.includes('arithmetic')) {
    questionBank = MATHS_QUESTIONS;
  }

  const sections = questionTypes.map((qt) => {
    let sectionTitle = '';
    let instruction = '';
    const typeKey = qt.type;

    if (typeKey === 'multiple-choice') {
      sectionTitle = 'Section A: Multiple Choice Questions';
      instruction = 'Choose the correct option for each question.';
    } else if (typeKey === 'short-answer') {
      sectionTitle = 'Section B: Short Answer Questions';
      instruction = 'Answer all questions in 2-3 sentences.';
    } else if (typeKey === 'numerical') {
      sectionTitle = 'Section C: Numerical Problems';
      instruction = 'Show all calculations and steps clearly.';
    } else if (typeKey === 'diagram') {
      sectionTitle = 'Section D: Diagram/Graph-Based Questions';
      instruction = 'Draw neat diagrams and label parts clearly.';
    } else {
      sectionTitle = 'Section: Practice Questions';
      instruction = 'Answer the following questions.';
    }

    const available = questionBank[typeKey] || GENERAL_QUESTIONS[typeKey] || GENERAL_QUESTIONS['multiple-choice'];
    const questions: any[] = [];

    for (let i = 0; i < qt.noOfQuestions; i++) {
      const qTemplate = available[i % available.length];
      questions.push({
        question: qTemplate.question,
        marks: qt.marks
      });
    }

    return {
      title: sectionTitle,
      instruction,
      questions
    };
  });

  return { sections };
}
