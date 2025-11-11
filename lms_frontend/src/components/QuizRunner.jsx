import React, { useState } from 'react';

// PUBLIC_INTERFACE
export default function QuizRunner({ quiz, onSubmit }) {
  const [answers, setAnswers] = useState({});

  if (!quiz) return null;

  const onChange = (qid, value) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(answers);
  };

  return (
    <form className="quiz card" onSubmit={handleSubmit}>
      <div className="card-body">
        <h3>{quiz.title || 'Quiz'}</h3>
        {quiz.questions?.map((q) => (
          <div className="quiz-question" key={q.id}>
            <div className="q-text">{q.text}</div>
            <div className="q-answers">
              {q.options?.map((opt) => (
                <label key={opt} className="radio">
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    value={opt}
                    onChange={(e) => onChange(q.id, e.target.value)}
                    required
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        <div className="card-actions">
          <button className="btn-primary" type="submit">Submit</button>
        </div>
      </div>
    </form>
  );
}
