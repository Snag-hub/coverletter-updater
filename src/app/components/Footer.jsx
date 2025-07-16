const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-4 text-center">
      <p>
        Built with{" "}
        <span role="img" aria-label="love">
          ❤️
        </span>{" "}
        by{" "}
        <a
          href="https://github.com/Snag-hub"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-400"
        >
          Snag
        </a>
      </p>
    </footer>
  );
};

export default Footer;
