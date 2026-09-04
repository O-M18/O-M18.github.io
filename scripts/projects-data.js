// ===== ALL PROJECTS DATA =====
// Add a new project here and it will appear on BOTH the homepage carousel
// and the all-projects (catalog) page automatically. No HTML to edit.
//
// Fields:
//   title    - Project name
//   desc     - Short description (used on cards)
//   thumb    - CSS gradient for the card thumbnail
//   glyph    - Boxicons icon class (e.g. 'bx bx-heart-circle')
//   repoUrl  - GitHub repository link
//   tags     - Array of filter tags: 'eda' | 'bi' | 'app' | 'nlp' | 'sql'
//   chips    - Array of tech tags shown on the catalog page

const ALL_PROJECTS = [
  {
    title: "Parkinson's Disease EDA & Classification",
    desc: "Explored health patterns and risk factors in Parkinson's patient data. Built classification models to detect disease presence using ML techniques.",
    thumb: "linear-gradient(135deg, #a5d68f, #7dc46c)",
    glyph: "bx bx-heart-circle",
    repoUrl: "https://github.com/O-M18/Parkinsons-Disease-EDA_And_Classification",
    tags: ["eda", "nlp"],
    chips: ["Python", "Scikit-learn", "Matplotlib", "ML"],
  },
  {
    title: "Q-Commerce Simulation",
    desc: "Simulated real-world quick-commerce operations: inventory management, returns processing, and multi-city sales analysis with interactive dashboards.",
    thumb: "linear-gradient(135deg, #3f8a31, #a5d68f)",
    glyph: "bx bx-cart",
    repoUrl: "https://github.com/O-M18/Q-commerece_Study",
    tags: ["bi"],
    chips: ["Python", "Power BI", "Simulation"],
  },
  {
    title: "Stock Analysis App",
    desc: "Built a Streamlit web app to analyze stock trends using technical indicators like MACD, RSI, and Moving Averages with interactive charts.",
    thumb: "linear-gradient(135deg, #7dc46c, #3f8a31)",
    glyph: "bx bx-line-chart",
    repoUrl: "https://github.com/O-M18/Stock_Analysis_Site",
    tags: ["app"],
    chips: ["Python", "Streamlit", "Plotly", "Finance"],
  },
  {
    title: "Movie Success & Sentiment Analysis",
    desc: "Developed a Streamlit app to predict movie box office success and analyze user review sentiments using NLP and ML models.",
    thumb: "linear-gradient(135deg, #a5d68f, #b7dda1)",
    glyph: "bx bxs-film",
    repoUrl: "https://github.com/O-M18/Movie_Sucess_and_Sentiment",
    tags: ["nlp", "app"],
    chips: ["Python", "NLP", "Streamlit", "ML"],
  },
  {
    title: "SQL Retail Sales Analysis",
    desc: "Applied advanced SQL techniques including CTEs, window functions, and subqueries to clean, explore, and analyze retail sales data.",
    thumb: "linear-gradient(135deg, #3f8a31, #7dc46c)",
    glyph: "bx bxs-data",
    repoUrl: "https://github.com/O-M18/Retail_Sale_Sql",
    tags: ["sql"],
    chips: ["SQL", "MySQL", "Data Cleaning"],
  },
  {
    title: "Sales Performance Dashboard",
    desc: "Designed an interactive Power BI dashboard to visualize sales across categories, regions, and time periods with drill-down capabilities.",
    thumb: "linear-gradient(135deg, #7dc46c, #a5d68f)",
    glyph: "bx bx-bar-chart-alt-2",
    repoUrl: "https://github.com/O-M18/Sales_Performance_dashboard",
    tags: ["bi"],
    chips: ["Power BI", "DAX", "Data Modeling"],
  },
];
