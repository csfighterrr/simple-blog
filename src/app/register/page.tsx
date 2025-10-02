import RegisterForm from '@/components/RegisterForm';

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <RegisterForm />
    </main>
  );
}
