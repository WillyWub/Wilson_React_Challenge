type BannerProp = {
  title: string;
};

const Banner = ({ title }: BannerProp) => (
  <header className="text-center sm:text-left">
    <h1 className="text-4xl font-semibold tracking-tight text-blue-700 sm:text-5xl">
      {title}
    </h1>
    <p className="mt-3 text-base text-slate-600 sm:text-lg">
      Select a course to learn more. Explore offerings from both the fall and spring
      terms.
    </p>
  </header>
);

export default Banner;

