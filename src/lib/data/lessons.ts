import type { Lesson } from "@/types"

export const lessons: Record<string, Lesson> = {
  "intro-to-python": {
    id: "intro-to-python",
    topic_id: "python-setup",
    title: "Introduction to Python",
    description: "Learn what Python is, why it's popular, and what you can build with it.",
    difficulty: "beginner",
    order: 1,
    xp_reward: 10,
    estimated_time: 10,
    prerequisites: [],
    learning_objectives: [
      "Understand what Python is and its history",
      "Know why Python is one of the most popular programming languages",
      "Identify the types of applications you can build with Python",
    ],
    theory: [
      {
        id: "what-is-python",
        title: "What is Python?",
        content:
          "Python is a high-level, interpreted programming language created by Guido van Rossum and first released in 1991. It emphasizes code readability with its notable use of significant indentation. Python's design philosophy, \"The Zen of Python\", prioritizes simplicity and readability.\n\nPython is dynamically typed and garbage-collected. It supports multiple programming paradigms, including structured (particularly procedural), object-oriented, and functional programming. It is often described as a \"batteries included\" language due to its comprehensive standard library.",
        diagram: "python-overview",
      },
      {
        id: "why-python",
        title: "Why is Python So Popular?",
        content:
          "Python has experienced explosive growth in popularity. Here's why:\n\n1. **Readability**: Python's syntax is clean and intuitive, making it accessible to beginners.\n2. **Versatility**: From web development to data science, AI, automation, and more.\n3. **Massive Ecosystem**: PyPI (Python Package Index) has over 400,000 packages.\n4. **Community**: One of the largest, most active programming communities.\n5. **Job Market**: High demand for Python developers across industries.\n6. **Learning Resources**: Abundant tutorials, courses, and documentation.",
        code_example: '# Python is so readable, it almost reads like English\nprint("Hello, World!")  # This prints a message\n\n# Simple calculation\nresult = (5 + 3) * 2\nprint(f"The result is {result}")',
      },
      {
        id: "what-can-you-build",
        title: "What Can You Build With Python?",
        content:
          "Python is used in virtually every domain of software development:\n\n- **Web Development**: Django, Flask, FastAPI\n- **Data Science**: NumPy, Pandas, Jupyter\n- **Machine Learning**: TensorFlow, PyTorch, Scikit-learn\n- **Automation**: Scripts, web scraping, bots\n- **Game Development**: Pygame\n- **Desktop Apps**: Tkinter, PyQt, Kivy\n- **DevOps**: Automation tools, CI/CD\n- **Cybersecurity**: Security tools and analysis\n- **IoT**: Raspberry Pi, microcontrollers\n- **Backend Engineering**: REST APIs, microservices",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "mcq",
        question: "Who created the Python programming language?",
        options: ["Guido van Rossum", "Dennis Ritchie", "Bjarne Stroustrup", "James Gosling"],
        correct_answer: "Guido van Rossum",
        explanation: "Guido van Rossum created Python and released it in 1991.",
      },
      {
        id: "q2",
        type: "mcq",
        question: "What does 'batteries included' mean in Python's context?",
        options: [
          "Python comes with a comprehensive standard library",
          "Python requires many external packages",
          "Python is powered by batteries",
          "Python runs on battery-powered devices",
        ],
        correct_answer: "Python comes with a comprehensive standard library",
        explanation: "Python's standard library includes modules for many common tasks.",
      },
    ],
    flashcards: [
      { id: "f1", front: "Who created Python?", back: "Guido van Rossum in 1991" },
      { id: "f2", front: "What paradigm does Python support?", back: "Procedural, object-oriented, and functional programming" },
      { id: "f3", front: "What is PyPI?", back: "Python Package Index - over 400,000 packages" },
    ],
    common_mistakes: [
      {
        mistake: "Thinking Python is only for beginners",
        correction: "Python is used by professionals at Google, Netflix, NASA, and more",
        explanation: "Python's simplicity makes it great for beginners, but it's also powerful enough for complex systems.",
      },
    ],
    interview_questions: [
      {
        question: "Why is Python called an interpreted language?",
        answer: "Python code is executed line by line by the Python interpreter at runtime, rather than being compiled to machine code beforehand.",
        difficulty: "beginner",
      },
    ],
    practice_problems: [
      {
        id: "pp1",
        title: "Print Your Name",
        description: "Write a print statement that outputs your name to the console.",
        starter_code: "# Write code here\n",
        solution: 'print("Your Name")',
        difficulty: "beginner",
      },
    ],
    challenge_questions: [
      {
        id: "c1",
        title: "Zen of Python",
        description: "Open a Python interpreter and import 'this' to see the Zen of Python. Write down your favorite principle.",
        difficulty: "beginner",
        xp_reward: 5,
      },
    ],
    code_snippets: [
      {
        code: 'print("Hello, Python!")',
        language: "python",
        description: "The classic first program",
      },
    ],
  },
  "syntax-overview": {
    id: "syntax-overview",
    topic_id: "python-syntax",
    title: "Python Syntax Overview",
    description: "Learn the fundamental syntax rules of Python.",
    difficulty: "beginner",
    order: 1,
    xp_reward: 15,
    estimated_time: 15,
    prerequisites: [],
    learning_objectives: [
      "Understand Python's syntax rules",
      "Learn about indentation and code blocks",
      "Write your first Python statements",
    ],
    theory: [
      {
        id: "syntax-basics",
        title: "Python Syntax Basics",
        content:
          "Python syntax is clean and uses indentation to define code blocks. Unlike many other languages that use braces `{}`, Python uses whitespace (typically 4 spaces) to indicate blocks of code.\n\n**Key Rules:**\n1. Statements end without semicolons (though they're optional)\n2. Code blocks are defined by indentation\n3. Comments start with `#`\n4. Variables don't need explicit type declarations\n5. Function and class definitions end with `:`",
        code_example: "# This is a comment\n\n# Python uses indentation for blocks\nif True:\n    print(\"This is inside the if block\")\n    print(\"Still inside\")\nprint(\"Outside the if block\")",
      },
      {
        id: "indentation",
        title: "Indentation Matters",
        content:
          "Indentation is not just for readability in Python - it's syntactically significant. All statements in a block must have the same indentation level.\n\nUse **4 spaces** per indentation level (convention). Don't mix tabs and spaces. Most editors can convert tabs to spaces.",
        code_example: "# Correct indentation\ndef greet(name):\n    print(f\"Hello, {name}!\")\n    print(\"Welcome to Python!\")\n\n# This would cause an IndentationError:\n# def greet(name):\n#     print(f\"Hello, {name}!\")\n#   print(\"Wrong indentation!\")",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "mcq",
        question: "What does Python use to define code blocks?",
        options: ["Braces {}", "Indentation", "Parentheses ()", "Square brackets []"],
        correct_answer: "Indentation",
        explanation: "Python uses indentation (whitespace) to define code blocks.",
      },
      {
        id: "q2",
        type: "predict-output",
        question: "What will this code output?",
        code: 'if True:\n    print("A")\n    print("B")\nprint("C")',
        options: ["A B C (all on separate lines)", "A B (only)", "C (only)", "Error"],
        correct_answer: "A B C (all on separate lines)",
        explanation: "A and B are inside the if block, C is outside.",
      },
    ],
    flashcards: [
      { id: "f1", front: "How many spaces per indentation level?", back: "4 spaces (convention)" },
      { id: "f2", front: "What starts a comment in Python?", back: "The # symbol" },
    ],
    common_mistakes: [
      {
        mistake: "Mixing tabs and spaces",
        correction: "Use only spaces (configure your editor to convert tabs to spaces)",
        explanation: "Python 3 disallows mixing tabs and spaces for indentation.",
      },
    ],
    interview_questions: [
      {
        question: "Why does Python use indentation instead of braces?",
        answer: "It enforces readable code, reduces visual clutter, and ensures consistent formatting across all Python code.",
        difficulty: "beginner",
      },
    ],
    practice_problems: [
      {
        id: "pp1",
        title: "Fix the Indentation",
        description: "Fix the indentation in the following code so it runs without error.",
        starter_code: "def my_function():\nprint(\"Hello\")\n  print(\"World\")\nprint(\"Done\")",
        solution: "def my_function():\n    print(\"Hello\")\n    print(\"World\")\nprint(\"Done\")",
        hint: "All lines in a block must have the same indentation.",
        difficulty: "beginner",
      },
    ],
    challenge_questions: [],
    code_snippets: [
      {
        code: "x = 5\ny = 10\nif x < y:\n    print(\"x is less than y\")",
        language: "python",
        description: "Basic indentation example",
      },
    ],
  },
  "variables": {
    id: "variables",
    topic_id: "python-syntax",
    title: "Variables",
    description: "Learn how to store and manage data with variables in Python.",
    difficulty: "beginner",
    order: 2,
    xp_reward: 15,
    estimated_time: 10,
    prerequisites: [],
    learning_objectives: [
      "Understand what variables are and how they work",
      "Learn variable naming rules and conventions",
      "Assign and reassign values to variables",
    ],
    theory: [
      {
        id: "what-are-variables",
        title: "What Are Variables?",
        content:
          "Variables are containers for storing data values. In Python, you don't need to declare a variable's type - Python infers it from the value you assign.\n\nPython is **dynamically typed**, meaning a variable can change type during execution.",
        code_example: "# Variable assignment\nname = \"Alice\"\nage = 25\nheight = 5.6\nis_student = True\n\n# Dynamic typing - variable can change type\nx = 10        # x is an integer\nx = \"hello\"   # x is now a string\nx = 3.14      # x is now a float",
      },
      {
        id: "naming-rules",
        title: "Variable Naming Rules",
        content:
          "**Rules (must follow):**\n1. Names can contain letters, numbers, and underscores\n2. Names cannot start with a number\n3. Names are case-sensitive (`age` ≠ `Age`)\n4. Cannot use Python keywords (like `if`, `for`, `while`)\n\n**Conventions (should follow):**\n1. Use `snake_case` for variable names\n2. Use descriptive names\n3. Constants use `UPPER_CASE`\n4. Private variables start with `_`",
        code_example: "# Valid names\nuser_name = \"Alice\"\nuser_age = 30\n_temp_value = 42.5\nPI = 3.14159  # constant convention\n\n# Invalid names (will cause errors)\n# 2nd_place = \"Bob\"    # starts with number\n# my-var = 5            # hyphens not allowed\n# class = \"math\"        # 'class' is a keyword",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "mcq",
        question: "Which of the following is a valid variable name in Python?",
        options: ["2fast2furious", "my-variable", "my_variable", "class"],
        correct_answer: "my_variable",
        explanation: "Variable names cannot start with a number, contain hyphens, or be keywords.",
      },
      {
        id: "q2",
        type: "predict-output",
        question: "What is the output?",
        code: "x = 5\nx = \"hello\"\nprint(x)",
        options: ["5", "hello", "Error", "5hello"],
        correct_answer: "hello",
        explanation: "x is reassigned to the string 'hello', overwriting the integer 5.",
      },
    ],
    flashcards: [
      { id: "f1", front: "What naming convention does Python use?", back: "snake_case for variables and functions" },
      { id: "f2", front: "What is dynamic typing?", back: "Variables can change type during execution" },
    ],
    common_mistakes: [
      {
        mistake: "Using reserved keywords as variable names",
        correction: "Choose a different name or add a prefix/suffix like `class_`",
        explanation: "Keywords like `if`, `else`, `while`, `for`, `class`, `def` are reserved.",
      },
    ],
    interview_questions: [
      {
        question: "What is dynamic typing in Python?",
        answer: "Dynamic typing means variable types are determined at runtime, and a variable can hold values of different types during execution.",
        difficulty: "beginner",
      },
    ],
    practice_problems: [
      {
        id: "pp1",
        title: "Create Variables",
        description: "Create variables for your name (string), age (int), and height (float), then print them.",
        starter_code: "# Create your variables here\n",
        solution: 'name = "Alice"\nage = 25\nheight = 5.6\nprint(name, age, height)',
        difficulty: "beginner",
      },
    ],
    challenge_questions: [],
    code_snippets: [],
  },
  "lists": {
    id: "lists",
    topic_id: "data-structures",
    title: "Lists",
    description: "Master Python lists - the most versatile data structure.",
    difficulty: "beginner",
    order: 1,
    xp_reward: 20,
    estimated_time: 20,
    prerequisites: ["variables"],
    learning_objectives: [
      "Create and manipulate lists",
      "Access elements with indexing and slicing",
      "Use list methods effectively",
    ],
    theory: [
      {
        id: "what-are-lists",
        title: "What Are Lists?",
        content:
          "A list is an ordered, mutable collection of items. Lists can contain items of different types, and they're one of the most commonly used data structures in Python.\n\nLists are:\n- **Ordered**: items maintain their position\n- **Mutable**: items can be changed, added, or removed\n- **Heterogeneous**: can contain different data types\n- **Dynamic**: can grow or shrink as needed",
        code_example: "# Creating lists\nfruits = [\"apple\", \"banana\", \"cherry\"]\nmixed = [1, \"hello\", 3.14, True]\nempty = []\nnested = [[1, 2], [3, 4]]\n\n# Lists are ordered\nprint(fruits[0])  # \"apple\"\nprint(fruits[-1]) # \"cherry\" - negative indexing",
      },
    ],
    quiz: [
      {
        id: "q1",
        type: "mcq",
        question: "What does fruits[-1] return from fruits = ['apple', 'banana', 'cherry']?",
        options: ["Error", "apple", "banana", "cherry"],
        correct_answer: "cherry",
        explanation: "Negative indexing starts from the end. -1 returns the last element.",
      },
    ],
    flashcards: [
      { id: "f1", front: "Are lists mutable?", back: "Yes - you can change, add, or remove elements" },
      { id: "f2", front: "Can a list contain different data types?", back: "Yes, lists are heterogeneous" },
    ],
    common_mistakes: [],
    interview_questions: [],
    practice_problems: [
      {
        id: "pp1",
        title: "List Operations",
        description: "Create a list of 5 numbers. Add a 6th number, remove the 3rd, and print the result.",
        starter_code: "numbers = [10, 20, 30, 40, 50]\n# Your code here\n",
        solution: "numbers = [10, 20, 30, 40, 50]\nnumbers.append(60)\ndel numbers[2]\nprint(numbers)",
        difficulty: "beginner",
      },
    ],
    challenge_questions: [],
    code_snippets: [],
  },
}

export const lessonIds = Object.keys(lessons)
export function getLesson(id: string): Lesson | undefined {
  return lessons[id]
}

export function getLessonsByTopic(topicId: string): Lesson[] {
  return Object.values(lessons).filter((l) => l.topic_id === topicId)
}
