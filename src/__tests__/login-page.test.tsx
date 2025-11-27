
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import LoginPage from '@/app/login/page'
import { useAuth } from '@/hooks/use-auth';

// Mock the useAuth hook
jest.mock('@/hooks/use-auth', () => ({
  useAuth: jest.fn(),
}));

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
    useRouter: () => ({
      push: jest.fn(),
    }),
}));

describe('LoginPage', () => {
  beforeEach(() => {
    // Provide a mock implementation for useAuth before each test
    (useAuth as jest.Mock).mockReturnValue({
      login: jest.fn(),
    });
  });

  it('renders the login form', () => {
    render(<LoginPage />);
    
    // Check for the main title
    expect(screen.getByRole('heading', { name: /Welcome to AgileBridge/i })).toBeInTheDocument();
    
    // Check for input fields
    expect(screen.getByLabelText(/Username or Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    
    // Check for buttons
    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
    
    // Check for links
    expect(screen.getByRole('link', { name: /Back to Home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Forgot password?/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Sign up/i })).toBeInTheDocument();
  });
});
