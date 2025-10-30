import { signInWithGoogle, signOut, useAuthState } from '../utilities/firebase';

type BannerProps = {
  title: string;
};

const Banner = ({ title }: BannerProps) => {
  const { user, isAuthenticated, isLoading } = useAuthState();

  return (
    <header className="rounded-3xl bg-white px-6 py-5 shadow-sm sm:px-8 sm:py-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-semibold tracking-tight text-blue-700 sm:text-4xl">
          {title}
        </h1>

        <div className="flex items-center gap-4">
          {!isLoading && isAuthenticated && (
            <span className="hidden text-sm font-medium text-slate-600 sm:inline">
              Signed in as {user?.displayName ?? user?.email ?? 'User'}
            </span>
          )}

          <button
            type="button"
            onClick={isAuthenticated ? signOut : signInWithGoogle}
            className="rounded-full border border-blue-500 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-500 hover:text-white"
            disabled={isLoading}
          >
            {isLoading ? '...' : isAuthenticated ? 'Sign out' : 'Sign in'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Banner;
