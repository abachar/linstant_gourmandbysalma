import { createSignal } from "solid-js";

export function useMutation<TVariables, TData>(opts: {
	fn: (variables: TVariables) => Promise<TData>;
	onSuccess?: (data: TData) => void;
}) {
	const [error, setError] = createSignal<string | undefined>();
	const [isLoading, setLoading] = createSignal(false);

	const mutate = async (args: TVariables) => {
		setError(undefined);
		setLoading(true);

		try {
			const result = await opts.fn(args);
			opts.onSuccess?.(result);
			return result;
		} catch (e) {
			setError(e.message);
		} finally {
			setLoading(false);
		}
	};

	return { mutate, isLoading, error };
}
