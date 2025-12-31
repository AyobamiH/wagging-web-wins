import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { screen, waitFor } from '@testing-library/dom';
import { AuthProvider, useAuth } from './AuthContext';

// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } },
      })),
      getSession: vi.fn(() => Promise.resolve({ data: { session: null } })),
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
    },
    rpc: vi.fn(),
  },
}));

// Test component that uses the auth context
function TestComponent() {
  const { user, loading, isAdmin } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      <div data-testid="user-status">{user ? 'Logged In' : 'Logged Out'}</div>
      <div data-testid="admin-status">{isAdmin ? 'Admin' : 'Not Admin'}</div>
    </div>
  );
}

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should provide auth context to children', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Should show loading initially
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByTestId('user-status')).toHaveTextContent('Logged Out');
    });
  });

  it('should throw error when useAuth is used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useAuth must be used within an AuthProvider');
    
    consoleSpy.mockRestore();
  });

  it('should initialize with no user', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('user-status')).toHaveTextContent('Logged Out');
      expect(screen.getByTestId('admin-status')).toHaveTextContent('Not Admin');
    });
  });
});
