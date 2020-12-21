export function Banner() {
  return (
    <div
      className={
        "bg-gray-100 border-gray-200 border-b-2 py-1.5 text-center mb-10"
      }
    >
      <p className={"text-sm"}>
        The source code for this blog is{" "}
        <a
          href="https://github.com/alii/alistair-blog"
          className={"underline hover:text-blue-500"}
        >
          available on GitHub
        </a>
        .
      </p>
    </div>
  );
}
