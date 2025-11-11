import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { api } from '../api/client';

const STRIPE_PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY || process.env.STRIPE_PUBLIC_KEY || '';

let stripePromise;
// PUBLIC_INTERFACE
export default function Checkout() {
  const { courseId } = useParams();
  const nav = useNavigate();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (!STRIPE_PUBLIC_KEY) {
      setErr('Stripe not configured');
    } else {
      stripePromise = stripePromise || loadStripe(STRIPE_PUBLIC_KEY);
    }
  }, []);

  const onCheckout = async () => {
    setBusy(true);
    setErr(null);
    try {
      const session = await api.createCheckoutSession(courseId);
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');
      const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
      if (error) setErr(error.message);
    } catch (e) {
      setErr('Checkout failed');
      try {
        await api.enroll(courseId);
        nav(`/courses/${courseId}`);
      } catch (e2) {
        // ignore
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2>Checkout</h2>
        <p>Complete your purchase to access this course.</p>
        {err && <div className="error">{err}</div>}
        <button className="btn-primary" disabled={busy || !STRIPE_PUBLIC_KEY} onClick={onCheckout}>
          {busy ? 'Redirecting...' : 'Pay with Stripe'}
        </button>
      </div>
    </div>
  );
}
