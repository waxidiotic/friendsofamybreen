interface PageTitleProps {
  title: string;
}

export const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5 border-b-muted-foreground border-b-2">
      <h1 className="text-3xl font-extrabold leading-9 tracking-light text-foreground sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
        {title}
      </h1>
    </div>
  );
};
