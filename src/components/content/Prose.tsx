import { MDXRemote } from "next-mdx-remote/rsc";

const components = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2 className="mt-12 mb-4 font-display text-2xl leading-tight font-bold text-carbon sm:text-3xl" {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => <p className="my-4 text-lg leading-8 text-ink" {...props} />,
  ul: (props: React.ComponentProps<"ul">) => <ul className="my-4 flex flex-col gap-3 text-lg leading-8 text-ink" {...props} />,
  li: (props: React.ComponentProps<"li">) => (
    <li className="relative pl-6 before:absolute before:top-[14px] before:left-0 before:size-1.5 before:rounded-full before:bg-orange" {...props} />
  ),
  strong: (props: React.ComponentProps<"strong">) => <strong className="font-semibold text-carbon" {...props} />,
  a: (props: React.ComponentProps<"a">) => (
    <a className="text-carbon underline decoration-orange decoration-2 underline-offset-4 hover:text-orange" {...props} />
  ),
  code: (props: React.ComponentProps<"code">) => (
    <code className="rounded-md bg-[#EEF1F7] px-1.5 py-0.5 font-mono text-[0.9em] text-carbon" {...props} />
  ),
};

// Renders an MDX body with the site's typography.
export function Prose({ source }: { source: string }) {
  return (
    <div className="max-w-[720px]">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
