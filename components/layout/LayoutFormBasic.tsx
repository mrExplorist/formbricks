import Head from "next/head";
import MenuBreadcrumbs from "./MenuBreadcrumbs";
import MenuSteps from "./MenuSteps";
import MenuProfile from "./MenuProfile";
import { signIn, useSession } from "next-auth/react";
import Loading from "../Loading";

export default function LayoutShare({ title, formId, currentStep, children }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  if (!session) {
    signIn();
    return <div>You need to be authenticated to view this page.</div>;
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex min-h-screen overflow-hidden bg-lightgray-50">
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="w-full">
            <div className="relative z-10 flex flex-shrink-0 h-16 bg-white border-b shadow-sm border-lightgray-200">
              <div className="flex flex-1 px-4 sm:px-6">
                <MenuBreadcrumbs formId={formId} />
                <MenuSteps formId={formId} currentStep={currentStep} />
                <div className="flex items-center justify-end flex-1 space-x-2 text-right sm:ml-6 sm:space-x-4">
                  {/* Profile dropdown */}
                  <MenuProfile />
                </div>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}