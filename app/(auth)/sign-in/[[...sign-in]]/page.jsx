import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignIn
        appearance={{
          elements: {
            card: "bg-white shadow-lg rounded-lg p-8",
            formFieldInput:
              "border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
            buttonPrimary:
              "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 rounded-md px-4 py-2",
          },
        }}
        signUpUrl="/sign-up"
        afterSignInUrl="/dashboard"
      />
    </div>
  )
  ;
}