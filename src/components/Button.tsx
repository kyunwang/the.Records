import Link from 'next/link';

type ButtonProps = {
	onClick?: () => void;
	label: string;
	url?: string;
};

const Button = ({ onClick, label, url }: ButtonProps) => {
	const Element = url ? Link : 'button';

	return (
		<Element
			href={url!}
			rel={url ? 'noopener noreferrer' : undefined}
			className="relative flex items-center gap-2 rounded-md bg-[#F1F1F1] px-4 py-3 text-sm font-medium shadow-sm transition-shadow duration-500 ease-in-out hover:shadow-md dark:text-zinc-600"
			onClick={onClick}
		>
			{label}
		</Element>
	);
};

export default Button;
