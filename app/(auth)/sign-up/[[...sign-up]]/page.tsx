import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-sand flex items-center justify-center p-4">
      <SignUp
        appearance={{
          variables: {
            colorPrimary: '#378ADD',
            colorBackground: '#FFFFFF',
            colorText: '#2C2C2A',
            colorInputBackground: '#F5F0E8',
            borderRadius: '12px',
            fontFamily: '"Montserrat", sans-serif',
          },
          elements: {
            card: 'shadow-none border border-stone rounded-2xl',
            headerTitle: 'font-bold text-slate',
            headerSubtitle: 'text-muted',
            formButtonPrimary: 'bg-ocean hover:bg-ocean/90 uppercase tracking-wider font-bold',
            footerActionLink: 'text-ocean font-semibold',
          },
        }}
      />
    </div>
  );
}
