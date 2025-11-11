import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/client';
import LessonPlayer from '../components/LessonPlayer';
import QuizRunner from '../components/QuizRunner';

// PUBLIC_INTERFACE
export default function LessonDetail() {
  const { courseId, lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    api.getLesson(courseId, lessonId).then((d) => {
      setLesson(d);
      if (d?.quiz) setQuiz(d.quiz);
    }).catch(() => setLesson(null));
  }, [courseId, lessonId]);

  const onSubmitQuiz = async (answers) => {
    const r = await api.submitQuiz(lessonId, answers);
    setResult(r);
  };

  return (
    <div>
      <LessonPlayer lesson={lesson} />
      {quiz && !result && (
        <QuizRunner quiz={quiz} onSubmit={onSubmitQuiz} />
      )}
      {result && (
        <div className="card">
          <div className="card-body">
            <h3>Quiz Result</h3>
            <p>Score: <strong>{result.score}</strong></p>
            <p className="muted">Feedback: {result.feedback || '—'}</p>
          </div>
        </div>
      )}
    </div>
  );
}
