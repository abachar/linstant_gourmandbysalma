import { useMutation } from "@common/hooks";
import { importPurchasesFromCsvFn } from "@features/purchases";
import { LoaderCircle, Upload } from "lucide-solid";
import type { Component } from "solid-js";

export const HeaderUploadButton: Component = () => {
	let fileInputRef!: HTMLInputElement;
	const { mutate: importPurchasesFromCsv, isLoading } = useMutation({
		fn: importPurchasesFromCsvFn,
	});

	async function handleFileChange(e: Event) {
		const file = (e.currentTarget as HTMLInputElement).files?.[0];
		if (!file) return;
		fileInputRef.value = "";

		await importPurchasesFromCsv({ data: { content: await file.text() } });
	}

	return (
		<div>
			<button
				type="button"
				onClick={() => fileInputRef.click()}
				class="flex items-center justify-center size-10 text-slate-600 dark:text-white"
			>
				{isLoading() ? <LoaderCircle class="animate-spin opacity-50" /> : <Upload />}
			</button>
			<input ref={fileInputRef} type="file" accept=".csv" class="hidden" onChange={handleFileChange} />
		</div>
	);
};
