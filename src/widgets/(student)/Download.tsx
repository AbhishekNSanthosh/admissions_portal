  'use client';
import { useState } from "react";
  export default function GenerateLatexPdf() {
   const [loading, setLoading] = useState(false);

    const handleGeneratePDF = async () => {
      const latex = `
  \documentclass[a4paper,12pt]{article}
\\usepackage[a4paper, margin=1in]{geometry}
\\usepackage{graphicx}
\\usepackage{array}
\\usepackage{enumitem}
\\usepackage{longtable}
\\usepackage{multicol}
\\usepackage{setspace}
\\usepackage{fancyhdr}
\\usepackage{tabularx} % Add this in the preamble
\pagestyle{fancy}
\fancyhf{}
\rhead{Application No.: CRML-02311-20240604}
\lhead{Carmel Polytechnic College}
\cfoot{\thepage}

% ------- Custom Commands for Dynamic Content -------
% Application Info
\newcommand{\AppNo}{CRML-02311-20240604}
\newcommand{\GovtAppNo}{131752}
\newcommand{\IndexScore}{6.7875004}
\newcommand{\Fee}{200}
\newcommand{\PrefOne}{Electronics}
\newcommand{\PrefTwo}{NIL}
\newcommand{\PrefThree}{NIL}

% Student Info
\newcommand{\StudentName}{SREESANTH S}
\newcommand{\DOB}{27/12/2005}
\newcommand{\Religion}{Hindu}
\newcommand{\Gender}{Male}
\newcommand{\BirthPlace}{ALAPPUZHA}
\newcommand{\Community}{EZHAVA}
\newcommand{\Email}{ssreesanth025@gmail.com}
\newcommand{\Phone}{8113053904}
\newcommand{\Address}{Parampil, Mithrakkary, Mithrakkary, Mithrakkary P O, Alappuzha, PIN Code: 689595, Kerala, India}
\newcommand{\Aadhar}{9377 4634 2710}

% Academic
\newcommand{\SchoolName}{St. Xaviers HS Mithrakkary}
\newcommand{\PassYear}{Mar-2022}
\newcommand{\ExamName}{SSLC}
\newcommand{\ExamChance}{1}

% Guardian
\newcommand{\GuardianName}{Sasi}
\newcommand{\Occupation}{Fisherman}
\newcommand{\GuardianAddress}{Parampil, Mithrakkary, Mithrakkary, Mithrakkary P O, Alappuzha, PIN Code: 689595}
\newcommand{\Relationship}{Father}
\newcommand{\MonthlyIncome}{1000}

% Grades
\newcommand{\GradeFLA}{C}
\newcommand{\GradeFLB}{A+}
\newcommand{\GradeEng}{A}
\newcommand{\GradeHin}{A+}
\newcommand{\GradeSS}{C+}
\newcommand{\GradePhy}{B+}
\newcommand{\GradeChem}{B}
\newcommand{\GradeBio}{B+}
\newcommand{\GradeMath}{B}
\newcommand{\GradeIT}{A+}

% Place & Date
\newcommand{\Place}{Alappuzha}
\newcommand{\DateSubmitted}{10-06-2024}

% ------- Document Starts Here -------
\begin{document}
\begin{center}
    \includegraphics[width=1.4cm]{logo_main.png}
\end{center}
\begin{center}
    {\LARGE \textbf{Carmel Polytechnic College}}\\
    \textbf{Application for Polytechnic Admission 2024-2025}\\
    \textbf{Management Merit - Regular} \\
    Govt. Management Quota Application No. (www.polyadmission.org): \textbf{\GovtAppNo} \\
    \vspace{1em}
    \textbf{Index Score: \IndexScore \hspace{2cm} Fees to be remitted: Rs. \Fee/-}
\end{center}

\section*{Candidate Profile}
\onehalfspacing
\noindent
\begin{tabularx}{\textwidth}{|X|X|X|}
\hline
\textbf{Preference 1} & \textbf{Preference 2} & \textbf{Preference 3} \\
\hline
\PrefOne & \PrefTwo & \PrefThree \\
\hline
\end{tabularx}

\vspace{1em}
\section*{Candidate Profile}
\onehalfspacing
\begin{tabular}{|p{5cm}|p{10cm}|}
\hline
Name of the Applicant & \StudentName \\
\hline
Date of Birth & \DOB \\
\hline
Religion & \Religion \\
\hline
Gender & \Gender \\
\hline
Place of Birth & \BirthPlace \\
\hline
Community & \Community \\
\hline
Email & \Email \\
\hline
Phone Number & \Phone \\
\hline
Address & \Address \\
\hline
Aadhar Number & \Aadhar \\
\hline
\end{tabular}

\vspace{1em}
\section*{Academic History}
\onehalfspacing
\noindent
\begin{tabularx}{\textwidth}{|c|X|c|}
\hline
\textbf{Course} & \textbf{Name of the Institution} & \textbf{Passed on} \\
\hline
SSLC & \SchoolName & \PassYear \\
\hline
\end{tabularx}

\newpage
\section*{Qualifying Examination}
\textbf{Name of the examination: \ExamName} \hfill \textbf{Chances taken: \ExamChance}

\vspace{0.5em}
\onehalfspacing
\noindent
\begin{tabularx}{\textwidth}{|c|X|c|}
\hline
\textbf{No.} & \textbf{Subject} & \textbf{Grade} \\
\hline
1 & First Language - Paper I & \GradeFLA \\
\hline
2 & First Language - Paper II & \GradeFLB \\
\hline
3 & English & \GradeEng \\
\hline
4 & Hindi & \GradeHin \\
\hline
5 & Social Science & \GradeSS \\
\hline
6 & Physics & \GradePhy \\
\hline
7 & Chemistry & \GradeChem \\
\hline
8 & Biology & \GradeBio \\
\hline
9 & Mathematics & \GradeMath \\
\hline
10 & Information Technology & \GradeIT \\
\hline
\end{tabularx}

\vspace{1em}
\section*{Guardian Info}
\begin{tabular}{|p{5cm}|p{10cm}|}
\hline
Name of the Guardian & \GuardianName \\
\hline
Occupation & \Occupation \\
\hline
Address (Residential) & \GuardianAddress \\
\hline
Relationship with the Applicant & \Relationship \\
\hline
Monthly Income & \MonthlyIncome \\
\hline
Phone Number & \Phone \\
\hline
\end{tabular}

\vspace{1em}
\section*{Checklist for the Applicant}
\onehalfspacing
\begin{tabular}{|c|p{11.7cm}|c|}

\hline
\textbf{No.} & \textbf{Checklist Item} & \textbf{Yes / No} \\
\hline
1 & I have filled in the correct information. &  \\
\hline
2 & I have uploaded the copy of statement of marks card of class X. &  \\
\hline
3 & My parent / guardian and I have signed the declaration on the printed application form. &  \\
\hline
4 & I am attaching the copy of application processing fee challan. &  \\
\hline
\end{tabular}

\vspace{4em}
\begin{tabular}{p{8cm}p{6cm}}
\textbf{Place:} \Place &   \\
\textbf{Date:} \DateSubmitted & \textbf{Signature of the Candidate:} \\
\end{tabular}

\end{document}

      `
  setLoading(true);
  try {
    const response = await fetch("http://localhost:3001/generate-pdf", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ latex }),
    });

    if (!response.ok) throw new Error('PDF generation failed');

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'output.pdf';
    a.click();
    URL.revokeObjectURL(url);
  } catch (err:unknown) {
    if (err instanceof Error) {
      alert(err.message || 'Something went wrong');
    } else {
      alert('Something went wrong');
    }
  } finally {
    setLoading(false);
  }
};


    return (
      <button
  onClick={handleGeneratePDF}
  disabled={loading}
  className="bg-blue-600 px-4 py-2 rounded disabled:opacity-50"
>
  {loading ? 'Generating...' : 'Generate PDF from LaTeX'}
</button>
    );
  }
