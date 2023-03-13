import Link from "next/link";

interface ButtonProps {
  href: string;
  type?: "outline" | "primary";
  rel?: string;
  children: React.ReactNode;
}

const Button = ({ href, type = "primary", rel, children }: ButtonProps) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel={`noopener noreferrer ${
        rel ? (rel === "follow" ? "" : rel) : "nofollow"
      }`}
      className={`btn me-4 mb-4 border-none text-sm hover:bg-primary ${
        type === "outline" ? "btn-outline-primary" : "btn-primary"
      }`}
    >
      {children}
    </Link>
  );
};

export default Button;