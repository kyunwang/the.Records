type ButtonProps ={
	onClick: () => void;
	label: string;
}


const Button = ({ onClick, label }: ButtonProps) => {
  return (
	 <button
          className="dark:text-zinc-600 flex items-center gap-2 py-3 px-4 text-sm bg-[#F1F1F1] rounded-md font-medium shadow-sm hover:shadow-md transition-shadow duration-500 ease-in-out relative" onClick={onClick}>
          {/* className="text-black-50 flex items-center gap-2 py-3 px-4 text-sm bg-[#F1F1F1] rounded-md font-medium shadow-sm hover:shadow-md transition-shadow duration-500 ease-in-out relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] dark:before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]"> */}
            {label}
          </button>
  )
}

export default Button