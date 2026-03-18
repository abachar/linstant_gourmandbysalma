import { useRouter } from "@tanstack/react-router";

export const HeaderCancelButton = () => {
	const { history } = useRouter();

	return (
		<button
			type="button"
			onClick={() => history.back()}
			className="text-slate-500 dark:text-[#c9929b] text-sm font-medium hover:opacity-80 transition-opacity"
		>
			Annuler
		</button>
	);
};
