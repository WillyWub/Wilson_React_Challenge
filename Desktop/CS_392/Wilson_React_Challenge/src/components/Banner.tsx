type BannerProp = {
  title: string;
};

const Banner = ({ title }: BannerProp) => (
  <header className="text-center sm:text-left">
    <h1 className="text-4xl font-semibold tracking-tight text-blue-700 sm:text-5xl">
      {title}
    </h1>
  </header>
);

export default Banner;

