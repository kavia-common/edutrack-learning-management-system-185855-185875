import { useAuthContext } from '../store';

// PUBLIC_INTERFACE
export default function useAuth() {
  const ctx = useAuthContext();
  return ctx;
}
