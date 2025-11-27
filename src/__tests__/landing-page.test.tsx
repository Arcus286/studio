
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import LandingPage from '@/app/page';

// Mock next/image
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
      // eslint-disable-next-line @next/next/no-img-element
      return <img {...props} />;
    },
}));

describe('LandingPage', () => {
  it('renders the main headline', () => {
    render(<LandingPage />);
 
    const heading = screen.getByRole('heading', {
      name: /Streamline Your Project Workflow/i,
    });
 
    expect(heading).toBeInTheDocument();
  });

  it('renders the "Get Started" button', () => {
    render(<LandingPage />);
    const getStartedButton = screen.getByRole('link', { name: /Get Started/i });
    expect(getStartedButton).toBeInTheDocument();
    expect(getStartedButton).toHaveAttribute('href', '/signup');
  });

  it('renders the "Sign In" button', () => {
    render(<LandingPage />);
    const signInButton = screen.getByRole('link', { name: /Sign In/i });
    expect(signInButton).toBeInTheDocument();
    expect(signInButton).toHaveAttribute('href', '/login');
  });

  it('displays all feature cards', () => {
    render(<LandingPage />);
    const featureTitles = [
      'AI-Powered Suggestions',
      'Interactive Kanban Board',
      'Real-Time Collaboration',
      'Project & Role Management',
      'Detailed Analytics',
      'Customizable Profiles',
    ];
    featureTitles.forEach(title => {
        expect(screen.getByText(title)).toBeInTheDocument();
    });
  });
});
